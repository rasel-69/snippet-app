"use server"

import prisma from '@/lib/db'
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export const saveSnippet = async (id, code) => {
    //. Updating  the database
    await prisma.snippet.update({
        where: {
            id: parseInt(id) // convertin id interger 
        },
        data: {
            code
        }
    });

    //  Clear the cache so the user sees the fresh data
    revalidatePath(`/snippet/${id}`);
    revalidatePath('/');

    //  Use the 'id' variable directly
    redirect(`/snippet/${id}`);
}



// making it for snippet deleting 
export const deleteSnippet = async (id) => {
    //getting looged in user 
    const cookieStore = await cookies();
    const userCookie = cookieStore.get("user");
    // jodi user cookie na thake ta hole unauthoriezed dibe

    if (!userCookie) throw new Error("Unauthorized");
    //jodi thake ta hole 
    const loggedInuser = userCookie ? JSON.parse(userCookie.value) : null

    //checking ownership of snippet 
    const snippet = await prisma.snippet.findUnique({
        where: { id }
    })

    if (!snippet && snippet.userId !== user.id) {
        throw new Error("You don't have permission to delete it");
    }

    // 4. Update Cache and Redirect
    revalidatePath('/');
    redirect('/');

}










