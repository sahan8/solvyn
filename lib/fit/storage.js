const KEY = "solvyn:fit-profile";
export function saveFitProfile(profile) { try { const value = { version: 1, updatedAt: new Date().toISOString(), ...profile }; localStorage.setItem(KEY, JSON.stringify(value)); return true; } catch { return false; } }
export function loadFitProfile() { try { const value = JSON.parse(localStorage.getItem(KEY) || "null"); return value?.version === 1 ? value : null; } catch { return null; } }
export function deleteFitProfile() { try { localStorage.removeItem(KEY); return true; } catch { return false; } }