"use client";
import { useSession, signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
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
      <h1 className="text-3xl w-1/2 text-center mt-16 mb-16 bg-blue-700 text-white p-2 mx-auto rounded-md">
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
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default GoogleSignInButton;
