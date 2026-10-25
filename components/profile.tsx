"use client";

import { ApiResponse, AuthUser } from "@/types/api";
import { useEffect, useId, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import api, { getErrorMessage } from "@/utils/api";
import { ImageUp, X } from "lucide-react";

type Props = { seller: AuthUser };
type Values = { username: string; email: string; bio: string };

const BIO_MAX = 160;
const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const KEYS = ["username", "email", "bio"] as const;

const compact = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

/* ------------------------------- helpers ---------------------------------- */

const toValues = (u: AuthUser): Values => ({
  username: u.username,
  email: u.email,
  bio: u.bio ?? "",
});

const clean = (v: Values): Values => ({
  username: v.username.trim(),
  email: v.email.trim(),
  bio: v.bio.trim(),
});

// returns the first error found, or null if everything is valid
function validate({ username, email, bio }: Values, hasAvatar: boolean) {
  if (!hasAvatar) return "Please add a profile photo.";

  if (!username) return "Username is required.";
  if (username.length < 3) return "Username must be at least 3 characters.";
  if (username.length > 20) return "Username can be at most 20 characters.";
  if (!/^[a-zA-Z0-9_. ]+$/.test(username))
    return "Only letters, numbers, spaces, dots and underscores are allowed.";
  if (/\s{2,}/.test(username))
    return "Username can't have multiple spaces in a row.";

  if (!email) return "Email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return "Enter a valid email address, like name@example.com.";

  if (!bio) return "Please add a bio so buyers can know your shop!";
  if (bio.length > BIO_MAX)
    return `Bio is ${bio.length} characters. The limit is ${BIO_MAX}.`;

  return null;
}

/* ------------------------------- component -------------------------------- */

export default function ProfilePage({ seller }: Props) {
  const uid = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const [saved, setSaved] = useState(seller); // source of truth (last saved data)
  const [form, setForm] = useState<Values>(toValues(seller)); // editable draft
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // create the preview URL from the file, and free it on change/unmount
  useEffect(() => {
    if (!image) {
      setPreview(null);
      return;
    }

    const url = URL.createObjectURL(image);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [image]);

  const avatarSrc = image ? preview : saved.avatar;

  // true only if something actually differs from the saved profile
  const base = clean(toValues(saved));
  const draft = clean(form);
  const isDirty = !!image || KEYS.some((k) => draft[k] !== base[k]);

  const update =
    (key: keyof Values) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const startEditing = () => {
    setForm(toValues(saved)); // always start from the saved data
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setImage(null);
    setIsEditing(false);
  };

  const removeImage = () => setImage(null);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-selecting the same file
    if (!file) return;

    if (!file.type.startsWith("image/"))
      return void toast.warning("Invalid file", {
        description: "Please select an image",
      });

    if (file.size > MAX_SIZE)
      return void toast.warning("File too large", {
        description: "Image size should be less than 5MB",
      });

    setImage(file);
  };

  const handleSubmit = async () => {
    if (!isDirty || loading) return;

    const error = validate(draft, !!avatarSrc);
    if (error)
      return void toast.warning("Fix this first", { description: error });

    const body = new FormData();
    if (image) body.append("image", image);
    KEYS.forEach((k) => body.append(k, draft[k]));

    console.log(image);

    setLoading(true);
    try {
      const res = await api.post<ApiResponse<AuthUser>>("/auth/profile", body, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (!res.data.data) return void toast.error("User data not found");

      setSaved(res.data.data); // new baseline
      setImage(null);
      setIsEditing(false);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(getErrorMessage(error)); // draft + image are kept so user can retry
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-dvh justify-center bg-background sm:px-6 sm:py-10">
      <article className="w-full max-w-2xl overflow-hidden bg-card text-card-foreground sm:rounded-2xl sm:border sm:border-border sm:shadow-sm">
        {/* banner */}
        <div className="relative h-36 bg-linear-to-br from-primary/80 via-primary/40 to-secondary sm:h-44">
          {!isEditing && (
            <button
              type="button"
              onClick={startEditing}
              aria-label="Edit profile"
              className="absolute right-3 top-3 inline-flex items-center gap-2 rounded-full border border-border bg-background/85 px-3 py-2 text-sm font-medium text-foreground backdrop-blur transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:right-5 sm:top-5"
            >
              <PencilIcon className="size-4" />
            </button>
          )}
        </div>

        <div className="px-4 pb-8 sm:px-8">
          {/* avatar */}
          <div className="-mt-12 flex items-end sm:-mt-16">
            <div className="relative">
              <div className="flex size-24 items-center justify-center overflow-hidden rounded-full border-4 border-card bg-muted text-2xl font-semibold text-secondary-foreground sm:size-32 sm:text-3xl">
                {avatarSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={avatarSrc}
                    alt={`${saved.username}'s avatar`}
                    className="size-full object-cover"
                  />
                ) : (
                  <span className="text-primary" aria-hidden>
                    {saved.username[0]?.toUpperCase()}
                  </span>
                )}
              </div>

              {isEditing && (
                <button
                  type="button"
                  onClick={
                    image ? removeImage : () => inputRef.current?.click()
                  }
                  disabled={loading}
                  aria-label={
                    image ? "Remove selected photo" : "Change profile photo"
                  }
                  className="absolute bottom-0 right-0 flex size-9 items-center justify-center rounded-full border-2 border-card bg-primary text-primary-foreground shadow-sm transition-transform cursor-pointer"
                >
                  {image ? <X size={20} /> : <UserAvatarIcon />}
                </button>
              )}

              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleImage}
                tabIndex={-1}
              />
            </div>
          </div>

          {isEditing ? (
            <div className="mt-3">
              <Field
                id={`${uid}-username`}
                label="Username"
                hint="Must be unique."
              >
                <div className="flex items-center rounded-lg border border-input bg-background focus-within:ring-2 focus-within:ring-ring">
                  <span className="pl-3 text-muted-foreground" aria-hidden>
                    @
                  </span>
                  <input
                    id={`${uid}-username`}
                    value={form.username}
                    onChange={update("username")}
                    disabled={loading}
                    autoComplete="username"
                    autoCapitalize="none"
                    spellCheck={false}
                    className="w-full bg-transparent px-2 py-2.5 text-base outline-none placeholder:text-muted-foreground"
                  />
                </div>
              </Field>

              <Field id={`${uid}-email`} label="Email" hint="Must be unique.">
                <input
                  id={`${uid}-email`}
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  disabled={loading}
                  autoComplete="email"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-base outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </Field>

              <Field id={`${uid}-bio`} label="Bio">
                <textarea
                  maxLength={160}
                  id={`${uid}-bio`}
                  value={form.bio}
                  onChange={update("bio")}
                  disabled={loading}
                  rows={4}
                  placeholder="Tell buyers what your shop is about."
                  className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2.5 text-base outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                />
                <p
                  className={`mt-1 text-right text-xs ${
                    form.bio.length > BIO_MAX
                      ? "text-destructive"
                      : "text-muted-foreground"
                  }`}
                >
                  {form.bio.length}/{BIO_MAX}
                </p>
              </Field>

              <div className="mt-3 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <Button
                  onClick={cancelEditing}
                  disabled={loading}
                  className="shrink-0 cursor-pointer font-semibold active:scale-95"
                >
                  Cancel
                </Button>

                <Button
                  onClick={handleSubmit}
                  disabled={loading || !isDirty}
                  className="shrink-0 cursor-pointer bg-secondary font-semibold text-primary hover:bg-secondary/85 active:scale-95 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      Saving...
                    </>
                  ) : (
                    "Save changes"
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="mt-4 min-w-0">
                <h1 className="truncate text-2xl font-bold tracking-tight sm:text-3xl">
                  {saved.username}
                </h1>
                <p className="truncate text-sm text-muted-foreground sm:text-base">
                  {saved.email}
                </p>
              </div>

              <dl className="mt-5 grid grid-cols-2 divide-x divide-border rounded-xl border border-border bg-background">
                <Stat label="Followers" value={compact.format(1240)} />
                <Stat label="Following" value={compact.format(11)} />
              </dl>

              <p className="mt-5 whitespace-pre-line text-base leading-relaxed text-foreground/90">
                {saved.bio || (
                  <span className="text-muted-foreground">
                    No bio yet. Add one so buyers know your shop.
                  </span>
                )}
              </p>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  className="flex-1 cursor-pointer rounded-full bg-primary px-5 py-3 text-[16px] font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                >
                  Follow
                </button>
                <button
                  type="button"
                  className="flex flex-1 cursor-pointer items-center justify-center rounded-full bg-secondary px-5 py-3 text-[16px] font-semibold text-secondary-foreground transition-colors hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Message
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
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-3">
      <label
        htmlFor={id}
        className="mb-1.5 flex items-baseline justify-between text-sm font-medium text-primary/80"
      >
        {label}
        {hint && (
          <span className="text-xs font-normal text-muted-foreground">
            {hint}
          </span>
        )}
      </label>
      {children}
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

export const UserAvatarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    {...props}
  >
    <g fill="#FF5F1F">
      <path d="m15.011 8.248l.739 1.715l1.86.172l-1.404 1.232l.41 1.822l-1.605-.953l-1.605.953l.41-1.822l-1.402-1.232l1.859-.172zm-4.019 2.732a1.987 1.987 0 1 1-3.974 0a1.987 1.987 0 0 1 3.974 0" />
      <path
        fillRule="evenodd"
        d="M12 2a9 9 0 0 0-9 9v4H1v2h2v5h18v-5h2v-2h-2v-4a9 9 0 0 0-9-9m-7 9a7 7 0 0 1 14 0v9H5z"
        clipRule="evenodd"
      />
    </g>
  </svg>
);
