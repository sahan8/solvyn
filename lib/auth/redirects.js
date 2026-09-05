const SAFE_PATH = /^\/(?!\/)[A-Za-z0-9/_?=&.%+-]*$/;

export function safeCallbackUrl(value, fallback = "/account") {
  return typeof value === "string" && SAFE_PATH.test(value) ? value : fallback;
}
