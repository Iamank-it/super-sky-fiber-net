// Common Constants and Helpers
export const ENQUIRY_TYPES = {
  NEW_CONNECTION: "NEW_CONNECTION",
  AVAILABILITY_CHECK: "AVAILABILITY_CHECK",
  CONTACT_MESSAGE: "CONTACT_MESSAGE",
  PLAN_INQUIRY: "PLAN_INQUIRY",
} as const;

export const ENQUIRY_STATUSES = {
  NEW: "NEW",
  CONTACTED: "CONTACTED",
  IN_PROGRESS: "IN_PROGRESS",
  RESOLVED: "RESOLVED",
  CLOSED: "CLOSED",
} as const;

export const STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  NEW: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  CONTACTED: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  IN_PROGRESS: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
  RESOLVED: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  CLOSED: { bg: "bg-slate-50", text: "text-slate-600", border: "border-slate-200" },
};

export function jsonResponse<T>(data: T, status = 200, headers: HeadersInit = {}) {
  return Response.json(data, {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store, max-age=0",
      ...headers,
    },
  });
}

export function errorResponse(message: string, status = 400, details?: unknown) {
  return Response.json(
    {
      success: false,
      error: message,
      details: process.env.NODE_ENV === "development" ? details : undefined,
    },
    {
      status,
      headers: { "Content-Type": "application/json" },
    }
  );
}
