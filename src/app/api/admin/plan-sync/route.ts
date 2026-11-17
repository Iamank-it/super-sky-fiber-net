// /api/admin/plan-sync - BSNL Synchronization Admin API
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { BsnlSyncEngine } from "@/lib/bsnl/bsnl-sync";
import { jsonResponse, errorResponse } from "@/lib/constants";

function isAuthorized(req: NextRequest): boolean {
  const authHeader = req.headers.get("authorization") || req.headers.get("x-admin-key");
  const expectedKey = process.env.ADMIN_SECRET_KEY || "ssfn-jamshedpur-admin-2026";
  if (authHeader) {
    const token = authHeader.replace(/^Bearer\s+/i, "");
    if (token === expectedKey) return true;
  }
  // Allow local development cookies
  const cookie = req.cookies.get("ssfn_admin_session");
  if (cookie?.value === expectedKey) return true;
  return false;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return errorResponse("Unauthorized. Administrative privileges required.", 401);
  }

  try {
    const logs = await db.bsnlSyncLog.findMany({
      orderBy: { startedAt: "desc" },
      take: 20,
    });

    const activePlans = await db.bsnlPlan.findMany({
      orderBy: { speedMbps: "asc" },
    });

    const history = await db.bsnlPlanHistory.findMany({
      orderBy: { changedAt: "desc" },
      take: 20,
    });

    return jsonResponse({
      success: true,
      logs,
      activePlans,
      historyCount: history.length,
      history,
    });
  } catch (err: unknown) {
    console.error("Admin sync GET error:", err);
    return errorResponse("Failed to fetch synchronization data.", 500);
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return errorResponse("Unauthorized. Administrative privileges required.", 401);
  }

  try {
    const result = await BsnlSyncEngine.runSync();
    return jsonResponse({
      success: result.status !== "FAILED",
      summary: result,
      message:
        result.status === "SUCCESS"
          ? `Successfully synchronized ${result.plansFound} BSNL Jharkhand benchmark plans!`
          : result.status === "PARTIAL"
          ? `Synchronized with warnings: ${result.errorMessage || "Some items flagged"}`
          : `Synchronization failed: ${result.errorMessage}. Preserved previous verified snapshot.`,
    });
  } catch (err: unknown) {
    console.error("Admin sync POST error:", err);
    return errorResponse("Failed to trigger synchronization.", 500);
  }
}
