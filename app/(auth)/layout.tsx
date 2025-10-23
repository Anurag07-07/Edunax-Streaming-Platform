import React, { ReactNode } from 'react'
import { Logo } from './_components/logo'

const Auth = ({children}:{
  children:ReactNode
}) => {
  return (
    <div className=' h-full flex items-center justify-center flex-col w-full'>
      <Logo></Logo>
        {children}
    </div>
  )
}

export default Auth