import NextAuth, { Awaitable, RequestInternal } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import connectMongo from "@/utils/connectMongo";
import User from "@/models/UserModel";

const authOptions={
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID as string,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                // console.log(credentials)
                await connectMongo()
                const fetchedUsers=await User.find({userName:credentials?.username , password:credentials?.password})
                console.log(fetchedUsers)
                const user = fetchedUsers
                if (user) {
                  // Any object returned will be saved in `user` property of the JWT
                  return user
                } else {
                  // If you return null then an error will be displayed advising the user to check their details.
                  return null
          
                  // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
              }
        })
    ],
}

const handler = NextAuth(authOptions)
export  {handler as GET,handler as POST}