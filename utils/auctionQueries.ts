import api from "@/utils/api";
import { ApiRes, Auction } from "@/types/api";

export const fetchAllLiveAuctions = async () => {
  const res = await api.get<ApiRes<Auction[] | []>>("/auction/get-all");
  return res.data.data;
};
