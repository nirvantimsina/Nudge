"use client";

import Image from "next/image";
import { useState } from "react";
import { Check, CheckCircle2 } from "lucide-react";
import { useNudgePreview } from "@/src/features/nudge/hooks/useNudgePreview";
import { useSendNudge } from "@/src/features/nudge/hooks/useSendNudge";
import { Button } from "@/src/components/public/common/Button";

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
      amount: selection.tierId ? undefined : selection.customAmount,
      displayName: senderName || undefined,
      message: comment || undefined,
    });
    if (result) onNudgeSent?.(result.paymentUrl);
  }

  if (isLoading) {
    return <div className="h-[600px] rounded-2xl bg-surface-container-low animate-pulse" />;
  }

  if (error || !creator) {
    return (
      <div className="h-[600px] rounded-2xl bg-surface-container-lowest border border-outline-variant flex items-center justify-center text-center p-6">
        <p className="text-on-surface-variant">{error ?? "No creators to preview right now."}</p>
      </div>
    );
  }

  const isValidAvatar =
    creator.avatar?.startsWith("http://") ||
    creator.avatar?.startsWith("https://") ||
    creator.avatar?.startsWith("/");

  return (
    <div className="relative bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 shadow-xl min-h-[600px] flex flex-col justify-between overflow-hidden">
      <div className="flex-1 flex flex-col">
        {/* Header: switcher controls */}
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-surface-container-high text-xs shrink-0">
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
        <div className="flex items-center gap-3 pb-3 border-b border-surface-container-high shrink-0">
          <div className="relative shrink-0">
            {isValidAvatar ? (
              <Image
                src={creator.avatar}
                alt={creator.name}
                width={52}
                height={52}
                className="w-[52px] h-[52px] rounded-full object-cover border-2 border-primary-container shadow-sm"
              />
            ) : (
              <div className="w-[52px] h-[52px] rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-lg border-2 border-primary-container shadow-sm">
                {creator.firstName?.charAt(0) || creator.name?.charAt(0) || "C"}
              </div>
            )}
            {creator.isVerified && (
              <span className="absolute -bottom-0.5 -right-0.5 bg-primary text-on-primary rounded-full p-0.5 shadow">
                <Check size={10} strokeWidth={3} />
              </span>
            )}
          </div>
          <div className="overflow-hidden flex-1">
            <div className="flex items-center gap-1.5">
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold truncate max-w-[210px]">
                {creator.name}
              </h3>
              {creator.isVerified && (
                <span title="Verified Creator" className="flex items-center text-primary shrink-0">
                  <CheckCircle2 size={16} className="fill-primary text-surface-container-lowest" />
                </span>
              )}
            </div>
            <p className="text-body-sm font-body-sm text-on-surface-variant truncate mt-0.5">
              {creator.bio}
            </p>
          </div>
        </div>

        {/* Tier selector */}
        <div className="pt-3 pb-2 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2 shrink-0">
              <span className="text-label-md font-label-md text-on-surface truncate">
                Nudge {creator.firstName} Directly
              </span>
              <span className="text-[11px] text-primary font-bold bg-primary-fixed/40 px-2 py-0.5 rounded-full shrink-0">
                Active Patronage
              </span>
            </div>

            {/* Grid options */}
            <div className="grid grid-cols-4 gap-1.5 mb-2.5">
              {creator.tiers.map((tier) => {
                const isSelected = selection.tierId === tier.id;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => selectTier(tier.id)}
                    className={
                      isSelected
                        ? "p-2 rounded-xl border-2 border-primary bg-primary/10 flex flex-col items-center justify-center text-center shadow-sm active:scale-95 ring-1 ring-primary/30"
                        : "p-2 rounded-xl border border-outline-variant bg-surface-container-low hover:border-primary/40 flex flex-col items-center justify-center text-center active:scale-95"
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
                onClick={() => selectCustom(selection.customAmount || 1000)}
                className={
                  selection.tierId === null
                    ? "p-2 rounded-xl border-2 border-primary bg-primary/10 flex flex-col items-center justify-center text-center shadow-sm active:scale-95 ring-1 ring-primary/30"
                    : "p-2 rounded-xl border border-outline-variant bg-surface-container-low hover:border-primary/40 flex flex-col items-center justify-center text-center active:scale-95"
                }
              >
                <span className={`text-[13px] font-bold leading-tight ${selection.tierId === null ? "text-primary" : "text-outline"}`}>
                  Custom
                </span>
                <span className={`text-[10px] font-semibold truncate w-full ${selection.tierId === null ? "text-primary" : "text-on-surface"}`}>
                  Any NPR
                </span>
                <span className="text-[9px] text-outline">रु.</span>
              </button>
            </div>

            {/* Custom Amount Dedicated Input Box */}
            {selection.tierId === null ? (
              <div className="mb-3 p-2 bg-surface-container-low border border-primary/40 rounded-xl space-y-1.5 transition-all">
                <div className="flex items-center justify-between text-[11px] text-outline px-1">
                  <span>Enter custom amount</span>
                  <span className="text-primary font-medium">Min: रु. 10</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 flex items-center bg-surface-container-lowest border border-outline-variant rounded-lg px-2.5 py-1.5 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
                    <span className="text-primary font-bold text-xs pr-2 border-r border-outline-variant mr-2 select-none">
                      रु.
                    </span>
                    <input
                      type="number"
                      min={10}
                      step={50}
                      value={selection.customAmount || ""}
                      onChange={(e) => selectCustom(Math.max(0, Number(e.target.value)))}
                      placeholder="Amount in NPR"
                      className="w-full bg-transparent border-0 text-xs font-bold text-on-surface p-0 focus:outline-none"
                    />
                  </div>
                  <div className="flex gap-1">
                    {[100, 500].map((inc) => (
                      <button
                        key={inc}
                        type="button"
                        onClick={() => selectCustom((selection.customAmount || 0) + inc)}
                        className="text-[10px] font-semibold bg-surface-container border border-outline-variant hover:border-primary px-2 py-1.5 rounded-lg text-on-surface transition active:scale-95"
                      >
                        +{inc}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between px-2 text-[11px] text-outline py-1.5 mb-2 bg-surface-container-low/40 rounded-lg border border-outline-variant/50">
                <span>Direct payout to eSewa, Khalti or Bank</span>
                <span className="font-semibold text-primary">0% platform fee</span>
              </div>
            )}

            {/* Note & Sender Fields */}
            <div className="space-y-2 mb-3">
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Your name or @handle (optional)"
                className="w-full text-xs px-3 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={`Share some love with ${creator.firstName}...`}
                rows={2}
                className="w-full text-xs px-3 py-1.5 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
              />
            </div>
          </div>

          {/* Action CTA */}
          <div>
            <Button
              type="button"
              onClick={handleSendNudge}
              variant="secondary"
              size="lg"
              fullWidth
              isLoading={isSending}
              loadingText="Sending…"
            >
              Nudge {creator.firstName} with Rs. {selectedAmount.toLocaleString()}
            </Button>

            <div className="flex items-center justify-center gap-1.5 mt-2 text-[10px] text-outline">
              <span>Secured via Nepali banking &amp; payment rails</span>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof */}
      {creator.recentNudge && (
        <div className="mt-2 border-t border-surface-container-high bg-surface-container-low/60 -mx-6 -mb-6 p-3 px-5 rounded-b-2xl shrink-0 overflow-hidden">
          <div className="flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-full bg-secondary-fixed flex items-center justify-center text-[10px] font-bold text-on-secondary-fixed shrink-0 mt-0.5">
              {creator.recentNudge.displayName?.charAt(0) || "U"}
            </div>
            <div className="text-xs overflow-hidden flex-1 leading-tight">
              <div className="flex items-center gap-1.5 truncate">
                <span className="text-on-surface font-semibold truncate max-w-[190px]">
                  {creator.recentNudge.displayName}{" "}
                  <strong className="text-primary font-bold">
                    nudged Rs. {creator.recentNudge.amount.toLocaleString()}
                  </strong>
                </span>
              </div>
              <p className="text-on-surface-variant text-[11px] mt-0.5 line-clamp-1 truncate">
                &quot;{creator.recentNudge.message}&quot;
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}