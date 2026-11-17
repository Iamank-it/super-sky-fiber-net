// BSNL Plan Validator
import { z } from "zod";
import { ParsedBsnlPlan } from "./bsnl-parser";

export const bsnlPlanSchema = z.object({
  externalPlanId: z.string().min(3).max(64),
  name: z.string().min(2).max(128),
  monthlyPrice: z.number().positive().min(100).max(50000),
  speed: z.string().min(2),
  speedMbps: z.number().int().positive().min(10),
  dataAllowance: z.string().min(2),
  fupSpeed: z.string().min(1),
  validity: z.string().min(1),
  installationCharges: z.number().nonnegative(),
  additionalBenefits: z.array(z.string()),
  circle: z.string().min(2),
  sourceUrl: z.string().url(),
  sourceLastVerifiedAt: z.date(),
});

export interface ValidationResult {
  valid: boolean;
  validPlans: ParsedBsnlPlan[];
  invalidPlans: { plan: unknown; errors: string[] }[];
}

export class BsnlValidator {
  /**
   * Validates a batch of parsed plans against the strict schema.
   * Only 100% valid plans are returned for database publishing.
   */
  static validateBatch(plans: ParsedBsnlPlan[]): ValidationResult {
    const validPlans: ParsedBsnlPlan[] = [];
    const invalidPlans: { plan: unknown; errors: string[] }[] = [];

    for (const plan of plans) {
      const result = bsnlPlanSchema.safeParse(plan);
      if (result.success) {
        validPlans.push(result.data as ParsedBsnlPlan);
      } else {
        invalidPlans.push({
          plan,
          errors: result.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`),
        });
      }
    }

    return {
      valid: invalidPlans.length === 0,
      validPlans,
      invalidPlans,
    };
  }
}
