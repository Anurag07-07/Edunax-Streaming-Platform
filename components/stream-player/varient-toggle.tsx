import { ChatVariant, useChatSidebar } from '@/store/use-chat-sidebar'
import { ArrowLeftFromLine, ArrowRightFromLine, MessageSquare, Users } from 'lucide-react'
import React from 'react'
import { Hint } from '../hint'
import { Button } from '../ui/button'

export const VarientToggle = () => {
  const {variant,onChangeVariant} = useChatSidebar()

  const isChat = variant === ChatVariant.CHAT

  const Icon = variant === ChatVariant.CHAT ? Users :MessageSquare

  const onToggle = ()=>{
    const newVarient = isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT
    onChangeVariant(newVarient)
  }

  const label = isChat ? "Community " : "Go back to chat"

  return (
    <Hint label={label} side='left' asChild>
      <Button onClick={onToggle} 
       variant={'ghost'}
       className=' h-auto p-2 hover:bg-white/10 hover:text-primary'
      >
        <Icon className=' h-4 w-4'></Icon>
      </Button>
    </Hint>
  )
}
