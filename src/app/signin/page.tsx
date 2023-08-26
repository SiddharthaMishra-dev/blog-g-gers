"use client";
import { useSession, signOut, signIn } from "next-auth/react";
import { Button } from "@nextui-org/react";

import { Card, CardBody } from "@nextui-org/react";

import { redirect } from "next/navigation";
const GoogleSignInButton = () => {
  const { data: session } = useSession();

  if (session) {
    redirect(`/protected/${session.user?.name}`);
  }
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <Card>
          <CardBody className="">
            <div className="p-5">
              {/* <Image src={image} alt="rocket " width={300} height={200} /> */}
              <img
                src="https://media4.giphy.com/media/HrRvnN7NuJy4InG4MV/giphy.gif?cid=ecf05e47eq49eny9vfl658ypap8ghp1jerrc19nzup2lcnzb&ep=v1_stickers_search&rid=giphy.gif&ct=s"
                alt="login animation"
              />
            </div>
            <Button
              color="primary"
              className=""
              size="lg"
              onClick={() => signIn("google")}
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-icon="google"
                className="mr-8 w-5"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="red"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              Continue with Google
            </Button>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default GoogleSignInButton;
