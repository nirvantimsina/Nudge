// src/app/(studio)/layout.tsx
"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/features/auth/hooks/use.auth.hook";
import { StudioSidebar } from "@/src/components/dashboard/StudioSidebar";
import { StudioHeader } from "@/src/components/dashboard/StudioHeader";
import { DashboardFooter } from "@/src/components/dashboard/DashboardFooter";
import Loading from "@/src/app/loading";
import { CreatorProvider } from "@/src/context/CreatorContext";

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // Route protection guard
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/auth");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-background">
        <Loading />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <CreatorProvider>
      {/* Viewport-locked studio application shell */}
      <div className="h-dvh w-full flex overflow-hidden bg-background text-on-surface antialiased selection:bg-primary-fixed selection:text-primary">
        
        {/* 1. Docked Sidebar (Desktop: pinned height with independent scroll) */}
        <aside className="hidden lg:flex flex-col w-64 shrink-0 h-full border-r border-outline-variant/40 bg-surface-container-low z-30">
          <StudioSidebar />
        </aside>

        {/* 2. Right Viewport Canvas */}
        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          
          {/* Sticky Header with subtle blur */}
          <header className="shrink-0 sticky top-0 z-20 bg-surface-container-lowest/85 backdrop-blur-md border-b border-outline-variant/40">
            <StudioHeader />
          </header>

          {/* Scrollable Work Area */}
          <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col justify-between relative">
            
            {/* Background Texture & Ambient Accent */}
            <div className="absolute inset-0 bg-mandala-texture opacity-40 pointer-events-none -z-10" />

            {/* Page Canvas Container */}
            <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6 md:py-8 flex-1">
              {children}
            </main>

            {/* Subtle Studio Footer */}
            <footer className="shrink-0 border-t border-outline-variant/30 bg-surface-container-lowest/50 backdrop-blur-xs">
              <DashboardFooter />
            </footer>
          </div>
        </div>
      </div>
    </CreatorProvider>
  );
}