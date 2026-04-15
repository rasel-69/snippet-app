import EditSnippetForm from '@/components/EditSnippetForm'
import prisma from '@/lib/db'
import React from 'react'

const EditPageSnippet = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {

  // Fetching id then Fetching The snippet from Database using prisma
  const id= parseInt((await params).id)
  const snippet= await prisma.snippet.findUnique({
    where:{
      id,
    }
  })

if(!snippet) return <h1>Snippet Not found</h1>


  return (

      <EditSnippetForm snippet={snippet}/>

  )
}

export default EditPageSnippet
