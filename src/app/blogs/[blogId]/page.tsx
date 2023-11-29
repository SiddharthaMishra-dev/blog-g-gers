"use client";

import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const params = useParams();
  console.log(params);
  return <div></div>;
};

export default Page;
