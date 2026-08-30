import { clampUsSize, sizeFromLength, toUsSize, US_SIZES } from "./size-conversion.js";

export function getFitRecommendation(product, profile) {
  const fit = product?.fitProfile;
  const usualUs = toUsSize(profile.usualSize, profile.sizeSystem);
  const measuredUs = profile.measurements?.footLengthCm ? sizeFromLength(profile.measurements.footLengthCm, profile.gender) : null;
  const reasons = [];
  const warnings = [];
  let base = measuredUs ?? usualUs;
  reasons.push(measuredUs ? { code: "measurement", value: profile.measurements.footLengthCm } : { code: "usual-size", value: profile.usualSize, system: profile.sizeSystem });
  let subjective = 0;
  if (fit?.length === "runs-small") { subjective += 0.5; reasons.push({ code: "product-small" }); }
  if (fit?.length === "runs-large") { subjective -= 0.5; reasons.push({ code: "product-large" }); }
  if ((profile.width === "wide" || profile.width === "extra-wide") && fit?.width === "narrow") { subjective += 0.5; reasons.push({ code: "width-conflict" }); }
  if (profile.fitPreference === "roomy") { subjective += 0.25; reasons.push({ code: "roomy" }); }
  if (profile.fitPreference === "snug" && !measuredUs) { subjective -= 0.25; reasons.push({ code: "snug" }); }
  if (profile.primaryUse === "running") { subjective += 0.25; reasons.push({ code: "running" }); }
  if (profile.comparison?.fit === "too-tight") { subjective += 0.25; reasons.push({ code: "current-tight" }); }
  if (profile.comparison?.fit === "too-loose") { subjective -= 0.25; reasons.push({ code: "current-loose" }); }
  subjective = Math.max(-0.5, Math.min(0.5, subjective));
  const recommendedSize = clampUsSize(base + subjective);
  if (measuredUs && Math.abs(measuredUs - usualUs) >= 1.5) warnings.push({ code: "measurement-conflict", usualUs, measuredUs });
  if (!fit) warnings.push({ code: "limited-product-data" });
  if (!profile.measurements?.footWidthCm) warnings.push({ code: "width-unmeasured" });
  const variants = product?.variants || [];
  const sizes = variants.flatMap((variant) => variant.sizes || []);
  const primary = sizes.find((size) => size.value === recommendedSize);
  const available = primary ? sizes.some((size) => size.value === recommendedSize && size.inStock) : !product;
  const validSizes = product ? [...new Set(sizes.filter((size) => size.inStock).map((size) => size.value))] : US_SIZES;
  const nearby = validSizes.filter((size) => size !== recommendedSize).sort((a, b) => Math.abs(a - recommendedSize) - Math.abs(b - recommendedSize));
  const alternativeSize = nearby.find((size) => Math.abs(size - recommendedSize) <= 1) ?? null;
  const conflict = warnings.some((warning) => warning.code === "measurement-conflict");
  const confidence = profile.measurements?.footLengthCm && fit && !conflict ? "HIGH" : fit && !conflict ? "MEDIUM" : "LOW";
  return { recommendedSize, alternativeSize, confidence, reasons, warnings, available, productAware: Boolean(product) };
}