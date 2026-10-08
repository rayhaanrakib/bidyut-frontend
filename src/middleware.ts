import { jwtVerify } from "jose";
import { NextResponse, type NextRequest } from "next/server";

const SECRET = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET ?? "dev-secret");

const STAFF_ONLY = ["/dashboard/users", "/dashboard/analytics", "/dashboard/outages", "/dashboard/schedules", "/dashboard/activity-logs", "/dashboard/applications"];

export const middleware = async (req: NextRequest) => {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("accessToken")?.value;

  let role: string | null = null;
  if (token) {
    try {
      const { payload } = await jwtVerify(token, SECRET);
      role = (payload.role as string) ?? null;
    } catch {
      role = null;
    }
  }

  // logged-in users skip the auth pages
  if (role && ["/login", "/register"].includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // dashboard family needs any logged-in role
  if (pathname.startsWith("/dashboard")) {
    if (!role) {
      const url = new URL("/login", req.url);
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
    if (STAFF_ONLY.some((p) => pathname.startsWith(p)) && role === "CUSTOMER") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};