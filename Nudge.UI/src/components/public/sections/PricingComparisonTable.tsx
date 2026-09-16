import { Check, X } from "lucide-react";

interface ComparisonRow {
  capability: string;
  nudge: string;
  global: string;
  nudgeHasCheck?: boolean;
  globalHasCheck?: boolean;
  highlight?: boolean;
}

const ROWS: ComparisonRow[] = [
  {
    capability: "eSewa, Khalti & Fonepay QR",
    nudge: "Native 1-Tap QR",
    global: "Not Supported",
    nudgeHasCheck: true,
  },
  {
    capability: "Bank Settlement Currency",
    nudge: "NPR (रु) directly to local banks",
    global: "USD only (Requires Payoneer/SWIFT)",
  },
  {
    capability: "Standard Platform Fee",
    nudge: "Low platform fee to maintain infrastructure",
    global: "12%+ on international platforms + FX fees",
  },
  {
    capability: "Open Source Developers & Humanitarian Causes",
    nudge: "0% Platform Fee (Nudge covers infrastructure, 100% goes to the cause)",
    global: "Standard fees apply (8% – 12% + FX fees)",
    nudgeHasCheck: true,
    highlight: true,
  },
  {
    capability: "Creator Anti-Impersonation & Verification",
    nudge: "Nagarik App KYC & Celebrity Handle Protection",
    global: "Basic email verification only",
    nudgeHasCheck: true,
  },
  {
    capability: "Diaspora Support (Card / Apple Pay)",
    nudge: "Yes (Global Cards to NPR)",
    global: "Yes",
    nudgeHasCheck: true,
    globalHasCheck: true,
  },
  {
    capability: "Dakshina & Community Wall",
    nudge: "Nepali Unicode & Audio Notes",
    global: "Generic English text",
    nudgeHasCheck: true,
  },
];

export function PricingComparisonTable() {
  return (
    <section className="py-space-2xl bg-surface-container border-y border-outline-variant/70" id="pricing">
      <div className="max-w-5xl mx-auto px-space-md md:px-margin-tablet">
        <div className="text-center max-w-xl mx-auto mb-space-xl">
          <h2 className="text-headline-lg font-headline-lg text-on-surface tracking-tight">
            Stop losing 30% to international currency conversions.
          </h2>
          <p className="text-body-md text-on-surface-variant mt-2">
            Patreon and Buy Me a Coffee require USD bank accounts and PayPal. Nudge is built with
            clear local pricing, 0% public good support, and direct payouts.
          </p>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-surface-container-high bg-surface-container-low/50">
                <th className="p-4 text-label-md font-label-md text-on-surface">Capability</th>
                <th className="p-4 text-label-md font-label-md text-primary bg-primary-fixed/20 border-x border-primary-container/20">
                  Nudge Nepal 🇳🇵
                </th>
                <th className="p-4 text-label-md font-label-md text-outline">Global Platforms (Patreon / BMC)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high text-body-sm">
              {ROWS.map((row) => (
                <tr key={row.capability} className={row.highlight ? "bg-tertiary-fixed/20" : undefined}>
                  <td className="p-4 font-semibold text-on-surface">{row.capability}</td>
                  <td
                    className={`p-4 border-x font-bold ${
                      row.highlight
                        ? "bg-tertiary-fixed/35 border-tertiary-container/30 text-tertiary"
                        : "bg-primary-fixed/10 border-primary-container/20 text-tertiary"
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      {row.nudgeHasCheck && <Check size={16} className="shrink-0" />}
                      <span>{row.nudge}</span>
                    </div>
                  </td>
                  <td className="p-4 text-outline">
                    <div className="flex items-center gap-1">
                      {row.globalHasCheck ? (
                        <Check size={16} className="text-tertiary shrink-0" />
                      ) : row.nudgeHasCheck ? (
                        <X size={16} className="text-error shrink-0" />
                      ) : null}
                      <span className={row.nudgeHasCheck && !row.globalHasCheck ? "text-error" : undefined}>
                        {row.global}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
