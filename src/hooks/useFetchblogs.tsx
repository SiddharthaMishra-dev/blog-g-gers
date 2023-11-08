"use client";

import { useEffect, useState } from "react";

export const useFetchBlogs = () => {
  const [isLoading, setIsLoading] = useState<Boolean>();
  const [blog, setBlog] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch("/api/blogs");
        const data = await response.json();
        setBlog(data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
      }
    };
    fetchData();
  }, [blog]);
  return [blog, setBlog] as const;
};
