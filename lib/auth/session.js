import "server-only";
import { redirect } from "next/navigation";
import { safeCallbackUrl } from "./redirects";

// Provider boundary. Day 6 intentionally ships without a fabricated identity:
// connect Auth.js (or another audited provider) here once persistence is available.
export async function getCurrentUser() {
  return null;
}

export async function requireUser(callbackUrl = "/account") {
  const user = await getCurrentUser();
  if (!user) redirect(`/sign-in?callbackUrl=${encodeURIComponent(safeCallbackUrl(callbackUrl))}`);
  return user;
}
