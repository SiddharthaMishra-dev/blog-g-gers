"use client";

import { Button } from "@nextui-org/button";
import type { blogs } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/config/authoptions";

import { useBlogStore } from "@/utils/store";

import { CommentBlog, LikeBlog } from "@/actions/actions";
import BlogCard from "./BlogCard";

interface BlogListProps {
  // blogs: Blog[];
  blogs: blogs[] | undefined;
}

const BlogList = ({ blogs }: BlogListProps) => {
  const { data: session } = useSession();
  //  const session = await getServerSession(authOptions);
  const router = useRouter();
  const blogStore = useBlogStore();

  const handleLike = async (tempBlog: blogs) => {
    if (!session) {
      router.push("/signin");
      return;
    }

    try {
      const resp = LikeBlog(tempBlog);
      console.log(resp);
    } catch (err) {
      console.log(err);
      blogStore.addBlogs(blogStore.blogs);
    }
  };

  const handleComment = async (tempBlog: blogs) => {
    if (!session) {
      router.push("/signin");
    } else {
      try {
        await CommentBlog(tempBlog);
      } catch (err) {
        console.log(err);
        blogStore.addBlogs(blogStore.blogs);
      }
    }
  };

  if (blogs?.length === 0) {
    return (
      <div className="h-full w-full overflow-auto p-4 flex flex-col  items-center">
        <div className="h-full flex flex-col justify-center items-center">
          <Image
            src="/No data-pana.svg"
            alt="no-content"
            width={500}
            height={500}
          />
          <Button
            as={Link}
            href={"/create"}
            size="lg"
            color="primary"
            variant="light"
            className="text-xl  font-bold hover:scale-110"
          >
            Be the first one to start
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-y-auto">
      <ul className="w-full p-3">
        {blogs?.map((blog: blogs) => (
          <li
            key={blog?.id}
            className="max-w-[700px] mx-auto"
          >
            <BlogCard
              blog={blog}
              handleLike={handleLike}
              handleComment={handleComment}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
