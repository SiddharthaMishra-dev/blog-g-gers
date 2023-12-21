// import { Blog } from "@/models/UserModel";

interface Blog {
  title: "";
  hashtags: "";
  content: "";
  likes: [];
}

const getBlogById = async (id: string | string[]): Promise<Blog> => {
  const url = `/api/user/${id}`;
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
  return (json as any) || {};
};

export default getBlogById;
