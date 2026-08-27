import { z } from "zod";
export const searchSchema = z.object({ query: z.string().trim().min(1).max(100) });
export const fitCheckPreviewSchema = z.object({ usualSize: z.coerce.number().min(3).max(18), footLengthMm: z.coerce.number().min(180).max(360), fit: z.enum(["snug", "regular", "relaxed"]) });
