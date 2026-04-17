


// aita banaisi cookies ar jonno ai gula sign up then login in tar por ai navbar ar state change ar jonno  

import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true });

  res.cookies.set("user", "", { maxAge: 0 });

  return res;
}




