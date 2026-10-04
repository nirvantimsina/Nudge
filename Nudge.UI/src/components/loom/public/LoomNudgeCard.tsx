"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Check, CheckCircle2, ShieldCheck, Heart, X, Sparkles } from "lucide-react";
import { TierDto } from "@/src/features/public/loom/types/loom";
import { useSendNudge } from "@/src/features/nudge/hooks/useSendNudge";
import { Button } from "@/src/components/public/common/Button";

export interface LoomNudgeCardProps {
  creatorId?: number;
  creatorName: string;
  creatorSlug: string;
  avatar?: string | null;
  bio?: string | null;
  isVerified?: boolean;
  tiers: TierDto[];
  onNudgeSent?: (paymentUrl: string) => void;
}

export function LoomNudgeCard({
  creatorId,
  creatorName,
  creatorSlug,
  avatar,
  isVerified = false,
  tiers = [],
  onNudgeSent,
}: LoomNudgeCardProps) {

  useEffect(() => {
  const onPointerDown = () => console.log("1. pointerdown");
  const onTouchStart = () => console.log("2. touchstart");
  const onTouchEnd = () => console.log("3. touchend");
  const onClick = (e: MouseEvent) => console.log("4. CLICK FIRED!", e.target);

  window.addEventListener("pointerdown", onPointerDown, { passive: true });
  window.addEventListener("touchstart", onTouchStart, { passive: true });
  window.addEventListener("touchend", onTouchEnd, { passive: true });
  window.addEventListener("click", onClick, { capture: true });

  return () => {
    window.removeEventListener("pointerdown", onPointerDown);
    window.removeEventListener("touchstart", onTouchStart);
    window.removeEventListener("touchend", onTouchEnd);
    window.removeEventListener("click", onClick, { capture: true });
  };
}, []);


  const { sendNudge, isSending } = useSendNudge();

  const [selectedTierId, setSelectedTierId] = useState<number | null>(
    tiers[0]?.id ?? null
  );
  const [customAmount, setCustomAmount] = useState<number>(500);
  const [senderName, setSenderName] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const firstName = creatorName.split(" ")[0] || creatorName;

  const currentAmount =
    selectedTierId !== null
      ? tiers.find((t) => t.id === selectedTierId)?.amount ?? 0
      : customAmount;

  const isValidAvatar =
    avatar?.startsWith("http://") ||
    avatar?.startsWith("https://") ||
    avatar?.startsWith("/");

  async function handleSendNudge() {
    if (!creatorId) return;

    const result = await sendNudge({
      creatorId,
      tierId: selectedTierId ?? undefined,
      amount: selectedTierId === null ? customAmount : undefined,
      displayName: senderName.trim() || undefined,
      message: message.trim() || undefined,
    });

    if (result?.paymentUrl) {
      if (onNudgeSent) {
        onNudgeSent(result.paymentUrl);
      } else {
        window.location.href = result.paymentUrl;
      }
    }
  }

  return (
    <>
      {/* ========================================================
          1. COMPACT WIDGET (Clean on mobile, grounded on desktop)
         ======================================================== */}
      <div className="relative bg-surface-container-lowest rounded-xl sm:rounded-2xl border border-outline-variant p-3 sm:p-5 shadow-xs sm:shadow-sm overflow-hidden">
        {/* Subtle Ambient glow */}
        <div className="absolute -top-12 -right-12 w-28 h-28 bg-primary-fixed/20 rounded-full blur-2xl pointer-events-none -z-1" />

        {/* Desktop-only Profile header strip */}
        <div className="hidden lg:flex items-center gap-3 pb-3 border-b border-surface-container-high mb-3">
          <div className="relative shrink-0">
            {isValidAvatar ? (
              <Image
                src={avatar!}
                alt={creatorName}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover border border-primary-container/20 shadow-xs"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-sm">
                {firstName.charAt(0) || "C"}
              </div>
            )}
            {isVerified && (
              <span className="absolute -bottom-0.5 -right-0.5 bg-tertiary text-on-tertiary rounded-full p-0.5 shadow-xs">
                <Check size={9} strokeWidth={3} />
              </span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-bold text-on-surface truncate">{creatorName}</h3>
            <p className="text-[11px] text-primary font-medium truncate">@{creatorSlug}</p>
          </div>
        </div>

        {/* Header label */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
            Nudge {firstName}
          </span>
          <span className="text-[10px] text-tertiary font-bold bg-tertiary-fixed/40 px-2 py-0.5 rounded-full flex items-center gap-1">
            <Sparkles size={10} />
            Dakshina
          </span>
        </div>

        {/* Tier Chips (Ultra slim) */}
        <div className="grid grid-cols-4 gap-1.5 mb-2.5">
          {tiers.map((tier) => {
            const isSelected = selectedTierId === tier.id;
            return (
              <button
                key={tier.id}
                type="button"
                onClick={() => setSelectedTierId(tier.id)}
                className={`touch-manipulation cursor-pointer relative z-10 py-1.5 px-1 rounded-lg border text-center transition-all flex flex-col items-center justify-center active:scale-95 ${
                  isSelected
                    ? "border-2 border-primary bg-primary/10 shadow-xs ring-1 ring-primary/20"
                    : "border-outline-variant/60 bg-surface-container-low hover:border-primary/40"
                }`}
              >
                <span className={`text-xs font-bold leading-tight ${isSelected ? "text-primary" : "text-on-surface"}`}>
                  Rs. {tier.amount}
                </span>
                <span className={`text-[9px] font-medium truncate w-full ${isSelected ? "text-primary" : "text-on-surface-variant"}`}>
                  {tier.label}
                </span>
              </button>
            );
          })}

          {/* Custom Tier */}
          <button
            type="button"
            onClick={() => setSelectedTierId(null)}
            className={`py-1.5 px-1 rounded-lg border text-center transition-all flex flex-col items-center justify-center active:scale-95 ${
              selectedTierId === null
                ? "border-2 border-primary bg-primary/10 shadow-xs ring-1 ring-primary/20"
                : "border-outline-variant/60 bg-surface-container-low hover:border-primary/40"
            }`}
          >
            <span className={`text-xs font-bold leading-tight ${selectedTierId === null ? "text-primary" : "text-on-surface"}`}>
              Custom
            </span>
            <span className={`text-[9px] font-medium truncate w-full ${selectedTierId === null ? "text-primary" : "text-on-surface-variant"}`}>
              Any NPR
            </span>
          </button>
        </div>

        {/* Custom inline input only if Custom is selected */}
        {selectedTierId === null && (
          <div className="mb-2.5 p-1.5 px-2 bg-surface-container-low border border-primary/40 rounded-lg flex items-center justify-between gap-2">
            <span className="text-primary font-bold text-xs select-none">रु.</span>
            <input
              type="number"
              min={10}
              step={50}
              value={customAmount || ""}
              onChange={(e) => setCustomAmount(Math.max(0, Number(e.target.value)))}
              placeholder="Amount"
              className="w-full bg-transparent border-0 text-xs font-bold text-on-surface p-0 focus:outline-none"
            />
            <div className="flex gap-1 shrink-0">
              {[100, 500].map((inc) => (
                <button
                  key={inc}
                  type="button"
                  onClick={() => setCustomAmount((prev) => (prev || 0) + inc)}
                  className="text-[9px] font-bold bg-surface-container border border-outline-variant/50 px-1.5 py-0.5 rounded text-on-surface hover:border-primary active:scale-95"
                >
                  +{inc}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Trigger Button -> Opens Popup Modal */}
        <Button
          type="button"
          onClick={() => setIsModalOpen(true)}
          variant="secondary"
          size="md"
          fullWidth
          className="shadow-xs py-2 text-xs font-bold"
        >
          <span className="inline-flex items-center justify-center gap-1.5">
            <Heart className="w-3.5 h-3.5 fill-current shrink-0" />
            <span>Nudge Rs. {currentAmount.toLocaleString()}</span>
          </span>
        </Button>
      </div>

      {/* ========================================================
          2. CHECKOUT POPUP MODAL / BOTTOM SHEET
         ======================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          {/* Backdrop dismiss */}
          <div
            className="absolute inset-0"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal Container */}
          <div className="relative z-10 w-full sm:max-w-md bg-surface-container-lowest rounded-t-2xl sm:rounded-2xl border border-outline-variant p-5 shadow-2xl animate-in slide-in-from-bottom-5 sm:zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-surface-container-low text-primary flex items-center justify-center font-bold">
                  रु
                </div>
                <div>
                  <h3 className="text-sm font-bold text-on-surface">
                    Support {firstName}
                  </h3>
                  <p className="text-[11px] text-on-surface-variant">
                    Nudge amount: <strong className="text-primary">Rs. {currentAmount.toLocaleString()}</strong>
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-7 h-7 rounded-full bg-surface-container-low hover:bg-surface-container flex items-center justify-center text-on-surface-variant transition active:scale-95"
              >
                <X size={15} />
              </button>
            </div>

            {/* Note & Sender Name Fields */}
            <div className="py-4 space-y-2.5">
              <div>
                <label className="text-[11px] font-semibold text-on-surface-variant block mb-1">
                  Your Name or Handle (Optional)
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Anonymous Supporter"
                  className="w-full text-xs px-3 py-2 bg-surface-container-low border border-outline-variant/60 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-on-surface-variant block mb-1">
                  Encouraging Message (Optional)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={`Leave a note for ${firstName}...`}
                  rows={2}
                  className="w-full text-xs px-3 py-2 bg-surface-container-low border border-outline-variant/60 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                />
              </div>

              {/* Rails indicator */}
              <div className="flex items-center justify-between px-3 py-2 bg-surface-container-low rounded-xl border border-outline-variant/40 text-[11px]">
                <div className="flex items-center gap-1.5 text-tertiary">
                  <ShieldCheck size={14} />
                  <span className="font-semibold text-on-surface">Zero Fees</span>
                </div>
                <span className="text-on-surface-variant text-[10px]">
                  Fonepay • eSewa • Khalti
                </span>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-1">
              <Button
                type="button"
                onClick={handleSendNudge}
                variant="secondary"
                size="lg"
                fullWidth
                isLoading={isSending}
                loadingText="Opening Payment…"
              >
                <span className="inline-flex items-center justify-center gap-1.5">
                  <Heart className="w-4 h-4 fill-current shrink-0" />
                  <span>Proceed with Rs. {currentAmount.toLocaleString()}</span>
                </span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}