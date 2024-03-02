"use client";

import { useParams } from "next/navigation";
import React from "react";

interface BlogIDProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const Page = () => {
  return (
    <div>
      <h1>Blogs id</h1>
    </div>
  );
};

export default Page;
