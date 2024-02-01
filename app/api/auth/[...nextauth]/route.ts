import NextAuth from "next-auth";

import { authOptions } from "@/config/authoptions";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
