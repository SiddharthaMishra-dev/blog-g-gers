"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect, use } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
} from "@nextui-org/react";
import { Blog } from "@/models/UserModel";

export default function User() {
  const { data: session } = useSession();
  const [blogs, setBlogs] = useState([]);
  const fetchBlogs = async () => {
    const response = await fetch("/api/user");
    const json = await response.json();
    setBlogs(json);
    console.log(blogs);
  };
  useEffect(() => {
    fetchBlogs();
  }, [blogs]);
  return (
    <>
      <div className="h-screen w-full p-4 flex flex-col  items-center">
        <h2>Hey {session?.user?.name}</h2>
        {blogs.length !== 0 ? (
          <>
            <ul className="flex flex-col items-center p-3">
              {blogs.map((blog: Blog) => (
                <li key={blog?._id} className="w-2/3">
                  <Card className="w-full m-4 pl-3 bg-inherit text-cyan-50 ">
                    <CardHeader className="text-2xl p-4">
                      {blog.title}
                    </CardHeader>
                    <CardBody className="p-4">{blog.content}</CardBody>
                  </Card>
                </li>
              ))}
            </ul>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
