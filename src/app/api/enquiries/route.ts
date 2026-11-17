// POST /api/enquiries - Store new connection enquiries
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { newConnectionSchema } from "@/lib/validation";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { jsonResponse, errorResponse } from "@/lib/constants";

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const rateCheck = checkRateLimit(`enquiry_${ip}`, {
      windowMs: 10 * 60 * 1000,
      maxRequests: 6,
    });

    if (!rateCheck.allowed) {
      return errorResponse(
        "Too many submission attempts. Please wait a few minutes or contact us directly on WhatsApp at 9471126747.",
        429
      );
    }

    const body = await req.json().catch(() => null);
    if (!body) {
      return errorResponse("Invalid request body. Expected JSON payload.", 400);
    }

    // Honeypot check: If bot filled website_url, silently accept without storing
    if (body.website_url) {
      return jsonResponse({
        success: true,
        message: "Enquiry received successfully.",
      });
    }

    const parseResult = newConnectionSchema.safeParse(body);
    if (!parseResult.success) {
      const firstError = parseResult.error.issues[0]?.message || "Invalid input data";
      return errorResponse(firstError, 400, parseResult.error.format());
    }

    const data = parseResult.data;
    const userAgent = req.headers.get("user-agent") || undefined;

    // Check for duplicate enquiry in the last 10 minutes from same mobile
    const existingRecent = await db.enquiry.findFirst({
      where: {
        mobileNumber: data.mobileNumber,
        createdAt: {
          gte: new Date(Date.now() - 10 * 60 * 1000),
        },
      },
    });

    if (existingRecent) {
      return jsonResponse({
        success: true,
        message:
          "We already received your request! A Super Sky Fiber Net representative will call you shortly on " +
          data.mobileNumber +
          ".",
        enquiryId: existingRecent.id,
      });
    }

    const newEnquiry = await db.enquiry.create({
      data: {
        customerName: data.customerName,
        mobileNumber: data.mobileNumber,
        email: data.email,
        locality: data.locality,
        pinCode: data.pinCode,
        address: data.address,
        selectedPlan: data.selectedPlan,
        message: data.message,
        enquiryType: "NEW_CONNECTION",
        status: "NEW",
        ipAddress: ip,
        userAgent,
      },
    });

    return jsonResponse(
      {
        success: true,
        message:
          "Thank you, " +
          data.customerName +
          "! Your broadband connection enquiry has been logged. Our Jamshedpur installation team will contact you shortly.",
        enquiryId: newEnquiry.id,
      },
      201
    );
  } catch (err: unknown) {
    console.error("Enquiry API error:", err);
    return errorResponse(
      "Unable to process your request at this moment. Please call or WhatsApp our local team directly at +91 94711 26747.",
      500
    );
  }
}
