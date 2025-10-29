'use client'

import { ConnectionState,Track } from "livekit-client"
import { useConnectionState,useRemoteParticipant,useTracks } from "@livekit/components-react"

interface VideoProps{
  hostname:string,
  hostIdentity:string
}

export const Video = ({
  hostname,
  hostIdentity
}:VideoProps) => {
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity)
  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone
  ]).filter((track)=>track.participant.identity === hostIdentity)

  let content;

  if (!participant && connectionState === ConnectionState.Connected) {
    content = <p>Host is Offline</p>
  }else if(!participant || tracks.length ===0){
    content = <p>Loading...</p>
  }else{
    content = <p>Live Video</p>
  }

  return (
    <div className=" aspect-video border-b group relative">
      {content}
    </div>
  )
}
