import { Blog } from "@/models/UserModel";

const getBlogs = async (): Promise<Blog[]> => {
  let url = "/api/blogs";
  let json;
  try {
    const response = await fetch(url);
    json = await response.json();
  } catch (err) {
    console.log(err);
  }
  return (json as any) || [];
};

export default getBlogs;
