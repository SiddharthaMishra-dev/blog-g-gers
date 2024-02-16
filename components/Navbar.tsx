"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  useDisclosure,
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";

const PostModal = dynamic(() => import("./PostModal"));

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
          <p className="text-xl font-bold text-inherit">blog-g-ers</p>
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
                  variant="light"
                  className="font-semibold"
                >
                  Create Post
                </Button>
              </NavbarItem>
              <NavbarItem>
                <Button
                  as={Link}
                  href={`/protected/${session.user?.name}`}
                  variant="light"
                  className=" font-semibold"
                >
                  Dashboard
                </Button>
              </NavbarItem>
              <NavbarItem>
                <Button
                  as={Link}
                  color="danger"
                  variant="light"
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
              // color="primary"
              variant="light"
              className="font-semibold text-lg"
              href="/signin"
            >
              Sign in
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
