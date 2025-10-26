'use client'

import { Button } from "@/components/ui/button"
import { CheckCheck, Copy } from "lucide-react"
import { useState } from "react"

interface CopyButtonProps{
  value?:string
}

export const CopyButton = ({value}:CopyButtonProps) => {
  
  const [isCopied,setIsCopied] = useState<boolean>(false)

  const onCopy = ()=>{
    if (!value) {
      return
    }

    setIsCopied(true)

    setTimeout(()=>{
      setIsCopied(false)
    },1000)
  }

  const Icon = isCopied ? CheckCheck : Copy 
  
  return (
    <Button 
    onClick={onCopy}
    variant={'ghost'}
    size={'sm'}
    disabled={!value || isCopied}
    >
      <Icon className=" h-4 w-4"></Icon>
    </Button>
  )
}
