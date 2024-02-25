"use client";
import { useSession, signIn } from "next-auth/react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useEffect } from "react";

const Page = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      toast.success("Logged in successfully");
      router.push(`/`);
    }
  }, [session]);
  return (
    <>
      <div className="h-full w-full p-6 ">
        <div className="h-full flex gap-x-4 ">
          <div className="hidden md:block w-[786px] bg-background bg-center rounded-s-lg drop-shadow-md bg-blue-700/90 bg-blend-multiply blur-sm"></div>
          <div className="flex-1 flex flex-col items-center justify-center py-4 ">
            <div className="bg-blue-700 px-8 py-3">
              <p className="text-3xl font-medium">Join blog-g-gers now !</p>
            </div>
            <div className="mt-6 ">
              <Card className="w-[500px] ">
                <CardHeader></CardHeader>
                <CardBody className="">
                  <Button
                    color="primary"
                    size="lg"
                    onClick={() => signIn("github")}
                  >
                    <FaGithub className="text-lg" />
                    <span className="font-bold">Continue with Github</span>
                  </Button>
                  <Button
                    color="primary"
                    className="mt-4"
                    size="lg"
                    onClick={() => signIn("google")}
                  >
                    <FaGoogle className="text-lg" />
                    <span className="font-bold">Continue with Google</span>
                  </Button>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
