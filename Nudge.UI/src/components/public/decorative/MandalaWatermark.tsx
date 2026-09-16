export interface MandalaWatermarkProps {
  className?: string;
}

export function MandalaWatermark({ className }: MandalaWatermarkProps) {
  return (
    <div className={className} aria-hidden="true">
      <svg className="w-full h-full" fill="none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="90" stroke="#9b2f0a" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="70" stroke="#bc4722" strokeDasharray="4 4" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="50" stroke="#7e5700" strokeWidth="1" />
        <path
          d="M100 10 L100 190 M10 100 L190 100 M36 36 L164 164 M36 164 L164 36"
          stroke="#9b2f0a"
          strokeWidth="1"
        />
        <polygon points="100,20 180,100 100,180 20,100" stroke="#bc4722" strokeWidth="1.5" />
        <polygon points="100,35 165,100 100,165 35,100" stroke="#fabc4d" strokeWidth="1" />
      </svg>
    </div>
  );
}
