"use client";
import { Blog } from "@/models/UserModel";

import LikeButton from "./LikeButton";

import React from "react";
import { Card, CardBody, CardHeader, CardFooter } from "@nextui-org/card";
import { FaRegComment } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@nextui-org/react";
import CommentModal from "./CommentModal";

interface CardProps {
  blog: Blog;
  handleLike: (blog: Blog) => void;
}

const BlogCard = ({ blog, handleLike }: CardProps) => {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Card className="w-full p-2 m-4 bg-theme text-cyan-50 font-semibold  drop-shadow-2xl ">
        <CardHeader className="text-2xl p-4">{blog.title}</CardHeader>
        <CardBody className="p-4">{blog.content}</CardBody>
        <CardFooter className="p-4 flex justify-between items-center">
          <div className="flex justify-center items-center gap-x-6">
            <LikeButton
              blog={blog}
              handleLike={handleLike}
            />
            <div className="hover:text-blue-500 transition">
              <FaRegComment onClick={onOpen} />
            </div>
          </div>
          <div className="p-4 bg-slate-900 rounded-lg">{blog.username}</div>
        </CardFooter>
      </Card>
      <CommentModal
        blog={blog}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </>
  );
};

export default BlogCard;
