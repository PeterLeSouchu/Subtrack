"use client";
import { signIn } from "next-auth/react";
import { GoogleIcon } from "@/src/components/icons/google-icon";
import { useState } from "react";

export default function GoogleButton({
  auth,
}: {
  auth: "Se connecter" | "S'inscrire";
}) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <button
      type="button"
      aria-live="polite"
      aria-busy={isLoading}
      onClick={() => {
        if (isLoading) return;
        setIsLoading(true);
        void signIn("google", { redirectTo: "/dashboard" });
      }}
      disabled={isLoading}
      className={`flex h-12 w-full items-center gap-3 rounded-xl border-0 bg-white px-4 text-sm font-semibold text-ink shadow-soft ring-1 ring-ink/10 transition-colors ${
        isLoading ? "cursor-not-allowed opacity-60" : "hover:bg-slate-50"
      }`}
    >
      <GoogleIcon />
      <p className="flex-grow text-center">{auth} avec Google</p>
      <span
        className={`h-4 w-4 rounded-full border-2 border-brand-500 border-t-transparent animate-spin transition-opacity ${
          isLoading ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      />
    </button>
  );
}
