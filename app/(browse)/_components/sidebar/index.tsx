import React from 'react'
import Wrapper from './wrapper'
import {Toogle, ToogleSkeleton} from './toggle'
import {RecommandedSkeleton, Recommended} from './Recommended'
import { getRecommended } from '@/lib/recommended-service'
import { getFollowedUsers } from '@/lib/follow-service'
import { Following } from './following'

export const Sidebar = async() => {
  const recommended = await getRecommended()
  const following =  await getFollowedUsers()
  return (
    <Wrapper>
      <Toogle></Toogle>
      <div className=' space-y-4 pt-4 lg:pt-0'>
        <Recommended data={recommended}></Recommended>
        <Following data={following}></Following>
      </div>
    </Wrapper>
  )
}


export const SidebarSkeleton = ()=>{
  return (
    <aside className=' fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50 '>
     <ToogleSkeleton></ToogleSkeleton>
      <RecommandedSkeleton></RecommandedSkeleton>
    </aside>
  )
}