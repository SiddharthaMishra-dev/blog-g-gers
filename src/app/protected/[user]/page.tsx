"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PostModal from "./(components)/PostModal";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  // Modal,
  // ModalContent,
  // ModalHeader,
  // ModalBody,
  // ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { Blog } from "@/models/UserModel";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Link from "next/link";

export default function User() {
  const { data: session } = useSession();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [blogs, setBlogs] = useState([]);
  const [deleteBlogId, setDeleteBlogId] = useState("");
  const [fetchingBlogs, setFetchingBlogs] = useState(false);
  const params = useParams();

  const fetchBlogs = async () => {
    try {
      setFetchingBlogs(true);
      const response = await fetch("/api/user");
      const json = await response.json();
      // console.log(json);
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
    <div className=" w-full h-full  overflow-auto p-4 flex flex-col  items-center">
      <h2 className="text-2xl">Welcome Back {session?.user?.name}</h2>

      {fetchingBlogs ? (
        <div>
          <h1>Loading...</h1>
        </div>
      ) : blogs.length !== 0 ? (
        <>
          <ul className="w-full flex flex-col items-center p-3">
            <h4 className="text-4xl mt-4  text-blue-700">Your Blogs</h4>
            {blogs.map((blog: Blog) => (
              <li key={blog?._id} className="mt-5">
                <Card className="w-[600px]  p-4 text-cyan-50 ">
                  <CardHeader className="text-2xl p-4">{blog.title}</CardHeader>
                  <CardBody className="p-4">{blog.content}</CardBody>
                  <CardFooter className="justify-between">
                    <Button
                      as={Link}
                      color="primary"
                      href={`/protected/${params.user}/${blog._id}`}
                      variant="flat"
                    >
                      <FaEdit />
                      Edit
                    </Button>
                  </CardFooter>
                </Card>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="h-full flex flex-col justify-center items-center">
          {/* <h2 className="text-2xl"></h2> */}
          <Button
            size="lg"
            color="primary"
            variant="light"
            className="text-xl  font-bold transition ease-in-out hover:scale-110 duration-300"
            // as={Link}
            onPress={onOpen}
            // href="/create"
          >
            Write your first Post
          </Button>
        </div>
      )}
      <PostModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
}
