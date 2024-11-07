import NextAuth from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import client from "./lib/db"

const adminEmails = ['salinas.umeres.da@gmail.com']
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(client),
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET
    }), 
    Google({
    clientId: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET
  })],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (user.email && !adminEmails.includes(user.email)) {
        return '/'; // Redirige al home si el email no está en adminEmails
      }
      return true; // Permite la autenticación si el email es válido
    },
  },
})