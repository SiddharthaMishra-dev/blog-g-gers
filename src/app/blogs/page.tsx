"use client";
import { Button, Chip } from "@nextui-org/react";
import { useEffect, useState, useCallback } from "react";
import { Card, CardBody, CardHeader, CardFooter } from "@nextui-org/react";
import { FaRegHeart } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { Blog } from "@/models/UserModel";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import noContent from "../../assets/No data-pana.svg";
import { useFetchBlogs } from "@/hooks/useFetchblogs";

interface User {
  email: string;
  image: string;
  name: string;
}

export default function Blogs() {
  const router = useRouter();
  const { data: session } = useSession();
  const [blog, setBlog] = useFetchBlogs();

  const handleLike = async (tempBlog: Blog) => {
    if (!session) {
      router.push("/signin");
    } else {
      setBlog((prevBlog) => {
        return prevBlog.map((b: Blog) => {
          if (b._id === tempBlog._id) {
            b.likes.push(session.user!.email!);
          }
          return b;
        });
      });
      const form = {
        session: session,
        blog: tempBlog,
      };
      try {
        const response = await fetch("/api/user", {
          method: "PUT",
          body: JSON.stringify(form),
        });
        const data = await response.json();
      } catch (err) {
        console.log(err);
        setBlog(blog);
      }
    }
  };

  return (
    <div className="h-full w-full overflow-auto p-4 flex flex-col  items-center">
      {blog.length !== 0 ? (
        <ul className="w-full p-3">
          {blog.map((blog: Blog) => (
            <li key={blog?._id} className="max-w-[700px] mx-auto">
              <Card className="w-full p-2 m-4 bg-inherit text-cyan-50 border  drop-shadow-2xl ">
                <CardHeader className="text-2xl p-4">{blog.title}</CardHeader>
                <CardBody className="p-4">{blog.content}</CardBody>
                <CardFooter className="p-4 flex justify-between items-center">
                  <div>
                    <Button
                      size="lg"
                      isIconOnly
                      color="danger"
                      onClick={() => handleLike(blog)}
                    >
                      <FaRegHeart />
                    </Button>
                    <span className="ml-2">{blog?.likes.length}</span>
                  </div>
                  <div className="p-4 bg-slate-900 rounded-lg">
                    {blog.username}
                  </div>
                </CardFooter>
              </Card>
            </li>
          ))}
        </ul>
      ) : (
        <div className="h-full flex flex-col justify-center items-center">
          {/* <h2 className="text-2xl mb-5">Oops...No content</h2> */}
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
