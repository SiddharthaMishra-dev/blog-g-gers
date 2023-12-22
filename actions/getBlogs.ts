import { Blog } from "@/models/UserModel";

const getBlogs = async (): Promise<Blog[]> => {
  const url = `/api/blogs`;
  let json;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    json = await response.json();
  } catch (err) {
    console.log(err);
  }

  return (json as any) || [];
};

export default getBlogs;
