"use client";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardFooter } from "@nextui-org/react";
import { FaRegHeart } from "react-icons/fa";
import { useSession } from "next-auth/react";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  // const [blog, setBlog] = useState();
  const { data: session } = useSession();
  const fetchData = async () => {
    const response = await fetch("/api/blogs");
    const data = await response.json();
    setBlogs(data);
  };
  const postData = async () => {
    const response = await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({ Name: "Sid" }),
    });
    console.log(response);
  };

  const handleLike = async (blog) => {
    blog.likes.push(session?.user?.email)
    console.log(blog)
    // setBlog(blog)
    const form={
      session:session,
      blog:blog
    }
    const response = await fetch("/api/user", {
      method: "PUT",
      body: JSON.stringify(form),
    });
    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    fetchData();
  }, [blogs]);
  return (
    <div className="h-screen w-full p-4 flex flex-col  items-center">
      <h2 className="text-5xl">Blogs</h2>
      {blogs.length !== 0 ? (
        <>
          <ul className="flex flex-col items-center p-3">
            {blogs.map((blog) => (
              <li key={blog?._id} className="w-2/3">
                <Card className="w-full m-4 pl-3 bg-inherit text-cyan-50 ">
                  <CardHeader className="text-2xl p-4">{blog.title}</CardHeader>
                  <CardBody className="p-4">{blog.content}</CardBody>
                  <CardFooter className="p-4">
                    <Button isIconOnly onClick={()=>handleLike(blog)}>
                      <FaRegHeart />
                    </Button>
                    <span className="ml-2">{blog.likes.length}</span>
                  </CardFooter>
                </Card>
              </li>
            ))}
          </ul>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
