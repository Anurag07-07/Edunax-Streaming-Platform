'use client'
import React from 'react'
import { VerifiedMark } from '../verified-mark'
import { BioModel } from './bio-model'

interface AboutCardProps{
  hostName:string,
  hostIdentity:string,
  viewerIdentity:string,
  bio:string | null
  followedByCount:number
}

export const AboutCard = ({hostIdentity,hostName,viewerIdentity,bio,followedByCount}:AboutCardProps) => {
  const hostAsViewer = `host-${hostIdentity}`
  const isHost = viewerIdentity === hostAsViewer

  const followedByLabel = followedByCount === 1 ? "follower" : "followers"
  return (
    <div className=' px-4'>
      <div className=' group rounded-xl bg-background p-6 lg:p-10 flex flex-col gap-y-3'>
        <div className=' flex items-center justify-between'>
          <div>
            About {hostName}
            <VerifiedMark></VerifiedMark>
          </div>
          {isHost && (<BioModel intialValue={bio}></BioModel>)}
        </div>
        <div className=' text-sm text-muted-foreground'>
          <span className=' font-semibold text-primary'>{followedByCount}</span>{followedByLabel}
        </div>
        <p className=' text-sm'>
          {bio || 'This user prefers to keep an air of mystery about them.'}
        </p>
      </div>
    </div>
  )
}
