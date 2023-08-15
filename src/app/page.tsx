"use client";

import Image from "next/image";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-7xl text-bold mb-2">Blog-g-ers</h1>
      <h2 className="mt-2 text-2xl text-gray-200"> Share, who you are</h2>
      <Link href="/blogs">
        <Button color="primary" size="lg" className="mt-4 ">
          Discover
        </Button>
      </Link>
    </main>
  );
}
