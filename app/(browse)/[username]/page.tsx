import { isFollowing } from "@/lib/follow-service"
import { getUserByUsername } from "@/lib/user-service"
import { notFound } from "next/navigation"
import { Actions } from "./_components/Actions"

interface UserPageProps{
  params:{
    username:string
  }
}

const UserPage = async({params}:UserPageProps) => {
  const user = await getUserByUsername(params.username)

  if (!user) {
    notFound()
  }

  const isFollow = await isFollowing(user.id)

  return (
    <div>
      <h1>The Username is {user.username}</h1>
      <h1>The UserId is {user.id}</h1>
      <h1>The Following is {`${isFollow}`}</h1>
      <Actions userId={user.id} isFollowing={isFollow}></Actions>
    </div>
  )
}

export default UserPage