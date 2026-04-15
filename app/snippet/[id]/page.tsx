
import { Button } from '@/components/ui/button'
import prisma from '@/lib/db'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const SnippetDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {

  const id = parseInt((await params).id);

  const snippet = await prisma.snippet.findUnique({
    where: {
      id,
    }
  })

  if (!snippet) {
    return <h1 className='text-red-500'>Snippet Not found</h1>
  }


  return (
    <div className='container mx-auto'>

      <Button variant="ghost" asChild className="mb-8 text-orange-500">
        <Link href="/">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Snippets
        </Link>
      </Button>

      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-semibold'>{snippet.title}</h1>
        <div className='flex flex-row gap-4'>
          <Button> Edit</Button>
          <Button className='bg-red-400'>Delete</Button>
        </div>
      </div>

    </div>
  )
}

export default SnippetDetailPage
