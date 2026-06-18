import '../global.css'
import { Roboto } from 'next/font/google'
import { useRouter } from 'next/router'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from '../components/Navbar'

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'], display: 'swap' })

const variants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

const NO_NAV_ROUTES = [
  '/auto-insurance/car-insurance-calculator/devis',
]

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const hideNav = NO_NAV_ROUTES.some(r => router.pathname.startsWith(r))

  return (
    <div className={roboto.className} style={{ minHeight: '100vh' }}>
      {!hideNav && <Navbar />}
      <AnimatePresence mode="wait">
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
    </div>
  )
}
