import { StreamPlayer } from "@/components/stream-player"
import { isBlockedByUser, isBlockingUser } from "@/lib/block-service"
import { isFollowing } from "@/lib/follow-service"
import { getUserByUsername } from "@/lib/user-service"
import { notFound } from "next/navigation"

interface UserPageProps{
  params:{username:string}
}

const UserPage = async({params}:UserPageProps) => {
  const {username} = params
  const user = await getUserByUsername(username)

  if (!user || !user.stream) {
    notFound()
  }

  
  const isFollow = await isFollowing(user.id)
  const isBlocked = await isBlockedByUser(user.id)

  // ➡️ Check if the VIEWER has blocked the profile owner (UI State)
    const isBlocking = await isBlockingUser(user.id)

  if (isBlocked) {
    notFound()
  }

  return (
    <StreamPlayer user={user} stream={user.stream} isFollowing={isFollow}></StreamPlayer>
  )
}

export default UserPage