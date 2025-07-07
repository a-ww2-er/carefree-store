"use server"

import bcrypt from "bcryptjs"
import clientPromise from "@/lib/db"

export async function registerUser({ firstName, lastName, email, password }: {
  firstName: string
  lastName: string
  email: string
  password: string
}) {
  if (!firstName || !lastName || !email || !password) {
    return { error: "All fields are required." }
  }

  const client = await clientPromise
  const db = client.db()
  const users = db.collection("users")

  const existing = await users.findOne({ email })
  if (existing) {
    return { error: "User already exists." }
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const user = {
    name: `${firstName} ${lastName}`,
    email,
    password: hashedPassword,
    emailVerified: null,
    image: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  await users.insertOne(user)
  return { success: true }
} 