// src/features/auth/components/SignupForm.tsx
import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

interface SignupFormProps {
  regUser: string;
  setRegUser: (val: string) => void;
  regEmail: string;
  setRegEmail: (val: string) => void;
  regName: string;
  setRegName: (val: string) => void;
  regPhone: string;
  setRegPhone: (val: string) => void;
  regAddress: string;
  setRegAddress: (val: string) => void;
  regPass: string;
  setRegPass: (val: string) => void;
  regConfirmPass: string;
  setRegConfirmPass: (val: string) => void;
  agreeTerms: boolean;
  setAgreeTerms: (val: boolean) => void;
  isActive: boolean;
}

export function SignupForm({
  regUser,
  setRegUser,
  regEmail,
  setRegEmail,
  regName,
  setRegName,
  regPhone,
  setRegPhone,
  regAddress,
  setRegAddress,
  regPass,
  setRegPass,
  regConfirmPass,
  setRegConfirmPass,
  agreeTerms,
  setAgreeTerms,
  isActive,
}: SignupFormProps) {
  const [showRegPass, setShowRegPass] = useState(false);
  const [showRegConfirmPass, setShowRegConfirmPass] = useState(false);

  return (
    <div
      className={`w-1/2 pl-3 flex flex-col justify-start space-y-2 shrink-0 transition-opacity duration-300 ${
        isActive ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
      }`}
      aria-hidden={!isActive}
    >
      <div className="grid grid-cols-2 gap-2">
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
              required={isActive}
              value={regUser}
              onChange={(e) =>
                setRegUser(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""))
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
            required={isActive}
            value={regName}
            onChange={(e) => setRegName(e.target.value)}
            placeholder="Sisan Baniya"
            className="w-full px-2.5 py-1.5 bg-surface-container-low border border-outline-variant rounded-lg text-xs text-on-surface placeholder:text-outline focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-[10px] font-bold text-on-surface uppercase tracking-wider mb-0.5">
            Email Address
          </label>
          <input
            type="email"
            required={isActive}
            value={regEmail}
            onChange={(e) => setRegEmail(e.target.value)}
            placeholder="you@domain.np"
            className="w-full px-2.5 py-1.5 bg-surface-container-low border border-outline-variant rounded-lg text-xs text-on-surface placeholder:text-outline focus:outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-on-surface uppercase tracking-wider mb-0.5">
            Mobile Number
          </label>
          <input
            type="tel"
            required={isActive}
            value={regPhone}
            onChange={(e) => setRegPhone(e.target.value)}
            placeholder="+977 98XXXXXXXX"
            className="w-full px-2.5 py-1.5 bg-surface-container-low border border-outline-variant rounded-lg text-xs text-on-surface placeholder:text-outline focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      <div>
        <label className="block text-[10px] font-bold text-on-surface uppercase tracking-wider mb-0.5">
          City / Location
        </label>
        <input
          type="text"
          required={isActive}
          value={regAddress}
          onChange={(e) => setRegAddress(e.target.value)}
          placeholder="Kathmandu"
          className="w-full px-2.5 py-1.5 bg-surface-container-low border border-outline-variant rounded-lg text-xs text-on-surface placeholder:text-outline focus:outline-none focus:border-primary"
        />
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <div>
          <label className="block text-[10px] font-bold text-on-surface uppercase tracking-wider mb-0.5">
            Password
          </label>
          <div className="relative">
            <input
              type={showRegPass ? "text" : "password"}
              required={isActive}
              value={regPass}
              onChange={(e) => setRegPass(e.target.value)}
              placeholder="8+ chars"
              className="w-full pl-2.5 pr-7 py-1.5 bg-surface-container-low border border-outline-variant rounded-lg text-xs text-on-surface placeholder:text-outline focus:outline-none focus:border-primary"
            />
            <button
              type="button"
              onClick={() => setShowRegPass(!showRegPass)}
              className="absolute inset-y-0 right-0 pr-2 flex items-center text-outline hover:text-on-surface cursor-pointer"
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
              required={isActive}
              value={regConfirmPass}
              onChange={(e) => setRegConfirmPass(e.target.value)}
              placeholder="Repeat"
              className="w-full pl-2.5 pr-7 py-1.5 bg-surface-container-low border border-outline-variant rounded-lg text-xs text-on-surface placeholder:text-outline focus:outline-none focus:border-primary"
            />
            <button
              type="button"
              onClick={() => setShowRegConfirmPass(!showRegConfirmPass)}
              className="absolute inset-y-0 right-0 pr-2 flex items-center text-outline hover:text-on-surface cursor-pointer"
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
  );
}
