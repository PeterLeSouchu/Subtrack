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
      className={`bg-white py-2 px-4 w-full rounded-full flex items-center border border-brand/20 shadow-sm mx-auto font-bold gap-3 transition ${
        isLoading ? "opacity-60 cursor-not-allowed" : "hover:bg-brand-50"
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
