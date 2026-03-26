"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");

    console.log("token - ", token);

    if (!token) {
      router.push("/login");
      return;
    }

    fetch("/api/set-cookie", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    }).then(() => {
      router.push("/home");
    });
  }, []);

  return <p>Logging you in...</p>;
}
