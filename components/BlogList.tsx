"use client";

import { Button } from "@nextui-org/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { Blog } from "@/models/UserModel";
import noContent from "@/assets/No data-pana.svg";
import BlogCard from "./BlogCard";
import { useBlogStore } from "@/utils/store";
import toast from "react-hot-toast";

interface BlogListProps {
  blogs: Blog[];
}

const BlogList = ({ blogs }: BlogListProps) => {
  const { data: session } = useSession();
  const router = useRouter();
  const blogStore = useBlogStore();

  const handleLike = async (tempBlog: Blog) => {
    if (!session) {
      router.push("/signin");
    } else {
      try {
        let newBlogs = blogs.map((b: Blog) => {
          if (b._id === tempBlog._id) {
            b.likes.push(session.user?.email || "");
          }
          return b;
        });
        blogStore.addBlogs(newBlogs);
        const form = {
          session: session,
          blog: tempBlog,
        };
        const response = await fetch("/api/user", {
          method: "PUT",
          body: JSON.stringify(form),
        });
        const data = await response.json();
      } catch (err) {
        console.log(err);
        blogStore.addBlogs(blogStore.blogs);
      }
    }
  };

  const handleComment = async (tempBlog: Blog) => {
    if (!session) {
      router.push("/signin");
    } else {
      try {
        let newBlogs = blogs.map((b: Blog) => {
          if (b._id === tempBlog._id) {
            return { ...b, comments: tempBlog.comments };
          }
          return b;
        });
        blogStore.addBlogs(newBlogs);
        const form = {
          session: session,
          blog: tempBlog,
        };
        const response = await fetch("/api/user", {
          method: "PUT",
          body: JSON.stringify(form),
        });
        if (response.ok) {
          toast.success("Comment posted!");
        } else {
          toast.error("Error posting comment!");
        }
      } catch (err) {
        console.log(err);
        blogStore.addBlogs(blogStore.blogs);
      }
    }
  };

  if (blogs.length === 0) {
    return (
      <div className="h-full w-full overflow-auto p-4 flex flex-col  items-center">
        <div className="h-full flex flex-col justify-center items-center">
          <Image
            src={noContent}
            alt="no-content"
          />
          <Button
            as={Link}
            href={"/create"}
            size="lg"
            color="primary"
            variant="light"
            className="text-xl  font-bold hover:scale-125"
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
        {blogs.map((blog: Blog) => (
          <li
            key={blog?._id}
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
