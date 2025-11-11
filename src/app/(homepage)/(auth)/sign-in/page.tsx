"use client";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";

import logo from "@/public/logo.png";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";

import { z } from "zod";
import Link from "next/link";
import GoogleButton from "../../components/Google-button";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { signInUser } from "./signin-action";
import { EyeOpenIcon, EyeCloseIcon } from "@/src/components/icons";
import Spinner from "@/src/components/Spinner";

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export default function SignIn() {
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError("");
    const res = await signInUser(values);
    if (res.error) {
      setError(res.error || "Erreur inconnue");
    } else {
      signIn("credentials", { userId: res.userId, email: res.email });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-3/4 min-w-72 max-w-96 space-y-8 rounded-xl bg-white p-5 shadow-xl drop-shadow-md"
      >
        <Image
          src={logo}
          width={300}
          height={300}
          alt="logo-subtrack"
          className="w-14 mx-auto lg:hidden"
        />
        <h2 className="text-center text-2xl font-extrabold">Connexion</h2>
        <p className="text-red-600 text-center">{error}</p>
        <GoogleButton auth="Se connecter" />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  disabled={form.formState.isSubmitting}
                  placeholder="Entrez votre adresse mail"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    disabled={form.formState.isSubmitting}
                    type={showPassword ? "text" : "password"}
                    placeholder="Entrez votre mot de passe"
                    {...field}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeCloseIcon width="15" height="15" />
                    ) : (
                      <EyeOpenIcon width="15" height="15" />
                    )}
                  </button>
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            className="w-full bg-blue-600 text-white transition hover:bg-blue-500"
          >
            {form.formState.isSubmitting ? (
              <Spinner color="border-black" />
            ) : (
              "Se connecter"
            )}
          </Button>
          <Link
            className="text-center underline block my-3 lg:hover:text-icon transition"
            href="/sign-up"
          >
            Vous êtes nouveau ? Inscrivez-vous ici
          </Link>
        </div>
      </form>
    </Form>
  );
}
