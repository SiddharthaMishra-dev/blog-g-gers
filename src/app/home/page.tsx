'use client'
import Link from "next/link";
import {useSession} from "next-auth/react"
import { useSearchParams } from 'next/navigation'
export default function Page() {
  const{data: session}=useSession()
  console.log(session)
  return (
    <div className="text-center bg-slate-600 h-screen flex flex-col justify-center w-2/3 mx-auto ">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis
        accusantium repellat adipisci obcaecati quasi. Unde asperiores debitis
        nostrum. Quia, nobis!
      </p>
      <div className="rounded-lg bg-slate-300 p-4">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium,
          possimus. Ab dolore necessitatibus architecto laborum ex omnis eius
          possimus pariatur!
        </p>

        <Link href="/blogs">
          <button className="outline p-4 text-lg mt-2 rounded-lg bg-slate-800 hover:bg-slate-700 ease-in">
            Blogs
          </button>
        </Link>
      </div>
    </div>
  );
}
