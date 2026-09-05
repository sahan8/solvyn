import { AuthForm } from "@/components/auth/auth-form";
import { AuthPage } from "@/components/auth/auth-page";
export const metadata = { title: "Create account", robots: { index: false, follow: false } };
export default function SignUpPage() { return <AuthPage eyebrow="Join SOLVYN" title="CREATE ACCOUNT."><AuthForm mode="sign-up"/></AuthPage>; }
