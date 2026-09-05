import "server-only";
export async function getAccountSummary(user) { return { user, addressCount: 0, orderCount: 0 }; }
