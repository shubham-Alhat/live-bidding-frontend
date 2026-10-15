import { cookies } from "next/headers";
import { cache } from "react";
import api from "./api";
import { ApiResponse, AuthUser } from "@/types/api";

export const getSeller = cache(
  async (): Promise<null | { seller: AuthUser; sellerToken: string }> => {
    const token = (await cookies()).get("accessToken")?.value;

    if (!token) return null;

    console.log("api call to backend..");

    try {
      const res = await api.get<ApiResponse<AuthUser>>(
        `${process.env.INTERNAL_API_URL}/auth/get-seller`,
        {
          headers: {
            Cookie: `accessToken=${token}`,
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.data.data) return null;

      return { seller: res.data.data, sellerToken: token };
    } catch (error) {
      console.log(error);
      return null;
    }
  },
);
