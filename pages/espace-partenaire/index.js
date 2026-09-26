import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { CheckIcon, CopyIcon, LogOutIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import QuestionnaireHeader from "@/components/QuestionnaireHeader";
import { getMe, getMyReferral, isLoggedIn, logoutAccount } from "@/lib/accounts";

export default function EspacePartenaire() {
  const router = useRouter();
  const [account, setAccount] = useState(null);
  const [referral, setReferral] = useState(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) {
      router.replace("/connexion/");
      return;
    }
    getMe()
      .then((acc) => {
        if (acc.type !== "partenaire") {
          router.replace("/espace-client/");
          return;
        }
        setAccount(acc);
        getMyReferral()
          .then(setReferral)
          .catch(() => setError("Impossible de charger votre code de parrainage."));
      })
      .catch(() => {
        router.replace("/connexion/");
      });
  }, [router]);

  async function handleLogout() {
    await logoutAccount();
    router.push("/connexion/");
  }

  async function handleCopy() {
    if (!referral) return;
    try {
      await navigator.clipboard.writeText(referral.link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API can be unavailable (permissions, non-HTTPS) — the
      // link is still selectable/readable in the input either way.
    }
  }

  if (!account) {
    return (
      <>
        <QuestionnaireHeader />
        <main className="min-h-[calc(100vh-4rem)] bg-[var(--color-light)] flex items-center justify-center">
          <Spinner className="size-6 text-[var(--color-brand)]" />
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Espace partenaire — New World Courtage</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <QuestionnaireHeader />

      <main className="min-h-[calc(100vh-4rem)] bg-[var(--color-light)] px-4 py-14 sm:py-20">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[var(--color-text)]">Bonjour {account.name.split(" ")[0]}</h1>
              <p className="text-sm text-gray-500">{account.email}</p>
            </div>
            <Button variant="outline" onClick={handleLogout} className="gap-1.5 shrink-0">
              <LogOutIcon size={15} /> Déconnexion
            </Button>
          </div>

          <Card>
            <CardContent className="p-6 sm:p-8 flex flex-col gap-5">
              <div>
                <h2 className="text-lg font-bold text-[var(--color-text)]">Votre lien de parrainage</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Partagez ce lien : toute personne qui l'utilise pour demander un devis vous sera rattachée.
                </p>
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              {referral ? (
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <Input readOnly value={referral.link} className="font-mono text-sm" onFocus={(e) => e.target.select()} />
                  <Button type="button" onClick={handleCopy} className="gap-1.5 shrink-0 text-white">
                    {copied ? <CheckIcon size={15} /> : <CopyIcon size={15} />}
                    {copied ? "Copié" : "Copier"}
                  </Button>
                </div>
              ) : (
                !error && (
                  <div className="flex justify-center py-10">
                    <Spinner className="size-5 text-[var(--color-brand)]" />
                  </div>
                )
              )}

              {referral && (
                <p className="text-xs text-gray-400">
                  Code : <span className="font-mono">{referral.code}</span>
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
