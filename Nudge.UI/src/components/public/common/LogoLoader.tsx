import Image from "next/image";

interface LogoLoaderProps {
  label?: string;
  fullscreen?: boolean;
}

export function LogoLoader({
  label = "Loading...",
  fullscreen = true,
}: LogoLoaderProps) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4 select-none">
      <div className="relative w-20 h-20 sm:w-24 sm:h-24">
        <Image
          src="/animation-logo.svg"
          alt="Nudge Loading"
          fill
          priority
          unoptimized // Keeps internal SVG SMIL/CSS animations playing smoothly
          className="object-contain"
        />
      </div>

      {label && (
        <p className="text-xs font-mono font-medium tracking-wider text-outline animate-pulse">
          {label}
        </p>
      )}
    </div>
  );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface/80 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return <div className="p-8 flex items-center justify-center">{content}</div>;
}