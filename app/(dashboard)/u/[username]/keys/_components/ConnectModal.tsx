'use client'
import React from 'react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger 
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'
import { Select, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SelectContent } from '@radix-ui/react-select'

export const ConnectModal = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={'primary'}>
          Generate Connection
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Generate Connection
          </DialogTitle>
        </DialogHeader>
        <Select>
          <SelectTrigger className=' w-full'>
            <SelectValue placeholder={'Ingress Type'}></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='RTMP'>RTMP</SelectItem>
            <SelectItem value='WHIP'>WHIP</SelectItem>
          </SelectContent>
        </Select>
        <Alert>
          <AlertTriangle className=' h-4 w-4'></AlertTriangle>
          <AlertTitle>Warning !!</AlertTitle>
          <AlertDescription>
            This action will reset all active streams using the current connection
          </AlertDescription>
        </Alert>
        <div className=' flex justify-between'>
          <DialogClose>
            <Button variant={'ghost'} >
              Cancel
            </Button>
          </DialogClose>
          <Button
          onClick={()=>{}}
          variant={'primary'}
          >
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
