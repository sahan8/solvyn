import { AuthPage } from "@/components/auth/auth-page";
import { EmailRequestForm } from "@/components/auth/email-request-form";
export const metadata={title:"Forgot password",robots:{index:false,follow:false}};
export default function Page(){return <AuthPage eyebrow="Account recovery" title="RESET PASSWORD."><p className="mt-6 text-muted-foreground">Enter your email. The response is the same whether or not an account exists.</p><EmailRequestForm/></AuthPage>}
