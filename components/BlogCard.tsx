import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";

import type { blogs } from "@prisma/client";
import CommentButton from "./CommentButton";
import LikeButton from "./LikeButton";
import { useEffect, useState } from "react";
import { GetUserImage } from "@/actions/actions";

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
        <CardHeader className="text-2xl p-4">{blog.title}</CardHeader>
        <CardBody className="p-4">{blog.content}</CardBody>
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
          <div className="p-4  flex gap-x-2 items-center bg-slate-900 rounded-lg">
            <img
              className="h-6 w-6 rounded-full"
              src={image}
              alt="profile"
            />
            {blog.username}
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default BlogCard;
