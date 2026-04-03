import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith("/admin")) return NextResponse.next();
  if (pathname === "/admin/signin" || pathname === "/admin/signup") return NextResponse.next();

  const token = req.cookies.get("admin_session")?.value;
  if (!token) return NextResponse.redirect(new URL("/admin/signin", req.url));

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/admin/signin", req.url));
  }
}

export const config = { matcher: ["/admin/:path*"] };
