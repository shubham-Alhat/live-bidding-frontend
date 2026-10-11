import type { Livestream } from "./feed-nav";
import LivestreamCard from "./live-stream-card";

export default function LivestreamGrid({ streams }: { streams: Livestream[] }) {
  return (
    <div className="grid grid-cols-2 items-start gap-x-3 gap-y-3 sm:grid-cols-3 sm:gap-x-4 sm:gap-y-5 lg:grid-cols-4 lg:gap-x-5 lg:gap-y-7 min-[1500px]:grid-cols-5">
      {streams.map((s) => (
        <LivestreamCard key={s.id} stream={s} />
      ))}
    </div>
  );
}
