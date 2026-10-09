// src/app/auth/page.tsx
"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Sparkles, ArrowRight, ArrowLeft, Info, ShieldCheck } from "lucide-react";
import { useAuth } from "@/src/features/auth/hooks/useAuth";
import { Button } from "@/src/components/ui/Button";
import { LogoLoader } from "@/src/components/public/common/LogoLoader";
import { AuthSidebar } from "@/src/features/auth/components/AuthSidebar";
import { LoginForm } from "@/src/features/auth/components/LoginForm";
import { SignupForm } from "@/src/features/auth/components/SignupForm";
import { SocialAuthButtons } from "@/src/features/auth/components/SocialAuthButtons";

function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [formError, setFormError] = useState<string | null>(null);

  // Sync tab state whenever ?tab= changes in the URL
  useEffect(() => {
    if (tabParam === "signup") {
      setActiveTab("signup");
    } else if (tabParam === "login") {
      setActiveTab("login");
    }
  }, [tabParam]);

  // Clear errors when switching tabs
  useEffect(() => {
    setFormError(null);
  }, [activeTab]);

  // Login Form State
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");

  // Signup Form State
  const [regUser, setRegUser] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regName, setRegName] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regAddress, setRegAddress] = useState("");
  const [regPass, setRegPass] = useState("");
  const [regConfirmPass, setRegConfirmPass] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(true);

  const { login, signup, isLoading } = useAuth();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (activeTab === "login") {
      try {
        await login({ userName: loginUser, password: loginPass });
        router.push("/dashboard");
      } catch (err: any) {
        setFormError(err.message || "Invalid username or password.");
      }
    } else {
      if (!agreeTerms) {
        setFormError("Please accept the terms to proceed.");
        return;
      }
      if (regPass !== regConfirmPass) {
        setFormError("Passwords do not match!");
        return;
      }

      try {
        await signup({
          userName: regUser,
          email: regEmail.trim() || `${regUser.trim()}@nudge.np`,
          password: regPass,
          name: regName,
          phone: regPhone,
          address: regAddress,
        });
        router.push("/onboarding");
      } catch (err: any) {
        setFormError(err.message || "Failed to create creator account.");
      }
    }
  };

  return (
    <div className="h-screen w-full flex flex-col md:flex-row overflow-hidden bg-surface text-on-surface font-sans selection:bg-primary-fixed selection:text-on-primary-fixed">
      {isLoading && (
        <LogoLoader
          label={
            activeTab === "login"
              ? "Authenticating your session…"
              : "Creating your creator page…"
          }
          fullscreen={true}
        />
      )}

      {/* 🧩 LEFT PANEL: 50% Desktop Width */}
      <AuthSidebar />

      {/* 🧩 RIGHT PANEL: 50% Desktop Width */}
      <div className="w-full md:w-1/2 flex-1 flex flex-col justify-between items-center p-6 sm:p-8 lg:p-10 relative bg-surface h-full overflow-hidden">
        <div className="w-full max-w-md flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-outline hover:text-primary transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Home</span>
          </Link>
          <div className="md:hidden flex items-center gap-1 text-[11px] font-semibold text-tertiary bg-tertiary-fixed/40 px-2.5 py-1 rounded-full">
            <ShieldCheck size={12} />
            <span>Secure Rails</span>
          </div>
        </div>

        <div className="w-full max-w-md bg-surface-container-lowest rounded-3xl border border-outline-variant shadow-lg p-6 sm:p-7 my-auto">
          <div className="mb-4">
            <h2 className="font-headline-md text-2xl font-bold text-on-surface tracking-tight">
              {activeTab === "login" ? "Welcome Back" : "Claim Your Handle"}
            </h2>
            <p className="text-xs text-on-surface-variant mt-1">
              {activeTab === "login"
                ? "Access your dashboard, live alerts, and payout history."
                : "Create your verified page and accept local patronage."}
            </p>
          </div>

          {formError && (
            <div className="mb-3 p-2.5 rounded-xl bg-error-container text-on-error-container text-xs flex items-center gap-2">
              <Info size={14} className="shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {/* Tab Switcher */}
          <div className="flex bg-surface-container p-1 rounded-xl mb-4 border border-outline-variant relative select-none">
            <button
              type="button"
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-1.5 text-xs sm:text-sm font-bold rounded-lg transition-all duration-200 relative z-10 flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === "login"
                  ? "text-on-surface"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <span>Log In</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("signup")}
              className={`flex-1 py-1.5 text-xs sm:text-sm font-bold rounded-lg transition-all duration-200 relative z-10 flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === "signup"
                  ? "text-on-surface"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <Sparkles size={13} className="text-primary" />
              <span>Start Your Page</span>
            </button>
            <div
              className={`absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-surface-container-lowest rounded-lg shadow-xs border border-outline-variant/60 transition-transform duration-300 ease-out ${
                activeTab === "signup" ? "translate-x-full" : "translate-x-0"
              }`}
            />
          </div>

          <form onSubmit={handleFormSubmit} className="flex flex-col mt-4">
            <div className="overflow-hidden w-full relative">
              <div
                className="flex w-[200%] items-start transition-transform duration-500 ease-out"
                style={{
                  transform:
                    activeTab === "login" ? "translateX(0%)" : "translateX(-50%)",
                }}
              >
                <LoginForm
                  loginUser={loginUser}
                  setLoginUser={setLoginUser}
                  loginPass={loginPass}
                  setLoginPass={setLoginPass}
                  isActive={activeTab === "login"}
                />

                <SignupForm
                  regUser={regUser}
                  setRegUser={setRegUser}
                  regEmail={regEmail}
                  setRegEmail={setRegEmail}
                  regName={regName}
                  setRegName={setRegName}
                  regPhone={regPhone}
                  setRegPhone={setRegPhone}
                  regAddress={regAddress}
                  setRegAddress={setRegAddress}
                  regPass={regPass}
                  setRegPass={setRegPass}
                  regConfirmPass={regConfirmPass}
                  setRegConfirmPass={setRegConfirmPass}
                  agreeTerms={agreeTerms}
                  setAgreeTerms={setAgreeTerms}
                  isActive={activeTab === "signup"}
                />
              </div>
            </div>

            {/* Bottom Submit Action */}
            <div className="pt-4 mt-2 border-t border-outline-variant/60">
              <Button
                type="submit"
                variant="primary"
                size="md"
                fullWidth
                isLoading={isLoading}
                rightIcon={<ArrowRight size={15} />}
              >
                {activeTab === "login" ? "Continue to Dashboard" : "Claim Page & Get Started"}
              </Button>

              <SocialAuthButtons />

              <p className="text-xs text-on-surface-variant text-center mt-3">
                {activeTab === "login" ? (
                  <>
                    No creator page yet?{" "}
                    <button
                      type="button"
                      onClick={() => setActiveTab("signup")}
                      className="text-primary font-bold hover:underline cursor-pointer"
                    >
                      Start your page for free
                    </button>
                  </>
                ) : (
                  <>
                    Already registered?{" "}
                    <button
                      type="button"
                      onClick={() => setActiveTab("login")}
                      className="text-primary font-bold hover:underline cursor-pointer"
                    >
                      Log in to your page
                    </button>
                  </>
                )}
              </p>
            </div>
          </form>
        </div>

        <div className="text-[11px] text-outline font-medium">
          Protected by eSewa KYC &amp; Interbank Direct Settlement
        </div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={null}>
      <AuthForm />
    </Suspense>
  );
}
