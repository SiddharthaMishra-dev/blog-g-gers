"use client";

import { useEffect, useState } from "react";

import { Blog } from "@/models/UserModel";

export const useFetchBlogs = () => {
  const [isLoading, setIsLoading] = useState<Boolean>();
  const [blog, setBlog] = useState<Blog[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const response = await fetch("/api/blogs");
      const data = await response.json();
      setBlog(data);
      setIsLoading(false);
    };
    fetchData();
  }, [blog]);
  return [blog, setBlog] as const;
};
