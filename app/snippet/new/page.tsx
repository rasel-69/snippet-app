import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

const CreateSnippetPage = () => {
    return (
        <form className='flex flex-col gap-4'>
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
    )
}

export default CreateSnippetPage
