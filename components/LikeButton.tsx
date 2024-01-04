"use client";

import { Blog } from "@/models/UserModel";
import { useSession } from "next-auth/react";
import { FaRegHeart } from "react-icons/fa";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useEffect, useState } from "react";

interface LikeButtonProps {
  blog: Blog;
  handleLike: (blog: Blog) => void;
}

const LikeButton = ({ blog, handleLike }: LikeButtonProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const { data: session } = useSession();

  const likeFn = () => {
    if (!isLiked) {
      setIsLiked(true);
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
    <div className="flex items-center hover:text-red-600 transition cursor-pointer">
      <Icon
        onClick={likeFn}
        size={20}
        color={isLiked ? "red" : "white"}
      />
      <span className="ml-2">{blog?.likes.length}</span>
    </div>
  );
};

export default LikeButton;
