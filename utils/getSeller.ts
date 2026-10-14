import { cookies } from "next/headers";
import { cache } from "react";
import api from "./api";
import { Seller } from "@/types/api";

export const getSeller = cache(async (): Promise<null | Seller> => {
  const token = (await cookies()).get("accessToken")?.value;

  if (!token) return null;

  console.log("api call to backend..");

  try {
    const res = await api.get(
      `${process.env.INTERNAL_API_URL}/auth/get-seller`,
      {
        headers: {
          Cookie: `accessToken=${token}`,
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return res.data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
});
