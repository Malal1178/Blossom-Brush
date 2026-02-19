import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import type { User } from "next-auth"

const users = [
    { id: "1", name: "Admin", email: "admin@example.com", password: "admin123", role: "admin" },
    { id: "2", name: "User", email: "user@example.com", password: "user123", role: "user" },
]

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google,
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                if (!credentials?.email || !credentials?.password) return null

                const user = users.find(u => u.email === credentials.email && u.password === credentials.password)

                if (user) {
                    return { id: user.id, name: user.name, email: user.email, role: user.role } as any
                }
                return null
            },
        }),
    ],
    callbacks: {
        jwt({ token, user, profile }) {
            if (user) {
                token.role = (user as any).role
            }
            if (token.email === "emadfalah10@gmail.com" || user?.email === "emadfalah10@gmail.com") {
                token.role = "admin"
            }
            return token
        },
        session({ session, token }) {
            if (session.user) {
                (session.user as any).role = token.role
            }
            return session
        },
    },
    pages: {
        signIn: "/login",
    },
})
