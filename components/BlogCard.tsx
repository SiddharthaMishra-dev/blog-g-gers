"use client";
import React from "react";
import { Card, CardBody, CardHeader, CardFooter } from "@nextui-org/card";
import { FaRegHeart } from "react-icons/fa";
import { Blog } from "@/models/UserModel";
import { FaRegComment } from "react-icons/fa";
import Link from "next/link";

interface CardProps {
  blog: Blog;
  handleLike: (blog: Blog) => void;
}

const BlogCard = ({ blog, handleLike }: CardProps) => {
  return (
    <Card className="w-full p-2 m-4 bg-inherit text-cyan-50 border  drop-shadow-2xl ">
      <CardHeader className="text-2xl p-4">{blog.title}</CardHeader>
      <CardBody className="p-4">{blog.content}</CardBody>
      <CardFooter className="p-4 flex justify-between items-center">
        <div className="flex justify-center items-center gap-x-6">
          <div className="flex items-center hover:text-red-600 transition">
            <FaRegHeart onClick={() => handleLike(blog)} />
            <span className="ml-2">{blog?.likes.length}</span>
          </div>
          <div className="hover:text-blue-500 transition">
            <Link href={`/blogs/${blog._id}`}>
              <FaRegComment />
            </Link>
          </div>
        </div>
        <div className="p-4 bg-slate-900 rounded-lg">{blog.username}</div>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
