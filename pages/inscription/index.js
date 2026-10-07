import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Eye, EyeOff } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import SocialAuthButtons from "@/components/SocialAuthButtons";
import AuthLayout, { AuthSubmit, authInputClass } from "@/components/AuthLayout";
import { registerAccount } from "@/lib/accounts";

const ACCOUNT_TYPES = [
  { value: "client", label: "Espace client" },
  { value: "partenaire", label: "Espace partenaire" },
];

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

      <AuthLayout>
        <form onSubmit={handleSubmit} className="flex flex-1 flex-col">
          <h1 className="mb-7 text-center text-[28px] font-medium leading-tight text-[var(--color-text)]">
            Créez votre compte
          </h1>

          <div role="radiogroup" aria-label="Type de compte" className="mb-6 grid grid-cols-2 border border-[var(--color-brand)]">
            {ACCOUNT_TYPES.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={type === value}
                onClick={() => setType(value)}
                className={`h-11 text-[14px] font-bold transition-colors ${
                  type === value ? "bg-[var(--color-brand)] text-white" : "bg-white text-[var(--color-brand)] hover:bg-[var(--color-brand)]/5"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-5">
            <div>
              <label htmlFor="name" className="sr-only">Nom et prénom</label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                placeholder="Entrez votre nom et prénom"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={authInputClass}
              />
            </div>

            <div>
              <label htmlFor="email" className="sr-only">Adresse email</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="Entrez votre adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={authInputClass}
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">Mot de passe</label>
              <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Choisissez un mot de passe"
                aria-describedby="password-hint"
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`${authInputClass} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-gray-600 hover:text-[var(--color-text)]"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              </div>
              <p id="password-hint" className="mt-1.5 text-[13px] text-gray-500">8 caractères minimum.</p>
            </div>
          </div>

          {error && <p role="alert" className="mt-5 text-sm text-red-600">{error}</p>}

          <div className="mt-8">
            <SocialAuthButtons type={type} large />
          </div>

          <div className="mt-auto pt-10">
            <label htmlFor="consent" className="mb-5 flex items-start gap-2.5 text-[14px] leading-snug text-gray-700">
              <Checkbox id="consent" checked={consent} onCheckedChange={setConsent} className="mt-0.5 rounded-none" />
              <span>
                J&apos;accepte les{" "}
                <Link href="/conditions-generales/" className="font-medium text-[var(--color-brand)] hover:underline">
                  conditions générales
                </Link>{" "}
                et la{" "}
                <Link href="/confidentialite/" className="font-medium text-[var(--color-brand)] hover:underline">
                  politique de confidentialité
                </Link>.
              </span>
            </label>
            <p className="mb-4 text-center text-[14px] text-gray-600">
              Déjà un compte ?{" "}
              <Link href="/connexion/" className="font-semibold text-[var(--color-brand)] hover:underline">
                Se connecter
              </Link>
            </p>
            <AuthSubmit disabled={!consent || loading}>
              {loading ? "Création en cours…" : "Créer mon compte"}
            </AuthSubmit>
          </div>
        </form>
      </AuthLayout>
    </>
  );
}
