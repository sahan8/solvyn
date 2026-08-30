export const SIZE_SYSTEMS = ["US", "UK", "EU"];
export const GENDERS = ["men", "women", "unisex"];
export const WIDTHS = ["narrow", "regular", "wide", "extra-wide"];
export const FIT_PREFERENCES = ["snug", "balanced", "roomy"];
export const USES = ["running", "walking", "gym", "everyday", "travel", "lifestyle"];
export const SHOE_FITS = ["too-tight", "just-right", "too-loose"];
export const BRANDS = ["Nike", "Adidas", "New Balance", "ASICS", "Puma", "Converse", "Other"];
export const US_SIZES = Array.from({ length: 15 }, (_, index) => 6 + index * 0.5);

const menCm = [23.8,24.2,24.6,25,25.5,25.9,26.3,26.7,27.1,27.6,28,28.4,28.8,29.3,29.7];
const womenCm = menCm.map((value) => Number((value - 1.3).toFixed(1)));

export const SOLVYN_SIZE_CHART = US_SIZES.map((us, index) => ({
  us,
  uk: us - 1,
  eu: 39 + index * 0.5,
  menCm: menCm[index],
  womenCm: womenCm[index]
}));

export function displaySize(usSize, system) {
  const row = nearestRow(usSize);
  if (system === "UK") return row.uk;
  if (system === "EU") return row.eu;
  return row.us;
}

export function toUsSize(size, system) {
  const numeric = Number(size);
  if (system === "UK") return nearestHalf(numeric + 1);
  if (system === "EU") return nearestRowBy("eu", numeric).us;
  return nearestHalf(numeric);
}

export function sizeFromLength(lengthCm, gender = "unisex") {
  const key = gender === "women" ? "womenCm" : "menCm";
  return nearestRowBy(key, lengthCm).us;
}

export function cmForSize(usSize, gender = "unisex") {
  const row = nearestRow(usSize);
  return gender === "women" ? row.womenCm : row.menCm;
}

export function nearestHalf(value) { return Math.round(Number(value) * 2) / 2; }
export function clampUsSize(value) { return Math.min(US_SIZES.at(-1), Math.max(US_SIZES[0], nearestHalf(value))); }
function nearestRow(size) { return nearestRowBy("us", size); }
function nearestRowBy(key, value) { return SOLVYN_SIZE_CHART.reduce((best, row) => Math.abs(row[key] - value) < Math.abs(best[key] - value) ? row : best, SOLVYN_SIZE_CHART[0]); }