"use client";

import React, { useState } from "react";
import { useAuth } from "@/src/features/auth/hooks/use-auth-hook";
import { FormCard } from "@/src/components/ui/form-card";
import { InputField } from "@/src/components/ui/input-field";
import { Button } from "@/src/components/primitives/button";
import Image from "next/image";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  // Form Field States
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");

  const [regUser, setRegUser] = useState("");
  const [regName, setRegName] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regAddress, setRegAddress] = useState("");
  const [regPass, setRegPass] = useState("");
  const [regConfirmPass, setRegConfirmPass] = useState("");

  const { login, isLoading: isLoginLoading, error: loginError } = useAuth();

  const handleFormSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (activeTab === "login") {
      login({ userName: loginUser, password: loginPass });
    } else {
      if (regPass !== regConfirmPass) {
        alert("Passwords do not match!");
        return;
      }
      console.log("Registering:", { regUser, regName, regPhone, regAddress });
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-bg-app text-text-main font-sans selection:bg-action-light selection:text-action-cta">

      {/* 🧩 LEFT PANEL: Premium Branding Canvas */}
      <div className="hidden md:flex md:w-1/2 bg-bg-surface border-r border-border-subtle/10 flex-col justify-between p-16 select-none relative overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-action-light/30 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-center gap-1 relative z-10">
          <Image
            src="/logo.svg"
            alt="Nudge Logo"
            width={100}
            height={70}
            style={{ height: 'auto' }} 
            className="object-contain"
            priority
          />
          <span className="font-brand font-extrabold tracking-tight text-7xl text-text-main">
            Nudge
          </span>
        </div>
        <div className="max-w-md my-auto relative z-10 space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight leading-[1.1] text-text-main">
            Fund your creative passions directly.
          </h1>
          <p className="text-text-muted text-base font-medium leading-relaxed">
            Accept support, manage recurring dynamic tiers, and build a premium digital space trusted by creators nationally.
          </p>
        </div>
        <div className="text-xs text-text-muted relative z-10 font-medium">
          &copy; {new Date().getFullYear()} Nudge Ecosystem. All rights reserved.
        </div>
      </div>

      {/* 🧩 RIGHT PANEL: Structural Form Engine */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-135">
          <FormCard
            title={activeTab === "login" ? "Welcome Back" : "Start Your Page"}
            subtitle={activeTab === "login" ? "Continue managing your workspace" : "Join our community of independent creators"}
            error={loginError}
          >
            {/* 🎚️ Dynamic Tab Switcher Bar */}
            <div className="flex bg-bg-app p-1 rounded-xl mb-6 border border-border-subtle/10 relative">
              <button
                type="button"
                onClick={() => setActiveTab("login")}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all duration-300 relative z-10 cursor-pointer ${activeTab === "login" ? "text-text-main" : "text-text-muted hover:text-text-main"
                  }`}
              >
                Log In
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("signup")}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all duration-300 relative z-10 cursor-pointer ${activeTab === "signup" ? "text-text-main" : "text-text-muted hover:text-text-main"
                  }`}
              >
                Sign Up
              </button>
              <div
                className={`absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-bg-surface rounded-lg shadow-sm border border-border-subtle/5 transition-transform duration-300 ease-out ${activeTab === "signup" ? "translate-x-full" : "translate-x-0"
                  }`}
              />
            </div>

            {/* 🛠️ Modern Unified Form Architecture Container */}
            <form onSubmit={handleFormSubmit} className="flex flex-col space-y-6">
              {/* 🎬 Sliding Horizontal Multi-Form Window Viewport */}
              <div className="overflow-hidden w-full relative">
                <div
                  className="flex w-[200%] transition-transform duration-500 ease-out items-start"
                  style={{ transform: activeTab === "login" ? "translateX(0%)" : "translateX(-50%)" }}
                >
                  {/* 📄 PANEL A: LOGIN FIELDS */}
                  <div
                    className={`w-1/2 pr-4 flex flex-col justify-center min-h-[300px] space-y-5 shrink-0 transition-opacity duration-300 ${activeTab === "login" ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
                      }`}
                    aria-hidden={activeTab !== "login"}
                  >
                    <InputField
                      label="Username or Email"
                      name="loginUser"
                      placeholder="Enter your username"
                      required={activeTab === "login"}
                      tabIndex={activeTab === "login" ? 0 : -1}
                      value={loginUser}
                      onChange={(e) => setLoginUser(e.target.value)}
                    />
                    <InputField
                      label="Password"
                      name="loginPass"
                      type="password"
                      placeholder="••••••••"
                      required={activeTab === "login"}
                      tabIndex={activeTab === "login" ? 0 : -1}
                      value={loginPass}
                      onChange={(e) => setLoginPass(e.target.value)}
                    />
                  </div>

                  {/* 📄 PANEL B: SIGNUP FIELDS */}
                  <div
                    className={`w-1/2 pl-4 flex flex-col justify-center min-h-[300] space-y-4 shrink-0 transition-opacity duration-300 ${activeTab === "signup" ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
                      }`}
                    aria-hidden={activeTab !== "signup"}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <InputField
                        label="Username"
                        name="regUser"
                        placeholder="tech-guy"
                        required={activeTab === "signup"}
                        tabIndex={activeTab === "signup" ? 0 : -1}
                        value={regUser}
                        onChange={(e) => setRegUser(e.target.value)}
                      />
                      <InputField
                        label="Full Name"
                        name="regName"
                        placeholder="Joe Dev"
                        required={activeTab === "signup"}
                        tabIndex={activeTab === "signup" ? 0 : -1}
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                      />
                      <InputField
                        label="Phone Number"
                        name="regPhone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        required={activeTab === "signup"}
                        tabIndex={activeTab === "signup" ? 0 : -1}
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                      />
                      <InputField
                        label="Physical Address"
                        name="regAddress"
                        placeholder="123 Creator Lane, NY"
                        required={activeTab === "signup"}
                        tabIndex={activeTab === "signup" ? 0 : -1}
                        value={regAddress}
                        onChange={(e) => setRegAddress(e.target.value)}
                      />
                      <InputField
                        label="Password"
                        name="regPass"
                        type="password"
                        placeholder="••••••••"
                        required={activeTab === "signup"}
                        tabIndex={activeTab === "signup" ? 0 : -1}
                        value={regPass}
                        onChange={(e) => setRegPass(e.target.value)}
                      />
                      <InputField
                        label="Confirm Password"
                        name="regConfirmPass"
                        type="password"
                        placeholder="••••••••"
                        required={activeTab === "signup"}
                        tabIndex={activeTab === "signup" ? 0 : -1}
                        value={regConfirmPass}
                        onChange={(e) => setRegConfirmPass(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 🚀 FIXED ACTION BUTTON: Anchored perfectly at card base */}
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="nudge"
                  isLoading={activeTab === "login" ? isLoginLoading : false}
                >
                  {activeTab === "login" ? "Continue to Dashboard" : "Get Started"}
                </Button>
              </div>

            </form>
          </FormCard>
        </div>
      </div>
    </div>
  );
}
