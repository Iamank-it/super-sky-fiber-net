// /api/admin/enquiries - Admin Customer Enquiries Management
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { adminUpdateEnquirySchema } from "@/lib/validation";
import { jsonResponse, errorResponse } from "@/lib/constants";

function isAuthorized(req: NextRequest): boolean {
  const authHeader = req.headers.get("authorization") || req.headers.get("x-admin-key");
  const expectedKey = process.env.ADMIN_SECRET_KEY || "ssfn-jamshedpur-admin-2026";
  if (authHeader) {
    const token = authHeader.replace(/^Bearer\s+/i, "");
    if (token === expectedKey) return true;
  }
  const cookie = req.cookies.get("ssfn_admin_session");
  if (cookie?.value === expectedKey) return true;
  return false;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return errorResponse("Unauthorized. Administrative privileges required.", 401);
  }

  try {
    const url = new URL(req.url);
    const status = url.searchParams.get("status");
    const search = url.searchParams.get("q");

    const where: Record<string, unknown> = {};
    if (status && status !== "ALL") {
      where.status = status;
    }
    if (search) {
      where.OR = [
        { customerName: { contains: search } },
        { mobileNumber: { contains: search } },
        { locality: { contains: search } },
        { pinCode: { contains: search } },
      ];
    }

    const enquiries = await db.enquiry.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    const counts = {
      all: await db.enquiry.count(),
      new: await db.enquiry.count({ where: { status: "NEW" } }),
      contacted: await db.enquiry.count({ where: { status: "CONTACTED" } }),
      inProgress: await db.enquiry.count({ where: { status: "IN_PROGRESS" } }),
      resolved: await db.enquiry.count({ where: { status: "RESOLVED" } }),
      closed: await db.enquiry.count({ where: { status: "CLOSED" } }),
    };

    return jsonResponse({
      success: true,
      enquiries,
      counts,
    });
  } catch (err: unknown) {
    console.error("Admin enquiries GET error:", err);
    return errorResponse("Failed to fetch enquiries.", 500);
  }
}

export async function PATCH(req: NextRequest) {
  if (!isAuthorized(req)) {
    return errorResponse("Unauthorized. Administrative privileges required.", 401);
  }

  try {
    const body = await req.json().catch(() => null);
    if (!body || !body.id) {
      return errorResponse("Enquiry ID is required.", 400);
    }

    const parseResult = adminUpdateEnquirySchema.safeParse(body);
    if (!parseResult.success) {
      return errorResponse(parseResult.error.issues[0]?.message || "Invalid update data", 400);
    }

    const updated = await db.enquiry.update({
      where: { id: body.id },
      data: {
        status: parseResult.data.status,
        adminNotes: parseResult.data.adminNotes,
      },
    });

    return jsonResponse({
      success: true,
      enquiry: updated,
      message: `Enquiry status updated to ${updated.status}`,
    });
  } catch (err: unknown) {
    console.error("Admin enquiries PATCH error:", err);
    return errorResponse("Failed to update enquiry.", 500);
  }
}
