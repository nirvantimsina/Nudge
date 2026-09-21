import { Landmark, CheckCircle, Shield } from "lucide-react";

export function NepalBankPayoutsFeature() {
  const partners = ["NIC Asia Bank", "Nabil Bank", "Global IME", "Sanima Bank"];

  return (
    <section className="py-space-3xl max-w-7xl mx-auto px-space-md md:px-margin-tablet lg:px-margin-desktop" id="bank-payouts">
      <div className="bg-surface-container-lowest rounded-3xl p-8 md:p-12 border border-outline-variant shadow-lg relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-tertiary-fixed/30 rounded-full blur-3xl pointer-events-none" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center relative z-10">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant text-label-sm font-label-sm mb-4">
              <Landmark size={14} />
              <span>Local Financial Sovereignty</span>
            </div>
            <h2 className="text-headline-lg font-headline-lg text-on-surface mb-space-md">
              Direct next-day settlement to all banks in Nepal.
            </h2>
            <p className="text-body-md font-body-md text-on-surface-variant mb-space-lg leading-relaxed">
              No international wire transfer fees, no 30-day payout holds, and no predatory exchange markups. Withdraw earnings directly to your account in any licensed Nepal Rastra Bank institution.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/60">
                <div className="text-currency-display font-currency-display text-tertiary mb-1">२४ घण्टा</div>
                <div className="text-title-md font-title-md text-on-surface font-semibold">Automated Clearance</div>
                <div className="text-body-sm font-body-sm text-on-surface-variant mt-1">Direct clearing via Nepal Clearing House (NCHL) &amp; Fonepay network every working morning.</div>
              </div>
              <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/60">
                <div className="text-currency-display font-currency-display text-primary mb-1">०% शुल्क</div>
                <div className="text-title-md font-title-md text-on-surface font-semibold">For Cultural &amp; Open Source</div>
                <div className="text-body-sm font-body-sm text-on-surface-variant mt-1">Zero platform fee for open source builders, archivists, and relief initiatives. Standard 5% flat fee for creators.</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-surface-container rounded-2xl p-6 border border-outline-variant flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono font-bold text-outline mb-3">SUPPORTED SETTLEMENT PARTNERS</div>
              <div className="grid grid-cols-2 gap-2.5 mb-6 text-xs font-bold text-on-surface">
                {partners.map((partner) => (
                  <div key={partner} className="p-3 rounded-lg bg-surface-container-lowest border border-outline-variant/60 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                    <span>{partner}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-surface-container-lowest border border-tertiary-fixed flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <CheckCircle size={18} className="text-tertiary" />
                  <div>
                    <div className="text-xs font-bold text-on-surface">Settlement Complete</div>
                    <div className="text-[11px] text-outline font-mono">Tx ID: NCHL-89302482</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-tertiary font-mono">रु. २८,५००</div>
                  <div className="text-[10px] text-outline">Direct into Bank</div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-outline-variant/60 flex items-center gap-2 text-xs text-on-surface-variant">
              <Shield size={14} className="text-tertiary shrink-0" />
              <span>Licensed Payment Security Compliance with Nepal Rastra Bank Guidelines</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}