"use client";

import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Link,
  useDisclosure,
} from "@nextui-org/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession, signOut } from "next-auth/react";
import PostModal from "./PostModal";
import { useRouter } from "next/navigation";
import { IoMenu } from "react-icons/io5";

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
      className="bg-inherit h-[75px] "
      maxWidth="full"
    >
      <NavbarBrand>
        <Link href="/">
          <p className="text-xl font-bold text-inherit">blog-g-gers</p>
        </Link>
      </NavbarBrand>
      <NavbarContent
        justify="end"
        className="relative"
      >
        {session ? (
          <>
            <div className="hidden sm:flex sm:gap-x-6">
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
            </div>
            <div className="sm:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <IoMenu className="text-2xl" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    <Link
                      href={`/protected/${session.user?.name}`}
                      className="text-blue-600"
                    >
                      Dashboard
                    </Link>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-blue-600 font-semibold text-md">
                    Create a post
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="text-red-400 font-semibold text-md"
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        ) : (
          <NavbarItem className="lg:flex">
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
