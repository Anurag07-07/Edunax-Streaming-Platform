"use client"

import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";
import { useChat, useConnectionState, useRemoteParticipant } from "@livekit/components-react";
import { ConnectionState } from "livekit-client";
import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { ChatHeader } from "./chat-header";
import { ChatForm } from "./ChatForm";
import { ChatList } from "./ChatList";
// import { ChatHeader } from "./chat-header";

interface ChatProps{
    hostName:string;
    hostIdentity:string;
    viewerName:string;
    isFollowing:boolean;
    isChatEnabled:boolean;
    isChatDelayed:boolean;
    isChatFollowersOnly:boolean;
}

export const Chat=({
    hostName,
    hostIdentity,
    viewerName,
    isFollowing,
    isChatEnabled,
    isChatDelayed,
    isChatFollowersOnly
}:ChatProps)=>{
    const matches=useMediaQuery('(max-width:1024px)')
    const {variant,onExpand}=useChatSidebar((state)=>state);
    const connectionState=useConnectionState();
    const participant=useRemoteParticipant(hostIdentity);
    const isOnline=participant && connectionState===ConnectionState.Connected

    const isHidden=!isChatEnabled || !isOnline;

    const [value,setvalue]=useState("");
    const {chatMessages:messages,send}=useChat();

    useEffect(()=>{
        if(matches){
            onExpand();
        }
    },[matches,onExpand])

    const reversedMessages=useMemo(()=>{
        return messages.sort((a,b)=>b.timestamp-a.timestamp);
    },[messages])

    const onSubmit=()=>{
        if(!send) return;

        send(value);
        setvalue("");
    };

    const onChange=(value:string)=>{
        setvalue(value)
    }

    return (
        <div className=" flex flex-col bg-gray-250 border-l border-b pt-0 h-[calc(100vh-80px)]">
            <ChatHeader />
            {variant === ChatVariant.CHAT && (
              <>
              <ChatList
               messages={reversedMessages}
               isHidden={isHidden}
              ></ChatList>
              <ChatForm
              onSubmit={onSubmit}
              value={value}
              onChange={onChange}
              isHidden={isHidden}
              isFollowersOnly={isChatFollowersOnly}
              isDelayed={isChatDelayed}
              isFollowing={isFollowing}
              >

              </ChatForm>
              </>
            )}
            {variant === ChatVariant.COMMUNITY && (
              <>
                <p>Community</p>
              </>
            )}
        </div>
    )
}