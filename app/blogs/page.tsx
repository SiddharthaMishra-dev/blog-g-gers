"use client";
import getBlogs from "@/actions/getBlogs";
import BlogList from "@/components/BlogList";

export const revalidate = 0;

export default async function Blogs() {
  const blogs = await getBlogs();
  // let blogs = [];
  // const url = "/api/blogs";
  // try {
  //   const response = await fetch(url, {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //   });
  //   blogs = await response.json();
  // } catch (err) {
  //   console.log(err);
  // }

  return (
    <div className="h-full w-full overflow-auto p-4 flex flex-col  items-center">
      <BlogList blogs={blogs} />
    </div>
  );
}
