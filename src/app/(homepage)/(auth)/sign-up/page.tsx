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
import { signupSchema } from "./signup-schema";
import { z } from "zod";
import Link from "next/link";
import GoogleButton from "../../components/Google-button";
import { signUpUser } from "./signup-action";
import ErrorMessage from "@/src/components/Error-message";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { EyeOpenIcon, EyeCloseIcon } from "@/src/components/icons";
import Spinner from "@/src/components/Spinner";

export default function SignUp() {
  const router = useRouter();
  const [error, setError] = useState<undefined | string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signupSchema>) {
    setError("");
    const res = await signUpUser(values);
    if (res.error) {
      setError(res.error || "Erreur inconnue");
    } else {
      router.push("/sign-in");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-[22rem] space-y-6"
      >
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-ink">Inscription</h2>
          <p className="text-stattext">Créez votre compte en quelques secondes.</p>
        </div>
        <ErrorMessage message={error} />
        <GoogleButton auth="S'inscrire" />
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
        <FormField
          control={form.control}
          name="passwordConfirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmation du mot de passe</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    disabled={form.formState.isSubmitting}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirmez votre mot de passe"
                    {...field}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                    aria-label="Afficher ou masquer le mot de passe"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
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
              "S'inscrire"
            )}
          </Button>
          <Link
            className="mt-5 block text-center text-sm text-stattext [&>span]:font-semibold [&>span]:text-brand-700 hover:[&>span]:underline"
            href="/sign-in"
          >
            Déjà inscrit ? <span>Se connecter</span>
          </Link>
        </div>
      </form>
    </Form>
  );
}
