"use client";

import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { useSession, signOut } from "next-auth/react";

const Appbar = () => {
  const { data: session } = useSession();
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
                as={Link}
                // color="primary"
                href={"/create"}
                variant="flat"
                className="gradient_blue-dark font-semibold"
              >
                Create Post
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                href={`/protected/${session.user?.name}`}
                variant="flat"
                className="gradient_blue-dark font-semibold"
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
    </Navbar>
  );
};

export default Appbar;
