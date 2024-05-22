import { Button } from "@nextui-org/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-full flex flex-col items-center justify-center md:p-24 px-10">
      <h1
        className={`font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-red-400  text-[2rem] md:text-[4rem] lg:text-[6rem] xl:text-[10rem]`}
      >
        blog-g-ers
      </h1>
      <h2 className="mt-2 text-2xl md:text-4xl text-blue-600 font-semibold ">Share who you are</h2>
      <Link href="/blogs">
        <Button
          color="primary"
          size="lg"
          className="mt-4 theme-color  font-semibold  transition "
        >
          <span className="text-lg text-bold hover:tracking-wider transition">Discover</span>
        </Button>
      </Link>
    </main>
  );
}
