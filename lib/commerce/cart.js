import { ESTIMATED_TAX_RATE, MAX_CART_QUANTITY, SHIPPING_METHODS } from "@/config/commerce";
import { mockProducts } from "@/data/mock-products";
import { toCents } from "./money";
import { validatePromo } from "./promo";
export function cartLineKey(item) { return `${item.productId}:${item.variantId}:${item.size}`; }
export function resolveCartItems(items) {
  const lines = [], errors = [];
  for (const item of items || []) {
    const product = mockProducts.find((entry) => entry.id === item.productId);
    if (!product) { errors.push({ code: "CART_CHANGED", item, message: "A product in your bag is no longer available." }); continue; }
    const variant = product.variants.find((entry) => entry.id === item.variantId);
    if (!variant) { errors.push({ code: "CART_CHANGED", item, message: `${product.name} color is no longer available.` }); continue; }
    const size = variant.sizes.find((entry) => entry.value === item.size);
    if (!size) { errors.push({ code: "CART_CHANGED", item, message: `${product.name} in US ${item.size} is no longer offered.` }); continue; }
    if (!size.inStock) errors.push({ code: "ITEM_OUT_OF_STOCK", item, message: `${product.name} / ${variant.color.name} / US ${item.size} is no longer available.` });
    const quantity = Math.max(1, Math.min(MAX_CART_QUANTITY, Number.isInteger(item.quantity) ? item.quantity : 1));
    lines.push({ ...item, quantity, product, variant, sizeInfo: size, unitPriceCents: toCents(product.price), key: cartLineKey(item) });
  }
  return { lines, errors };
}
export function calculateSubtotal(lines) { return lines.reduce((sum, line) => sum + line.unitPriceCents * line.quantity, 0); }
export function calculateShipping(subtotalCents, methodId) { const method = SHIPPING_METHODS.find((item) => item.id === methodId); if (!method) return null; return method.freeAboveCents && subtotalCents >= method.freeAboveCents ? 0 : method.priceCents; }
export function calculateEstimatedTax(taxableCents) { return Math.round(taxableCents * ESTIMATED_TAX_RATE); }
export function calculateCartTotals(lines, promoCode = "", shippingMethod = "standard") { const subtotalCents = calculateSubtotal(lines); const promo = promoCode ? validatePromo(promoCode, lines, subtotalCents) : null; const discountCents = promo?.valid ? promo.discountCents : 0; const shippingCents = calculateShipping(subtotalCents - discountCents, shippingMethod) ?? 0; const estimatedTaxCents = calculateEstimatedTax(subtotalCents - discountCents + shippingCents); return { subtotalCents, discountCents, shippingCents, estimatedTaxCents, totalCents: subtotalCents - discountCents + shippingCents + estimatedTaxCents, promo }; }