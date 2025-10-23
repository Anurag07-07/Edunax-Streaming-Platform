import React, { ReactNode, Suspense } from 'react'
import Navbar from './_components/navbar'
import {Sidebar, SidebarSkeleton} from './_components/sidebar'
import Container from './_components/container'

const BrowseLayout = ({children}:{
  children:ReactNode
}) => {
  return (
    <>
      <Navbar></Navbar>
      <div className=' pt-5  flex h-full'>
        <Suspense fallback={<SidebarSkeleton></SidebarSkeleton>}>
          <Sidebar></Sidebar>
        </Suspense>
        <Container> 
          {children}
        </Container>
      </div>
    </>
  )
}

export default BrowseLayout