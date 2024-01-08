"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardBody, CardHeader, CardFooter, Button, useDisclosure } from "@nextui-org/react";
import { FaEdit } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

import { Blog } from "@/models/UserModel";
import Loader from "@/components/Loader";
import PostModal from "@/components/PostModal";
import firstBlog from "@/assets/dazzle-blog-post-article.gif";

export default function User() {
  const { data: session } = useSession();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isNewAdded, setIsNewAdded] = useState(false);
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
  }, [isNewAdded]);
  return (
    <div className=" w-full h-full  overflow-auto p-4 flex flex-col  items-center">
      <h2 className="text-2xl font-semibold">Welcome Back {session?.user?.name}</h2>

      {fetchingBlogs ? (
        <div>
          <Loader />
        </div>
      ) : blogs.length !== 0 ? (
        <div>
          <ul className="w-full flex flex-col items-center p-3 mt-7">
            {blogs.map((blog: Blog) => (
              <li
                key={blog?._id}
                className="mt-5"
              >
                <Card className="w-[600px] bg-theme  p-4 text-cyan-50 ">
                  <CardHeader className="text-2xl p-4">{blog.title}</CardHeader>
                  <CardBody className="p-4">{blog.content}</CardBody>
                  <CardFooter className="justify-between">
                    <Button
                      as={Link}
                      color="primary"
                      href={`/protected/${params.user}/${blog._id}`}
                      className="font-semibold"
                    >
                      <FaEdit />
                      Edit
                    </Button>
                  </CardFooter>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="h-full flex flex-col justify-center items-center">
          <Image
            src={firstBlog}
            alt="first blog"
            height={400}
            width={400}
          />

          <Button
            size="lg"
            color="primary"
            variant="light"
            className="text-xl  font-bold transition ease-in-out hover:scale-110 duration-300"
            onPress={onOpen}
          >
            Write your first Post
          </Button>
        </div>
      )}
      <PostModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        setfunction={setIsNewAdded}
      />
    </div>
  );
}
