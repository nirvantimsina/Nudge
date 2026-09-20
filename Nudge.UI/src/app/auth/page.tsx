"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AtSign,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Info,
} from "lucide-react";
import { useAuth } from "@/src/features/auth/hooks/use.auth.hook";
import { Button } from "@/src/components/public/common/Button";
import { LogoLoader } from "@/src/components/public/common/LogoLoader";

function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [showLoginPass, setShowLoginPass] = useState(false);
  const [showRegPass, setShowRegPass] = useState(false);
  const [showRegConfirmPass, setShowRegConfirmPass] = useState(false);
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

  // Form Field States
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");

  const [regUser, setRegUser] = useState("");
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
          password: regPass,
          name: regName,
          phone: regPhone,
          address: regAddress,
        });
        router.push("/dashboard");
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
      <div className="hidden md:flex md:w-1/2 bg-surface-container-low border-r border-outline-variant/60 flex-col justify-between p-8 lg:p-12 select-none relative overflow-hidden shrink-0 h-full">
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-6 right-0 w-72 h-72 bg-secondary-container/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <Link className="inline-flex items-center gap-2.5 group" href="/">
            <div className="w-10 h-10 rounded-xl bg-surface-container-lowest shadow-sm border border-outline-variant/60 flex items-center justify-center p-2 group-hover:scale-105 transition-transform">
              <Image
                src="/logo.svg"
                alt="Nudge Logo"
                width={28}
                height={28}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-headline-md font-bold tracking-tight text-2xl text-on-surface">
                Nudge
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed border border-secondary-container">
                नेपाल
              </span>
            </div>
          </Link>
        </div>

        <div className="my-auto relative z-10 max-w-lg space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-lowest/90 border border-outline-variant/70 text-xs font-semibold text-on-surface shadow-xs">
            <Sparkles size={14} className="text-primary" />
            <span>0% Fee for Humanitarian &amp; Open Source</span>
          </div>

          <div className="space-y-2.5">
            <h1 className="font-display-hero text-3xl lg:text-4xl font-bold tracking-tight leading-[1.18] text-on-surface">
              Direct support for your creative work,{" "}
              <span className="text-primary underline decoration-secondary-container decoration-4 underline-offset-8">
                without intermediaries.
              </span>
            </h1>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Empowering Himalayan storytellers, podcasters, animators, and developers. Accept direct 1-tap support via eSewa, Khalti, and local mobile banking with next-day bank clearance.
            </p>
          </div>

          <div className="bg-surface-container-lowest/95 backdrop-blur-md rounded-2xl p-4 border border-outline-variant/70 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                  SB
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <h4 className="text-xs font-bold text-on-surface">Sisan Baniya</h4>
                    <CheckCircle2 size={13} className="text-tertiary fill-tertiary-fixed" />
                  </div>
                  <p className="text-[10px] text-on-surface-variant">Filmmaker &amp; Visual Storyteller</p>
                </div>
              </div>
              <span className="text-[11px] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-lg">
                रु 1.85L+ funded
              </span>
            </div>
            <p className="text-xs italic text-on-surface-variant leading-snug">
              &ldquo;Nudge allowed our audience to directly fund our Mustang winter expedition without corporate briefs.&rdquo;
            </p>
          </div>

          <div className="pt-2 border-t border-outline-variant/50 flex items-center justify-between text-xs text-outline">
            <div className="flex items-center gap-1.5 text-on-surface-variant">
              <ShieldCheck size={14} className="text-tertiary" />
              <span>NRB Directive Compliant</span>
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant">
              <span className="font-semibold text-on-surface">Rails:</span>
              <span>Fonepay</span> • <span>eSewa</span> • <span>Khalti</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between text-xs text-outline">
          <span>&copy; 2026 Nudge Nepal Pvt. Ltd.</span>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
          </div>
        </div>
      </div>

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

          {/* Social Provider */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2.5 py-2 px-3 bg-surface-container-low hover:bg-surface-container border border-outline-variant rounded-xl text-xs font-semibold text-on-surface transition-colors cursor-pointer mb-4"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="relative flex items-center mb-4">
            <div className="flex-grow border-t border-outline-variant/60" />
            <span className="flex-shrink mx-3 text-[10px] font-bold tracking-wider uppercase text-outline">
              or credentials
            </span>
            <div className="flex-grow border-t border-outline-variant/60" />
          </div>

          <form onSubmit={handleFormSubmit} className="flex flex-col">
            <div className="overflow-hidden w-full relative">
              <div
                className="flex w-[200%] items-start transition-transform duration-500 ease-out"
                style={{
                  transform:
                    activeTab === "login" ? "translateX(0%)" : "translateX(-50%)",
                }}
              >
                {/* PANEL A: LOGIN */}
                <div
                  className={`w-1/2 pr-3 flex flex-col justify-start space-y-3 shrink-0 transition-opacity duration-300 ${
                    activeTab === "login"
                      ? "opacity-100 visible"
                      : "opacity-0 invisible pointer-events-none"
                  }`}
                  aria-hidden={activeTab !== "login"}
                >
                  <div>
                    <label className="block text-[11px] font-bold text-on-surface uppercase tracking-wider mb-1">
                      Username / Email
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-outline">
                        <AtSign size={15} />
                      </span>
                      <input
                        type="text"
                        required={activeTab === "login"}
                        value={loginUser}
                        onChange={(e) => setLoginUser(e.target.value)}
                        placeholder="sisan_baniya or you@mail.com"
                        className="w-full pl-9 pr-3 py-2 bg-surface-container-low border border-outline-variant rounded-xl text-xs sm:text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-[11px] font-bold text-on-surface uppercase tracking-wider">
                        Password
                      </label>
                      <Link
                        href="/forgot-password"
                        className="text-xs font-semibold text-primary hover:underline"
                      >
                        Forgot?
                      </Link>
                    </div>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-outline">
                        <Lock size={15} />
                      </span>
                      <input
                        type={showLoginPass ? "text" : "password"}
                        required={activeTab === "login"}
                        value={loginPass}
                        onChange={(e) => setLoginPass(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full pl-9 pr-9 py-2 bg-surface-container-low border border-outline-variant rounded-xl text-xs sm:text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      />
                      <button
                        type="button"
                        onClick={() => setShowLoginPass(!showLoginPass)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-outline hover:text-on-surface"
                      >
                        {showLoginPass ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant text-[11px] text-on-surface-variant flex items-center gap-2">
                    <Info size={15} className="text-primary shrink-0" />
                    <span>Your live stream OBS browser source key stays preserved.</span>
                  </div>
                </div>

                {/* PANEL B: SIGNUP */}
                <div
                  className={`w-1/2 pl-3 flex flex-col justify-start space-y-2.5 shrink-0 transition-opacity duration-300 ${
                    activeTab === "signup"
                      ? "opacity-100 visible"
                      : "opacity-0 invisible pointer-events-none"
                  }`}
                  aria-hidden={activeTab !== "signup"}
                >
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[10px] font-bold text-on-surface uppercase tracking-wider mb-0.5">
                        Creator Handle
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none text-outline text-xs font-mono font-bold">
                          @
                        </span>
                        <input
                          type="text"
                          required={activeTab === "signup"}
                          value={regUser}
                          onChange={(e) =>
                            setRegUser(
                              e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, "")
                            )
                          }
                          placeholder="handle"
                          className="w-full pl-6 pr-2 py-1.5 bg-surface-container-low border border-outline-variant rounded-lg text-xs text-on-surface placeholder:text-outline focus:outline-none focus:border-primary"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-on-surface uppercase tracking-wider mb-0.5">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required={activeTab === "signup"}
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="Sisan Baniya"
                        className="w-full px-2.5 py-1.5 bg-surface-container-low border border-outline-variant rounded-lg text-xs text-on-surface placeholder:text-outline focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[10px] font-bold text-on-surface uppercase tracking-wider mb-0.5">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        required={activeTab === "signup"}
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        placeholder="+977 98XXXXXXXX"
                        className="w-full px-2.5 py-1.5 bg-surface-container-low border border-outline-variant rounded-lg text-xs text-on-surface placeholder:text-outline focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-on-surface uppercase tracking-wider mb-0.5">
                        City / Location
                      </label>
                      <input
                        type="text"
                        required={activeTab === "signup"}
                        value={regAddress}
                        onChange={(e) => setRegAddress(e.target.value)}
                        placeholder="Kathmandu"
                        className="w-full px-2.5 py-1.5 bg-surface-container-low border border-outline-variant rounded-lg text-xs text-on-surface placeholder:text-outline focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[10px] font-bold text-on-surface uppercase tracking-wider mb-0.5">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showRegPass ? "text" : "password"}
                          required={activeTab === "signup"}
                          value={regPass}
                          onChange={(e) => setRegPass(e.target.value)}
                          placeholder="8+ chars"
                          className="w-full pl-2.5 pr-7 py-1.5 bg-surface-container-low border border-outline-variant rounded-lg text-xs text-on-surface placeholder:text-outline focus:outline-none focus:border-primary"
                        />
                        <button
                          type="button"
                          onClick={() => setShowRegPass(!showRegPass)}
                          className="absolute inset-y-0 right-0 pr-2 flex items-center text-outline hover:text-on-surface"
                        >
                          {showRegPass ? <EyeOff size={13} /> : <Eye size={13} />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-on-surface uppercase tracking-wider mb-0.5">
                        Confirm
                      </label>
                      <div className="relative">
                        <input
                          type={showRegConfirmPass ? "text" : "password"}
                          required={activeTab === "signup"}
                          value={regConfirmPass}
                          onChange={(e) => setRegConfirmPass(e.target.value)}
                          placeholder="Repeat"
                          className="w-full pl-2.5 pr-7 py-1.5 bg-surface-container-low border border-outline-variant rounded-lg text-xs text-on-surface placeholder:text-outline focus:outline-none focus:border-primary"
                        />
                        <button
                          type="button"
                          onClick={() => setShowRegConfirmPass(!showRegConfirmPass)}
                          className="absolute inset-y-0 right-0 pr-2 flex items-center text-outline hover:text-on-surface"
                        >
                          {showRegConfirmPass ? <EyeOff size={13} /> : <Eye size={13} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-0.5">
                    <label className="flex items-start gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="mt-0.5 w-3 h-3 rounded border-outline-variant text-primary focus:ring-primary accent-primary"
                      />
                      <span className="text-[10px] text-on-surface-variant leading-tight">
                        I agree to the{" "}
                        <Link href="/terms" className="text-primary font-semibold hover:underline">
                          Terms &amp; Conditions
                        </Link>{" "}
                        and 0% platform fee for humanitarian &amp; OSS work.
                      </span>
                    </label>
                  </div>
                </div>
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
