import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "./config/authoptions";
import { getToken } from "next-auth/jwt";
// export { default } from "next-auth/middleware";

export async function middleware(req: NextRequest) {
  // const { url } = req;
  // const session = await getServerSession(authOptions);
  // const token = await getToken({req});

  // console.log(token);

  // if (session && ["/signin"].includes(nextUrl.pathname)) {
  //   return NextResponse.redirect("http://localhost:3000/");
  // }

  // console.log(req);
  return NextResponse.next();
}

// export const config = { matcher: ["/signin"] };
