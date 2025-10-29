'use client'
import { useViewerToken } from '@/hooks/use_viewer_token';
import { Stream, User } from '@prisma/client'
import React from 'react'
import style from './stream.module.css'

import {LiveKitRoom} from '@livekit/components-react' 
import { cn } from '@/lib/utils';
import { Video } from './video';

const NEXT_PUBLIC_LIVEKIT_WS_URL  = process.env.NEXT_PUBLIC_LIVEKIT_WS_URL!

console.log(NEXT_PUBLIC_LIVEKIT_WS_URL);


interface StreamPlayerProps{
  user:User & {stream:Stream |null };
  stream:Stream,
  isFollowing:boolean
}

export const StreamPlayer = ({
  user,
  stream,
  isFollowing
}:StreamPlayerProps) => {

  const {token,name,identity} = useViewerToken(user.id)

  if (!token || !name || !identity) {
    return (
      <div>
        Cannot watch the stream
      </div>
    )
  }

  return (
    <>
      <LiveKitRoom
       token={token}
       serverUrl={NEXT_PUBLIC_LIVEKIT_WS_URL}
       className=' grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full'
      >
        <div className={cn(`space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10`,style)}>
          <Video
           hostname={user.username}
           hostIdentity={user.id}
          ></Video>
        </div>
      </LiveKitRoom>
    </>
  )
}
