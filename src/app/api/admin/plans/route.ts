// /api/admin/plans - Manage SSFN Plans & Pricing Strategy
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
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
    const plans = await db.ssfnPlan.findMany({
      orderBy: { displayOrder: "asc" },
    });
    return jsonResponse({ success: true, plans });
  } catch (err: unknown) {
    console.error("Admin plans GET error:", err);
    return errorResponse("Failed to fetch plans.", 500);
  }
}

export async function PATCH(req: NextRequest) {
  if (!isAuthorized(req)) {
    return errorResponse("Unauthorized. Administrative privileges required.", 401);
  }

  try {
    const body = await req.json().catch(() => null);
    if (!body || !body.id) {
      return errorResponse("Plan ID is required.", 400);
    }

    const { id, monthlyPrice, effectivePrice, discountPercent, isActive, recommended } = body;

    const updated = await db.ssfnPlan.update({
      where: { id },
      data: {
        ...(typeof monthlyPrice === "number" && { monthlyPrice }),
        ...(typeof effectivePrice === "number" && { effectivePrice }),
        ...(typeof discountPercent === "number" && { discountPercent }),
        ...(typeof isActive === "boolean" && { isActive }),
        ...(typeof recommended === "boolean" && { recommended }),
      },
    });

    return jsonResponse({
      success: true,
      plan: updated,
      message: `Plan "${updated.name}" updated successfully.`,
    });
  } catch (err: unknown) {
    console.error("Admin plans PATCH error:", err);
    return errorResponse("Failed to update plan.", 500);
  }
}
