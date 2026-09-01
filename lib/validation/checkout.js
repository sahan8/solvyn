import { z } from "zod";
import { MAX_CART_QUANTITY, SHIPPING_METHODS, SUPPORTED_COUNTRIES } from "@/config/commerce";
const clean = (max) => z.string().trim().min(1).max(max);
export const cartItemSchema = z.object({ productId: z.string().min(1).max(40), variantId: z.string().min(1).max(80), size: z.number().min(3).max(20), quantity: z.number().int().min(1).max(MAX_CART_QUANTITY) }).strict();
export const cartSchema = z.array(cartItemSchema).min(1).max(50);
export const contactSchema = z.object({ email: z.string().trim().email().max(254), phone: z.string().trim().max(30).optional().or(z.literal("")) }).strict();
export const addressSchema = z.object({ firstName: clean(80), lastName: clean(80), address1: clean(160), address2: z.string().trim().max(160).optional().or(z.literal("")), city: clean(100), region: clean(100), postalCode: clean(24), country: z.enum(SUPPORTED_COUNTRIES.map((item) => item.code)) }).strict();
export const checkoutRequestSchema = z.object({ items: cartSchema, promoCode: z.string().trim().max(32).optional().or(z.literal("")), shippingMethod: z.enum(SHIPPING_METHODS.map((item) => item.id)), contact: contactSchema.optional(), address: addressSchema.optional() }).strict();