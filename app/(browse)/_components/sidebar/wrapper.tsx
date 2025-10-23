'use client'
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { ReactNode} from "react";
import { ToogleSkeleton } from "./toggle";
import { RecommandedSkeleton } from "./Recommended";
import { useIsClient } from "usehooks-ts";
import { FollowingSkeleton } from "./following";

interface WrapperProps{
  children:ReactNode
}
const Wrapper = ({children}:WrapperProps) => {
  const isClient = useIsClient()
  const {collapsed} = useSidebar()


  if (!isClient) {
    return (
      <aside className="fixed left-0 flex flex-col w-60 h-full bg-gray-600 border-r border-[#2D2E35] z-50">
        <ToogleSkeleton></ToogleSkeleton>
        <FollowingSkeleton></FollowingSkeleton>
        <RecommandedSkeleton></RecommandedSkeleton>
      </aside>
    )
  }
  return (
    <aside
     className={cn(" fixed left-0 flex flex-col w-60 h-full bg-gray-600 border-r border-[#2D2E35] z-50", collapsed &&  "w-[75px]")}
    >
      {children}
    </aside>
  )
}

export default Wrapper