import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Eye, EyeOff } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupInput, InputGroupAddon, InputGroupButton } from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import SocialAuthButtons from "@/components/SocialAuthButtons";
import QuestionnaireHeader from "@/components/QuestionnaireHeader";
import { loginAccount } from "@/lib/accounts";

export default function Connexion() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;
    setError("");
    setLoading(true);
    try {
      const account = await loginAccount({ email, password });
      router.push(account.type === "partenaire" ? "/espace-partenaire/" : "/espace-client/");
    } catch (err) {
      setError(err.message || "Une erreur est survenue.");
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Connexion — New World Courtage</title>
        <meta name="robots" content="noindex, follow" />
      </Head>

      <QuestionnaireHeader />

      <main className="min-h-[calc(100vh-4rem)] bg-[var(--color-light)] flex items-center justify-center px-4 py-20">
        <Card className="w-full max-w-lg p-2">
          <CardContent className="flex flex-col gap-7 p-7 sm:p-9">
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-3xl font-bold text-[var(--color-text)]">Connexion</h1>
              <p className="text-base text-gray-500">
                Accédez à votre espace New World Courtage.
              </p>
            </div>

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

              <Field>
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor="password" className="text-base">Mot de passe</FieldLabel>
                  <Link href="/mot-de-passe-oublie/" className="text-sm font-medium text-gray-500 hover:text-[var(--color-text)] hover:underline">
                    Mot de passe oublié ?
                  </Link>
                </div>
                <InputGroup className="h-12">
                  <InputGroupInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
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

              <Button type="submit" size="lg" disabled={loading} className="w-full mt-1 text-white text-base">
                {loading ? "Connexion…" : "Se connecter"}
              </Button>
            </form>

            <SocialAuthButtons type="client" large />

            <p className="text-center text-sm text-gray-500">
              Pas encore de compte ?{" "}
              <Link href="/inscription/" className="font-semibold text-[var(--color-text)] hover:underline">
                S'inscrire
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
