
'use server'

import prisma from "@/lib/db";
import { error } from "console";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createSnippetAction(formData: FormData) {
    const title = formData.get("title") as string;
    const code = formData.get("code") as string;

    //get user from cookies
    const cookieStore = await cookies();
    const userCookie = cookieStore.get("user");
    if (!userCookie) return { error: "You must be looged in" };

    //so now user 
    const user = JSON.parse(userCookie.value);
    console.log("user from snippet-action", user)


    try {
        await prisma.snippet.create({
            data: {
                title,
                code,
                userId: user.id
            }
        });
    } catch (e) {
        return { error: "Database error. Please try again." };
    }

    redirect("/");
}