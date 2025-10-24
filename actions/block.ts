'use server'

import { BlockUser, unBlockUser } from "@/lib/block-service"
import { revalidatePath } from "next/cache"

/**
 * 🚫 Handles blocking a user.
 * 
 * 1. Calls the BlockUser service to create a block record.
 * 2. Revalidates relevant pages to reflect the change.
 * 3. Gracefully handles all possible errors.
 *
 * @param id - The ID of the user to block
 */
export const onBlock = async (id: string) => {
  try {
    if (!id) throw new Error("Invalid user ID")

    // Call service to create the block relationship
    const blockedUser = await BlockUser(id)
    if (!blockedUser) throw new Error("Failed to block user")

    // 🔄 Revalidate key pages for both current user and blocked user's profile
    revalidatePath("/")
    revalidatePath(`/${blockedUser.blocked.username}`)

    return blockedUser
  } catch (error) {
    console.error("❌ onBlock error:", error)
    throw new Error(
      error instanceof Error ? error.message : "Something went wrong while blocking the user"
    )
  }
}

/**
 * ✅ Handles unblocking a user.
 *
 * 1. Calls the unBlockUser service to remove a block record.
 * 2. Revalidates affected pages to refresh the state.
 * 3. Includes robust error handling for reliability.
 *
 * @param id - The ID of the user to unblock
 */
export const onUnBlock = async (id: string) => {
  try {
    if (!id) throw new Error("Invalid user ID")

    // Call service to remove the block record
    const unblockedUser = await unBlockUser(id)
    if (!unblockedUser) throw new Error("Failed to unblock user")

    // 🔄 Revalidate both the homepage and the unblocked user’s profile
    revalidatePath("/")
    revalidatePath(`/${unblockedUser.blocked.username}`)

    return unblockedUser
  } catch (error) {
    console.error("❌ onUnBlock error:", error)
    throw new Error(
      error instanceof Error ? error.message : "Something went wrong while unblocking the user"
    )
  }
}
