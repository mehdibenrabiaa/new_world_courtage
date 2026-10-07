import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Eye, EyeOff } from "lucide-react";
import SocialAuthButtons from "@/components/SocialAuthButtons";
import AuthLayout, { AuthSubmit, authInputClass } from "@/components/AuthLayout";
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

      <AuthLayout>
        <form onSubmit={handleSubmit} className="flex flex-1 flex-col">
          <h1 className="mb-7 text-center text-[28px] font-medium leading-tight text-[var(--color-text)]">
            Connectez-vous à votre espace
          </h1>

          <div className="flex flex-col gap-5">
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

            <div className="relative">
              <label htmlFor="password" className="sr-only">Mot de passe</label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Entrez votre mot de passe"
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
          </div>

          <Link href="/mot-de-passe-oublie/" className="mt-6 self-center text-[14px] text-[var(--color-brand)] hover:underline">
            Mot de passe oublié ?
          </Link>

          {error && <p role="alert" className="mt-5 text-sm text-red-600">{error}</p>}

          <div className="mt-8">
            <SocialAuthButtons type="client" large />
          </div>

          <div className="mt-auto pt-10">
            <p className="mb-4 text-center text-[14px] text-gray-600">
              Pas encore de compte ?{" "}
              <Link href="/inscription/" className="font-semibold text-[var(--color-brand)] hover:underline">
                Créer un compte
              </Link>
            </p>
            <AuthSubmit disabled={loading || !email || !password}>
              {loading ? "Connexion…" : "Valider"}
            </AuthSubmit>
          </div>
        </form>
      </AuthLayout>
    </>
  );
}
