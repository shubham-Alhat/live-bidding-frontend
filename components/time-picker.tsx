"use client";

import { useEffect, useId, useState } from "react";

export type TimeParts = {
  hour12?: number;
  minute?: number;
  period?: "AM" | "PM";
};

type Props = {
  hours: number; // 1-12, derived from parent's value
  minutes: number; // 0-59
  periods: "AM" | "PM";
  /** Parent validates and applies. Returns an error message, or null on success. */
  onChange: (parts: TimeParts) => string | null;
};

const pad = (n: number) => String(n).padStart(2, "0");
const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));

const timeInput =
  "w-full max-w-16 h-16 rounded-xl text-center text-[28px] tabular-nums " +
  "outline-none caret-red-500 focus:text-primary " +
  "transition-colors duration-200 ease-out";

const label =
  "relative z-10 flex h-1/2 cursor-pointer select-none items-center justify-center " +
  "text-base font-medium text-muted-foreground transition-colors duration-300";

export default function TimePicker({
  hours,
  minutes,
  periods,
  onChange,
}: Props) {
  const uid = useId();

  // Drafts let the user type freely; parent value stays the source of truth.
  const [hourDraft, setHourDraft] = useState(pad(hours));
  const [minuteDraft, setMinuteDraft] = useState(pad(minutes));
  const [error, setError] = useState<string | null>(null);

  // Parent -> child sync (toggle default, day change, rejected edits, etc.)
  useEffect(() => setHourDraft(pad(hours)), [hours]);
  useEffect(() => setMinuteDraft(pad(minutes)), [minutes]);

  // Auto-dismiss message
  useEffect(() => {
    if (!error) return;
    const t = setTimeout(() => setError(null), 2500);
    return () => clearTimeout(t);
  }, [error]);

  const apply = (parts: TimeParts) => {
    const err = onChange(parts);
    setError(err);
    if (err) {
      // Rejected: snap drafts back to the parent's value
      setHourDraft(pad(hours));
      setMinuteDraft(pad(minutes));
    }
  };

  const commitHour = () => {
    const n = clamp(parseInt(hourDraft, 10) || 12, 1, 12);
    if (n === hours) return setHourDraft(pad(hours));
    apply({ hour12: n });
  };

  const commitMinute = () => {
    const n = clamp(parseInt(minuteDraft, 10) || 0, 0, 59);
    if (n === minutes) return setMinuteDraft(pad(minutes));
    apply({ minute: n });
  };

  const onEnter = (commit: () => void) => (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      commit();
    }
  };

  const digits = (v: string) => v.replace(/\D/g, "").slice(0, 2);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Hour */}
        <input
          type="text"
          inputMode="numeric"
          value={hourDraft}
          aria-label="Hour"
          className={timeInput}
          onChange={(e) => setHourDraft(digits(e.target.value))}
          onBlur={commitHour}
          onKeyDown={onEnter(commitHour)}
        />

        <div className="flex flex-col gap-2" aria-hidden>
          <span className="size-1 rounded-full bg-muted-foreground" />
          <span className="size-1 rounded-full bg-muted-foreground" />
        </div>

        {/* Minute */}
        <input
          type="text"
          inputMode="numeric"
          value={minuteDraft}
          aria-label="Minutes"
          className={timeInput}
          onChange={(e) => setMinuteDraft(digits(e.target.value))}
          onBlur={commitMinute}
          onKeyDown={onEnter(commitMinute)}
        />

        {/* AM / PM */}
        <div
          role="radiogroup"
          aria-label="AM or PM"
          className="relative ml-1 h-16 w-full max-w-16 overflow-hidden"
        >
          <input
            type="radio"
            name={`${uid}-meridiem`}
            id={`${uid}-am`}
            checked={periods === "AM"}
            onChange={() => apply({ period: "AM" })}
            className="peer/am sr-only"
          />
          <input
            type="radio"
            name={`${uid}-meridiem`}
            id={`${uid}-pm`}
            checked={periods === "PM"}
            onChange={() => apply({ period: "PM" })}
            className="peer/pm sr-only"
          />

          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-1/2 rounded-xl bg-secondary
                       transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                       peer-checked/pm:translate-y-full"
          />

          <label
            htmlFor={`${uid}-am`}
            className={`${label} peer-checked/am:text-primary`}
          >
            AM
          </label>
          <label
            htmlFor={`${uid}-pm`}
            className={`${label} peer-checked/pm:text-primary`}
          >
            PM
          </label>
        </div>
      </div>

      {error && (
        <p
          role="alert"
          className="mt-2 text-sm text-red-500 transition-all duration-300 ease-in"
        >
          {error}
        </p>
      )}
    </div>
  );
}
