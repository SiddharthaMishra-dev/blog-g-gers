"use client";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const fetchData = async () => {
    const response = await fetch("/api/blogs");
    const data = await response.json();
    setBlogs(data);
  };
  const postData = async () => {
    const response = await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({ Name: "Sid" }),
    });
    console.log(response);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <h2 className="text-xl">Blogs</h2>

      {/* <button onClick={postData}>Post</button> */}
      {blogs.length !== 0 ? (
        <>
          <ul>
            {blogs.map((blog,index) => (
              <li key={index} >{blog.title}</li>
            ))}
          </ul>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
