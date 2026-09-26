import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Eye, EyeOff } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupInput, InputGroupAddon, InputGroupButton } from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import QuestionnaireHeader from "@/components/QuestionnaireHeader";
import { resetPassword } from "@/lib/accounts";

export default function ReinitialiserMotDePasse() {
  const router = useRouter();
  const { token } = router.query;
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading || !token) return;
    setError("");
    setLoading(true);
    try {
      await resetPassword(token, password);
      setDone(true);
    } catch (err) {
      setError(err.message || "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Réinitialiser le mot de passe — New World Courtage</title>
        <meta name="robots" content="noindex, follow" />
      </Head>

      <QuestionnaireHeader />

      <main className="min-h-[calc(100vh-4rem)] bg-[var(--color-light)] flex items-center justify-center px-4 py-20">
        <Card className="w-full max-w-lg p-2">
          <CardContent className="flex flex-col gap-7 p-7 sm:p-9">
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-3xl font-bold text-[var(--color-text)]">Nouveau mot de passe</h1>
              <p className="text-base text-gray-500">
                Choisissez un nouveau mot de passe pour votre compte.
              </p>
            </div>

            {done ? (
              <div className="flex flex-col gap-4 items-center text-center">
                <p className="text-sm text-gray-600 bg-[var(--color-light)] border border-gray-200 rounded-lg p-4">
                  Votre mot de passe a été mis à jour.
                </p>
                <Link href="/connexion/" className="w-full">
                  <Button size="lg" className="w-full text-white text-base">Se connecter</Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <Field>
                  <FieldLabel htmlFor="password" className="text-base">Nouveau mot de passe</FieldLabel>
                  <InputGroup className="h-12">
                    <InputGroupInput
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="••••••••"
                      minLength={8}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="text-base"
                    />
                    <InputGroupAddon align="inline-end">
                      <InputGroupButton
                        type="button"
                        size="icon-sm"
                        aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                        onClick={() => setShowPassword((v) => !v)}
                      >
                        {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>
                </Field>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <Button type="submit" size="lg" disabled={loading || !token} className="w-full mt-1 text-white text-base">
                  {loading ? "Mise à jour…" : "Réinitialiser le mot de passe"}
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
