import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CircleHelp, X, ShieldAlert, MailWarning, PhoneOff } from "lucide-react";

// Shared shell for the account pages (connexion, inscription): a slim header,
// the form column on the left and a welcome photo with rotating security tips
// on the right (hidden on small screens).

const SECURITY_TIPS = [
  {
    Icon: MailWarning,
    title: "Méfiez-vous des emails et SMS inattendus.",
    text: "New World Courtage ne vous demandera jamais votre mot de passe par email, SMS ou téléphone.",
  },
  {
    Icon: PhoneOff,
    title: "Un appel vous demande vos coordonnées bancaires ?",
    text: "Raccrochez et rappelez-nous vous-même au 07 45 89 18 65 avant de communiquer quoi que ce soit.",
  },
  {
    Icon: ShieldAlert,
    title: "Vérifiez toujours l'adresse du site.",
    text: "Connectez-vous uniquement depuis newworldcourtage.fr et ne cliquez pas sur les liens d'un message douteux.",
  },
];

const TIP_INTERVAL_MS = 7000;

function SecurityTips() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((i) => (i + 1) % SECURITY_TIPS.length), TIP_INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <div
      className="absolute inset-x-0 bottom-0 pb-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="overflow-hidden" aria-roledescription="carrousel" aria-label="Conseils de sécurité">
        {/* Each tip is 60% of the width and centered, so the neighbours peek in at the sides. */}
        <ul
          className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: `translateX(calc(20% - ${active} * 60% - ${active} * 16px))` }}
        >
          {SECURITY_TIPS.map(({ Icon, title, text }, index) => (
            <li
              key={title}
              aria-hidden={index !== active}
              className="mr-4 flex w-[60%] shrink-0 gap-4 bg-white p-5 text-[var(--color-text)] shadow-sm"
            >
              <span className="flex size-10 shrink-0 items-center justify-center bg-[var(--color-brand)]/10 text-[var(--color-brand)]" aria-hidden="true">
                <Icon size={20} strokeWidth={1.75} />
              </span>
              <div>
                <p className="text-[14px] font-bold leading-snug">{title}</p>
                <p className="mt-1 text-[13px] leading-snug text-gray-600">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-5 flex justify-center gap-2">
        {SECURITY_TIPS.map(({ title }, index) => (
          <button
            key={title}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Conseil ${index + 1}`}
            aria-current={index === active}
            className={`h-2.5 rounded-full border border-white transition-all duration-300 ${index === active ? "w-8 bg-white" : "w-2.5 bg-transparent"}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 px-4 lg:px-6">
        <Link href="/" className="shrink-0">
          <Image src="/logos/nwc-logo.svg" alt="New World Courtage" width={182} height={223} className="h-9 w-auto" priority />
        </Link>
        <nav className="flex items-stretch text-[15px] text-[var(--color-text)]">
          <Link href="/contact/" className="flex items-center gap-2 px-3 lg:px-4 hover:text-[var(--color-brand)]">
            <CircleHelp size={22} strokeWidth={1.5} aria-hidden="true" />
            <span className="hidden sm:inline">Assistance</span>
            <span className="sr-only sm:hidden">Assistance</span>
          </Link>
          <span className="my-1 w-px bg-gray-300" aria-hidden="true" />
          <Link href="/" className="flex items-center gap-2 px-3 lg:px-4 hover:text-[var(--color-brand)]">
            <X size={22} strokeWidth={1.5} aria-hidden="true" />
            <span className="hidden sm:inline">Quitter</span>
            <span className="sr-only sm:hidden">Quitter</span>
          </Link>
        </nav>
      </header>

      <div className="flex flex-1 flex-col lg:flex-row">
        <main className="flex w-full flex-col px-6 py-8 sm:px-10 lg:w-[440px] lg:shrink-0 lg:px-7">
          {children}
        </main>

        <aside className="relative hidden flex-1 overflow-hidden lg:block" aria-label="Bienvenue">
          <img src="/heroes/nos-assurances-desktop.webp" alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/25 to-transparent" aria-hidden="true" />
          <p className="relative pt-10 text-center text-[20px] font-medium uppercase tracking-wide text-white">Bienvenue</p>
          <SecurityTips />
        </aside>
      </div>
    </div>
  );
}

// Form field styles shared by the account pages: grey fill, bottom border only.
export const authInputClass =
  "h-14 w-full rounded-none border-0 border-b border-gray-500 bg-[#f2f2f2] px-3 text-[16px] text-[var(--color-text)] placeholder:text-gray-500 shadow-none outline-none focus-visible:border-[var(--color-brand)] focus-visible:ring-0 focus-visible:border-b-2";

export function AuthSubmit({ children, disabled }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="h-12 w-full text-[15px] font-bold transition-colors bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand-hover)] disabled:cursor-not-allowed disabled:bg-[#eeeeee] disabled:text-gray-400"
    >
      {children}
    </button>
  );
}
