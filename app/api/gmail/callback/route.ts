import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  if (!code) return NextResponse.json({ error: "No code" }, { status: 400 });

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.GMAIL_CLIENT_ID!,
      client_secret: process.env.GMAIL_CLIENT_SECRET!,
      redirect_uri: process.env.GMAIL_REDIRECT_URI!,
      grant_type: "authorization_code",
    }),
  });

  const data = await res.json();

  if (!data.refresh_token) {
    return new NextResponse(
      `<pre style="font-family:monospace;padding:2rem">Error: ${JSON.stringify(data, null, 2)}</pre>`,
      { headers: { "Content-Type": "text/html" } }
    );
  }

  return new NextResponse(
    `<html><body style="font-family:monospace;padding:2rem;background:#0f172a;color:#f8fafc">
      <h2 style="color:#2563eb">✓ Gmail connected!</h2>
      <p>Copy this refresh token into your <code>.env.local</code>:</p>
      <pre style="background:#1e293b;padding:1rem;border-radius:8px;word-break:break-all">GMAIL_REFRESH_TOKEN=${data.refresh_token}</pre>
      <p style="color:#94a3b8">Also set:</p>
      <pre style="background:#1e293b;padding:1rem;border-radius:8px">GMAIL_FROM=your_gmail_address@gmail.com</pre>
      <p style="color:#94a3b8;font-size:0.875rem">After adding to .env.local, restart the dev server. You can delete the /api/gmail/auth and /api/gmail/callback routes.</p>
    </body></html>`,
    { headers: { "Content-Type": "text/html" } }
  );
}
