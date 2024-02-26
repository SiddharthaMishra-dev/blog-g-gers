"use client";
import { SessionProvider, useSession } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";
import { Session } from "next-auth";

interface Props {
  children: React.ReactNode;
  session?: Session;
}

export default function Provider({ children }: Props) {
  return (
    <NextUIProvider>
      <Toaster
        toastOptions={{
          style: {
            background: "#333",
            color: "#22c55e",
          },
        }}
      />
      <SessionProvider>
        <main className="dark">{children}</main>
      </SessionProvider>
    </NextUIProvider>
  );
}
