export default async function LivePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <div>Live ID: {id}</div>;
}

// for client component --> use "use" from react

// "use client";
// import { use } from "react";

// export default function LivePage({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = use(params);
//   return <div>Live ID: {id}</div>;
// }
