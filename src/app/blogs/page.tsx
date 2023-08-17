"use client";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardFooter } from "@nextui-org/react";
import { FaRegHeart } from "react-icons/fa";
import { useSession } from "next-auth/react";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const {data:session}=useSession()
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

  const handleLike=async(event: Event)=>{
    const response=await fetch("/api/user",{
      method:"PATCH",
      body:JSON.stringify(session)
    })
    const data=await response.json()
    console.log(data)
  }

  useEffect(() => {
    fetchData();
  }, [blogs]);
  return (
    <div className="h-screen w-full p-4 flex flex-col  items-center">
      <h2 className="text-5xl">Blogs</h2>
      {blogs.length !== 0 ? (
        <>
          <ul>
            {blogs.map((blog, index) => (
              <li key={index}>
                <Card className="w-[400px] m-4">
                  <CardHeader>{blog.title}</CardHeader>
                  <CardBody>{blog.content}</CardBody>
                  <CardFooter>
                    <Button isIconOnly onClick={handleLike}>
                      <FaRegHeart/>
                    </Button>
                    {blog.likes.length}
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
