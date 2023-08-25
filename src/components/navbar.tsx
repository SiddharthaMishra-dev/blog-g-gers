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
import { useSession } from "next-auth/react";
import { FiEdit } from "react-icons/fi";

const Appbar = () => {
  const { data: session } = useSession();
  return (
    <Navbar className="bg-inherit" maxWidth="full">
      <NavbarBrand>
        <Link href="/">
          <p className="font-bold text-inherit">blog-g-gers</p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {/* <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem> */}
      </NavbarContent>
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
              <Button as={Link} color="primary" href="#" variant="flat">
                Log out
              </Button>
            </NavbarItem>
          </>
        ) : (
          <NavbarItem className="hidden lg:flex">
            <Link href="/signin">Sign in</Link>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
};

export default Appbar;
