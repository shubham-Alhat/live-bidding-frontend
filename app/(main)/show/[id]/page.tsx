import { Show } from "@/types/api";
import { getShowMetaData } from "@/utils/getShowMetaData";
import type { Metadata } from "next";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  if (!id) return { title: "Leven Show Is Live" };

  const res = await getShowMetaData(id);
  const show = res.data as Show;

  if (!show)
    return {
      title: "Leven | Buy & Sell Through Live Shows",
      description:
        "Leven is a live auction platform where you bid in real time, discover unique finds, and win deals worth bragging about. Find your next sale.",
      openGraph: {
        title: "Leven | Buy & Sell Through Live Shows",
        description:
          "Leven is a live auction platform where you bid in real time, discover unique finds, and win deals worth bragging about. Find your next sale.",
        url: "https://bidhub.in",
        siteName: "Leven",
        type: "website",
        images: [
          {
            url: "https://res.cloudinary.com/diery17cm/image/upload/v1792149580/copy_of_logo_bvyhil.png",
            width: 1200,
            height: 630,
            alt: "Leven | Buy & Sell Through Live Shows",
          },
        ],
      },
    };

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
      siteName: "Leven",
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
