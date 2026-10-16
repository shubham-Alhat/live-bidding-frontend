import { Show } from "@/types/api";
import { getShowMetaData } from "@/utils/getShowMetaData";
import type { Metadata } from "next";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  if (!id) return { title: "Leven Show Is Live" };

  const res = await getShowMetaData(id);
  const show = res.data as Show;

  if (!show) return { title: "Leven Show Is Live" };

  const url = `https://bidhub.in/show/${id}`;
  const description = show.description.slice(0, 160);

  return {
    title: show.name,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: show.name,
      description,
      url,
      siteName: "BidHub",
      type: "website",
      images: [
        { url: show.thumbnail, width: 1200, height: 630, alt: show.name },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: show.name,
      description,
      images: [show.thumbnail],
    },
  };
}

export default async function page({ params }: Props) {
  const { id } = await params;
  const res = await getShowMetaData(id);
  const show = res.data as Show;
  return (
    <>
      <div>
        <p>show name : {show.name}</p>
        <p>show description : {show.description}</p>
        <p>show status : {show.status}</p>
      </div>
    </>
  );
}
