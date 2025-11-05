'use client'
import React, { ChangeEvent, FormEvent, startTransition, useState, useTransition } from 'react'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { updateStream } from '@/actions/stream'
import { toast } from 'sonner'
import { Label } from '../ui/label'

interface InfoModalProps{
  initialName:string
  intialThumbnailUrl:string | null
}

export const InfoModal = ({initialName,intialThumbnailUrl}:InfoModalProps) => {
  const [name,setName] = useState(initialName)
  const [isPending,setTransition] = useTransition()

  const onChange = (e:ChangeEvent<HTMLInputElement>)=>{
    setName(e.target.value)
  }

  const onSubmit = (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()

    startTransition(()=>{
      updateStream({name:name})
      .then(()=>toast.success("Stream updated"))
      .catch(()=>toast.error("Something Went Wrong"))
    })
  }
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'link'} size={'sm'} className=' ml-auto'>
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Edit stream info
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className=' space-y-14'>
          <div className=' space-y-2'>
            <Label>
              Name
            </Label>
            <Input
            placeholder="Stream name"
            onChange={onChange}
            value={name}
            disabled={isPending}
            ></Input>
          </div>
          <div className=' flex justify-between'>
            <DialogClose asChild>
              <Button type='button' variant={'ghost'}>
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={isPending} variant={'primary'} type='submit'>Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
