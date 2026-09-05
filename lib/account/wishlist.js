import "server-only";
export async function listWishlistProductIdsForUser() { return []; }
export function mergeWishlistIds(localIds, accountIds) { return [...new Set([...localIds, ...accountIds])].filter((id) => typeof id === "string").slice(0, 100); }
