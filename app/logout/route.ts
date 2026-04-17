import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // redirecting to the home again
  const res = NextResponse.redirect(new URL("/", req.url), { status: 303 });

  // clearing the user cookie
  res.cookies.set("user", "", { maxAge: 0 });

  return res;
}