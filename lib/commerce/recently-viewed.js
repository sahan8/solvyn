"use client";

import { useEffect, useState } from "react";
const KEY = "solvyn:recent";

export function useRecentlyViewed(currentId) {
  const [ids, setIds] = useState([]);
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(KEY) || "[]");
      const safe = Array.isArray(stored) ? stored.filter((id) => typeof id === "string") : [];
      const next = [currentId, ...safe.filter((id) => id !== currentId)].slice(0, 6);
      localStorage.setItem(KEY, JSON.stringify(next));
      queueMicrotask(() => setIds(next.filter((id) => id !== currentId)));
    } catch { queueMicrotask(() => setIds([])); }
  }, [currentId]);
  return ids;
}