import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";

import type { blogs } from "@prisma/client";
import CommentButton from "./CommentButton";
import LikeButton from "./LikeButton";
import { useEffect, useState } from "react";
import { GetUserImage } from "@/actions/actions";
import Image from "next/image";
import Link from "next/link";

interface CardProps {
  blog: blogs;
  handleLike: (blog: blogs) => void;
  handleComment: (blog: blogs) => void;
}

const BlogCard = ({ blog, handleLike, handleComment }: CardProps) => {
  const [image, setImage] = useState("");

  const fetchImage = async () => {
    const image = await GetUserImage(blog.userId);
    setImage(image!);
  };

  useEffect(() => {
    fetchImage();
  }, [blog]);

  return (
    <>
      <Card className="w-full p-2 m-4 bg-theme text-cyan-50 font-semibold  drop-shadow-2xl bg-transparent">
        <div className="flex space-x-2">
          <div className="relative h-10 w-10">
            <Image
              fill
              className="rounded-full object-center object-cover"
              src={image}
              alt="profile"
            />
          </div>
          <div className="flex-1">
            <Link href={`/blogs/${blog.id}`}>
              <CardHeader className=" px-3 pt-0">
                <div className="flex flex-col gap-y-2">
                  <span className="text-2xl">{blog.username}</span>
                  <span className="text-xl text-gray-300">{blog.title}</span>
                </div>
              </CardHeader>
              <CardBody className="px-3 py-2">{blog.content}</CardBody>
            </Link>
            <CardFooter className="p-4 flex justify-between items-center">
              <div className="flex justify-center items-center gap-x-6">
                <LikeButton
                  blog={blog}
                  handleLike={handleLike}
                />
                <CommentButton
                  blog={blog}
                  handleComment={handleComment}
                />
              </div>
            </CardFooter>
          </div>
        </div>
      </Card>
    </>
  );
};

export default BlogCard;
