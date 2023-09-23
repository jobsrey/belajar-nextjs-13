import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import api from "@/utils/api";
import { NextAuthOptions } from "next-auth";


//define types for nextauth
import "@/types/next-auth.d";

export const authOptions:NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const formData = new FormData();

        formData.append("email", credentials?.email as string);
        formData.append("password", credentials?.password as string);

        const res = await api.post("/user/login", formData, {
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.data;

        // If no error and we have user data, return it
        if (user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user= token as any;
      return session;
    },
  },
  pages: {
    signIn: "/user/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
