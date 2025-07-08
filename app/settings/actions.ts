"use server"

import clientPromise from "@/lib/db"
import bcrypt from "bcryptjs"
import { auth } from "@/auth"

export async function updateUserSettings({ name, email, password }: { name?: string; email?: string; password?: string }) {
  const session = await auth()
  if (!session?.user?.email) {
    return { error: "Not authenticated." }
  }

  const client = await clientPromise
  const db = client.db()
  const users = db.collection("users")

  const update: any = { updatedAt: new Date() }
  if (name) update.name = name
  if (email) update.email = email
  if (password) update.password = await bcrypt.hash(password, 10)

  try {
    await users.updateOne(
      { email: session.user.email },
      { $set: update }
    )
    return { success: true }
  } catch (error) {
    return { error: "Failed to update settings." }
  }
} 