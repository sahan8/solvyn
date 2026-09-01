export const CART_STORAGE_KEY = "solvyn-cart-v1";
export const CART_STORAGE_VERSION = 1;
export const MAX_CART_QUANTITY = 10;
export const FREE_STANDARD_THRESHOLD_CENTS = 20000;
export const ESTIMATED_TAX_RATE = 0;
export const SUPPORTED_COUNTRIES = [{ code: "US", name: "United States" }, { code: "CA", name: "Canada" }, { code: "GB", name: "United Kingdom" }, { code: "AU", name: "Australia" }, { code: "LK", name: "Sri Lanka" }];
export const SHIPPING_METHODS = [
  { id: "standard", name: "Standard", estimate: "3–5 business days (estimate)", priceCents: 800, freeAboveCents: FREE_STANDARD_THRESHOLD_CENTS },
  { id: "express", name: "Express", estimate: "1–2 business days (estimate)", priceCents: 1500 }
];
export const PROMO_CODES = [
  { code: "MOVE10", type: "percent", value: 10, minimumSubtotalCents: 10000, active: true, expiresAt: "2027-12-31T23:59:59Z", eligibleCollections: [], maximumDiscountCents: 5000 },
  { code: "RUN20", type: "percent", value: 20, minimumSubtotalCents: 15000, active: true, expiresAt: "2027-12-31T23:59:59Z", eligibleCollections: ["velocity"], maximumDiscountCents: 6000 }
];