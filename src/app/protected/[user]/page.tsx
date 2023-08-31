"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
} from "@nextui-org/react";
import { Blog } from "@/models/UserModel";
import { FaEdit } from "react-icons/fa";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function User() {
  const { data: session } = useSession();
  const [blogs, setBlogs] = useState([]);
  const [fetchingBlogs, setFetchingBlogs] = useState(false);
  const params = useParams();

  const fetchBlogs = async () => {
    try {
      setFetchingBlogs(true);
      const response = await fetch("/api/user");
      const json = await response.json();
      setFetchingBlogs(false);
      setBlogs(json);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <>
      <div className="min-h-screen w-full p-4 flex flex-col  items-center">
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
                    <CardFooter>
                      <Button
                        as={Link}
                        color="primary"
                        href={`/protected/${params.user}/${blog._id}`}
                      >
                        <FaEdit />
                      </Button>
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
    </>
  );
}
