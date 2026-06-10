import '../global.css'
import { Inter } from 'next/font/google'
import Navbar from '../components/Navbar'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

export default function MyApp({ Component, pageProps }) {
  return (
    <div className={inter.className} style={{ minHeight: '100vh' }}>
      <Navbar />
      <Component {...pageProps} />
    </div>
  )
}
