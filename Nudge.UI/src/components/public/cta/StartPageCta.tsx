"use client";

import { useEffect, useRef, useState } from "react";

export interface StartPageCtaProps {
  /** Domain prefix shown before the handle, e.g. "nudge.np/" */
  domainPrefix?: string;
  /** Handles cycled through as an animated placeholder when the field is empty and unfocused */
  exampleHandles?: string[];
  onSubmit?: (handle: string) => void;
  isSubmitting?: boolean;
}

const DEFAULT_HANDLES = ["kathmandu_heritage", "prakriti_music", "sisan_baniya", "alina_sketches"];

export function StartPageCta({
  domainPrefix = "nudge.com/",
  exampleHandles = DEFAULT_HANDLES,
  onSubmit,
  isSubmitting = false,
}: StartPageCtaProps) {
  const [handle, setHandle] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [placeholder, setPlaceholder] = useState(exampleHandles[0] ?? "");
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (isFocused || handle !== "" || exampleHandles.length === 0) return;

    let handleIndex = 0;
    let charIndex = exampleHandles[0].length;
    let isDeleting = true;

    function tick() {
      const word = exampleHandles[handleIndex];
      charIndex += isDeleting ? -1 : 1;
      setPlaceholder(word.substring(0, charIndex));

      let speed = isDeleting ? 40 : 80;
      if (!isDeleting && charIndex === word.length) {
        speed = 2200;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        handleIndex = (handleIndex + 1) % exampleHandles.length;
        speed = 400;
      }
      timeoutRef.current = setTimeout(tick, speed);
    }

    timeoutRef.current = setTimeout(tick, 1500);
    return () => clearTimeout(timeoutRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, handle]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!handle.trim()) return;
    onSubmit?.(handle.trim());
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl p-2 bg-surface-container-lowest rounded-full border-2 border-outline-variant shadow-md focus-within:border-primary-container transition-all flex flex-col sm:flex-row items-center gap-2"
    >
      <div className="flex items-center px-3 py-1.5 w-full sm:w-auto grow text-on-surface-variant font-label-md text-label-md">
        <span className="text-outline font-medium select-none">{domainPrefix}</span>
        <input
          type="text"
          autoComplete="off"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full bg-transparent border-0 focus:ring-0 text-on-surface font-semibold placeholder-outline/70 p-0 pl-1 text-sm focus:outline-none"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto whitespace-nowrap bg-primary-container hover:bg-primary text-on-primary px-6 py-3 rounded-full font-label-md text-label-md shadow transition-transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-60"
      >
        <span>{isSubmitting ? "Checking…" : "Start My Page (Free)"}</span>
      </button>
    </form>
  );
}
