"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Images, Plus, X } from "lucide-react";

const MIN_PHOTOS = 1;
const MAX_PHOTOS = 3;
const MAX_SIZE_MB = 5;

type Photo = { id: string; file: File; url: string };

type MediaUploaderProps = {
  /** Called with the current files whenever a photo is added or removed. */
  onChange?: (files: File[]) => void;
  /** Pass true after a failed submit to show the "at least 1 photo" error. */
  invalid?: boolean;
};

export function MediaUploader({
  onChange,
  invalid = false,
}: MediaUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const headingId = useId();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [message, setMessage] = useState("");
  const [dragging, setDragging] = useState(false);

  // Keep a ref so the unmount cleanup can revoke every remaining blob URL.
  const photosRef = useRef<Photo[]>([]);
  useEffect(() => {
    photosRef.current = photos;
  }, [photos]);
  useEffect(() => {
    return () => photosRef.current.forEach((p) => URL.revokeObjectURL(p.url));
  }, []);

  function commit(next: Photo[]) {
    setPhotos(next);
    onChange?.(next.map((p) => p.file));
  }

  function addFiles(list: FileList | null) {
    if (!list || list.length === 0) return;

    const incoming = Array.from(list);
    const images = incoming.filter((f) => f.type.startsWith("image/"));
    const valid = images.filter((f) => f.size <= MAX_SIZE_MB * 1024 * 1024);
    const room = MAX_PHOTOS - photos.length;

    let error = "";
    if (images.length < incoming.length)
      error = "Only image files are allowed.";
    else if (valid.length < images.length)
      error = `Each photo must be under ${MAX_SIZE_MB} MB.`;
    if (valid.length > room) error = `You can add up to ${MAX_PHOTOS} photos.`;
    setMessage(error);

    const accepted = valid.slice(0, Math.max(room, 0)).map((file) => ({
      id: crypto.randomUUID(),
      file,
      url: URL.createObjectURL(file),
    }));
    if (accepted.length > 0) commit([...photos, ...accepted]);
  }

  function removePhoto(id: string) {
    const target = photos.find((p) => p.id === id);
    if (target) URL.revokeObjectURL(target.url);
    setMessage("");
    commit(photos.filter((p) => p.id !== id));
  }

  function openPicker() {
    inputRef.current?.click();
  }

  const dropHandlers = {
    onDragOver: (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(true);
    },
    onDragLeave: () => setDragging(false),
    onDrop: (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      addFiles(e.dataTransfer.files);
    },
  };

  const showRequiredError = invalid && photos.length < MIN_PHOTOS;

  return (
    <section
      aria-labelledby={headingId}
      aria-label={headingId}
      className="w-full"
    >
      {/* <h2
        id={headingId}
        className="text-[16px] text-foreground w-full flex justify-center items-center"
      >
        Media
      </h2> */}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        tabIndex={-1}
        aria-hidden="true"
        className="sr-only"
        onChange={(e) => {
          addFiles(e.target.files);
          e.target.value = ""; // lets the same file be picked again after removal
        }}
      />

      {photos.length === 0 ? (
        <button
          type="button"
          onClick={openPicker}
          {...dropHandlers}
          aria-invalid={showRequiredError}
          className={`mt-2 flex w-full flex-col items-center justify-center gap-1 rounded-2xl border border-dashed px-4 py-14 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
            dragging
              ? "border-primary bg-accent"
              : "border-border bg-muted hover:bg-accent"
          } ${showRequiredError ? "border-destructive" : ""}`}
        >
          <Images
            className="mb-2 size-9 text-foreground"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <span className="text-sm font-semibold text-foreground">
            Photos / Scan
          </span>
          <span className="text-sm text-muted-foreground">
            {MIN_PHOTOS} photo required{" "}
          </span>
        </button>
      ) : (
        <ul className="mt-4 grid grid-cols-3 gap-3" {...dropHandlers}>
          {photos.map((photo, index) => (
            <li
              key={photo.id}
              className="relative aspect-square overflow-hidden rounded-xl border border-border bg-muted"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.url}
                alt={`Product photo ${index + 1} of ${photos.length}`}
                className="size-full object-cover"
              />
              <button
                type="button"
                onClick={() => removePhoto(photo.id)}
                aria-label={`Remove photo ${index + 1}`}
                className="absolute right-1.5 top-1.5 flex size-6 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </li>
          ))}

          {photos.length < MAX_PHOTOS && (
            <li>
              <button
                type="button"
                onClick={openPicker}
                aria-label="Add another photo"
                className={`flex aspect-square w-full flex-col items-center justify-center gap-1 rounded-xl border border-dashed text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  dragging
                    ? "border-primary bg-accent"
                    : "border-border bg-muted hover:bg-accent"
                }`}
              >
                <Plus className="size-6" aria-hidden="true" />
                <span className="text-xs">Add</span>
              </button>
            </li>
          )}
        </ul>
      )}

      <p className="mt-3 text-sm text-muted-foreground w-full flex justify-center items-center">
        Photos: {photos.length}/{MAX_PHOTOS}
      </p>

      {(message || showRequiredError) && (
        <p role="alert" className="mt-1 text-sm text-destructive">
          {message || "Add at least 1 photo to continue."}
        </p>
      )}
    </section>
  );
}
