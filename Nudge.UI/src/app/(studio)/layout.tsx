// src/app/(studio)/layout.tsx
"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/src/features/auth/hooks/use.auth.hook";
import { useRouter } from "next/navigation";
import { StudioSidebar } from "@/src/components/dashboard/StudioSidebar";
import { StudioHeader } from "@/src/components/dashboard/StudioHeader";
import { DashboardFooter } from "@/src/components/dashboard/DashboardFooter";
import Loading from "@/src/app/loading";

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();

  // Route protection guard
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/auth");
    }
  }, [isLoading, isAuthenticated, router]);

  const handleLogout = async () => {
    await logout();
    router.replace("/auth");
  };

  const handleVerifyClick = () => {
    router.push("/kyc/step-1");
  };

if (isLoading) {
  return <Loading />;
}

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="bg-background text-on-surface antialiased min-h-screen flex flex-col lg:flex-row selection:bg-primary-fixed selection:text-primary">
      {/* 1. Persistent Studio Sidebar Rail */}
      <StudioSidebar user={user} onVerifyClick={handleVerifyClick} />

      {/* 2. Main Studio Canvas (Header + Page Content + Footer) */}
      <div className="flex-1 flex flex-col min-w-0">
        <StudioHeader user={user} onLogout={handleLogout} />

        <main className="flex-1 pb-16 bg-mandala-texture">
          {children}
        </main>

        <DashboardFooter />
      </div>
    </div>
  );
}