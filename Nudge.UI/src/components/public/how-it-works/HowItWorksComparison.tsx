// src/components/public/how-it-works/HowItWorksComparison.tsx
import React from "react";
import { Ban, Bolt, CheckCircle2, ShieldCheck, Receipt, FileText, Landmark } from "lucide-react";

export function HowItWorksComparison() {
  return (
    <>
      {/* 3. SETTLEMENT COMPARISON SECTION */}
      <section className="py-12 md:py-space-2xl bg-surface" id="payment-comparison">
        <div className="max-w-7xl mx-auto px-space-md md:px-margin-tablet lg:px-margin-desktop">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container text-xs font-bold text-primary mb-3 font-mono">
              CLEARANCE ARCHITECTURE
            </div>
            <h2 className="text-headline-lg font-headline-lg text-on-surface mb-4 font-bold">
              Why Nepali Creators Leave Western Platforms
            </h2>
            <p className="snap-start text-body-md font-body-md text-on-surface-variant mt-7 leading-relaxed">
              International patronage platforms were never engineered for South Asia. See how Nudge transforms the settlement corridor.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* The Old Way */}
            <div className="bg-surface-container-lowest p-8 border border-outline-variant/60 relative overflow-hidden flex flex-col justify-between rounded-2xl">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-error/5 rounded-full blur-2xl pointer-events-none" />
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-surface-container">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-error-container text-error flex items-center justify-center">
                      <Ban size={20} />
                    </span>
                    <div>
                      <h3 className="font-title-md text-title-md text-on-surface font-bold">
                        The Legacy Friction Way
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Patreon / PayPal / International Wire
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 bg-error-container text-on-error-container rounded-full">
                    High Leakage
                  </span>
                </div>

                <div className="py-6 space-y-4">
                  <div className="flex items-start gap-4 text-on-surface-variant">
                    <Ban size={18} className="text-error mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-on-surface text-body-md block mb-0.5">
                        Domestic Fan Friction:
                      </strong>
                      <p className="text-body-sm leading-relaxed">
                        Local fans inside Nepal cannot pay via Fonepay or domestic debit cards due to strict foreign exchange card constraints.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 text-on-surface-variant">
                    <Ban size={18} className="text-error mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-on-surface text-body-md block mb-0.5">
                        Predatory Intermediary Cuts:
                      </strong>
                      <p className="text-body-sm leading-relaxed">
                        8% to 12% lost in platform take rates, Payoneer withdrawal cuts, and correspondent bank fees.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 text-on-surface-variant">
                    <Ban size={18} className="text-error mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-on-surface text-body-md block mb-0.5">
                        Painful Settlement Delays:
                      </strong>
                      <p className="text-body-sm leading-relaxed">
                        Payout holds lasting 14 to 30 days, manual wire slips, and unpredictable bank inquiries for foreign remittance classification.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface-container-high border border-outline-variant text-center">
                <span className="text-xs text-on-surface-variant font-medium">Net Creator Proceeds:</span>
                <div className="text-headline-sm font-headline-sm text-error font-bold mt-0.5">
                  ~ Rs. 840 per Rs. 1,000 Contributed
                </div>
              </div>
            </div>

            {/* The Nudge Way */}
            <div className="bg-surface-container-lowest p-8 border-2 border-primary-container shadow-md relative overflow-hidden flex flex-col justify-between rounded-2xl">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary-container/10 rounded-full blur-2xl pointer-events-none" />
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-surface-container">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center">
                      <Bolt size={20} />
                    </span>
                    <div>
                      <h3 className="font-title-md text-title-md text-on-surface font-bold">
                        The Nudge High-Velocity Loop
                      </h3>
                      <p className="font-body-sm text-body-sm text-tertiary font-medium">
                        Fonepay · eSewa · Khalti · Direct NRB Clearance
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-full">
                    Instant Access
                  </span>
                </div>

                <div className="py-6 space-y-4">
                  <div className="flex items-start gap-4 text-on-surface-variant">
                    <CheckCircle2 size={18} className="text-tertiary mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-on-surface text-body-md block mb-0.5">
                        10-Second Domestic QR Clearance:
                      </strong>
                      <p className="text-body-sm leading-relaxed">
                        Every Nepali mobile banking app (NIC Asia MoBank, Global Smart Plus, etc.) clears within seconds via interoperable NepalPay / Fonepay rails.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 text-on-surface-variant">
                    <CheckCircle2 size={18} className="text-tertiary mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-on-surface text-body-md block mb-0.5">
                        Global Diaspora Card Processing:
                      </strong>
                      <p className="text-body-sm leading-relaxed">
                        Nepalis in the US, UK, Australia, and Gulf pay with international credit/debit cards with live automated NPR settlement.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 text-on-surface-variant">
                    <CheckCircle2 size={18} className="text-tertiary mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-on-surface text-body-md block mb-0.5">
                        Transparent Low Take Rate:
                      </strong>
                      <p className="text-body-sm leading-relaxed">
                        0% for open-source &amp; cultural archives, 5% standard flat. No wire fees, no minimum balance lockups.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface-container border border-primary/20 text-center">
                <span className="text-xs text-on-surface-variant font-medium">Net Creator Proceeds:</span>
                <div className="text-headline-sm font-headline-sm text-primary font-bold mt-0.5">
                  Rs. 950 - Rs. 1,000 per Rs. 1,000 Contributed
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PAYOUTS & COMPLIANCE SECTION */}
      <section className="snap-start py-16 md:py-22 bg-surface-container-low border-y border-outline-variant/60">
        <div className="max-w-7xl mx-auto px-space-md md:px-margin-tablet lg:px-margin-desktop">
          <div className="bg-surface-container-lowest rounded-2xl p-8 md:p-12 border border-outline-variant shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container text-xs font-bold text-tertiary font-mono">
                  <ShieldCheck size={14} />
                  <span>RELIABLE &amp; TRANSPARENT PAYOUTS</span>
                </div>
                <h2 className="text-headline-md md:text-headline-lg font-headline-md md:font-headline-lg text-on-surface leading-tight font-bold">
                  Standard Weekly &amp; On-Demand Bank Transfers
                </h2>
                <p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
                  Disbursements are processed in weekly scheduled batches every Sunday, with optional on-demand withdrawals available once minimum thresholds are met. Funds transfer directly to licensed commercial Nepali bank accounts or linked domestic digital wallets (eSewa / Khalti).
                </p>

                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-xl bg-surface-container-low border border-outline-variant/60 flex flex-col justify-start">
                    <div className="flex items-center gap-2 text-on-surface font-title-md mb-2 font-bold">
                      <Receipt size={20} className="text-primary" />
                      <span>Earnings Summary</span>
                    </div>
                    <p className="text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                      Download clean CSV and monthly transaction reports ready for your local tax filings or personal records.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-surface-container-low border border-outline-variant/60 flex flex-col justify-start">
                    <div className="flex items-center gap-2 text-on-surface font-title-md mb-2 font-bold">
                      <FileText size={20} className="text-tertiary" />
                      <span>Digital Invoicing</span>
                    </div>
                    <p className="text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                      Clear receipts for every contribution received domestically or from diaspora supporters abroad.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 bg-surface-container rounded-2xl border border-outline-variant text-center">
                <div className="w-16 h-16 rounded-full bg-primary-container text-on-primary flex items-center justify-center mb-4 shadow-sm">
                  <Landmark size={30} />
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2 font-bold">
                  Secure Direct Settlements
                </h3>
                <p className="text-body-sm font-body-sm text-on-surface-variant mb-6 max-w-xs leading-relaxed">
                  Electronic batch clearance to major Nepali commercial banks and interoperable domestic wallets.
                </p>
                <div className="w-full flex flex-wrap items-center justify-center gap-2 pt-4 border-t border-outline-variant/60">
                  <span className="px-3 py-1.5 bg-surface-container-lowest rounded-lg text-xs font-bold text-on-surface border border-outline-variant">
                    eSewa
                  </span>
                  <span className="px-3 py-1.5 bg-surface-container-lowest rounded-lg text-xs font-bold text-on-surface border border-outline-variant">
                    Khalti
                  </span>
                  <span className="px-3 py-1.5 bg-surface-container-lowest rounded-lg text-xs font-bold text-on-surface border border-outline-variant">
                    Fonepay
                  </span>
                  <span className="px-3 py-1.5 bg-surface-container-lowest rounded-lg text-xs font-bold text-on-surface border border-outline-variant">
                    ConnectIPS
                  </span>
                  <span className="px-3 py-1.5 bg-surface-container-lowest rounded-lg text-xs font-bold text-on-surface border border-outline-variant">
                    Global Cards
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
