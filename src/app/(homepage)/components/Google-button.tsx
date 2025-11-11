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
      onClick={() => {
        if (isLoading) return;
        setIsLoading(true);
        void signIn("google", { redirectTo: "/dashboard" });
      }}
      disabled={isLoading}
      className={`bg-white py-2 px-4 w-full rounded-full flex justify-center items-center border border-brand/20 shadow-sm mx-auto font-bold gap-2 transition ${
        isLoading ? "opacity-60 cursor-not-allowed" : "hover:bg-brand-50"
      }`}
    >
      <GoogleIcon className=" " />
      <p className="flex-grow"> {auth} avec Google</p>
    </button>
  );
}
