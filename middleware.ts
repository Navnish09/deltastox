import { NextRequest, NextResponse } from "next/server";

const ADMIN_LIST = ["/admin", "/manage-users"];

const AUTH_WHITE_LIST = ["/login", "/signup", "/forgot-password", ...ADMIN_LIST];

export default function (req: NextRequest) {
  const token = req.cookies.get("token");

  const { pathname, origin } = req.nextUrl;
  if (AUTH_WHITE_LIST.includes(pathname)) {
    // if user is logged in, redirect to home page
    if (token) {
      if (ADMIN_LIST.includes(pathname)) {
        return NextResponse.next();
      }

      return NextResponse.redirect(origin);
    } else {
      return NextResponse.next();
    }
  } else {
    if (token || pathname.includes(".")) return;
    return NextResponse.redirect(origin + "/login");
  }
}
