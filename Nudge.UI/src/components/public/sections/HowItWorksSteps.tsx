interface Step {
  numeral: string;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    numeral: "१",
    title: "Claim & Verify Link",
    description:
      "Create your custom nudge.np/@handle. Instant KYC authentication secures your brand against imposter accounts.",
  },
  {
    numeral: "२",
    title: "Share on Bio & Streams",
    description:
      "Drop your link into your Instagram Bio, YouTube descriptions, TikTok links, or stream live with OBS overlay browser sources.",
  },
  {
    numeral: "३",
    title: "Get Nudged Instantly",
    description:
      "Your community sends direct nudges through mobile banking or diaspora cards. Scheduled direct payouts to your Nepali bank.",
  },
];

export function HowItWorksSteps() {
  return (
    <section className="py-space-2xl px-space-md md:px-margin-tablet lg:px-margin-desktop max-w-7xl mx-auto" id="resources">
      <div className="text-center max-w-2xl mx-auto mb-space-2xl">
        <h2 className="text-headline-lg font-headline-lg text-on-surface">Simple as 1, 2, 3</h2>
        <p className="text-body-md text-on-surface-variant mt-2">
          No complicated merchant accounts or documents needed to receive nudges.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-xl">
        {STEPS.map((step) => (
          <div
            key={step.numeral}
            className="flex flex-col items-center text-center p-6 bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-xs"
          >
            <div className="w-12 h-12 rounded-full bg-primary text-on-primary font-headline-md flex items-center justify-center mb-4 shadow">
              {step.numeral}
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">{step.title}</h3>
            <p className="text-body-sm text-on-surface-variant">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
