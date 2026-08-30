"use client";

import { useSyncExternalStore } from "react";

const KEY = "solvyn:bag";
let items = [];
let loaded = false;
const listeners = new Set();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const value = JSON.parse(localStorage.getItem(KEY) || "[]");
    if (Array.isArray(value)) items = value.filter(isValidItem).slice(0, 50);
  } catch { items = []; }
}
function isValidItem(item) {
  return item && typeof item.productId === "string" && typeof item.slug === "string" && typeof item.variantId === "string" && typeof item.size === "number" && Number.isInteger(item.quantity) && item.quantity > 0;
}
function emit() { listeners.forEach((listener) => listener()); }
function persist() { try { localStorage.setItem(KEY, JSON.stringify(items)); } catch { return false; } return true; }
function subscribe(listener) { load(); listeners.add(listener); return () => listeners.delete(listener); }
function snapshot() { load(); return JSON.stringify(items); }

export function useBag() {
  const value = useSyncExternalStore(subscribe, snapshot, () => "[]");
  const bagItems = JSON.parse(value);
  return {
    items: bagItems,
    count: bagItems.reduce((total, item) => total + item.quantity, 0),
    add(item) {
      load();
      const index = items.findIndex((entry) => entry.productId === item.productId && entry.variantId === item.variantId && entry.size === item.size);
      if (index >= 0) items = items.map((entry, i) => i === index ? { ...entry, quantity: Math.min(entry.quantity + 1, 10) } : entry);
      else items = [...items, { ...item, quantity: 1 }];
      const saved = persist(); emit(); return saved;
    },
    remove(key) { load(); items = items.filter((item) => `${item.productId}:${item.variantId}:${item.size}` !== key); persist(); emit(); }
  };
}