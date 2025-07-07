import NextAuth from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "./lib/db"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { AdapterUser } from "next-auth/adapters"
import { JWT } from "next-auth/jwt"
import { Session, User } from "next-auth"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = await clientPromise
        const db = client.db()
        const users = db.collection("users")
        const user = await users.findOne({ email: credentials?.email })
        
        if (!user || typeof user.password !== "string") return null
        if (!credentials?.password || typeof credentials.password !== "string") return null
        
        const isValid = await bcrypt.compare(credentials.password, user.password)
        if (!isValid) return null
        
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image || null,
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // This callback is called after successful sign in
      // You can add additional logic here if needed
      return true
    },
    async session({ session, token, user }: { session: Session; token?: JWT; user?: AdapterUser | User }) {
      // Send properties to the client, like an access_token from a provider
      if (token) {
        session.user.id = token.sub || token.id
        // Add any other user properties you want to include in the session
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }
      return session
    },
    async jwt({ token, user, account, profile }) {
      // Persist user data to the token right after sign in
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
        token.picture = user.image
      }
      return token
    }
  },
  session: {
    strategy: "jwt", // Use JWT strategy for session management
  },
  pages: {
    signIn: '/auth/login', // Custom sign-in page
  },
})