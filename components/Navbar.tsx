"use client";

import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useSession, signOut } from "next-auth/react";
import PostModal from "./PostModal";
import { useRouter } from "next/navigation";

const Appbar = () => {
  const { data: session } = useSession();
  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  const [isNewAdded, setIsNewAdded] = useState(false);

  const router = useRouter();
  if (isNewAdded && session !== null) {
    router.push(`/protected/${session.user?.name}`);
  }
  return (
    <Navbar
      className="bg-inherit h-[75px]"
      maxWidth="full"
    >
      <NavbarBrand>
        <Link href="/">
          <p className="text-xl font-bold text-inherit">blog-g-gers</p>
        </Link>
      </NavbarBrand>
      <NavbarContent
        className="hidden sm:flex gap-4"
        justify="center"
      ></NavbarContent>
      <NavbarContent justify="end">
        {session ? (
          <>
            <NavbarItem>
              <Button
                onPress={onOpen}
                variant="flat"
                className="theme-color font-semibold"
              >
                Create Post
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                href={`/protected/${session.user?.name}`}
                variant="flat"
                className="theme-color font-semibold"
              >
                Dashboard
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                color="primary"
                variant="flat"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="font-semibold text-lg"
              >
                Log out
              </Button>
            </NavbarItem>
          </>
        ) : (
          <NavbarItem className="hidden lg:flex">
            <Button
              as={Link}
              color="primary"
              variant="flat"
              className="font-semibold text-lg"
              href="/signin"
            >
              Sign In
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
      <PostModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        setfunction={setIsNewAdded}
      />
    </Navbar>
  );
};

export default Appbar;
