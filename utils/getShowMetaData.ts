import { cache } from "react";

export const getShowMetaData = cache(async (id: string) => {
  const res = await fetch(`${process.env.INTERNAL_API_URL}/show/public/${id}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return null;
  return res.json();
});
