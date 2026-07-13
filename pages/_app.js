import '../global.css'
import { DM_Sans } from 'next/font/google'
import { useRouter } from 'next/router'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CookieBanner from '../components/CookieBanner'

const dmSans = DM_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'], display: 'optional' })

const variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1 },
}

const NO_NAV_ROUTES = [
  '/assurance-auto/calculateur/devis',
]

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const hideNav = NO_NAV_ROUTES.some(r => router.pathname.startsWith(r))

  return (
    <div className={dmSans.className} style={{ minHeight: '100vh', overflowX: 'clip' }}>
      {!hideNav && <Navbar />}
      <div className="max-w-[1600px] mx-auto">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={router.pathname}
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
        <CookieBanner />
      </div>
      <Footer />
    </div>
  )
}
