import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { CheckCircle2, ChevronDown, Lock, LogOut, UserRound, X } from "lucide-react";
import { getCachedAccount, getMe, isLoggedIn, logoutAccount, logoutEverywhere, onSessionEndedElsewhere } from "@/lib/accounts";

const LOGOUT_NOTICE_KEY = "nwc_logout_notice";

// Logged-in account (client or partner) for the navbar, or null when logged out.
// Starts as null on every render path so server and first client render match;
// the session is only read after mount.
export function useAccount() {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    if (!isLoggedIn()) return;
    const cached = getCachedAccount();
    if (cached) setAccount(cached);
    getMe().then(setAccount).catch(() => setAccount(null));
  }, []);

  // Logging out in another tab logs this one out too.
  useEffect(() => onSessionEndedElsewhere(() => setAccount(null)), []);

  return [account, setAccount];
}

export function accountLinks(account) {
  if (account?.type === "partenaire") {
    return [{ label: "Mon espace partenaire", href: "/espace-partenaire/" }];
  }
  return [
    { label: "Mon espace", href: "/espace-client/" },
    { label: "Mes documents", href: "/espace-client/documents/" },
    { label: "Mon profil", href: "/espace-client/profil/" },
  ];
}

export function firstName(account) {
  return (account?.name || "").trim().split(/\s+/)[0] || "Mon compte";
}

// The one logout flow used everywhere: end the session (on this device, or on
// all devices), go back to the home page and confirm with a short notice.
export function useLogout(setAccount) {
  const router = useRouter();
  return async ({ everywhere = false } = {}) => {
    await (everywhere ? logoutEverywhere() : logoutAccount());
    setAccount?.(null);
    try {
      sessionStorage.setItem(LOGOUT_NOTICE_KEY, everywhere ? "all" : "one");
    } catch {
      // The notice is optional; logging out still works without storage.
    }
    router.push("/");
  };
}

// "Vous êtes déconnecté." confirmation, shown once after a logout redirect.
export function LogoutNotice() {
  const router = useRouter();
  const [kind, setKind] = useState(null);

  useEffect(() => {
    function check() {
      try {
        const value = sessionStorage.getItem(LOGOUT_NOTICE_KEY);
        if (value) {
          sessionStorage.removeItem(LOGOUT_NOTICE_KEY);
          setKind(value);
        }
      } catch {
        // No storage: no notice.
      }
    }
    check();
    router.events.on("routeChangeComplete", check);
    return () => router.events.off("routeChangeComplete", check);
  }, [router.events]);

  useEffect(() => {
    if (!kind) return;
    const id = setTimeout(() => setKind(null), 6000);
    return () => clearTimeout(id);
  }, [kind]);

  if (!kind) return null;
  return (
    <div role="status" className="fixed bottom-6 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center gap-3 bg-[var(--color-text)] px-5 py-4 text-[15px] text-white shadow-lg">
      <CheckCircle2 size={20} className="shrink-0 text-[#3b9bd8]" aria-hidden="true" />
      <span className="flex-1">
        {kind === "all" ? "Vous êtes déconnecté de tous vos appareils." : "Vous êtes déconnecté."}
      </span>
      <button type="button" onClick={() => setKind(null)} aria-label="Fermer" className="shrink-0 text-white/70 hover:text-white">
        <X size={18} aria-hidden="true" />
      </button>
    </div>
  );
}

const blockClass =
  "flex items-center gap-2 text-[15px] font-bold text-white bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] transition-colors";

// Desktop navbar block: "Espace client" when logged out, first name + menu when logged in.
export default function AccountMenu({ account, setAccount }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const logout = useLogout(setAccount);

  useEffect(() => {
    if (!open) return;
    function onPointer(event) {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    }
    function onKey(event) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!account) {
    return (
      <Link href="/connexion/" className={`${blockClass} px-7`}>
        <Lock size={16} strokeWidth={2} aria-hidden="true" />
        Espace client
      </Link>
    );
  }

  return (
    <div ref={rootRef} className="relative flex">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className={`${blockClass} px-6`}
      >
        <UserRound size={17} strokeWidth={2} aria-hidden="true" />
        {firstName(account)}
        <ChevronDown size={16} aria-hidden="true" className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div role="menu" className="absolute right-0 top-full z-50 w-60 border border-gray-200 bg-white py-1 shadow-lg">
          {accountLinks(account).map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="block px-5 py-3 text-[15px] text-[var(--color-text)] hover:bg-[var(--color-light)] hover:text-[var(--color-brand)]"
            >
              {label}
            </Link>
          ))}
          <button
            type="button"
            role="menuitem"
            onClick={() => { setOpen(false); logout(); }}
            className="flex w-full items-center gap-2 border-t border-gray-200 px-5 py-3 text-left text-[15px] text-[var(--color-text)] hover:bg-[var(--color-light)] hover:text-[var(--color-brand)]"
          >
            <LogOut size={16} aria-hidden="true" />
            Déconnexion
          </button>
        </div>
      )}
    </div>
  );
}
