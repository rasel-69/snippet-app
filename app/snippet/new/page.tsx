import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import prisma from '@/lib/db'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const CreateSnippetPage = () => {

    async function createSnippet(formData: FormData) {
        "use server"  //server action
        const title = formData.get("title") as string;
        const code = formData.get("code") as string;

        const snippet = await prisma.snippet.create({
            data: {
                title,
                code
            }
        })

        console.log("Snippet created:", snippet);
        redirect("/");

    }



    return (
        <div>
            <Button variant="ghost" asChild className="mb-8 text-orange-500">
                <Link href="/">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                </Link>
            </Button>

            <form action={createSnippet} className='flex flex-col gap-4'>
                <div>
                    <Label className='mb-2 text-xl'>Title</Label>
                    <Input type="text" id="title" name="title" />
                </div>

                <div>
                    <Label className='mb-2 text-xl'>Code</Label>
                    <Textarea id="code" name="code" />
                </div>

                <Button type="submit" className='bg-green-400 text-xl font-semibold h-14 text-black'>
                    Add Your Snippet
                </Button>

            </form>

        </div>
    )
}

export default CreateSnippetPage
