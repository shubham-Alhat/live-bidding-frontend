import { MainUser } from "@/types/api";
import { headers } from "next/headers";
import { cache } from "react";

export const getAuth = cache(async () => {
  const h = await headers();
  const raw = h.get("x-auth-user");
  const token = h.get("x-auth-token");

  if (!raw || !token) return { user: null, token: undefined };

  try {
    const user = JSON.parse(decodeURIComponent(raw)) as MainUser;
    return { user, token };
  } catch {
    return { user: null, token: undefined };
  }
});
