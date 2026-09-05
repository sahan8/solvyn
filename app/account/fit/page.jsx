import { requireUser } from "@/lib/auth/session";
import { PageFrame } from "@/components/account/page-frame";import { FitProfilePanel } from "@/components/account/fit-profile-panel";
export const metadata={title:"My Fit"};export default async function Page(){await requireUser('/account/fit');return <PageFrame eyebrow="My Fit" title="YOUR FIT PROFILE." intro="You control whether sizing preferences and optional measurements are stored, edited or deleted."><FitProfilePanel/></PageFrame>}
