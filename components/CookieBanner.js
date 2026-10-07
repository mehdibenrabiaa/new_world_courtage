import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { X, BarChart2, Megaphone, Lock, Loader2 } from "lucide-react";
import { headingFont } from "@/lib/fonts";
import { getConsent, saveConsent } from "@/lib/consent";

// ── Replace with your actual tracking IDs ────────────────────────────────────
const GA_ID         = "G-XXXXXXXXXX";
const CLARITY_ID    = "XXXXXXXXXX";
const META_PIXEL_ID = "XXXXXXXXXXXXXXX";
// ─────────────────────────────────────────────────────────────────────────────

function injectGA(id) {
  if (document.getElementById("ga-script")) return;
  const s1 = document.createElement("script");
  s1.id = "ga-script"; s1.async = true;
  s1.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(s1);
  const s2 = document.createElement("script");
  s2.id = "ga-init";
  s2.innerHTML = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}',{anonymize_ip:true});`;
  document.head.appendChild(s2);
}

function injectClarity(id) {
  if (document.getElementById("clarity-script")) return;
  const s = document.createElement("script");
  s.id = "clarity-script";
  s.innerHTML = `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${id}");`;
  document.head.appendChild(s);
}

function injectMetaPixel(id) {
  if (document.getElementById("meta-pixel")) return;
  const s = document.createElement("script");
  s.id = "meta-pixel";
  s.innerHTML = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${id}');fbq('track','PageView');`;
  document.head.appendChild(s);
}

export function applyConsent(analytics, marketing) {
  if (analytics) { injectGA(GA_ID); injectClarity(CLARITY_ID); }
  if (marketing) { injectMetaPixel(META_PIXEL_ID); }
}

// ── Cookie SVG (inlined lucide icon) ─────────────────────────────────────────
function CookieIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
      <path d="M8.5 8.5v.01" /><path d="M16 15.5v.01" />
      <path d="M12 12v.01" /><path d="M11 17v.01" /><path d="M7 14v.01" />
    </svg>
  );
}

