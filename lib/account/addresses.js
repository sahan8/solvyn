import "server-only";
import { addressSchema } from "@/lib/validation/checkout";
export async function listAddressesForUser() { return []; }
export async function saveAddressForUser(_user, input) { return { ok: false, reason: "persistence-unavailable", validation: addressSchema.safeParse(input) }; }
export async function deleteAddressForUser() { return { ok: false, reason: "persistence-unavailable" }; }
