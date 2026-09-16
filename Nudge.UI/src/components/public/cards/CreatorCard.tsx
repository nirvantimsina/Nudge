import Image from "next/image";
import type { Creator } from "@/src/features/creators/models/creator.model";

export interface CreatorCardProps {
  creator: Creator;
  onNudgeClick?: (creator: Creator) => void;
  /** Tailwind gradient classes for the banner, e.g. "from-[#9b2f0a] to-[#bc4722]" */
  bannerGradientClassName?: string;
}

export function CreatorCard({
  creator,
  onNudgeClick,
  bannerGradientClassName = "from-primary to-primary-container",
}: CreatorCardProps) {
  return (
    <article className="w-75 sm:w-[320px] shrink-0 bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden hover:shadow-lg transition-shadow flex flex-col group">
      <div className={`h-28 bg-linear-to-r ${bannerGradientClassName} relative p-3`}>
        <span className="absolute top-2 right-2 bg-surface-container-lowest/90 backdrop-blur-md text-[11px] font-bold px-2 py-0.5 rounded-full text-on-surface capitalize">
          {creator.category}
        </span>
      </div>

      <div className="p-4 pt-0 relative grow flex flex-col">
        <div className="-mt-8 mb-2 flex items-end justify-between">
          <Image
            src={creator.avatar === "later" ? "/fallback-avatar.png" : creator.avatar} // handle placeholder string safely
            alt={creator.name}
            width={64}
            height={64}
            unoptimized // 💡 Add this if using dynamic string inputs without config domains configured yet
            className="w-16 h-16 rounded-full border-4 border-surface-container-lowest object-cover shadow"
          />
          <span className="text-xs font-semibold text-tertiary bg-tertiary-fixed px-2 py-0.5 rounded-full">
            {creator.nudgeCount.toLocaleString()} Nudges
          </span>
        </div>

        <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold group-hover:text-primary transition-colors">
          {creator.name}
        </h4>
        <p className="text-body-sm font-body-sm text-on-surface-variant line-clamp-2 mt-1 mb-4">
          {creator.description}
        </p>

        <div className="mt-auto pt-3 border-t border-surface-container-high flex items-center justify-between">
          <span className="text-xs text-outline">
            Tier: <strong className="text-on-surface">{creator.tierName}</strong>
          </span>
          <button
            type="button"
            onClick={() => onNudgeClick?.(creator)}
            className="bg-surface-container hover:bg-primary-container hover:text-on-primary text-primary font-label-md text-xs px-3 py-1.5 rounded-full transition-colors font-bold"
          >
            Nudge {creator.name.split(" ")[0]}
          </button>
        </div>
      </div>
    </article>
  );
}