// ── Toggle switch (square, site style) ────────────────────────────────────────
function Toggle({ checked, onChange, disabled = false, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand)] ${
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
      } ${checked ? "bg-[var(--color-brand)]" : "bg-gray-300"}`}
    >
      <span className={`inline-block size-4 bg-white transition-transform ${checked ? "translate-x-6" : "translate-x-1"}`} />
    </button>
  );
}

// ── Category definitions ──────────────────────────────────────────────────────
const CATEGORIES = [
  {
    id: "essential", icon: Lock, label: "Essentiels", locked: true,
    description: "Nécessaires au bon fonctionnement du site. Ces cookies ne peuvent pas être désactivés.",
    providers: "New World Courtage",
  },
  {
    id: "analytics", icon: BarChart2, label: "Analytique", locked: false,
    description: "Nous aident à comprendre comment les visiteurs utilisent notre site afin d'en améliorer les performances.",
    providers: "Google Analytics, Microsoft Clarity",
  },
  {
    id: "marketing", icon: Megaphone, label: "Marketing", locked: false,
    description: "Permettent de vous proposer des publicités pertinentes et de mesurer l'efficacité de nos campagnes.",
    providers: "Meta Pixel (Facebook & Instagram)",
  },
];

// ── Preferences panel: intro, one ruled row per category, then the buttons ──
const outlineBtn = "flex h-12 items-center justify-center border border-[var(--color-brand)] px-5 text-[15px] font-bold text-[var(--color-brand)] transition-colors hover:bg-[var(--color-light)] disabled:opacity-60";

export function CookiePreferencesPanel({ analytics, marketing, setAnalytics, setMarketing, onSave, onAcceptAll, onRejectAll, onClose = () => {}, loading = null }) {
  const spinner = <Loader2 size={16} className="animate-spin" aria-hidden="true" />;
  return (
    <div className="flex flex-col gap-5">
      <p className="text-[15px] leading-relaxed text-gray-600">
        Choisissez les catégories de cookies que vous souhaitez autoriser. Votre choix sera conservé 13 mois.{" "}
        <Link href="/confidentialite/" onClick={onClose} className="text-[var(--color-brand)] underline-offset-2 hover:underline">Politique de confidentialité</Link>
      </p>

      <ul className="divide-y divide-gray-200 border-y border-gray-200">
        {CATEGORIES.map(({ id, icon: Icon, label, description, providers, locked }) => {
          const checked = locked || (id === "analytics" ? analytics : marketing);
          const onChange = id === "analytics" ? setAnalytics : setMarketing;
          return (
            <li key={id} className="flex gap-4 py-4">
              <Icon size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--color-brand)]" />
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-[16px] font-semibold text-[var(--color-text)]">{label}</span>
                  {locked && <span className="bg-[var(--color-light)] px-2 py-0.5 text-[12px] font-semibold text-gray-600">Toujours actif</span>}
                </div>
                <p className="text-[14px] leading-relaxed text-gray-600">{description}</p>
                <p className="text-[13px] text-gray-500">Prestataires : {providers}</p>
              </div>
              <Toggle checked={checked} onChange={onChange} disabled={locked} label={label} />
            </li>
          );
        })}
      </ul>

      {/* Refuse and accept side by side with the same weight (CNIL). */}
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-2">
          <button type="button" onClick={onRejectAll} disabled={!!loading} className={outlineBtn}>
            {loading === "reject" ? spinner : "Tout refuser"}
          </button>
          <button type="button" onClick={onAcceptAll} disabled={!!loading} className={outlineBtn}>
            {loading === "accept" ? spinner : "Tout accepter"}
          </button>
        </div>
        <button type="button" onClick={onSave} disabled={!!loading} className="flex h-12 w-full items-center justify-center bg-[var(--color-brand)] px-5 text-[15px] font-bold text-white transition-colors hover:bg-[var(--color-brand-hover)] disabled:opacity-60">
          {loading === "save" ? spinner : "Enregistrer mes préférences"}
        </button>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function CookieBanner() {
  const [mounted, setMounted]       = useState(false);
  const [visible, setVisible]       = useState(false);
  const [hasConsent, setHasConsent] = useState(false);
  const [prefsOpen, setPrefsOpen]   = useState(false);
  const [analytics, setAnalytics]   = useState(false); // opt-in only (CNIL)
  const [marketing, setMarketing]   = useState(false);
  const [loading, setLoading]       = useState(null);
  const [dragOffset, setDragOffset] = useState(0);
  const dragStartY = useRef(null);

  function handleTouchStart(e) {
    dragStartY.current = e.touches[0].clientY;
  }
  function handleTouchMove(e) {
    const delta = e.touches[0].clientY - dragStartY.current;
    if (delta > 0) setDragOffset(delta);
  }
  function handleTouchEnd() {
    if (dragOffset > 80) {
      setPrefsOpen(false);
    }
    setDragOffset(0);
    dragStartY.current = null;
  }

  useEffect(() => {
    const consent = getConsent();
    if (consent) {
      setHasConsent(true);
      setAnalytics(consent.analytics);
      setMarketing(consent.marketing);
      applyConsent(consent.analytics, consent.marketing);
    }
    setMounted(true);
    const slideIn = setTimeout(() => setVisible(true), 2000);

    const handler = () => setPrefsOpen(true);
    window.addEventListener("open-cookie-prefs", handler);

    return () => {
      clearTimeout(slideIn);
      window.removeEventListener("open-cookie-prefs", handler);
    };
  }, []);

  const acceptAll = useCallback(() => {
    setLoading("accept");
    setTimeout(() => {
      saveConsent({ analytics: true, marketing: true });
      applyConsent(true, true);
      setAnalytics(true); setMarketing(true);
      setHasConsent(true);
      setPrefsOpen(false);
      setLoading(null);
    }, 1000);
  }, []);

  const rejectAll = useCallback(() => {
    setLoading("reject");
    setTimeout(() => {
      saveConsent({ analytics: false, marketing: false });
      setAnalytics(false); setMarketing(false);
      setHasConsent(true);
      setPrefsOpen(false);
      setLoading(null);
    }, 1000);
  }, []);

  const savePrefs = useCallback(() => {
    setLoading("save");
    setTimeout(() => {
      saveConsent({ analytics, marketing });
      applyConsent(analytics, marketing);
      setHasConsent(true);
      setPrefsOpen(false);
      setLoading(null);
    }, 1000);
  }, [analytics, marketing]);

  if (!mounted) return null;

  return (
    <>
      {/* Floating cookie button — rendered in its own portal so Radix Sheet's inert on #__next doesn't block it */}
      {createPortal(
        <div className={`fixed bottom-6 left-6 z-[200] transition-all duration-500 ease-out ${visible ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"}`}>
          <button
            onClick={() => setPrefsOpen(true)}
            aria-label="Gérer les cookies"
            className="relative w-14 h-14 rounded-full bg-[var(--color-brand)] text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center group"
          >
            <CookieIcon size={24} />

            {/* Tooltip */}
            <span className="absolute bottom-full mb-2.5 left-0 whitespace-nowrap text-xs font-medium bg-[#131212] text-white px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
              Gérer les cookies
              <span className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-[#131212]" />
            </span>
          </button>
        </div>,
        document.body
      )}

      {/* Preferences modal */}
      <Dialog.Root open={prefsOpen} onOpenChange={setPrefsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[61] bg-black/40 sheet-overlay" />

          {/* Mobile: bottom sheet — Desktop: centered modal */}
          <Dialog.Content aria-describedby={undefined} className="modal-content fixed z-[62] inset-x-0 bottom-0 md:inset-0 md:flex md:items-center md:justify-center md:p-4">
            <div
              className="bg-white shadow-2xl w-full flex flex-col overflow-hidden max-h-[88vh] md:max-w-md md:max-h-[90vh]"
              style={{ transform: dragOffset > 0 ? `translateY(${dragOffset}px)` : undefined, transition: dragOffset === 0 ? "transform 0.3s ease" : "none" }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Header — on mobile, dragging the sheet down also closes it */}
              <div className="flex items-center justify-between bg-[var(--color-brand)] py-4 pl-6 pr-4 text-white shrink-0">
                <div className="flex items-center gap-3">
                  <CookieIcon size={22} />
                  <Dialog.Title className={`text-[22px] leading-none ${headingFont.className}`}>
                    Gérer mes <em className={headingFont.className}>cookies</em>
                  </Dialog.Title>
                </div>
                <Dialog.Close asChild>
                  <button
                    className="flex size-9 items-center justify-center text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                    aria-label="Fermer"
                  >
                    <X size={20} aria-hidden="true" />
                  </button>
                </Dialog.Close>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto px-6 py-6">
                <CookiePreferencesPanel
                  analytics={analytics}
                  marketing={marketing}
                  setAnalytics={setAnalytics}
                  setMarketing={setMarketing}
                  onSave={savePrefs}
                  onAcceptAll={acceptAll}
                  onRejectAll={rejectAll}
                  onClose={() => setPrefsOpen(false)}
                  loading={loading}
                />
              </div>

            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
