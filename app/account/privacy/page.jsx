import { requireUser } from "@/lib/auth/session";
import { PageFrame } from "@/components/account/page-frame";import { PrivacyPanel } from "@/components/account/privacy-panel";
export const metadata={title:"Privacy"};export default async function Page(){await requireUser('/account/privacy');return <PageFrame eyebrow="Privacy" title="YOUR DATA. YOUR CONTROL." intro="Clear controls and honest boundaries for the personal information associated with SOLVYN."><PrivacyPanel/></PageFrame>}
