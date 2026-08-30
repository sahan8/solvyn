import { z } from "zod";
import { BRANDS, FIT_PREFERENCES, GENDERS, SHOE_FITS, SIZE_SYSTEMS, USES, WIDTHS } from "./size-conversion.js";

const commaNumber = z.preprocess((value) => typeof value === "string" ? value.trim().replace(",", ".") : value, z.coerce.number().finite());
export const measurementSchema = z.object({
  unit: z.enum(["CM", "MM"]),
  footLength: commaNumber,
  footWidth: z.union([z.literal(""), commaNumber]).optional()
}).superRefine((values, context) => {
  const lengthValid = values.unit === "CM" ? values.footLength >= 18 && values.footLength <= 36 : values.footLength >= 180 && values.footLength <= 360;
  if (!lengthValid) context.addIssue({ code: "custom", path: ["footLength"], message: values.unit === "CM" ? "Enter a foot length between 18 and 36 cm." : "Enter a foot length between 180 and 360 mm." });
  if (values.footWidth !== "" && values.footWidth != null) {
    const widthValid = values.unit === "CM" ? values.footWidth >= 6 && values.footWidth <= 16 : values.footWidth >= 60 && values.footWidth <= 160;
    if (!widthValid) context.addIssue({ code: "custom", path: ["footWidth"], message: values.unit === "CM" ? "Enter a foot width between 6 and 16 cm." : "Enter a foot width between 60 and 160 mm." });
  }
});
export const fitProfileSchema = z.object({
  gender: z.enum(GENDERS), sizeSystem: z.enum(SIZE_SYSTEMS), usualSize: z.number().min(3).max(50),
  comparison: z.object({ brand: z.enum(BRANDS).optional(), model: z.string().trim().max(60).optional(), size: z.number().min(3).max(50).optional(), fit: z.enum(SHOE_FITS).optional() }).optional(),
  width: z.enum(WIDTHS), fitPreference: z.enum(FIT_PREFERENCES), primaryUse: z.enum(USES),
  measurements: z.object({ footLengthCm: z.number().min(18).max(36), footWidthCm: z.number().min(6).max(16).optional() }).optional()
});
export function normalizeMeasurements(values) {
  const parsed = measurementSchema.safeParse(values);
  if (!parsed.success) return parsed;
  const { unit, footLength, footWidth } = parsed.data;
  return { success: true, data: { footLengthCm: unit === "MM" ? footLength / 10 : footLength, ...(footWidth !== "" && footWidth != null ? { footWidthCm: unit === "MM" ? footWidth / 10 : footWidth } : {}) } };
}