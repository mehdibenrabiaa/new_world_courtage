import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import * as NavMenu from '@radix-ui/react-navigation-menu'
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Menu, X, Phone, Mail, ChevronLeft, ChevronRight, Eye, Lock, LogOut, UserRound } from 'lucide-react'

function WhatsAppIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}
import { Button } from '@/components/ui/button'
import CtaButton from '@/components/CtaButton'
import { NAV_ITEMS } from './navData'
import SiteLogo from './SiteLogo'
import AccountMenu, { LogoutNotice, accountLinks, firstName, useAccount, useLogout } from './AccountMenu'

// Top utility row of the desktop header.
const TOP_LEFT_LINKS = [
  { label: 'À propos', href: '/a-propos/' },
  { label: 'Nos assurances', href: '/nos-assurances/' },
]
const TOP_RIGHT_LINKS = [
  { label: 'Accessibilité', href: '/accessibilite/', Icon: Eye },
  { label: 'Contact', href: '/contact/', Icon: Mail },
  { label: '07 45 89 18 65', href: 'tel:+33745891865', Icon: Phone },
]

// ── Mega-menu content (renders inside Radix Viewport) ─────────────────────

function MegaMenuContent({ item }) {
  return (
    <div className="w-full bg-white">
      <div className="px-12 2xl:px-24 py-10">
        <div className="grid gap-14 justify-start" style={{ gridTemplateColumns: `repeat(${item.sections.length}, auto)` }}>
          {item.sections.map((section) => (
            <div key={section.heading}>
              <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-text)] mb-2.5">
                {section.heading}
              </p>
              <ul className="space-y-0.5">
                {section.links.map((link, i) =>
                  link.separator ? (
                    <li key={`sep-${i}`} className="my-1.5 border-t border-gray-100" />
                  ) : (
                    <li key={link.label}>
                      <NavMenu.Link asChild>
                        <Button variant="link" asChild className="h-auto py-1 px-2 text-[13.5px] text-gray-800 font-normal justify-start">
                          <Link href={link.href}>{link.label}</Link>
                        </Button>
                      </NavMenu.Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-5 pt-4 border-t border-gray-200 flex items-center gap-4">
          <CtaButton href={item.cta.href} label={item.cta.button} className="shrink-0" />
          <p className="text-sm font-medium text-gray-900">{item.cta.tagline}</p>
        </div>
      </div>
    </div>
  )
}

// ── Mobile drawer pieces ───────────────────────────────────────────────────
// Square, line-separated rows and full-width brand blocks, matching the
// desktop header.

const drawerRow = 'flex items-center justify-between gap-3 w-full px-5 py-4 text-left text-[15px] font-medium text-[var(--color-text)] border-b border-gray-200 hover:bg-gray-50 transition-colors'

function DrawerButtons({ onClose, account, setAccount }) {
  const logout = useLogout(setAccount)
  return (
    <div className="flex flex-col">
      {account && (
        <div className="border-t border-gray-200">
          <p className="flex items-center gap-2 px-5 pt-4 pb-2 text-[13px] font-bold uppercase tracking-widest text-gray-500">
            <UserRound size={15} aria-hidden="true" />
            {firstName(account)}
          </p>
          {accountLinks(account).map(({ label, href }) => (
            <Link key={href} href={href} onClick={onClose} className={drawerRow}>
              {label}
              <ChevronRight size={16} className="shrink-0 text-gray-400" aria-hidden="true" />
            </Link>
          ))}
        </div>
      )}
      <Link href="/devis/" onClick={onClose} className="flex items-center justify-center py-4 text-[15px] font-bold text-white bg-[#3b9bd8] hover:bg-[#2c87c2] transition-colors">
        Devis gratuit
      </Link>
      {account ? (
        <button type="button" onClick={() => { onClose(); logout() }} className="flex items-center justify-center gap-2 py-4 text-[15px] font-bold text-white bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] transition-colors">
          <LogOut size={16} strokeWidth={2} aria-hidden="true" />
          Déconnexion
        </button>
      ) : (
        <Link href="/connexion/" onClick={onClose} className="flex items-center justify-center gap-2 py-4 text-[15px] font-bold text-white bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] transition-colors">
          <Lock size={16} strokeWidth={2} aria-hidden="true" />
          Espace client
        </Link>
      )}
    </div>
  )
}

function MobilePanel({ item, onBack, onClose }) {
  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-2 w-full px-5 py-4 text-[15px] font-bold text-[var(--color-text)] bg-[var(--color-light)] border-b border-gray-200 hover:bg-gray-100"
      >
        <ChevronLeft size={18} className="text-[var(--color-brand)]" aria-hidden="true" />
        {item.label}
      </button>

      {item.sections.map((section) => (
        <div key={section.heading}>
          <p className="px-5 pt-5 pb-2 text-[11px] font-bold uppercase tracking-widest text-gray-500 border-b border-gray-200">
            {section.heading}
          </p>
          {section.links.map((link, i) =>
            link.separator ? null : (
              <Link key={`${link.label}-${i}`} href={link.href} onClick={onClose} className={drawerRow}>
                {link.label}
                <ChevronRight size={16} className="shrink-0 text-gray-400" aria-hidden="true" />
              </Link>
            )
          )}
        </div>
      ))}

      <p className="px-5 pt-6 pb-4 text-[14px] font-medium text-[var(--color-text)]">{item.cta.tagline}</p>
      <Link href={item.cta.href} onClick={onClose} className="flex items-center justify-center py-4 text-[15px] font-bold text-white bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] transition-colors">
        {item.cta.button}
      </Link>
    </div>
  )
}

// ── Mobile drawer ──────────────────────────────────────────────────────────

const DRAWER_LINKS = [
  { label: 'À propos', href: '/a-propos/' },
  { label: 'Nos assurances', href: '/nos-assurances/' },
  { label: 'Accessibilité', href: '/accessibilite/', Icon: Eye },
  { label: 'Contact', href: '/contact/', Icon: Mail },
]

function MobileDrawer({ open, onClose, account, setAccount }) {
  const [activePanel, setActivePanel] = useState(null)
  const [animClass, setAnimClass] = useState('')

  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => setActivePanel(null), 300)
      return () => clearTimeout(t)
    }
  }, [open])

  const handleOpenPanel = (item) => {
    setAnimClass('slide-in-right')
    setActivePanel(item)
  }

  const handleBack = () => {
    setAnimClass('slide-in-left')
    setActivePanel(null)
  }

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent side="right" aria-label="Navigation menu">
        <SheetTitle className="sr-only">Menu de navigation</SheetTitle>
        <SheetHeader className="h-16 items-stretch border-b border-gray-200">
          <Link href="/" onClick={onClose} className="flex items-center border-r border-gray-200 px-4">
            <SiteLogo className="h-9 w-auto" />
          </Link>
          <SheetClose asChild>
            <button aria-label="Fermer le menu" className="flex w-14 items-center justify-center hover:bg-gray-50">
              <X size={22} aria-hidden="true" />
            </button>
          </SheetClose>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <div key={activePanel?.id ?? 'main'} className={animClass}>
          {activePanel ? (
            <MobilePanel item={activePanel} onBack={handleBack} onClose={onClose} />
          ) : (
            <div>
              {NAV_ITEMS.map((item) => (
                <button key={item.id} onClick={() => handleOpenPanel(item)} className={drawerRow}>
                  {item.label}
                  <ChevronRight size={18} className="shrink-0 text-[var(--color-brand)]" aria-hidden="true" />
                </button>
              ))}

              <div className="bg-[var(--color-light)] border-b border-gray-200">
                {DRAWER_LINKS.map(({ label, href, Icon }) => (
                  <Link key={href} href={href} onClick={onClose} className="flex items-center gap-3 px-5 py-3 text-[14px] text-[var(--color-text)] hover:text-[var(--color-brand)]">
                    {Icon && <Icon size={15} strokeWidth={1.75} aria-hidden="true" />}
                    {label}
                  </Link>
                ))}
              </div>

              <div className="px-5 py-5 flex flex-col gap-3">
                <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500">Contact</p>
                <a href="mailto:contact@newworldcourtage.com" className="flex items-center gap-3 text-[14px] text-[var(--color-text)] hover:text-[var(--color-brand)]">
                  <Mail size={16} className="text-[var(--color-brand)] shrink-0" aria-hidden="true" />
                  contact@newworldcourtage.com
                </a>
                <a href="tel:+33745891865" className="flex items-center gap-3 text-[14px] text-[var(--color-text)] hover:text-[var(--color-brand)]">
                  <Phone size={16} className="text-[var(--color-brand)] shrink-0" aria-hidden="true" />
                  07 45 89 18 65
                </a>
                <a href="https://wa.me/33774595329" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[14px] text-[var(--color-text)] hover:text-[var(--color-brand)]">
                  <span className="text-[var(--color-brand)] shrink-0"><WhatsAppIcon size={16} /></span>
                  07 74 59 53 29
                </a>
              </div>

              <DrawerButtons onClose={onClose} account={account} setAccount={setAccount} />
            </div>
          )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

// ── Main Navbar ────────────────────────────────────────────────────────────

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [account, setAccount] = useAccount()
  const headerRef = useRef(null)
  const [headerHeight, setHeaderHeight] = useState(0)

  // The mega-menu dropdown is positioned fixed to the viewport (see
  // NavMenu.Content below) rather than absolute-to-header, because Radix's
  // NavigationMenu internals set their own position on an ancestor between
  // header and Content, which would otherwise hijack the containing block
  // and misplace the dropdown. Measuring the real height here instead of a
  // hardcoded Tailwind class keeps it in sync if the header's padding/
  // content ever changes again.
  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    const update = () => setHeaderHeight(el.offsetHeight)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <>
      <header ref={headerRef} className="sticky top-0 z-40 w-full bg-white border-b border-gray-200">

        {/* Desktop — logo cell spanning a utility row and a main row */}
        <div className="hidden lg:flex">
          <Link href="/" className="flex shrink-0 items-center border-r border-gray-200 px-8 xl:px-12">
            <SiteLogo className="h-10 w-auto" />
          </Link>

          <div className="flex min-w-0 flex-1 flex-col">
            {/* Utility row */}
            <div className="flex h-[34px] items-center justify-between border-b border-gray-200 px-5 text-[14px] text-[var(--color-text)]">
              <div className="flex items-center gap-7">
                {TOP_LEFT_LINKS.map(({ label, href }) => (
                  <Link key={href} href={href} className="hover:text-[var(--color-brand)]">{label}</Link>
                ))}
              </div>
              <div className="flex items-center gap-7">
                {TOP_RIGHT_LINKS.map(({ label, href, Icon }) => (
                  <Link key={href} href={href} className="flex items-center gap-2 hover:text-[var(--color-brand)]">
                    <Icon size={15} strokeWidth={1.75} aria-hidden="true" />
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Main row */}
            <div className="flex h-[52px] items-stretch">
              <NavMenu.Root delayDuration={100} className="flex flex-1 items-center">
                <NavMenu.List className="flex items-center gap-0.5 list-none m-0 p-0">
                  {NAV_ITEMS.map((item) => (
                    <NavMenu.Item key={item.id}>
                      <NavMenu.Trigger onPointerDown={(e) => e.preventDefault()} asChild>
                        <Button variant="link" className="px-5 py-2 text-[15px] font-medium data-[state=open]:text-[var(--color-brand)] hover:no-underline">
                          {item.label}
                        </Button>
                      </NavMenu.Trigger>
                      <NavMenu.Content
                        className="fixed left-0 w-screen bg-white border-b border-gray-200 shadow-lg z-50 [animation:nav-fade-in_0.15s_ease]"
                        style={{ top: headerHeight }}
                      >
                        <MegaMenuContent item={item} />
                      </NavMenu.Content>
                    </NavMenu.Item>
                  ))}
                </NavMenu.List>
              </NavMenu.Root>

              <Link href="/devis/" className="flex items-center px-7 text-[15px] font-bold text-white bg-[#3b9bd8] hover:bg-[#2c87c2] transition-colors">
                Devis gratuit
              </Link>
              <AccountMenu account={account} setAccount={setAccount} />
            </div>
          </div>
        </div>

        {/* Mobile — same blocks as desktop: logo cell, then full-height
            Devis gratuit / Espace client buttons and the menu toggle */}
        <div className="lg:hidden flex h-16 items-stretch">
          <Link href="/" className="flex shrink-0 items-center border-r border-gray-200 px-4">
            <SiteLogo className="h-9 w-auto" />
          </Link>
          <div className="flex-1" />
          <Link href="/devis/" className="flex items-center px-4 sm:px-6 text-[14px] font-bold text-white bg-[#3b9bd8] hover:bg-[#2c87c2] transition-colors">
            Devis<span className="hidden sm:inline">&nbsp;gratuit</span>
          </Link>
          <Link
            href={account ? accountLinks(account)[0].href : "/connexion/"}
            aria-label={account ? accountLinks(account)[0].label : "Espace client"}
            className="flex items-center gap-2 px-4 sm:px-6 text-[14px] font-bold text-white bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)] transition-colors"
          >
            {account ? <UserRound size={18} strokeWidth={2} aria-hidden="true" /> : <Lock size={17} strokeWidth={2} aria-hidden="true" />}
            <span className="hidden sm:inline">{account ? firstName(account) : "Espace client"}</span>
          </Link>
          <button type="button" onClick={() => setDrawerOpen(true)} aria-label="Ouvrir le menu" className="flex w-14 items-center justify-center text-[var(--color-text)] hover:bg-gray-50">
            <Menu size={24} aria-hidden="true" />
          </button>
        </div>
      </header>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} account={account} setAccount={setAccount} />
      <LogoutNotice />
    </>
  )
}
