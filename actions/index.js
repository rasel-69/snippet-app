"use server"

import prisma from '@/lib/db'
import { redirect } from 'next/navigation';

export const saveSnippet = async(id, code)=>{

    await prisma.snippet.update({
        where:{
            id
        },
        data:{
            code
        }
    });


    redirect(`/snippet/${snippet.id}`);

}








