'use client'
import { useViewerToken } from '@/hooks/use_viewer_token';
import { Stream, User } from '@prisma/client'
import { log } from 'node:console';
import React from 'react'

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
    <div>
      Allowed to watch the stream
    </div>
  )
}
