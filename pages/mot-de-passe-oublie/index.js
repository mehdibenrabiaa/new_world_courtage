import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import QuestionnaireHeader from "@/components/QuestionnaireHeader";
import { forgotPassword } from "@/lib/accounts";

export default function MotDePasseOublie() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      await forgotPassword(email);
    } finally {
      // Always show the same confirmation, whether or not the email
      // matched an account — the backend itself never reveals that either
      // (see /accounts/forgot-password), so the UI shouldn't undo that here.
      setSent(true);
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Mot de passe oublié — New World Courtage</title>
        <meta name="robots" content="noindex, follow" />
      </Head>

      <QuestionnaireHeader />

      <main className="min-h-[calc(100vh-4rem)] bg-[var(--color-light)] flex items-center justify-center px-4 py-20">
        <Card className="w-full max-w-lg p-2">
          <CardContent className="flex flex-col gap-7 p-7 sm:p-9">
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-3xl font-bold text-[var(--color-text)]">Mot de passe oublié</h1>
              <p className="text-base text-gray-500">
                Indiquez votre email, nous vous enverrons un lien de réinitialisation.
              </p>
            </div>

            {sent ? (
              <p className="text-center text-sm text-gray-600 bg-[var(--color-light)] border border-gray-200 rounded-lg p-4">
                Si un compte existe pour <strong>{email}</strong>, un email vient de vous être envoyé.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <Field>
                  <FieldLabel htmlFor="email" className="text-base">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="vous@exemple.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 text-base"
                  />
                </Field>

                <Button type="submit" size="lg" disabled={loading} className="w-full mt-1 text-white text-base">
                  {loading ? "Envoi…" : "Envoyer le lien de réinitialisation"}
                </Button>
              </form>
            )}

            <p className="text-center text-sm text-gray-500">
              <Link href="/connexion/" className="font-semibold text-[var(--color-text)] hover:underline">
                Retour à la connexion
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
