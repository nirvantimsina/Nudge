"use client";

import { useState } from "react";
import { useCreators } from "@/src/features/creators/hooks/useCreators";
import type { Creator, CreatorCategory } from "@/src/features/creators/models/creator.model";
import { CreatorCard } from "@/src/components/public/cards/CreatorCard";

const CATEGORIES: { label: string; value: CreatorCategory }[] = [
  { label: "All Creators", value: "all" },
  { label: "Live Stream", value: "streamer" },
  { label: "Music", value: "music" },
  { label: "Art & Heritage", value: "art-heritage" },
  { label: "Tech & Writing", value: "tech-writing" },
];

export interface FeaturedCreatorsSectionProps {
  onNudgeClick?: (creator: Creator) => void;
}

export function FeaturedCreatorsSection({ onNudgeClick }: FeaturedCreatorsSectionProps) {
  const [category, setCategory] = useState<CreatorCategory>("all");
  const { creators, isLoading, error, refetch } = useCreators(category);

  return (
    <section className="py-space-2xl relative" id="creators">
      <div className="max-w-7xl mx-auto px-space-md md:px-margin-tablet lg:px-margin-desktop mb-space-xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-label-md font-label-md text-primary font-bold uppercase tracking-wider">
              Meet the Vanguard
            </span>
            <h2 className="text-headline-lg font-headline-lg text-on-surface tracking-tight mt-1">
              Featured Nepali Creators
            </h2>
            <p className="text-body-md text-on-surface-variant">
              From documentary makers in Mustang to indie lofi producers in Jhamsikhel.
            </p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {CATEGORIES.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => setCategory(c.value)}
                className={
                  c.value === category
                    ? "px-3.5 py-1.5 rounded-full bg-primary-container text-on-primary text-label-md font-label-md whitespace-nowrap shadow-xs"
                    : "px-3.5 py-1.5 rounded-full bg-surface-container border border-outline-variant hover:border-primary-container text-on-surface-variant text-label-md font-label-md whitespace-nowrap"
                }
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-space-md md:px-margin-tablet lg:px-margin-desktop">
        {isLoading && (
          <div className="flex gap-6 overflow-hidden">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="w-75 sm:w-[320px] shrink-0 h-85 rounded-2xl bg-surface-container-low animate-pulse"
              />
            ))}
          </div>
        )}

        {!isLoading && error && (
          <div className="text-center py-space-xl">
            <p className="text-on-surface-variant mb-3">{error}</p>
            <button
              type="button"
              onClick={refetch}
              className="px-4 py-2 rounded-full bg-primary-container text-on-primary text-label-md font-label-md"
            >
              Try again
            </button>
          </div>
        )}

        {!isLoading && !error && creators.length === 0 && (
          <p className="text-center text-on-surface-variant py-space-xl">
            No creators found in this category yet.
          </p>
        )}

        {!isLoading && !error && creators.length > 0 && (
          <div className="flex gap-6 overflow-x-auto pb-2 -mx-1 px-1 snap-x snap-mandatory">
            {creators.map((creator) => (
              <div key={creator.creatorID} className="snap-start">
                <CreatorCard creator={creator} onNudgeClick={onNudgeClick} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
