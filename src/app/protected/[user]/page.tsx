"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
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
      console.log(json);
      setFetchingBlogs(false);
      setBlogs(json);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteBlog = async () => {
    const url = `/api/user/${deleteBlogId}`;
    console.log(deleteBlogId);
    console.log(url);
    // try {
    //   const response = await fetch(url, {
    //     method: "DELETE",
    //     headers: { "Content-Type": "application/json" },
    //   });
    //   const data = await response.json();
    //   console.log(data);
    // } catch (err) {
    //   console.log(err);
    // }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <div className=" w-full h-full  overflow-auto p-4 flex flex-col  items-center">
      <h2 className="text-2xl">Welcome Back {session?.user?.name}</h2>

      {blogs.length !== 0 ? (
        <>
          <ul className="w-full flex flex-col items-center p-3">
            <h4 className="text-xl text-blue-700">Your Blogs</h4>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col text-center gap-1 text-blue-400">
                      Are you sure
                    </ModalHeader>
                    <ModalBody>
                      <div className="flex justify-center gap-9">
                        <Button
                          color="danger"
                          variant="flat"
                          onClick={handleDeleteBlog}
                        >
                          Yes
                        </Button>
                        <Button color="primary" variant="flat">
                          No
                        </Button>
                      </div>
                    </ModalBody>
                  </>
                )}
              </ModalContent>
            </Modal>

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
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      as={Link}
                      color="danger"
                      href="#"
                      variant="flat"
                      // onPress={() => onOpen}
                      onClick={() => {
                        // console.log(blog._id);
                        onOpen;
                      }}
                    >
                      <MdDelete />
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
            as={Link}
            href="/create"
          >
            Write your first Post
          </Button>
        </div>
      )}
    </div>
  );
}
