// "use client";
import { FetchAll } from "@/actions/actions";
import BlogList from "@/components/BlogList";

export const revalidate = 0;

export default async function Blogs() {
  const allBlogs = await FetchAll();

  return (
    <div className="h-full w-full overflow-auto p-4 flex flex-col  items-center">
      <BlogList blogs={allBlogs} />
    </div>
  );
}
