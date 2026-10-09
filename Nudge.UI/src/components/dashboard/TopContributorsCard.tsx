"use client";

import React, { useState } from "react";
import { Trophy, Medal, Flame } from "lucide-react";

import { Contributor, ContributorFilter } from "@/src/features/dashboard/types/dashboard.types";
import { MOCK_CONTRIBUTORS } from "@/src/features/dashboard/constants/dashboard.constants";

export type { Contributor };

export function TopContributorsCard() {
  const [filter, setFilter] = useState<ContributorFilter>("weekly");

  const list = MOCK_CONTRIBUTORS[filter] || [];

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-outline-variant/40">
          <div className="flex items-center gap-2">
            <Trophy size={18} className="text-secondary" />
            <h3 className="font-title-md text-base font-bold text-on-surface">Top Contributors</h3>
          </div>

          <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-lg border border-outline-variant/30 text-xs">
            {(["daily", "weekly", "monthly"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-2 py-0.5 rounded capitalize font-medium transition-colors ${
                  filter === tab
                    ? "bg-surface-container-lowest text-primary font-bold shadow-xs"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-outline-variant/20 pt-1">
          {list.map((c, index) => (
            <div key={c.id} className="py-2.5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="w-5 text-center font-bold text-xs text-on-surface-variant">
                  {index === 0 ? <Medal size={16} className="text-secondary inline" /> : `#${index + 1}`}
                </span>
                <div className="w-8 h-8 rounded-full bg-primary-fixed text-primary text-xs font-bold flex items-center justify-center">
                  {c.avatarText}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-on-surface">{c.name}</span>
                    {c.tierName && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-secondary-fixed text-on-secondary-fixed font-semibold">
                        {c.tierName}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-on-surface-variant">{c.nudgeCount} Nudges sent</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-primary font-headline-md">
                  रु {c.amount.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-outline-variant/30 text-center">
        <span className="text-[11px] text-on-surface-variant flex items-center justify-center gap-1">
          <Flame size={12} className="text-primary" /> Top supporter receives a custom stream shoutout badge
        </span>
      </div>
    </div>
  );
}
