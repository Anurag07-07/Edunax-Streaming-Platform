'use client'
import React, { useTransition } from 'react'
import { Button } from '../ui/button';
import { useAuth } from '@clerk/nextjs';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { onFollow, onUnfollow } from '@/actions/follow';
import { toast } from 'sonner';
import { Skeleton } from '../ui/skeleton';

interface ActionsProps{
  hostIdentity:string;
  isFollowing:boolean;
  isHost:boolean
}

export const Action = ({hostIdentity,isFollowing,isHost}:ActionsProps) => {
  const [isPending,startTransition] = useTransition()
  const router = useRouter()
  const {userId} = useAuth()

  const handleFollow = ()=>{
    startTransition(()=>{
      onFollow(hostIdentity)
      .then((data)=>toast.success(`You are now Following ${data.following.username}`))
      .catch(()=>toast.error(`Something went Wrong`))
    })
  }

  const handleUnFollow = ()=>{
    startTransition(()=>{
      onUnfollow(hostIdentity)
      .then((data)=>toast.success(`You have unfollowed ${data.following.username}`))
      .catch(()=>toast.error(`Something went Wrong`))
    })
  }

  const toggleFlow = ()=>{
    if (!userId) {
      router.push("/sign-in")
    }

    if (isHost) {
      return 
    }

    if (isFollowing) {
      //Unfollow
      handleUnFollow()

    }else{
      //Follow
      handleFollow()
    }
  }

  return (
    <Button
    disabled={isPending || isHost}
     onClick={toggleFlow}
     variant={'primary'}
     size={'sm'}
     className=' w-full lg:w-auto'
     >
      <Heart className={
        cn('h-4 w-4 mr-2',isFollowing ? "fill-white":"fill-none")
      }></Heart>
      {
        isFollowing ? "Unfollow" : "Follow"
      }
     </Button>
  )
}


export const ActionsSkeleton = ()=>{
  return <Skeleton className=' h-10 w-full lg:w-24'></Skeleton>
}