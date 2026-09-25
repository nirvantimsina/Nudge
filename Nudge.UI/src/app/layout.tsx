import type { Metadata } from "next";
import "./globals.css";
import { CustomCursor } from "../components/public/common/CustomCursor";
import { AuthProvider } from "../features/auth/hooks/use.auth.hook";
import { ContextMenu } from "../components/public/common/ContextMenu";
import { ConsoleEasterEgg } from "../components/public/eastereggs/ConsoleEasterEgg";
import { ToastContainer } from "../components/common/ToastContainer";
import AnalyticsTracker from "../components/AnalyticsTracker";

export const metadata: Metadata = {
  title: "Nudge | Nepal's Creator Patronage Platform",
  description:
    "Nudge lets your community send direct support, one-time or recurring, through local mobile banking, digital wallets, and diaspora cards.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Epilogue:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface text-on-surface font-body-md antialiased min-h-screen flex flex-col selection:bg-primary/20 selection:text-primary">
      <ConsoleEasterEgg />
      <CustomCursor />
      <AuthProvider >
        <ContextMenu />
        <AnalyticsTracker />
        {children}
        <ToastContainer />
      </AuthProvider>
      </body>
    </html>
  );
}
