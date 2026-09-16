export interface PagodaWatermarkProps {
  className?: string;
}

/** Boudhanath Stupa, a Newari pagoda temple, and the Dharahara tower — hero backdrop. */
export function PagodaWatermark({ className }: PagodaWatermarkProps) {
  return (
    <div className={className} aria-hidden="true">
      <svg
        className="w-full h-full object-cover object-bottom"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 1440 280"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 240 L180 160 L340 210 L520 130 L680 190 L880 110 L1080 180 L1260 120 L1440 200 L1440 280 L0 280 Z"
          fill="#9b2f0a"
          opacity="0.35"
        />
        <path
          d="M40 70 Q 260 120 480 80 Q 720 125 960 75 Q 1200 120 1420 70"
          fill="none"
          stroke="#7e5700"
          strokeDasharray="3 7"
          strokeWidth="1.2"
        />
        <polygon fill="#bc4722" points="120,88 135,112 110,110" />
        <polygon fill="#7e5700" points="210,102 225,124 200,122" />
        <polygon fill="#285f49" points="310,103 325,125 300,123" />
        <polygon fill="#bc4722" points="410,91 425,113 400,111" />
        <polygon fill="#7e5700" points="560,98 575,120 550,118" />
        <polygon fill="#285f49" points="690,104 705,126 680,124" />
        <polygon fill="#bc4722" points="820,95 835,117 810,115" />
        <polygon fill="#7e5700" points="1040,94 1055,116 1030,114" />
        <polygon fill="#285f49" points="1180,101 1195,123 1170,121" />

        {/* Boudhanath Stupa */}
        <path d="M160 280 C160 215 220 185 270 185 C320 185 380 215 380 280 Z" fill="#bc4722" />
        <rect fill="#9b2f0a" height="10" width="180" x="180" y="270" />
        <rect fill="#bc4722" height="32" rx="2" width="40" x="250" y="153" />
        <circle cx="262" cy="167" fill="#fff9ed" r="2.5" />
        <circle cx="278" cy="167" fill="#fff9ed" r="2.5" />
        <path d="M268 174 Q270 178 272 174" fill="none" stroke="#fff9ed" strokeWidth="1.5" />
        <polygon fill="#7e5700" points="270,115 284,153 256,153" />
        <circle cx="270" cy="111" fill="#fabc4d" r="5" />

        {/* Triple-tiered Newari pagoda */}
        <rect fill="#9b2f0a" height="55" width="80" x="710" y="225" />
        <path
          d="M680 225 C705 224 745 222 750 200 C755 222 795 224 820 225 L810 230 L690 230 Z"
          fill="#bc4722"
        />
        <rect fill="#9b2f0a" height="24" width="56" x="722" y="180" />
        <path
          d="M698 180 C720 179 745 177 750 160 C755 177 780 179 802 180 L794 185 L706 185 Z"
          fill="#bc4722"
        />
        <rect fill="#9b2f0a" height="15" width="32" x="734" y="148" />
        <path d="M718 148 C732 147 746 145 750 132 C754 145 768 147 782 148 Z" fill="#bc4722" />
        <polygon fill="#fabc4d" points="750,118 754,132 746,132" />
        <circle cx="750" cy="116" fill="#fabc4d" r="3" />

        {/* Dharahara tower */}
        <path d="M1210 280 L1218 100 L1232 100 L1240 280 Z" fill="#9b2f0a" />
        <rect fill="#7e5700" height="6" width="22" x="1214" y="98" />
        <rect fill="#bc4722" height="4" width="24" x="1213" y="150" />
        <rect fill="#bc4722" height="4" width="20" x="1215" y="205" />
        <path d="M1218 98 C1218 86 1232 86 1232 98 Z" fill="#7e5700" />
        <line stroke="#fabc4d" strokeWidth="2.5" x1="1225" x2="1225" y1="86" y2="76" />
      </svg>
    </div>
  );
}
