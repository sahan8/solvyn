"use client";
import Link from "next/link";
import { useState } from "react";
import { PasswordField } from "./password-field";

export function AuthForm({ mode }) {
  const [message, setMessage] = useState("");
  const signup = mode === "sign-up";
  function submit(event) { event.preventDefault(); setMessage(signup ? "Account creation is not available until secure account storage is connected." : "We couldn't sign you in with those details."); }
  return <form onSubmit={submit} className="mt-8 space-y-5" noValidate>
    {signup && <div className="grid gap-5 sm:grid-cols-2"><Field id="firstName" label="First name" autoComplete="given-name"/><Field id="lastName" label="Last name" autoComplete="family-name"/></div>}
    <Field id="email" label="Email" type="email" autoComplete="email"/>
    <PasswordField id="password" autoComplete={signup ? "new-password" : "current-password"} describedBy={signup ? "password-help" : undefined}/>
    {signup && <><p id="password-help" className="text-xs text-muted-foreground">Use at least 12 characters. Spaces and password managers are welcome.</p><PasswordField id="confirmPassword" label="Confirm password" autoComplete="new-password"/></>}
    <p role="status" aria-live="polite" className="min-h-6 text-sm text-[#8b1e16]">{message}</p>
    <button className="min-h-14 w-full bg-black px-6 font-semibold text-white">{signup ? "CREATE ACCOUNT" : "SIGN IN"}</button>
    {!signup && <Link className="block text-center text-sm font-semibold underline" href="/forgot-password">FORGOT PASSWORD?</Link>}
    <p className="text-center text-sm">{signup ? "Already have an account?" : "New to SOLVYN?"} <Link className="font-semibold underline" href={signup ? "/sign-in" : "/sign-up"}>{signup ? "SIGN IN" : "CREATE ACCOUNT"}</Link></p>
  </form>;
}
function Field({ id, label, type = "text", autoComplete }) { return <label className="block text-sm font-medium" htmlFor={id}>{label}<input id={id} name={id} type={type} autoComplete={autoComplete} required className="mt-2 min-h-14 w-full border border-black/25 bg-white px-4"/></label>; }
