export async function getAccessToken(): Promise<string> {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GMAIL_CLIENT_ID!,
      client_secret: process.env.GMAIL_CLIENT_SECRET!,
      refresh_token: process.env.GMAIL_REFRESH_TOKEN!,
      grant_type: "refresh_token",
    }),
  });
  const data = await res.json();
  return data.access_token;
}

export async function sendEmail({
  to, subject, html,
}: { to: string; subject: string; html: string }) {
  const accessToken = await getAccessToken();
  const from = process.env.GMAIL_FROM!;

  const message = [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    "Content-Type: text/html; charset=utf-8",
    "",
    html,
  ].join("\r\n");

  const encoded = Buffer.from(message).toString("base64url");

  const res = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ raw: encoded }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gmail API error: ${res.status} - ${errText}`);
  }
  return res.json();
}

export async function listMessages(labelIds: string[] = ["INBOX"], maxResults = 20) {
  const accessToken = await getAccessToken();
  const params = new URLSearchParams({ maxResults: String(maxResults), format: "metadata" });
  labelIds.forEach(l => params.append("labelIds", l));

  // Use messages.list then fetch all with metadata in one batch-style Promise.all
  const listRes = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages?${params}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const listData = await listRes.json();
  const ids: { id: string }[] = listData.messages ?? [];

  // Fetch metadata for all messages in parallel
  const messages = await Promise.all(
    ids.map(({ id }) =>
      fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}?format=metadata&metadataHeaders=From&metadataHeaders=To&metadataHeaders=Subject&metadataHeaders=Date`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      ).then(r => r.json())
    )
  );
  return messages;
}

export async function getMessage(id: string) {
  const accessToken = await getAccessToken();
  const res = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}?format=full`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.json();
}

function decodeBase64(str: string) {
  return Buffer.from(str.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf-8");
}

export function extractBody(payload: any): string {
  if (payload.body?.data) return decodeBase64(payload.body.data);
  if (payload.parts) {
    for (const part of payload.parts) {
      if (part.mimeType === "text/html" && part.body?.data) return decodeBase64(part.body.data);
    }
    for (const part of payload.parts) {
      if (part.mimeType === "text/plain" && part.body?.data) return decodeBase64(part.body.data);
    }
  }
  return "";
}

export function getHeader(headers: { name: string; value: string }[], name: string) {
  return headers.find(h => h.name.toLowerCase() === name.toLowerCase())?.value ?? "";
}
