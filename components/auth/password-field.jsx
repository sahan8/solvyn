"use client";
import { useState } from "react";
export function PasswordField({ id, label = "Password", autoComplete = "current-password", describedBy, required = true }) {
  const [shown, setShown] = useState(false);
  return <label className="block text-sm font-medium" htmlFor={id}>{label}<span className="relative mt-2 block"><input id={id} name={id} type={shown ? "text" : "password"} autoComplete={autoComplete} aria-describedby={describedBy} required={required} className="min-h-14 w-full border border-black/25 bg-white px-4 pr-20"/><button type="button" onClick={() => setShown((v) => !v)} aria-label={`${shown ? "Hide" : "Show"} ${label.toLowerCase()}`} className="absolute inset-y-0 right-0 px-4 text-xs font-semibold underline">{shown ? "HIDE" : "SHOW"}</button></span></label>;
}
