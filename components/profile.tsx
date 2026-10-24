"use client";

import { AuthUser } from "@/types/api";
import { Send } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

type Props = {
  seller: AuthUser;
};

const BIO_MAX = 160;
const MAX_IMAGE_MB = 5;

const compact = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

function validate(v: { username: string; email: string; bio: string }) {
  const errors: Partial<Record<"username" | "email" | "bio", string>> = {};
  if (!/^[a-zA-Z0-9_.]{3,20}$/.test(v.username)) {
    errors.username = "3–20 characters: letters, numbers, dots or underscores.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (v.bio.length > BIO_MAX) {
    errors.bio = `Bio can be at most ${BIO_MAX} characters.`;
  }
  return errors;
}

/* -------------------------------- component ------------------------------- */

export default function ProfilePage({ seller }: Props) {
  const [errors, setErrors] = useState<ReturnType<typeof validate>>({});
  const [isEditing, setIsEditing] = useState(false);
  const uid = useId();

  const startEditing = () => {
    setIsEditing(true);
  };

  return (
    <main className="flex min-h-dvh justify-center bg-background sm:px-6 sm:py-10">
      <article className="w-full max-w-2xl overflow-hidden bg-card text-card-foreground sm:rounded-2xl sm:border sm:border-border sm:shadow-sm">
        {/* ------------------------------ banner ------------------------------ */}
        <div className="relative h-32 bg-gradient-to-br from-primary/80 via-primary/40 to-secondary sm:h-44">
          {!isEditing && (
            <button
              type="button"
              onClick={startEditing}
              className="absolute right-3 top-3 inline-flex items-center gap-2 rounded-full border border-border bg-background/85 px-3 py-2 text-sm font-medium text-foreground backdrop-blur transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:right-5 sm:top-5"
            >
              <PencilIcon className="size-4" />
            </button>
          )}
        </div>

        <div className="px-4 pb-8 sm:px-8">
          {/* ------------------------------ avatar ----------------------------- */}
          <div className="-mt-12 flex items-end sm:-mt-16">
            <div className="relative">
              <div className="flex size-24 items-center justify-center overflow-hidden rounded-full border-4 border-card bg-muted text-2xl font-semibold text-secondary-foreground sm:size-32 sm:text-3xl">
                {seller.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={seller.avatar}
                    alt={`${seller.username}'s avatar`}
                    className="size-full object-cover"
                  />
                ) : (
                  <span aria-hidden>{seller.username[0].toUpperCase()}</span>
                )}
              </div>

              {isEditing && (
                <button
                  type="button"
                  //   onClick={() => fileInputRef.current?.click()}
                  aria-label="Change profile photo"
                  className="absolute bottom-0 right-0 flex size-9 items-center justify-center rounded-full border-2 border-card bg-primary text-primary-foreground shadow-sm transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card sm:size-10"
                >
                  <CameraIcon className="size-4 sm:size-5" />
                </button>
              )}

              <input
                // ref={fileInputRef}
                type="file"
                accept="image/*"
                className="sr-only"
                // onChange={handleFilePick}
                tabIndex={-1}
              />
            </div>
          </div>

          {true && (
            <p role="alert" className="mt-2 text-sm text-destructive">
              {"avatar error happen"}
            </p>
          )}

          {/* --------------------------- view / edit body --------------------------- */}
          {isEditing ? (
            <form
              //   onSubmit={handleSubmit}
              noValidate
              className="mt-5 space-y-5"
            >
              <Field
                id={`${uid}-username`}
                label="Username"
                error={errors.username}
                hint="Must be unique."
              >
                <div className="flex items-center rounded-lg border border-input bg-background focus-within:ring-2 focus-within:ring-ring">
                  <span className="pl-3 text-muted-foreground" aria-hidden>
                    @
                  </span>
                  <input
                    id={`${uid}-username`}
                    value={seller.username}
                    // onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                    autoCapitalize="none"
                    spellCheck={false}
                    aria-invalid={!!errors.username}
                    className="w-full bg-transparent px-2 py-2.5 text-base outline-none placeholder:text-muted-foreground"
                  />
                </div>
              </Field>

              <Field
                id={`${uid}-email`}
                label="Email"
                error={errors.email}
                hint="Must be unique."
              >
                <input
                  id={`${uid}-email`}
                  type="email"
                  value={seller.email}
                  //   onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-base outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </Field>

              <Field id={`${uid}-bio`} label="Bio" error={errors.bio}>
                <textarea
                  id={`${uid}-bio`}
                  value={seller.bio}
                  //   onChange={(e) => setBio(e.target.value)}
                  rows={4}
                  placeholder="Tell buyers what your shop is about."
                  aria-invalid={!!errors.bio}
                  className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2.5 text-base outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                />
                <p
                  className={`mt-1 text-right text-xs ${
                    161 > BIO_MAX ? "text-destructive" : "text-muted-foreground"
                  }`}
                >
                  {161}/{BIO_MAX}
                </p>
              </Field>

              {true && (
                <p role="alert" className="text-sm text-destructive">
                  {"save error happen here"}
                </p>
              )}

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  //   onClick={cancelEditing}
                  //   disabled={saving}
                  className="rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  //   disabled={saving}
                  className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card disabled:opacity-60"
                >
                  {true ? "Saving…" : "Save changes"}
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="mt-4 min-w-0">
                <h1 className="truncate text-2xl font-bold tracking-tight sm:text-3xl">
                  {seller.username}
                </h1>
                <p className="truncate text-sm text-muted-foreground sm:text-base">
                  {seller.email}
                </p>
              </div>

              {/* stats */}
              <dl className="mt-5 grid grid-cols-2 divide-x divide-border rounded-xl border border-border bg-background">
                <Stat label="Followers" value={compact.format(1240)} />
                <Stat label="Following" value={compact.format(11)} />
              </dl>

              {/* bio */}
              <p className="mt-5 whitespace-pre-line text-base leading-relaxed text-foreground/90">
                {seller.bio || (
                  <span className="text-muted-foreground">
                    No bio yet. Add one so buyers know your shop.
                  </span>
                )}
              </p>

              {/* actions */}
              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  className="flex-1 rounded-full bg-primary px-5 py-3 text-[16px] font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card cursor-pointer"
                >
                  Follow
                </button>
                <button
                  type="button"
                  className="flex-1 flex justify-center items-center rounded-full bg-secondary px-5 py-3 text-[16px] font-semibold text-secondary-foreground transition-colors hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
                >
                  <span className="flex items-center">Message</span>
                </button>
              </div>
            </>
          )}
        </div>
      </article>
    </main>
  );
}

/* ------------------------------ small pieces ------------------------------ */

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-4 py-3 text-center">
      <dd className="text-xl font-bold tabular-nums sm:text-2xl">{value}</dd>
      <dt className="text-xs text-muted-foreground sm:text-sm">{label}</dt>
    </div>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 flex items-baseline justify-between text-sm font-medium"
      >
        {label}
        {hint && (
          <span className="text-xs font-normal text-muted-foreground">
            {hint}
          </span>
        )}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1 text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

function PencilIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

function CameraIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}
