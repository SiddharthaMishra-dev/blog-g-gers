"use client";

import { useDisclosure } from "@nextui-org/react";
import type { Prisma, blogs } from "@prisma/client";
import { FaRegComment } from "react-icons/fa";
import CommentModal from "./CommentModal";

interface CommentButtonProps {
  blog: blogs;
  handleComment: (blog: blogs) => void;
}

const CommentButton = ({ blog, handleComment }: CommentButtonProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const blogsLength = blog.comments as Prisma.JsonArray;

  return (
    <>
      <div className="flex items-center justify-center hover:text-blue-500 transition cursor-pointer text-gray-400">
        <FaRegComment onClick={onOpen} />
        <span className="ml-2">{blogsLength.length > 0 ? blogsLength.length : ""}</span>
      </div>
      <CommentModal
        blog={blog}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        handleComment={handleComment}
      />
    </>
  );
};

export default CommentButton;
