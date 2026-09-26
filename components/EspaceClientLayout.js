import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { LogOutIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import QuestionnaireHeader from "@/components/QuestionnaireHeader";
import { getCachedAccount, getMe, isLoggedIn, logoutAccount } from "@/lib/accounts";

const TABS = [
  { href: "/espace-client/", pathname: "/espace-client", label: "Tableau de bord" },
  { href: "/espace-client/profil/", pathname: "/espace-client/profil", label: "Mon profil" },
  { href: "/espace-client/documents/", pathname: "/espace-client/documents", label: "Mes documents" },
];

// Shared shell for every /espace-client/* page — owns the auth check
// (redirect to /connexion if not logged in, to /espace-partenaire if logged
// in as the wrong account type), the account fetch, the top tab navbar, and
// the logout button, so each page only has to render its own content.
// `children` is a render-prop (`(account) => <...>`) since every page needs
// the fetched account to render anything.
export default function EspaceClientLayout({ title, children }) {
  const router = useRouter();
  // Seeded from the in-memory cache (see lib/accounts.js) so navigating
  // between /espace-client tabs — each its own page, so this layout
  // actually re-mounts every time — renders the header/tabs/content
  // immediately instead of flashing back to a loading spinner. Still
  // re-validated against the API below on every mount.
  const [account, setAccount] = useState(getCachedAccount);

  useEffect(() => {
    if (!isLoggedIn()) {
      router.replace("/connexion/");
      return;
    }
    getMe()
      .then((acc) => {
        if (acc.type !== "client") {
          router.replace("/espace-partenaire/");
          return;
        }
        setAccount(acc);
      })
      .catch(() => router.replace("/connexion/"));
  }, [router]);

  async function handleLogout() {
    await logoutAccount();
    router.push("/connexion/");
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
        <title>{title} — New World Courtage</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <QuestionnaireHeader />

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 pt-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-[var(--color-text)]">Bonjour {account.name.split(" ")[0]}</h1>
            <p className="text-sm text-gray-500">{account.email}</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-1.5 shrink-0">
            <LogOutIcon size={15} /> Déconnexion
          </Button>
        </div>

        <nav className="max-w-3xl mx-auto px-4 mt-5 flex gap-6">
          {TABS.map((tab) => {
            const active = router.pathname === tab.pathname;
            return (
              <Link
                key={tab.pathname}
                href={tab.href}
                className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${
                  active
                    ? "border-[var(--color-brand)] text-[var(--color-text)]"
                    : "border-transparent text-gray-500 hover:text-[var(--color-text)]"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <main className="min-h-[calc(100vh-4rem)] bg-[var(--color-light)] px-4 py-10">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          {children(account, setAccount)}
        </div>
      </main>
    </>
  );
}
