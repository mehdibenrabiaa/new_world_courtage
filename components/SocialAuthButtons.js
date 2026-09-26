import { oauthStartUrl } from "@/lib/accounts";
import { GoogleIcon } from "@/components/SocialIcons";

// Apple/Meta are wired up on the backend (see app/oauth.py) but not shown
// here yet — only Google is offered for now. Re-add a row for either the
// same way this one is built once we're ready to surface them.
export default function SocialAuthButtons({ type = "client", large = false }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative flex items-center">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="px-3 text-xs text-gray-400">ou</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Google's official button style: pill-shaped, white, light border —
          per Google's "Sign in with Google" branding guidelines, rather
          than matching the site's own square-ish (--radius) buttons. */}
      <a
        href={oauthStartUrl("google", type)}
        className={`inline-flex items-center justify-center gap-3 rounded-full border border-gray-300 bg-white shadow-sm font-medium text-gray-700 hover:bg-gray-50 hover:shadow transition-all ${large ? "h-12 text-base" : "h-10 text-sm"}`}
      >
        <GoogleIcon className={large ? "size-6" : "size-5"} />
        Continuer avec Google
      </a>
    </div>
  );
}
