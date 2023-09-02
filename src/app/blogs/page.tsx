"use client";
import { Button, Chip } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardFooter } from "@nextui-org/react";
import { FaRegHeart } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { Blog } from "@/models/UserModel";
import { useRouter } from "next/navigation";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const router = useRouter();
  // const [blog, setBlog] = useState();
  const { data: session } = useSession();
  const fetchData = async () => {
    const response = await fetch("/api/blogs");
    const data = await response.json();
    setBlogs(data);
  };

  const handleLike = async (blog: Blog) => {
    if (!session) {
      router.push("/signin");
    } else {
      blog.likes.push(session?.user?.email);
      console.log(blog);
      // setBlog(blog)
      const form = {
        session: session,
        blog: blog,
      };
      const response = await fetch("/api/user", {
        method: "PUT",
        body: JSON.stringify(form),
      });
      const data = await response.json();
      console.log(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, [blogs]);
  return (
    <div className="h-full w-full overflow-auto p-4 flex flex-col  items-center">
      {/* <h2 className="text-5xl bg-slate-800 p-4 ">Blogs</h2> */}

      {blogs.length !== 0 ? (
        <>
          <ul className="flex flex-col items-center p-3">
            {blogs.map((blog: Blog) => (
              <li key={blog?._id} className="w-4/5">
                <Card className="w-full m-4 pl-3 bg-inherit text-cyan-50 drop-shadow-2xl ">
                  <CardHeader className="text-2xl p-4">{blog.title}</CardHeader>
                  <CardBody className="p-4">{blog.content}</CardBody>
                  <CardFooter className="p-4 flex justify-between">
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
                    <div>
                      <Chip size="lg" color="primary">
                        {blog.username}
                      </Chip>
                    </div>
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
