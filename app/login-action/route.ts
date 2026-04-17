import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import { success } from "better-auth";
import { error } from "console";
import { NextResponse } from "next/server";




export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        // checking user exist or not in ur Database 
        const user = await prisma.user.findUnique({
            where: { email }   // because email was unique
        })

        if (!user) {
            return NextResponse.json(
                { error: "User Not Found" },
                { status: 400 }
            );
        }

        // if found user then we will match password
        const isMatch = await bcrypt.compare(password, user.password!);

        if (!isMatch) {
            return NextResponse.json(
                { error: "Invalid Password" },
                { status: 400 }
            );
        }

        // But if everything ok send using cokies for navbar button change 
        const response = NextResponse.json({ success: true });
        response.cookies.set("user", JSON.stringify({
            id: user.id,
            email: user.email,
            name: user.name,
        }));

        return response;


    } catch (error) {
        return NextResponse.json(
            { error: "Login failed" },
            { status: 500 }
        );
    }

}
