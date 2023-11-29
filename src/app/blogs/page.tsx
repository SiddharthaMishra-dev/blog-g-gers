"use client";
import { Button, Chip } from "@nextui-org/react";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { Blog } from "@/models/UserModel";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import noContent from "../../assets/No data-pana.svg";
import { useFetchBlogs } from "@/hooks/useFetchblogs";
import { useBlogStore } from "@/utils/store";
import BlogCard from "@/components/BlogCard";

interface User {
  email: string;
  image: string;
  name: string;
}

export default function Blogs() {
  const router = useRouter();
  const { data: session } = useSession();

  const blogs = useBlogStore((state: any) => state.blogs);
  const add = useBlogStore((state: any) => state.addBlogs);
  const [blog] = useFetchBlogs();

  useEffect(() => {
    add(blog);
  }, [blog]);

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
        add(newBlogs);
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
        add(blog);
      }
    }
  };

  return (
    <div className="h-full w-full overflow-auto p-4 flex flex-col  items-center">
      {blogs.length !== 0 ? (
        <ul className="w-full p-3">
          {blogs.map((blog: Blog) => (
            <li key={blog?._id} className="max-w-[700px] mx-auto">
              <BlogCard blog={blog} handleLike={handleLike} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="h-full flex flex-col justify-center items-center">
          <Image src={noContent} alt="no-content" />
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
      )}
    </div>
  );
}
