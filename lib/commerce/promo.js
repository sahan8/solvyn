import { PROMO_CODES } from "@/config/commerce";
export function normalizePromoCode(value) { return String(value || "").trim().toUpperCase().slice(0, 32); }
export function validatePromo(code, lines, subtotalCents, now = new Date()) {
  const normalized = normalizePromoCode(code);
  if (!normalized) return { valid: false, code: "EMPTY_PROMO", message: "Enter a promo code." };
  const promo = PROMO_CODES.find((item) => item.code === normalized);
  if (!promo || !promo.active) return { valid: false, code: "INVALID_PROMO", message: "This promo code is not available." };
  if (Date.parse(promo.expiresAt) <= now.getTime()) return { valid: false, code: "EXPIRED_PROMO", message: "This promo code has expired." };
  if (subtotalCents < promo.minimumSubtotalCents) return { valid: false, code: "PROMO_MINIMUM", message: "Your bag does not meet this code’s minimum subtotal." };
  const eligible = promo.eligibleCollections.length ? lines.filter((line) => promo.eligibleCollections.includes(line.product.collection)) : lines;
  if (!eligible.length) return { valid: false, code: "PROMO_INELIGIBLE", message: "This code does not apply to your bag." };
  const eligibleCents = eligible.reduce((sum, line) => sum + line.unitPriceCents * line.quantity, 0);
  const raw = promo.type === "percent" ? Math.floor(eligibleCents * promo.value / 100) : promo.value;
  return { valid: true, promo, code: normalized, discountCents: Math.min(raw, promo.maximumDiscountCents), message: "Code applied." };
}