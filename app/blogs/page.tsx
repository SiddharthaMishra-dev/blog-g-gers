// "use client";
import getBlogs from "@/actions/getBlogs";
import BlogList from "@/components/BlogList";
import { PrismaClient } from "@prisma/client";

export const revalidate = 0;

export default async function Blogs() {
  const prisma = new PrismaClient();
  // const blogs = await getBlogs();

  const allBlogs = await prisma.blogs.findMany();
  console.log(allBlogs);

  return (
    <div className="h-full w-full overflow-auto p-4 flex flex-col  items-center">
      <BlogList blogs={allBlogs} />
    </div>
  );
}
