"use client";

import Image from "next/image";
import { useState } from "react";
import { useNudgePreview } from "@/src/features/nudge/hooks/useNudgePreview";
import { useSendNudge } from "@/src/features/nudge/hooks/useSendNudge";

export interface LiveNudgePreviewProps {
  /** Called after a nudge is successfully created, receives the payment URL */
  onNudgeSent?: (paymentUrl: string) => void;
}

export function LiveNudgePreview({ onNudgeSent }: LiveNudgePreviewProps) {
  const {
    creator,
    creators,
    activeIndex,
    isLoading,
    error,
    selection,
    selectedAmount,
    goNext,
    goPrev,
    goTo,
    selectTier,
    selectCustom,
  } = useNudgePreview();

  const { sendNudge, isSending } = useSendNudge();
  const [senderName, setSenderName] = useState("");
  const [comment, setComment] = useState("");

  async function handleSendNudge() {
    if (!creator) return;
    const result = await sendNudge({
      creatorId: creator.id,
      tierId: selection.tierId ?? undefined,
      customAmount: selection.tierId ? undefined : selection.customAmount,
      senderName: senderName || undefined,
      comment: comment || undefined,
    });
    if (result) onNudgeSent?.(result.paymentUrl);
  }

  if (isLoading) {
    return <div className="h-[580px] rounded-2xl bg-surface-container-low animate-pulse" />;
  }

  if (error || !creator) {
    return (
      <div className="h-[580px] rounded-2xl bg-surface-container-lowest border border-outline-variant flex items-center justify-center text-center p-6">
        <p className="text-on-surface-variant">{error ?? "No creators to preview right now."}</p>
      </div>
    );
  }

  return (
    <div className="relative bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 shadow-xl h-[580px] flex flex-col justify-between overflow-hidden">
      <div>
        {/* Header: switcher controls */}
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-surface-container-high text-xs h-8 shrink-0">
          <div className="flex items-center gap-1 text-outline font-medium">
            <span>Live Creator Nudge Preview</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous creator"
              className="w-7 h-7 rounded-full bg-surface-container hover:bg-surface-container-highest border border-outline-variant flex items-center justify-center text-on-surface hover:text-primary transition-colors active:scale-90"
            >
              ‹
            </button>
            <div className="flex items-center gap-1 px-1">
              {creators.map((c, idx) => (
                <button
                  key={c.id}
                  type="button"
                  aria-label={`Show ${c.name}`}
                  onClick={() => goTo(idx)}
                  className={
                    idx === activeIndex
                      ? "w-2.5 h-2.5 rounded-full bg-primary transition-all duration-200"
                      : "w-1.5 h-1.5 rounded-full bg-outline-variant transition-all duration-200 hover:bg-primary/50"
                  }
                />
              ))}
            </div>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next creator"
              className="w-7 h-7 rounded-full bg-surface-container hover:bg-surface-container-highest border border-outline-variant flex items-center justify-center text-on-surface hover:text-primary transition-colors active:scale-90"
            >
              ›
            </button>
          </div>
        </div>

        {/* Creator identity */}
        <div className="flex items-center gap-3 pb-3 border-b border-surface-container-high h-[72px] shrink-0">
          <div className="relative shrink-0">
            <Image
              src={creator.avatarUrl}
              alt={creator.name}
              width={56}
              height={56}
              className="w-14 h-14 rounded-full object-cover border-2 border-primary-container shadow-sm"
            />
            {creator.isVerified && (
              <span className="absolute bottom-0 right-0 bg-tertiary text-on-tertiary rounded-full p-0.5 text-xs flex items-center justify-center shadow">
                ✓
              </span>
            )}
          </div>
          <div className="overflow-hidden flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold truncate max-w-[170px]">
                {creator.name}
              </h3>
              {creator.isVerified && (
                <span className="text-[11px] bg-tertiary-fixed text-on-tertiary-fixed-variant px-2 py-0.5 rounded font-bold shrink-0">
                  Verified Maker
                </span>
              )}
            </div>
            <p className="text-body-sm font-body-sm text-on-surface-variant truncate h-5 mt-0.5">
              {creator.bio}
            </p>
          </div>
        </div>

        {/* Tier selector */}
        <div className="py-2.5">
          <div className="flex items-center justify-between mb-2 h-6 shrink-0">
            <span className="text-label-md font-label-md text-on-surface truncate">
              Nudge {creator.firstName} Directly
            </span>
            <span className="text-xs text-primary font-bold bg-primary-fixed px-2 py-0.5 rounded-full shrink-0">
              Active Patronage
            </span>
          </div>

          <div className="grid grid-cols-4 gap-1.5 h-16 shrink-0 mb-2.5">
            {creator.tiers.map((tier) => {
              const isSelected = selection.tierId === tier.id;
              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => selectTier(tier.id)}
                  className={
                    isSelected
                      ? "p-2 rounded-xl border-2 border-primary-container bg-primary-fixed/30 flex flex-col items-center justify-center text-center shadow-sm active:scale-95 ring-1 ring-primary/30"
                      : "p-2 rounded-xl border border-outline-variant bg-surface-container-low hover:border-primary-container flex flex-col items-center justify-center text-center active:scale-95"
                  }
                >
                  <span className={`text-[13px] font-extrabold leading-tight ${isSelected ? "text-primary" : "text-outline"}`}>
                    Rs. {tier.amount.toLocaleString()}
                  </span>
                  <span className={`text-[10px] font-bold truncate w-full ${isSelected ? "text-primary" : "text-on-surface"}`}>
                    {tier.label}
                  </span>
                  <span className={`text-[9px] truncate ${isSelected ? "text-primary-fixed-variant" : "text-outline"}`}>
                    {tier.note}
                  </span>
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => selectCustom(selection.customAmount)}
              className={
                selection.tierId === null
                  ? "p-2 rounded-xl border-2 border-primary-container bg-primary-fixed/30 flex flex-col items-center justify-center text-center shadow-sm active:scale-95 ring-1 ring-primary/30"
                  : "p-2 rounded-xl border border-outline-variant bg-surface-container-low hover:border-primary-container flex flex-col items-center justify-center text-center active:scale-95"
              }
            >
              <span className={`text-[13px] font-bold leading-tight ${selection.tierId === null ? "text-primary" : "text-outline"}`}>
                Custom ₹
              </span>
              <span className="text-[10px] font-semibold text-on-surface truncate w-full">Any रु</span>
            </button>
          </div>

          <div className="h-9 flex items-center shrink-0">
            {selection.tierId === null ? (
              <div className="w-full flex items-center bg-surface-container-low border-2 border-primary-container rounded-xl px-3 py-1">
                <span className="text-primary font-bold text-xs pr-2 border-r border-outline-variant mr-2">
                  रु. (NPR)
                </span>
                <input
                  type="number"
                  min={10}
                  step={50}
                  value={selection.customAmount}
                  onChange={(e) => selectCustom(Number(e.target.value))}
                  className="w-full bg-transparent border-0 focus:ring-0 text-xs font-bold text-on-surface p-0 focus:outline-none"
                />
              </div>
            ) : (
              <div className="w-full flex items-center justify-between px-2 text-[11px] text-outline">
                <span>Instant settlement to eSewa, Khalti or Nepali Bank</span>
                <span className="font-semibold text-primary shrink-0 ml-1">No extra fees</span>
              </div>
            )}
          </div>

          <div className="space-y-2 mb-2.5">
            <input
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="Your name or @handle (optional)"
              className="w-full text-xs px-3 py-1.5 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container h-8"
            />
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={`Share some love with ${creator.firstName}...`}
              rows={2}
              className="w-full text-xs px-3 py-1.5 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container resize-none"
            />
          </div>

          <button
            type="button"
            onClick={handleSendNudge}
            disabled={isSending}
            className="w-full h-12 bg-secondary-container hover:bg-secondary-fixed-dim text-on-secondary-fixed font-headline-sm text-headline-sm rounded-xl shadow-sm transition-transform active:scale-95 flex items-center justify-center gap-2 shrink-0 disabled:opacity-60"
          >
            <span className="truncate text-base font-bold">
              {isSending ? "Sending…" : `Nudge ${creator.firstName} with Rs. ${selectedAmount.toLocaleString()}`}
            </span>
          </button>

          <div className="flex items-center justify-center gap-1.5 mt-1.5 text-[11px] text-outline h-4 shrink-0">
            <span>Secured via direct Nepali banking &amp; payment rails</span>
          </div>
        </div>
      </div>

      {creator.recentNudge && (
        <div className="mt-auto border-t border-surface-container-high bg-surface-container-low/60 -mx-6 -mb-6 p-3.5 px-5 rounded-b-2xl h-[76px] shrink-0 overflow-hidden">
          <div className="flex items-start gap-2.5 h-full">
            <div className="w-6 h-6 rounded-full bg-secondary-fixed flex items-center justify-center text-[10px] font-bold text-on-secondary-fixed shrink-0 mt-0.5">
              {creator.recentNudge.senderName.charAt(0)}
            </div>
            <div className="text-xs overflow-hidden flex-1 leading-tight">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-on-surface font-semibold truncate max-w-[190px]">
                  {creator.recentNudge.senderName}{" "}
                  <strong className="text-primary font-bold">
                    nudged {creator.firstName} with Rs. {creator.recentNudge.amount.toLocaleString()}
                  </strong>
                </span>
              </div>
              <p className="text-on-surface-variant text-[11px] mt-1 line-clamp-1 truncate">
                &quot;{creator.recentNudge.comment}&quot;
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
