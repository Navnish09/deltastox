import { NextRequest, NextResponse } from "next/server";

const AUTH_WHITE_LIST = ["/login", "/signup"];

export default function (req: NextRequest) {
  const token = req.cookies.get("token");

  const { pathname, origin } = req.nextUrl;
  if (AUTH_WHITE_LIST.includes(pathname)) {
    // if user is logged in, redirect to home page
    if (token) {
      return NextResponse.redirect(origin);
    } else {
      return NextResponse.next();
    }
  } else {
    if (token || pathname.includes(".")) return;
    return NextResponse.redirect(origin + "/login");
  }
}
