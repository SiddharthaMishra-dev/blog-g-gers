"use client";

import { FetchBlog, GetUserImage } from "@/actions/actions";
import { blogs } from "@prisma/client";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState<blogs | undefined | null>();
  const [image, setImage] = useState("");

  const fetchImage = async () => {
    const image = await GetUserImage(blog?.userId!);
    setImage(image!);
  };

  const fetchBlog = async () => {
    const blog = await FetchBlog(blogId);
    setBlog(blog);
  };

  useEffect(() => {
    fetchImage();
  }, [blog]);

  useEffect(() => {
    fetchBlog();
  });

  return (
    <div className="h-full w-full overflow-auto p-4 flex flex-col  items-center">
      <div className="h-full w-full max-w-lg ">
        <div className="mt-2 flex justify-start items-center space-x-2">
          <div className="relative h-16 w-16">
            <Image
              fill
              className="rounded-full object-center object-cover"
              src={image}
              alt="profile"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <p className="text-2xl font-semibold">{blog?.username}</p>
            <p className="text-xl font-medium">{blog?.title}</p>
          </div>
        </div>
        <div className="w-full mt-4 p-3 bg-gray-800 rounded-md">{blog?.content}</div>
        <div className="w-full mt-4"></div>
      </div>
    </div>
  );
};

export default Page;
