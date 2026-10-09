"use client";

import React from "react";
import { Zap, Heart, MessageSquareReply } from "lucide-react";

import { NudgeFeedItem } from "@/src/features/dashboard/types/dashboard.types";
import { DEFAULT_NUDGES } from "@/src/features/dashboard/constants/dashboard.constants";

export type { NudgeFeedItem };

interface LiveNudgesFeedProps {
  items?: NudgeFeedItem[];
}

export function LiveNudgesFeed({ items = DEFAULT_NUDGES }: LiveNudgesFeedProps) {
  return (
    <section className="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-5 md:p-6 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-outline-variant/40">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-container opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
            </span>
            <h3 className="font-title-md text-base font-bold text-on-surface">
              Live Dakshina Feed (Latest 10)
            </h3>
          </div>
          <span className="text-[11px] text-tertiary font-bold animate-pulse">
            ● Realtime Updates
          </span>
        </div>

        <div className="divide-y divide-outline-variant/20 pt-1">
          {items.slice(0, 10).map((nudge) => (
            <div key={nudge.id} className="py-3 flex items-start justify-between gap-3 group">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-fixed text-primary font-bold text-xs flex items-center justify-center shrink-0">
                  {nudge.senderName.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-xs font-bold text-on-surface">{nudge.senderName}</span>
                    {nudge.tierBadge && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-secondary-fixed text-on-secondary-fixed font-semibold">
                        {nudge.tierBadge}
                      </span>
                    )}
                    <span className="text-[10px] text-on-surface-variant font-mono">• {nudge.timestamp}</span>
                  </div>

                  {nudge.message && (
                    <p className="text-xs text-on-surface mt-1 bg-surface-container-low/60 p-2 rounded-lg border-l-2 border-primary-container">
                      “{nudge.message}”
                    </p>
                  )}

                  <div className="flex items-center gap-2 mt-1.5 text-[10px] text-on-surface-variant">
                    <span className="text-tertiary font-medium">via {nudge.paymentRail}</span>
                    <span>•</span>
                    <button className="text-primary font-semibold hover:underline flex items-center gap-0.5">
                      <MessageSquareReply size={11} /> Reply
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-sm font-bold text-primary font-headline-md">
                  रु {nudge.amountNpr.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-outline-variant/30">
        <button className="w-full py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-bold transition-colors">
          View All Patron Interactions
        </button>
      </div>
    </section>
  );
}
