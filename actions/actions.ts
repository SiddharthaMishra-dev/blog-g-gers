"use server";

import type { blogs } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

import { authOptions } from "@/config/authoptions";
import { getServerSession } from "next-auth/next";
const prisma = new PrismaClient();

export async function FetchAll() {
  try {
    const resp = await prisma.blogs.findMany();
    return resp;
  } catch (err) {
    console.log(err);
  }
}
export async function FetchBlog(props: string | string[]) {
  let id;
  if (Array.isArray(props)) {
    id = props[0];
  } else {
    id = props;
  }
  try {
    const resp = await prisma.blogs.findFirst({
      where: {
        id: id,
      },
    });
    return resp;
  } catch (err) {
    console.log(err);
  }
}

export async function FetchBlogsByUser() {
  const session = await getServerSession(authOptions);
  const usr = await prisma.users.findFirst({
    where: {
      email: session?.user?.email!,
    },
  });
  try {
    const resp = await prisma.blogs.findMany({
      where: {
        userId: usr?.id,
      },
    });
    return resp;
  } catch (err) {
    console.log(err);
  }
}

export async function LikeBlog(tempBlog: blogs) {
  const session = await getServerSession(authOptions);

  try {
    const resp = await prisma.blogs.update({
      where: {
        id: tempBlog.id,
      },
      data: {
        likes: {
          push: session?.user?.email || "",
        },
      },
    });
    return resp;
  } catch (err) {
    console.log(err);
  }
}

export async function CommentBlog(tempBlog: blogs) {
  const session = await getServerSession(authOptions);
  console.log(tempBlog);

  try {
    const resp = await prisma.blogs.update({
      where: {
        id: tempBlog.id,
      },
      data: {
        comments: {
          push: tempBlog.comments,
        },
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
}

interface UpdateBlogProps {
  id: string;
  title: string;
  hashtags: string;
  content: string;
  likes: string[];
  username: string;
}

export async function UpdateBlog(tempBlog: UpdateBlogProps) {
  try {
    const resp = await prisma.blogs.update({
      where: {
        id: tempBlog.id,
      },
      data: {
        title: tempBlog.title,
        hashtags: tempBlog.hashtags,
        content: tempBlog.content,
      },
    });
    return resp;
  } catch (err) {
    console.log(err);
  }
}

export async function DeleteBlog(props: string | string[]) {
  let id;
  if (Array.isArray(props)) {
    id = props[0];
  } else {
    id = props;
  }
  try {
    const resp = await prisma.blogs.delete({
      where: {
        id: id,
      },
    });
    return resp;
  } catch (err) {
    console.log(err);
  }
}