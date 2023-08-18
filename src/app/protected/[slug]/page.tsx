"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect, use } from "react";

export default function User() {
  const { data: session } = useSession();
  const [blogs, setBlogs] = useState([]);
  const fetchBlogs = async () => {
    const response = await fetch("/api/user");
    const json = await response.json();
    console.log(json);
  };
  useEffect(()=>{
    fetchBlogs();
  },[blogs])
  return (
    <>
      <div className="h-screen w-full p-4 flex flex-col  items-center">
        <h2>Hey {session?.user?.name}</h2>
      </div>
    </>
  );
}
