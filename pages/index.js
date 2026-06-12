import Head from 'next/head'
import Hero from '../components/Hero'
import Testimonials from '../components/Testimonials'
import Partners from '../components/Partners'
import OurProcess from '../components/OurProcess'
import RealCustomers from '../components/RealCustomers'
import FinishedScrolling from '../components/FinishedScrolling'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>Assurance Auto, Habitation, Santé & Décennale — Comparez et économisez</title>
        <meta name="description" content="Comparez les meilleures offres d'assurance auto, habitation, santé et décennale. Obtenez des devis gratuits en quelques minutes et économisez sur votre assurance." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.votresite.fr/" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.votresite.fr/" />
        <meta property="og:title" content="Assurance Auto, Habitation, Santé & Décennale — Comparez et économisez" />
        <meta property="og:description" content="Comparez les meilleures offres d'assurance auto, habitation, santé et décennale. Obtenez des devis gratuits en quelques minutes." />
        <meta property="og:locale" content="fr_FR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Assurance Auto, Habitation, Santé & Décennale" />
        <meta name="twitter:description" content="Comparez les meilleures offres d'assurance et économisez." />
      </Head>
      <main>
        <h1 className="sr-only">Comparez les meilleures assurances en France</h1>
        <Hero />
        <RealCustomers />
        <Partners />
        <Testimonials />
        <OurProcess />
        <FinishedScrolling />
      </main>
      <Footer />
    </>
  )
}
