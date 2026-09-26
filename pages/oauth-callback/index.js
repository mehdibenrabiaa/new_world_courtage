import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Spinner } from "@/components/ui/spinner";
import QuestionnaireHeader from "@/components/QuestionnaireHeader";
import { setTokens, getMe } from "@/lib/accounts";

// Where the backend's /accounts/oauth/{provider}/callback redirects to once
// a social sign-in succeeds (see app/routers/accounts.py's
// _finish_oauth_login) — tokens arrive as query params, get stored, then
// this page forwards straight into the right espace. Nothing to render
// beyond a spinner; this page is never linked to directly.
export default function OAuthCallback() {
  const router = useRouter();
  const [error, setError] = useState("");

  useEffect(() => {
    if (!router.isReady) return;
    const { access_token, refresh_token } = router.query;
    if (!access_token || !refresh_token) {
      setError("La connexion a échoué. Merci de réessayer.");
      return;
    }
    setTokens({ access_token, refresh_token });
    // Strip the tokens out of the URL immediately — they shouldn't linger
    // in browser history/referrer any longer than necessary.
    window.history.replaceState(null, "", "/oauth-callback/");

    getMe()
      .then((account) => {
        router.replace(account.type === "partenaire" ? "/espace-partenaire/" : "/espace-client/");
      })
      .catch(() => setError("La connexion a échoué. Merci de réessayer."));
  }, [router.isReady, router.query]);

  return (
    <>
      <Head>
        <title>Connexion en cours — New World Courtage</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <QuestionnaireHeader />

      <main className="min-h-[calc(100vh-4rem)] bg-[var(--color-light)] flex items-center justify-center px-4">
        {error ? (
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="text-sm text-red-600">{error}</p>
            <a href="/connexion/" className="text-sm font-semibold text-[var(--color-text)] hover:underline">
              Retour à la connexion
            </a>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <Spinner className="size-6 text-[var(--color-brand)]" />
            <p className="text-sm text-gray-500">Connexion en cours…</p>
          </div>
        )}
      </main>
    </>
  );
}
