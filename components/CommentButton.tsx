"use client";

import { useDisclosure } from "@nextui-org/react";
import { FaRegComment } from "react-icons/fa";
import CommentModal from "./CommentModal";
import { Blog } from "@/models/UserModel";

interface CommentButtonProps {
  blog: Blog;
  handleComment: (blog: Blog) => void;
}

const CommentButton = ({ blog, handleComment }: CommentButtonProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <div className="flex items-center justify-center hover:text-blue-500 transition cursor-pointer">
        <FaRegComment onClick={onOpen} />
        <span className="ml-2">{blog.comments?.length! > 0 ? blog?.comments?.length : ""}</span>
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
