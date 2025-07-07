"use server"

import clientPromise from "@/lib/db"
import { auth } from "@/auth"

export async function saveForLater(asin: string) {
  const session = await auth()
  if (!session?.user?.email) {
    return { error: "Not authenticated" }
  }
  const client = await clientPromise
  const db = client.db()
  const users = db.collection("users")
  await users.updateOne(
    { email: session.user.email },
    { $addToSet: { savedForLater: asin } }
  )
  return { success: true }
} 