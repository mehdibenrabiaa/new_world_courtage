import '../global.css'
import { Roboto } from 'next/font/google'
import Navbar from '../components/Navbar'

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'], display: 'swap' })

export default function MyApp({ Component, pageProps }) {
  return (
    <div className={roboto.className} style={{ minHeight: '100vh' }}>
      <Navbar />
      <Component {...pageProps} />
    </div>
  )
}
