"use client";
import { useSession, signIn } from "next-auth/react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Button, CardHeader } from "@nextui-org/react";
import Image from "next/image";
import { Card, CardBody } from "@nextui-org/react";

import { redirect } from "next/navigation";
const GoogleSignInButton = () => {
  const { data: session } = useSession();
  const url =
    "https://media4.giphy.com/media/HrRvnN7NuJy4InG4MV/giphy.gif?cid=ecf05e47eq49eny9vfl658ypap8ghp1jerrc19nzup2lcnzb&ep=v1_stickers_search&rid=giphy.gif&ct=s";

  if (session) {
    redirect(`/protected/${session.user?.name}`);
  }
  return (
    <>
      {/* <h1 className="text-3xl w-1/2 text-center mt-16 mb-16 bg-blue-700 text-white p-2 mx-auto rounded-md">
        Join blog-g-gers now !
      </h1>
      <div className="w-full flex justify-center items-center">
        <Card>
          <CardHeader></CardHeader>
          <CardBody className="">
            <div className="p-5">
              <Image src={url} alt="login-animation" width={350} height={350} />
            </div>
            <Button
              color="primary"
              className=""
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
      </div> */}

      {/* New Design */}

      <div className="h-full w-full p-6 ">
        <div className="h-full flex gap-x-4 ">
          <div className="group hidden md:block w-[786px] bg-background bg-center rounded-s-lg drop-shadow-md bg-blue-700/90 bg-blend-multiply blur-sm"></div>
          <div className="flex-1 flex flex-col items-center justify-center py-4 ">
            <div className="bg-blue-700 px-6 py-3">
              <p className="text-3xl font-medium">Join blog-g-gers now !</p>
            </div>
            <div className="mt-6">
              <Card className="w-[500px] ">
                <CardHeader></CardHeader>
                <CardBody className="">
                  <Button
                    color="primary"
                    className=""
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

export default GoogleSignInButton;
