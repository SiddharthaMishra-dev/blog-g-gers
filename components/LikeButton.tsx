"use client";

import type { blogs } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface LikeButtonProps {
  // blog: Blog;
  // handleLike: (blog: Blog) => void;
  blog: blogs;
  handleLike: (blog: blogs) => void;
}

const LikeButton = ({ blog, handleLike }: LikeButtonProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [optimisticLike, setOptimisticLike] = useState(0);
  const { data: session } = useSession();

  const likeFn = (e: Event) => {
    if (!isLiked) {
      setIsLiked(true);
      setOptimisticLike(1);
      handleLike(blog);
    }
  };

  useEffect(() => {
    if (!session) {
      return;
    }

    if (blog.likes.includes(session?.user?.email!)) {
      setIsLiked(true);
    }
  }, [session, blog]);

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  return (
    <div className="group flex items-center hover:text-red-600 transition cursor-pointer">
      <Icon
        onClick={likeFn}
        size={20}
        color={isLiked ? "red" : "white"}
      />
      <span className="ml-2">{blog?.likes.length + optimisticLike}</span>
    </div>
  );
};

export default LikeButton;
