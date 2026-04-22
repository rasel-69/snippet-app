'use client'

import { Button } from './ui/button'
import { deleteSnippet } from '@/actions'
import { useState } from 'react'
import { toast } from 'sonner' // Or your preferred toast library like react-hot-toast

export default function DeleteSnippetButton({ id }: { id: number }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        const confirmDelete = confirm("Are you sure you want to delete this snippet?");
        
        if (confirmDelete) {
            setIsDeleting(true);
            try {
                await deleteSnippet(id);
                toast.success("Snippet successfully deleted");
            } catch (error) {
                toast.error("Failed to delete snippet");
                setIsDeleting(false);
            }
        }
    }

    return (
        <Button 
            onClick={handleDelete}
            disabled={isDeleting}
            className='bg-red-500 hover:bg-gray-700 transition-colors duration-200'
        >
            {isDeleting ? "Deleting..." : "Delete"}
        </Button>
    )
}