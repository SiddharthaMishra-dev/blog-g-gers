"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { useSession, signOut } from "next-auth/react";
import { FiEdit } from "react-icons/fi";

const Appbar = () => {
  const { data: session } = useSession();
  return (
    <Navbar className="bg-inherit h-[75px]" maxWidth="full">
      <NavbarBrand>
        <Link href="/">
          <p className="font-bold text-inherit">blog-g-gers</p>
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
              <Button as={Link} color="primary" href={"/create"} variant="flat">
                <FiEdit />
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                color="primary"
                href={`/protected/${session.user?.name}`}
                variant="flat"
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
                className="font-medium text-lg"
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
              className="font-medium text-lg"
              href="/signin"
            >
              Sign In
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
};

export default Appbar;
