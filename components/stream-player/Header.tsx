import React from 'react'
import { UserAvatar, UserAvatarSkeleton } from '../UserAvatar';
import { VerifiedMark } from '../verified-mark';
import { useParticipants, useRemoteParticipant } from '@livekit/components-react';
import { UserIcon } from 'lucide-react';
import { Action, ActionsSkeleton } from './Action';
import { Skeleton } from '../ui/skeleton';

interface HeaderProps{
  imageUrl:string;
  hostName:string;
  hostIdentity:string;
  viewerIdentity:string;
  isFollowing:boolean;
  name:string
}

export const Header = ({imageUrl,hostName,hostIdentity,viewerIdentity,isFollowing,name}:HeaderProps) => {
  const participants = useParticipants()
  const participant = useRemoteParticipant(hostIdentity)

  const isLive = !!participant
  const participantCount = participants.length-1

  const hostAsViewer = `host-${hostIdentity}`
  const isHost = viewerIdentity === hostAsViewer
  return (
    <div className=' flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4'>
      <div className=' flex items-center gap-x-3'>
        <UserAvatar
         imageUrl={imageUrl}
         username={hostName}
         size={'lg'}
         isLive={isLive}
         showBadge
        ></UserAvatar>
        <div className=' space-y-1'>
          <div className=' flex items-center gap-x-2'>
            <h2 className=' text-lg font-semibold'>
              {hostName}
            </h2>
            <VerifiedMark></VerifiedMark>
          </div>
          <p>
            {name}
          </p>
          {
            isLive ? (
              <div className=' font-semibold flex gap-x-1 items-center text-xs text-rose-500'>
                <UserIcon className=' h-4 w-4'></UserIcon>
                <p>
                  {participantCount} {participantCount === 1 ? "viewer" : "viewers"}
                </p>
              </div>
            ):(
              <div className=' font-semibold text-xs text-muted-foreground'>Offline</div>
            )
          }
        </div>
      </div>
      <Action
       isFollowing={isFollowing}
       hostIdentity={hostIdentity}
       isHost={isHost}
      ></Action>
    </div>
  )
}


export const HeaderSkeleton = ()=>{
  return <div className=' flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4'>
    <div className=' flex items-center gap-x-2'>
      <UserAvatarSkeleton></UserAvatarSkeleton>
      <div className=' space-y-2'>
        <Skeleton className=' h-6 w-32'></Skeleton>
        <Skeleton className=' h-4 w-24'></Skeleton>
      </div>
    </div>
    <ActionsSkeleton></ActionsSkeleton>
  </div>
}