"use server";

import type { blogs } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/config/authoptions";

export async function LikeBlog(tempBlog: blogs) {
  const prisma = new PrismaClient();
  const session = await getServerSession(authOptions);

  try {
    const resp = await prisma.blogs.update({
      where: {
        id: tempBlog.id,
      },
      data: {
        likes: [session?.user?.email || ""],
      },
    });
    return resp;
  } catch (err) {
    console.log(err);
  }
}
