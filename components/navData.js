// The products New World Courtage sells, grouped as in the header mega menu.
// Only link to pages that exist.
export const NAV_ITEMS = [
  {
    id: 'auto-moto',
    label: 'Auto & Moto',
    href: '/assurance-auto/',
    cta: { tagline: "Assurez votre voiture ou votre moto au meilleur prix", button: 'Devis gratuit', href: '/assurance-auto/devis/' },
    sections: [
      {
        heading: 'Particuliers',
        links: [
          { label: 'Assurance automobile', href: '/assurance-auto/' },
          { label: 'Assurance moto', href: '/assurance-moto/' },
          { label: 'Assurance risques aggravés', href: '/assurance-risques-aggraves/' },
        ],
      },
      {
        heading: 'Outils',
        links: [
          { label: 'Calculateur assurance auto', href: '/assurance-transport/calculateur/' },
          { label: 'Comparer toutes nos assurances', href: '/nos-assurances/' },
        ],
      },
    ],
  },
  {
    id: 'taxi-vtc',
    label: 'Taxi & VTC',
    href: '/assurance-transport/',
    cta: { tagline: "Protégez votre activité de transport de personnes", button: 'Devis gratuit', href: '/assurance-transport/' },
    sections: [
      {
        heading: 'Transport de personnes',
        links: [
          { label: 'Assurance taxi', href: '/assurance-transport/taxi/' },
          { label: 'Assurance chauffeur VTC', href: '/assurance-transport/chauffeur-vtc/' },
        ],
      },
      {
        heading: 'Guides taxi',
        links: [
          { label: 'Comment choisir son assurance taxi', href: '/assurance-transport/comment-choisir-assurance-taxi/' },
          { label: 'Comment souscrire une assurance taxi', href: '/assurance-transport/comment-souscrire-assurance-taxi/' },
          { label: 'Quelle couverture pour un taxi ?', href: '/assurance-transport/quelle-couverture-assurance-taxi/' },
        ],
      },
    ],
  },
  {
    id: 'pro-auto',
    label: "Pro de l'automobile",
    href: '/assurance-pro-auto/garagiste/',
    cta: { tagline: "Protégez votre activité automobile professionnelle", button: 'Devis gratuit', href: '/assurance-pro-auto/garagiste/' },
    sections: [
      {
        heading: 'Garage',
        links: [
          { label: 'Assurance garagiste', href: '/assurance-pro-auto/garagiste/' },
          { label: 'Assurance convoyage', href: '/assurance-pro-auto/garagiste/?activite=convoyage' },
          { label: 'Assurance négociant automobile', href: '/assurance-pro-auto/garagiste/?activite=negociant' },
        ],
      },
      {
        // Guides published from the CRM (see pages/assurance-pro-auto/[slug].js).
        heading: 'Guides garage',
        links: [
          { label: "Le guide complet de l'assurance garage", href: '/assurance-pro-auto/assurance-garage-guide-complet/' },
          { label: "Prix d'une assurance garage", href: '/assurance-pro-auto/prix-assurance-garage/' },
          { label: 'Garantie des véhicules confiés', href: '/assurance-pro-auto/garantie-vehicules-confies-garage/' },
        ],
      },
    ],
  },
]
