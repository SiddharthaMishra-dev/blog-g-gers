"use client";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";

export default function Provider({ children }: any) {
  return (
    <NextUIProvider>
      <SessionProvider>
        <main className="dark">{children}</main>
      </SessionProvider>
    </NextUIProvider>
  );
}
