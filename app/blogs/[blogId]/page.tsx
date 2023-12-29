"use client";

import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const params = useParams();
  return (
    <div>
      <h1>Blogs id</h1>
    </div>
  );
};

export default Page;
