// POST /api/contact - Customer contact form handler
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { contactMessageSchema } from "@/lib/validation";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { jsonResponse, errorResponse } from "@/lib/constants";

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const rateCheck = checkRateLimit(`contact_${ip}`, {
      windowMs: 10 * 60 * 1000,
      maxRequests: 5,
    });

    if (!rateCheck.allowed) {
      return errorResponse("Too many messages sent. Please contact us on WhatsApp at 9471126747.", 429);
    }

    const body = await req.json().catch(() => null);
    if (!body) {
      return errorResponse("Invalid request body.", 400);
    }

    // Honeypot check
    if (body.website_url) {
      return jsonResponse({
        success: true,
        message: "Message received.",
      });
    }

    const parseResult = contactMessageSchema.safeParse(body);
    if (!parseResult.success) {
      const firstError = parseResult.error.issues[0]?.message || "Invalid input data";
      return errorResponse(firstError, 400, parseResult.error.format());
    }

    const data = parseResult.data;
    const userAgent = req.headers.get("user-agent") || undefined;

    const enquiry = await db.enquiry.create({
      data: {
        customerName: data.customerName,
        mobileNumber: data.mobileNumber,
        email: data.email,
        locality: "Jamshedpur",
        pinCode: "831001",
        message: `Subject: ${data.subject}\n\nMessage: ${data.message}`,
        enquiryType: "CONTACT_MESSAGE",
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
          ". Your message has been received. Our team will get back to you shortly.",
        enquiryId: enquiry.id,
      },
      201
    );
  } catch (err: unknown) {
    console.error("Contact API error:", err);
    return errorResponse(
      "Unable to send message. Please reach us directly via WhatsApp or Phone at +91 94711 26747.",
      500
    );
  }
}
