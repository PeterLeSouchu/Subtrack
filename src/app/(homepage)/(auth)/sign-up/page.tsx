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
        className="w-3/4 min-w-72 max-w-96 space-y-8 rounded-xl bg-white p-5 shadow-2xl drop-shadow-md"
      >
        <Image
          src={logo}
          width={300}
          height={300}
          alt="logo-subtrack"
          className="w-14 mx-auto lg:hidden"
        />
        <h2 className="text-center text-2xl font-extrabold">Inscription</h2>
        <ErrorMessage message={error} />
        <GoogleButton auth="S'inscrire" />
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
                    className="absolute right-2 top-2"
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
            className="w-full bg-brand-600 text-white transition hover:bg-brand-700"
          >
            {form.formState.isSubmitting ? (
              <Spinner color="border-black" />
            ) : (
              "S'inscrire"
            )}
          </Button>
          <Link
            className="text-center underline block my-3 lg:hover:text-icon transition"
            href="/sign-in"
          >
            Déjà inscrit ? Connectez-vous ici
          </Link>
        </div>
      </form>
    </Form>
  );
}
