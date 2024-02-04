"use server";

import type { blogs } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/config/authoptions";
import { revalidatePath } from "next/cache";
const prisma = new PrismaClient();

export async function LikeBlog(tempBlog: blogs) {
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

export async function CommentBlog(tempBlog: blogs) {
  const session = await getServerSession(authOptions);

  try {
    const resp = await prisma.blogs.update({
      where: {
        id: tempBlog.id,
      },
      data: {
        comments: [session?.user?.email || ""],
      },
    });
    return resp;
  } catch (err) {
    console.log(err);
  }
}

interface FormDataProps {
  title: string;
  hashtags: string;
  content: string;
  likes: string[];
  comments: string[];
}

export async function PostBlog(formData: FormDataProps) {
  const session = await getServerSession(authOptions);
  const usr = await prisma.users.findFirst({
    where: {
      email: session?.user?.email!,
    },
  });
  await prisma.blogs.create({
    data: {
      title: formData.title,
      content: formData.content,
      hashtags: formData.hashtags,
      likes: formData.likes,
      comments: formData.comments,
      userId: usr?.id!,
      username: session?.user?.name!,
    },
  });
  // revalidatePath("/blogs");
}
