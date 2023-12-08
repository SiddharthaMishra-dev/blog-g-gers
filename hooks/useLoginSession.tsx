"use client";

import { useSession } from "next-auth/react";

export const useLoginSession = () => {
  const { data: session } = useSession();
  if (!session) {
    return null;
  }
  return session;
};
