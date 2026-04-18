import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = (formData.get("name") as string) || "";
    const email = ((formData.get("email") as string) || "").toLowerCase().trim();
    const password = (formData.get("password") as string) || "";

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    // check if already a real user
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists. Please login." },
        { status: 409 }
      );
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create token
    const token = crypto.randomBytes(32).toString("hex");

    // token expiry (example: 1 hour)
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60);

    // if a pending user exists for same email, replace it
    await prisma.pendingUser.upsert({
      where: { email },
      update: {
        name,
        password: hashedPassword,
        token,
        expiresAt,
      },
      create: {
        name,
        email,
        password: hashedPassword,
        token,
        expiresAt,
      },
    });

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL; // e.g. http://localhost:3000
    if (!baseUrl) {
      return NextResponse.json(
        { error: "NEXT_PUBLIC_APP_URL is missing" },
        { status: 500 }
      );
    }

    const confirmLink = `${baseUrl}/api/verify?token=${token}&action=confirm`;
    const rejectLink = `${baseUrl}/api/verify?token=${token}&action=reject`;

    // send email (Confirm + Reject)
    const result = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Confirm your account",
      html: `
        <h2>Hello ${name || "User"}</h2>
        <p>Please confirm or reject your signup request:</p>
        <p><a href="${confirmLink}">Confirm Account</a></p>
        <p><a href="${rejectLink}">Reject</a></p>
      `,
    });

    if (result.error) {
      console.log("Resend error:", result.error);

      // IMPORTANT: remove pending user if email couldn't be sent
      await prisma.pendingUser.delete({ where: { email } });

      return NextResponse.json(
        { error: result.error.message || "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("Signup error:", error);
    return NextResponse.json({ error: "Signup failed" }, { status: 500 });
  }
}