import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    // awaitin and receving data 
    const formData = await req.formData();
    console.log("from Data", formData);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // validation
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // sending user details to the Database 
    await prisma.user.create({
      data: {
        name,
        email,
        password:hashedPassword,
      },
    });

    
    
    return NextResponse.json({ success: true });

  } catch (error: any) {

    // ✅ Prisma duplicate error
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    console.log("Signup error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}