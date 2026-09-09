import "../global.css";
import { useEffect } from "react";
import Head from "next/head";
import { Google_Sans_Flex } from "next/font/google";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CookieBanner from "../components/CookieBanner";
const bodyFont = Google_Sans_Flex({
  subsets: ["latin"],
  weight: "variable",
  display: "optional",
});

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const NO_NAV_ROUTES = [
  "/assurance-transport/devis",
  "/assurance-transport/taxi/devis",
  "/assurance-pro-auto/garagiste/devis",
];

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const hideNav = NO_NAV_ROUTES.some((r) => router.pathname.startsWith(r));

  // NEXT_PUBLIC_APP_VERSION/BUILD_TIME are set once in next.config.js when
  // the server boots (or `next build` runs), so this reflects the deploy,
  // not the moment this particular tab happened to load.
  useEffect(() => {
    const buildTime = process.env.NEXT_PUBLIC_BUILD_TIME
      ? new Date(process.env.NEXT_PUBLIC_BUILD_TIME).toLocaleString("fr-FR", { dateStyle: "long", timeStyle: "short" })
      : "inconnue";
    console.log(
      `%cNew World Courtage v${process.env.NEXT_PUBLIC_APP_VERSION ?? "?"} — dernière mise à jour : ${buildTime}`,
      "font-weight: bold;"
    );
  }, []);

  return (
    <div
      className={bodyFont.className}
      style={{ minHeight: "100vh", overflowX: "clip" }}
    >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {!hideNav && <Navbar />}
      <div className="max-w-[1600px] mx-auto">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={router.pathname}
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
        <CookieBanner />
      </div>

      {!hideNav && <Footer />}
    </div>
  );
}
