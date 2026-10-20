"use client";

import React, { useEffect, useRef, useState } from "react";
import { Images, X } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export function MediaUploader() {
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<string | null>(null);

  const revokeUrl = () => {
    if (urlRef.current) {
      URL.revokeObjectURL(urlRef.current);
      urlRef.current = null;
    }
  };

  // free the blob URL when the component unmounts
  useEffect(() => {
    return () => revokeUrl();
  }, []);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-selecting the same file later
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.warning("Invalid file", { description: "Please select an image" });
      return;
    }

    if (file.size > MAX_SIZE) {
      toast.warning("File too large", {
        description: "Image size should be less than 5MB",
      });
      return;
    }

    revokeUrl();
    urlRef.current = URL.createObjectURL(file);
    setPreview(urlRef.current);
  };

  const handleRemove = () => {
    revokeUrl();
    setPreview(null);
  };

  return (
    <section className="relative my-3 w-full">
      <input
        ref={inputRef}
        onChange={handleImage}
        type="file"
        accept="image/*"
        tabIndex={-1}
        aria-hidden="true"
        className="sr-only"
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        aria-label={preview ? "Change product image" : "Upload product image"}
        className="relative flex h-56 w-full cursor-pointer flex-col items-center justify-center gap-1 overflow-hidden rounded-2xl border border-dashed border-muted bg-muted/40 px-4 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {preview ? (
          <Image
            src={preview}
            alt="Product image preview"
            fill
            unoptimized
            sizes="100vw"
            className="object-contain p-2"
          />
        ) : (
          <>
            <Images
              className="mb-2 size-9 text-foreground"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <span className="text-sm text-foreground">
              Upload product image
            </span>
          </>
        )}
      </button>

      {preview && (
        <button
          type="button"
          onClick={handleRemove}
          aria-label="Remove image"
          className="absolute right-2 top-2 rounded-full bg-destructive p-2 text-destructive-foreground hover:bg-destructive/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X className="size-3" strokeWidth={4} />
        </button>
      )}
    </section>
  );
}
