import NextAuth, {
  Awaitable,
  NextAuthOptions,
  RequestInternal,
} from "next-auth";
// import type { NextAuthOptions } from 'next-auth'
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import connectMongo from "@/utils/connectMongo";
// import User from "@/models/UserModel";

import clientPromise from "@/utils/mongoClient";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

interface AuthOptionProps extends NextAuthOptions {}

export const authOptions: AuthOptionProps = {
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.MY_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, trigger, session }) {
      if (trigger === "update" && session?.name) {
        token.name = session.name;
      }
      return token;
    },
    session({ session, token, user }) {
      return session; // The return type will match the one returned in `useSession()`
    },
  },

  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
