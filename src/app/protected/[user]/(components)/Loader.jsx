"use client";

import React from "react";
import { CircularProgress } from "@nextui-org/react";

const Loader = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <CircularProgress aria-label="Loading ..." />
    </div>
  );
};

export default Loader;
