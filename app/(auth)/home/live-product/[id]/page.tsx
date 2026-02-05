import LiveProductsPage from "@/components/live-product";

async function LiveProductStatus({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <>
      <LiveProductsPage />
    </>
  );
}

export default LiveProductStatus;
