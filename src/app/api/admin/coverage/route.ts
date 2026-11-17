// /api/admin/coverage - Manage Coverage Areas in Jamshedpur
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
    const areas = await db.coverageArea.findMany({
      orderBy: { displayOrder: "asc" },
    });
    return jsonResponse({ success: true, areas });
  } catch (err: unknown) {
    console.error("Admin coverage GET error:", err);
    return errorResponse("Failed to fetch coverage areas.", 500);
  }
}

export async function PATCH(req: NextRequest) {
  if (!isAuthorized(req)) {
    return errorResponse("Unauthorized. Administrative privileges required.", 401);
  }

  try {
    const body = await req.json().catch(() => null);
    if (!body || !body.id) {
      return errorResponse("Area ID is required.", 400);
    }

    const { id, status, landmark } = body;

    const updated = await db.coverageArea.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(landmark !== undefined && { landmark }),
      },
    });

    return jsonResponse({
      success: true,
      area: updated,
      message: `Coverage for ${updated.localityName} updated to ${updated.status}.`,
    });
  } catch (err: unknown) {
    console.error("Admin coverage PATCH error:", err);
    return errorResponse("Failed to update coverage area.", 500);
  }
}
