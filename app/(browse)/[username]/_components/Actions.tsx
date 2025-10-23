'use client'
import { onFollow, onUnfollow } from '@/actions/follow'
import { Button } from '@/components/ui/button'
import React, { useTransition } from 'react'
import { toast } from 'sonner'

interface ActionProps{
  isFollowing:boolean
  userId:string
}

export const Actions = ({isFollowing,userId}:ActionProps) => {

  const [isPending,startTransition] = useTransition()

  const handleFollow = ()=>{
    startTransition(()=>{
      onFollow(userId)
      .then((data)=>toast.success(`You are now following ${data.following.username}`))
      .catch(()=>toast.error("Something went Wrong"))
    })
  }

  const handleUnfollow = ()=>{
    startTransition(()=>{
      onUnfollow(userId)
      .then((data)=>toast.success(`You are unfollow ${data.following.username}`))
      .catch(()=>toast.error("Something went Wrong"))
    })
  }

  const onClick = ()=>{
    if (isFollowing) {
      handleUnfollow()
    }else{
      handleFollow()
    }
  }

  return (
    <Button disabled={isPending} variant='primary' onClick={onClick}>
      {
        isFollowing ? "Unfollow" : "Follow"
      }
    </Button>
  )
}

