// src/features/auth/components/LoginForm.tsx
import React, { useState } from "react";
import Link from "next/link";
import { AtSign, Lock, Eye, EyeOff, Info } from "lucide-react";

interface LoginFormProps {
  loginUser: string;
  setLoginUser: (val: string) => void;
  loginPass: string;
  setLoginPass: (val: string) => void;
  isActive: boolean;
}

export function LoginForm({
  loginUser,
  setLoginUser,
  loginPass,
  setLoginPass,
  isActive,
}: LoginFormProps) {
  const [showLoginPass, setShowLoginPass] = useState(false);

  return (
    <div
      className={`w-1/2 pr-3 flex flex-col justify-start space-y-3 shrink-0 transition-opacity duration-300 ${
        isActive ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
      }`}
      aria-hidden={!isActive}
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
            required={isActive}
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
            required={isActive}
            value={loginPass}
            onChange={(e) => setLoginPass(e.target.value)}
            placeholder="••••••••••••"
            className="w-full pl-9 pr-9 py-2 bg-surface-container-low border border-outline-variant rounded-xl text-xs sm:text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
          <button
            type="button"
            onClick={() => setShowLoginPass(!showLoginPass)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-outline hover:text-on-surface cursor-pointer"
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
  );
}
