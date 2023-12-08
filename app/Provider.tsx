"use client";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";

export default function Provider({ children }: any) {
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
