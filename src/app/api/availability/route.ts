// POST /api/availability - Service availability checking & enquiry logging
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { availabilityCheckSchema } from "@/lib/validation";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { jsonResponse, errorResponse } from "@/lib/constants";
import { coverageStatusConfig, CoverageStatus } from "@/config/coverage";

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const rateCheck = checkRateLimit(`avail_${ip}`, {
      windowMs: 10 * 60 * 1000,
      maxRequests: 10,
    });

    if (!rateCheck.allowed) {
      return errorResponse("Too many availability requests. Please contact us on WhatsApp at 9471126747.", 429);
    }

    const body = await req.json().catch(() => null);
    if (!body) {
      return errorResponse("Invalid request body.", 400);
    }

    // Honeypot check
    if (body.website_url) {
      return jsonResponse({
        success: true,
        status: "AVAILABLE",
        message: "Feasibility verified for your area.",
      });
    }

    const parseResult = availabilityCheckSchema.safeParse(body);
    if (!parseResult.success) {
      const firstError = parseResult.error.issues[0]?.message || "Invalid input data";
      return errorResponse(firstError, 400, parseResult.error.format());
    }

    const data = parseResult.data;
    const userAgent = req.headers.get("user-agent") || undefined;

    // Check locality / PIN code against database coverage areas
    const matchedArea = await db.coverageArea.findFirst({
      where: {
        OR: [
          { pinCode: data.pinCode },
          { localityName: { contains: data.locality } },
        ],
      },
    });

    const status: CoverageStatus = matchedArea
      ? (matchedArea.status as CoverageStatus)
      : data.pinCode.startsWith("831")
      ? "LIMITED"
      : "NOT_SERVICEABLE";

    const statusMeta = coverageStatusConfig[status] || coverageStatusConfig.LIMITED;

    // Persist enquiry so customer details are never lost!
    const enquiry = await db.enquiry.create({
      data: {
        customerName: data.customerName,
        mobileNumber: data.mobileNumber,
        locality: data.locality,
        pinCode: data.pinCode,
        address: data.address,
        enquiryType: "AVAILABILITY_CHECK",
        status: "NEW",
        adminNotes: `Area feasibility check: ${status}. Matched locality: ${matchedArea?.localityName || "Unknown"}`,
        ipAddress: ip,
        userAgent,
      },
    });

    return jsonResponse({
      success: true,
      enquiryId: enquiry.id,
      locality: data.locality,
      pinCode: data.pinCode,
      status,
      statusLabel: statusMeta.label,
      description: statusMeta.description,
      canInstantBook: statusMeta.canInstantBook,
      matchedAreaName: matchedArea?.localityName || data.locality,
      message:
        status === "AVAILABLE"
          ? `Great news! High-speed optical fiber is actively available in ${data.locality}. Same-day installation is feasible!`
          : status === "LIMITED"
          ? `Fiber service is active in select sectors of ${data.locality}. Our engineering surveyor will contact you to verify exact line drop feasibility.`
          : status === "COMING_SOON"
          ? `Fiber optical backbone cabling is underway in ${data.locality}. Your pre-registration has been confirmed for priority launch discounts!`
          : `We are currently expanding our network across Jamshedpur. We have noted your interest for ${data.locality} (PIN: ${data.pinCode}).`,
    });
  } catch (err: unknown) {
    console.error("Availability API error:", err);
    return errorResponse(
      "Unable to verify coverage automatically. Please message us on WhatsApp at +91 94711 26747 for instant feasibility verification.",
      500
    );
  }
}
