import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    const action = searchParams.get("action"); // "confirm" | "reject"

    if (!token || !action) {
      return NextResponse.json(
        { error: "Token and action are required" },
        { status: 400 }
      );
    }

    const pendingUser = await prisma.pendingUser.findUnique({
      where: { token },
    });

    if (!pendingUser) {
      return NextResponse.json(
        { error: "Invalid token or already processed" },
        { status: 404 }
      );
    }

    // expiry check
    if (pendingUser.expiresAt < new Date()) {
      await prisma.pendingUser.delete({ where: { id: pendingUser.id } });
      return NextResponse.json(
        { error: "Token expired. Please signup again." },
        { status: 410 }
      );
    }

    if (action === "reject") {
      await prisma.pendingUser.delete({ where: { id: pendingUser.id } });
      return NextResponse.json({ message: "Signup rejected. User removed." });
    }

    if (action !== "confirm") {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    // confirm: move to User table in a transaction
    await prisma.$transaction(async (tx) => {
      // if user already exists, just delete pending (safety)
      const existingUser = await tx.user.findUnique({
        where: { email: pendingUser.email },
      });

      if (!existingUser) {
        await tx.user.create({
          data: {
            name: pendingUser.name,
            email: pendingUser.email,
            password: pendingUser.password,
            emailVerified: new Date(),
          },
        });
      }

      await tx.pendingUser.delete({ where: { id: pendingUser.id } });
    });

    return NextResponse.json({ message: "Email verified. Account created." });
  } catch (error) {
    console.log("Verify error:", error);
    return NextResponse.json(
      { error: "Verification failed" },
      { status: 500 }
    );
  }
}