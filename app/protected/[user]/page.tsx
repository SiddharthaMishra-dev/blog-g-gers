"use client";

import { Button, Card, CardBody, CardFooter, CardHeader, useDisclosure } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";

import { FetchBlogsByUser } from "@/actions/actions";
import Loader from "@/components/Loader";
import PostModal from "@/components/PostModal";
import { blogs } from "@prisma/client";

export default function User() {
  const { data: session } = useSession();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isNewAdded, setIsNewAdded] = useState(false);
  const [blogs, setBlogs] = useState<blogs[]>([]);
  const [fetchingBlogs, setFetchingBlogs] = useState(false);
  const params = useParams();

  const fetchBlogs = async () => {
    try {
      setFetchingBlogs(true);
      const data = await FetchBlogsByUser();
      setFetchingBlogs(false);
      setBlogs(data!);
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
            {blogs?.map((blog: blogs) => (
              <li
                key={blog?.id}
                className="mt-5"
              >
                <Card className="w-[600px] bg-theme  p-4 text-cyan-50 ">
                  <CardHeader className="text-2xl p-4">{blog.title}</CardHeader>
                  <CardBody className="p-4">{blog.content}</CardBody>
                  <CardFooter className="justify-between">
                    <Button
                      as={Link}
                      color="primary"
                      href={`/protected/${params.user}/${blog.id}`}
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
            src="/dazzle-blog-post-article.gif"
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
