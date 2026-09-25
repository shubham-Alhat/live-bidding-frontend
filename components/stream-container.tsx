"use client";

import { useState } from "react";
import PreviewStage from "./preview-stage";
import { Show } from "@/types/api";

export default function StreamContainer({
  show,
  isMobile,
  initialToken,
}: {
  show: Show;
  isMobile: boolean;
  initialToken: string | undefined;
}) {
  if (show.status === "SCHEDULED") {
    return (
      <>
        <PreviewStage show={show} isMobile={isMobile} />
      </>
    );
  }
}
