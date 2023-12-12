"use client";

import getBlogs from "@/actions/getBlogs";
import BlogList from "@/components/BlogList";

export const revalidate = 0;

export default async function Blogs() {
  const blogs = await getBlogs();

  return (
    <div className="h-full w-full overflow-auto p-4 flex flex-col  items-center">
      <BlogList blogs={blogs} />
    </div>
  );
}
