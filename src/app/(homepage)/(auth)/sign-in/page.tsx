"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";

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
import ErrorMessage from "@/src/components/Error-message";

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
        className="w-full max-w-[22rem] space-y-6"
      >
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-ink">Connexion</h2>
          <p className="text-stattext">Retrouvez vos mensualités.</p>
        </div>
        <ErrorMessage message={error} />
        <GoogleButton auth="Se connecter" />
        <div className="flex items-center gap-3 text-sm text-stattext">
          <span className="h-px flex-1 bg-line" />
          ou
          <span className="h-px flex-1 bg-line" />
        </div>
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
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                    aria-label="Afficher ou masquer le mot de passe"
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
            className="h-12 w-full text-base"
          >
            {form.formState.isSubmitting ? (
              <Spinner color="border-white" />
            ) : (
              "Se connecter"
            )}
          </Button>
          <Link
            className="mt-5 block text-center text-sm text-stattext [&>span]:font-semibold [&>span]:text-brand-700 hover:[&>span]:underline"
            href="/sign-up"
          >
            Pas encore de compte ? <span>Créer un compte</span>
          </Link>
        </div>
      </form>
    </Form>
  );
}
