import { NextResponse } from "next/server";

export async function GET() {
  const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  url.searchParams.set("client_id", process.env.GMAIL_CLIENT_ID!);
  url.searchParams.set("redirect_uri", process.env.GMAIL_REDIRECT_URI!);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "https://www.googleapis.com/auth/gmail.modify");
  url.searchParams.set("access_type", "offline");
  url.searchParams.set("prompt", "consent");
  return NextResponse.redirect(url.toString());
}
