"use client";

import React, { useEffect, useRef, useState } from "react";

type CursorType = "default" | "pointer" | "text";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [cursorType, setCursorType] = useState<CursorType>("default");

  useEffect(() => {
    // 1. Guard touch devices immediately before mounting
    const isTouchDevice =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;

    if (isTouchDevice) {
      return;
    }

    setIsMounted(true);
    document.body.classList.add("custom-cursor-active");

    const onMouseMove = (e: MouseEvent) => {
      if (!hasMoved) setHasMoved(true);

      if (cursorRef.current) {
        const target = e.target as HTMLElement | null;
        const isTextInput = Boolean(
          target?.closest(
            "input:not([type='button']):not([type='submit']):not([type='checkbox']):not([type='radio']), textarea, [contenteditable='true']"
          )
        );
        const isClickable = Boolean(
          target?.closest(
            "a, button, [role='button'], input[type='button'], input[type='submit'], select, [data-cursor='pointer']"
          )
        );

        let offsetX = -2.5;
        let offsetY = -2;

        if (isTextInput) {
          offsetX = -4.5;
          offsetY = -7.5;
        } else if (isClickable) {
          offsetX = -4;
          offsetY = -1;
        }

        cursorRef.current.style.transform = `translate3d(${e.clientX + offsetX}px, ${e.clientY + offsetY}px, 0)`;
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isTextInput = Boolean(
        target.closest(
          "input:not([type='button']):not([type='submit']):not([type='checkbox']):not([type='radio']), textarea, [contenteditable='true']"
        )
      );

      if (isTextInput) {
        setCursorType("text");
        return;
      }

      const isClickable = Boolean(
        target.closest(
          "a, button, select, [role='button'], input[type='button'], input[type='submit'], [data-cursor='pointer']"
        )
      );

      if (isClickable) {
        setCursorType("pointer");
      } else {
        setCursorType("default");
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
    };
  }, [hasMoved]);

  if (!isMounted) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{
        transform: "translate3d(-100px, -100px, 0)",
        opacity: hasMoved ? 1 : 0,
      }}
      className="pointer-events-none fixed top-0 left-0 z-[2147483647] will-change-transform"
    >
      {/* 1. COMPACT TEXT I-BEAM CURSOR */}
      {cursorType === "text" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="15"
          viewBox="0 0 10 15"
          fill="none"
          className="select-none block drop-shadow-[0_1px_2px_rgba(74,24,7,0.35)]"
        >
          <path
            d="M1.5 1H8.5M5 1V14M1.5 14H8.5"
            stroke="#fff9ed"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M1.5 1H8.5M5 1V14M1.5 14H8.5"
            stroke="#bc4722"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      )}

      {/* 2. POINTER / HAND CURSOR */}
      {cursorType === "pointer" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          className="select-none block drop-shadow-[0_1.5px_3px_rgba(74,24,7,0.35)]"
        >
          <path
            d="M9 6.5C9 5.67 9.67 5 10.5 5C11.33 5 12 5.67 12 6.5V11H12.5C13.33 11 14 11.67 14 12.5V13H14.5C15.33 13 16 13.67 16 14.5V15H16.5C17.33 15 18 15.67 18 16.5V18C18 20.76 15.76 23 13 23H10.5C8.51 23 6.72 21.83 5.92 20.02L4.1 15.9C3.77 15.15 4.05 14.28 4.75 13.86C5.53 13.4 6.5 13.7 6.9 14.5L8 16.8V6.5C8 5.67 8.67 5 9.5 5C10.33 5 11 5.67 11 6.5"
            fill="#bc4722"
            stroke="#fff9ed"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <circle cx="12.5" cy="20.5" r="1" fill="#fff9ed" />
        </svg>
      )}

      {/* 3. DEFAULT ARROW CURSOR */}
      {cursorType === "default" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 32 32"
          fill="none"
          className="select-none block drop-shadow-[0_1.5px_3px_rgba(74,24,7,0.35)]"
        >
          <path
            d="M4 3L13.8 26.2C14.3 27.4 16 27.2 16.3 26L19.2 17.5L27.7 14.6C28.9 14.3 29.1 12.6 27.9 12.1L4.7 2.3C3.7 1.8 2.7 2.8 3.2 3.8L4 3Z"
            fill="#bc4722"
            stroke="#fff9ed"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <circle cx="18" cy="18" r="1.75" fill="#fff9ed" />
        </svg>
      )}
    </div>
  );
}