
'use client'

import { Snippet } from '@/lib/generated/prisma/client'
import { Editor } from '@monaco-editor/react'
import React, { useState } from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const EditSnippetForm = ({ snippet }: { snippet: Snippet }) => {

    const [code, setCode] = useState(snippet.code)

    return (
        <div>

            <Button variant="ghost" asChild className="mb-8 text-orange-500">
                <Link href={`/snippet/${snippet.id}`}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Snippets
                </Link>
            </Button>

            <div className='flex flex-col gap-4'>
                <Editor
                    height="60vh"
                    theme="vs-dark"
                    defaultLanguage="javascript"
                    defaultValue={code}

                />

                <Button className='bg-green-400 text-black font-bold text-2xl h-14'>Save </Button>
            </div>
        </div>
    )
}

export default EditSnippetForm
