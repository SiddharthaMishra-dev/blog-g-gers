"use client";
import { Skeleton } from "@nextui-org/react";

const Loading = () => {
  return (
    <main className="flex flex-col justify-center items-center gap-y-10">
      <Skeleton className="h-20 w-[440px] rouded-lg"></Skeleton>
      <Skeleton className="h-20 w-[440px] rouded-lg" />
      <Skeleton className="h-20 w-[440px] rouded-lg" />
    </main>
  );
};

export default Loading;
