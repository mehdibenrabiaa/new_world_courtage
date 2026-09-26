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
import { ButtonGroup } from "@/components/ui/button-group";
import { Checkbox } from "@/components/ui/checkbox";
import SocialAuthButtons from "@/components/SocialAuthButtons";
import QuestionnaireHeader from "@/components/QuestionnaireHeader";
import { registerAccount } from "@/lib/accounts";

export default function Inscription() {
  const router = useRouter();
  const [type, setType] = useState("client"); // "client" | "partenaire"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!consent || loading) return;
    setError("");
    setLoading(true);
    try {
      const account = await registerAccount({ name, email, password, type });
      router.push(account.type === "partenaire" ? "/espace-partenaire/" : "/espace-client/");
    } catch (err) {
      setError(err.message || "Une erreur est survenue.");
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Inscription — New World Courtage</title>
        <meta name="robots" content="noindex, follow" />
      </Head>

      <QuestionnaireHeader />

      <main className="min-h-[calc(100vh-4rem)] bg-[var(--color-light)] flex items-center justify-center px-4 py-20">
        <Card className="w-full max-w-lg p-2">
          <CardContent className="flex flex-col gap-7 p-7 sm:p-9">
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-3xl font-bold text-[var(--color-text)]">Créer un compte</h1>
              <p className="text-base text-gray-500">
                Créez votre espace New World Courtage.
              </p>
            </div>

            <ButtonGroup className="w-full">
              <Button
                type="button"
                size="lg"
                variant={type === "client" ? "default" : "outline"}
                className={`flex-1 text-base ${type === "client" ? "text-white" : ""}`}
                onClick={() => setType("client")}
              >
                Espace client
              </Button>
              <Button
                type="button"
                size="lg"
                variant={type === "partenaire" ? "default" : "outline"}
                className={`flex-1 text-base ${type === "partenaire" ? "text-white" : ""}`}
                onClick={() => setType("partenaire")}
              >
                Espace partenaire
              </Button>
            </ButtonGroup>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <Field>
                <FieldLabel htmlFor="name" className="text-base">Nom et prénom</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Jean Dupont"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-12 text-base"
                />
              </Field>

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
                <FieldLabel htmlFor="password" className="text-base">Mot de passe</FieldLabel>
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

              <label htmlFor="consent" className="flex items-start gap-2.5 text-base text-gray-600 leading-snug">
                <Checkbox id="consent" checked={consent} onCheckedChange={setConsent} className="mt-0.5" />
                <span>
                  J'accepte les{" "}
                  <Link href="/conditions-generales/" className="font-medium text-[var(--color-text)] hover:underline">
                    conditions générales
                  </Link>{" "}
                  et la{" "}
                  <Link href="/confidentialite/" className="font-medium text-[var(--color-text)] hover:underline">
                    politique de confidentialité
                  </Link>.
                </span>
              </label>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <Button type="submit" size="lg" disabled={!consent || loading} className="w-full mt-1 text-white text-base">
                {loading ? "Création en cours…" : "Créer mon compte"}
              </Button>
            </form>

            <SocialAuthButtons type={type} large />

            <p className="text-center text-sm text-gray-500">
              Déjà un compte ?{" "}
              <Link href="/connexion/" className="font-semibold text-[var(--color-text)] hover:underline">
                Se connecter
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
