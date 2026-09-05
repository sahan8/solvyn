import { AuthForm } from "@/components/auth/auth-form";
import { AuthPage } from "@/components/auth/auth-page";
export const metadata = { title: "Sign in", robots: { index: false, follow: false } };
export default async function SignInPage({ searchParams }) { await searchParams; return <AuthPage eyebrow="Welcome back" title="SIGN IN."><AuthForm mode="sign-in"/></AuthPage>; }
