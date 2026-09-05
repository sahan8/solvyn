import { NextResponse } from "next/server";
export async function POST(){return NextResponse.json({error:"Authentication provider is not configured."},{status:503,headers:{"Cache-Control":"no-store"}})}
