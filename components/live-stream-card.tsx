import Image from "next/image";
import Link from "next/link";
import type { Livestream } from "./feed-nav";

export default function LivestreamCard({ stream }: { stream: Livestream }) {
  const { host, viewers, title, category, tags, thumbnailUrl, id } = stream;

  return (
    <section
      data-testid="livestream-card"
      className="flex w-full min-w-0 flex-col gap-1"
    >
      {/* host row — fixed height keeps thumbnails aligned across a row */}
      <Link
        href={`/user/${host.username}`}
        className="flex h-9 flex-none items-center gap-2 py-1"
      >
        <span className="relative flex size-6 flex-none items-center justify-center lg:size-[30px]">
          {host.avatarUrl ? (
            <Image
              src={host.avatarUrl}
              alt={host.username}
              fill
              sizes="30px"
              className="rounded-full object-cover"
            />
          ) : (
            <span className="flex size-full items-center justify-center rounded-full bg-indigo-600 text-[11px] font-bold text-white">
              {host.username[0].toUpperCase()}
            </span>
          )}
          {/* gold laurel */}
          {/* <span className="absolute -left-2 inset-y-0.5 w-2 rotate-12 rounded-full border-2 border-amber-400 border-r-transparent border-t-transparent" />
          <span className="absolute -right-2 inset-y-0.5 w-2 -rotate-12 rounded-full border-2 border-amber-400 border-l-transparent border-t-transparent" /> */}
        </span>
        <strong className="ml-1.5 truncate text-xs font-semibold lg:text-sm">
          {host.username}
        </strong>
      </Link>

      {/* thumbnail — 3:4 */}
      <Link
        href={`/live/${id}`}
        className="relative block aspect-3/4 w-full flex-none overflow-hidden rounded-lg bg-neutral-800"
      >
        {true && (
          <Image
            src={
              "https://res.cloudinary.com/diery17cm/image/upload/v1791629479/krqvmyyqqvsulmdi5e7c.jpg"
            }
            alt="Thumbnail for live show"
            fill
            sizes="(min-width:1500px) 20vw, (min-width:1024px) 22vw, (min-width:640px) 33vw, 50vw"
            className="object-cover"
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-transparent via-30% to-transparent" />
        <span className="absolute left-2.5 top-2.5 rounded bg-red-600 px-1.5 py-0.5 text-xs font-semibold leading-4 text-white">
          Live · {viewers}
        </span>
      </Link>

      {/* info */}
      <div className="flex flex-col gap-1 py-1">
        <Link
          href={`/live/${id}`}
          title={title}
          className="line-clamp-2 text-pretty text-sm font-semibold leading-5 lg:text-[15px]"
        >
          {title}
        </Link>
        <div className="flex items-center gap-1.5 overflow-hidden whitespace-nowrap text-xs leading-4 lg:text-sm">
          <Link
            href={`/tag/${encodeURIComponent(category)}`}
            className="flex-none font-semibold text-blue-600 dark:text-blue-400"
          >
            {category}
          </Link>
          {tags.length > 0 && (
            <>
              <span className="text-neutral-500">•</span>
              <span
                className="truncate text-neutral-500"
                title={tags.join(", ")}
              >
                {tags.join(", ")}
              </span>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
