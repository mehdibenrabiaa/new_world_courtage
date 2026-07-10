import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import * as NavMenu from '@radix-ui/react-navigation-menu'
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Menu, X, Phone, Mail } from 'lucide-react'

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

function Logo() {
  return (
    <Image src="/nwc_logo.svg" alt="New World Courtage" width={182} height={223} className="h-11 w-auto" priority />
  )
}

// ── Mega-menu content (renders inside Radix Viewport) ─────────────────────

function MegaMenuContent({ item }) {
  return (
    <div className="w-full bg-white">
      <div className="px-12 2xl:px-24 py-10">
        <div className="grid grid-cols-3 gap-6 max-w-3xl">
          {item.sections.map((section) => (
            <div key={section.heading}>
              <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-text)] mb-2.5">
                {section.heading}
              </p>
              <ul className="space-y-0.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <NavMenu.Link asChild>
                      <Button variant="link" asChild className="h-auto py-1 px-2 text-[13.5px] text-gray-800 font-normal justify-start">
                        <Link href={link.href}>{link.label}</Link>
                      </Button>
                    </NavMenu.Link>
                  </li>
                ))}
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

// ── Mobile second-level panel ──────────────────────────────────────────────

function MobilePanel({ item, onBack }) {
  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-2 w-full px-5 py-4 text-base font-bold text-[var(--color-text)] border-b border-gray-200 hover:bg-gray-50"
      >
        {item.label}
      </button>

      <div className="pb-4">
        {item.sections.map((section) => (
          <div key={section.heading} className="px-5 pt-4">
            <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-text)] mb-2">
              {section.heading}
            </p>
            {section.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2.5 text-sm text-[var(--color-text)] border-b border-gray-100 last:border-0 hover:text-[var(--color-brand)]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        ))}

        <div className="mx-5 mt-5 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-[13.5px] font-medium text-[var(--color-text)] mb-3">{item.cta.tagline}</p>
          <Link
            href={item.cta.href}
            className="block text-center py-3 bg-[var(--color-brand)] text-white text-sm font-bold rounded-full hover:bg-[var(--color-brand-hover)] transition-colors"
          >
            {item.cta.button}
          </Link>
        </div>
      </div>
    </div>
  )
}

// ── Mobile drawer ──────────────────────────────────────────────────────────

function MobileDrawer({ open, onClose }) {
  const [activePanel, setActivePanel] = useState(null)

  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => setActivePanel(null), 300)
      return () => clearTimeout(t)
    }
  }, [open])

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent side="right" aria-label="Navigation menu">
        <SheetTitle className="sr-only">Menu de navigation</SheetTitle>
        <SheetHeader className="px-5 h-24 border-b border-gray-200">
          <Link href="/" onClick={onClose}>
            <Logo />
          </Link>
          <SheetClose asChild>
            <button aria-label="Close menu" className="flex items-center justify-center p-1.5 rounded-md hover:bg-gray-100">
              <X size={22} />
            </button>
          </SheetClose>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          {activePanel ? (
            <MobilePanel item={activePanel} onBack={() => setActivePanel(null)} />
          ) : (
            <div className="py-2">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActivePanel(item)}
                  className="w-full text-left px-5 py-3.5 text-base font-medium text-[var(--color-text)] hover:bg-gray-50"
                >
                  {item.label}
                </button>
              ))}

              <div className="h-px bg-gray-200 mx-5 my-2" />

              <Link href="/a-propos/" onClick={onClose} className="block px-5 py-3 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-[var(--color-text)]">
                À propos
              </Link>

              <div className="h-px bg-gray-200 mx-5 my-2" />

              <div className="px-5 py-3 flex flex-col gap-3">
                <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Contact</p>
                <a href="mailto:contact@newworldcourtage.com" className="flex items-center gap-3 text-base text-[var(--color-text)] hover:text-[var(--color-brand)]">
                  <Mail size={16} className="text-[var(--color-brand)] shrink-0" />
                  contact@newworldcourtage.com
                </a>
                <a href="tel:+33745891865" className="flex items-center gap-3 text-base text-[var(--color-text)] hover:text-[var(--color-brand)]">
                  <Phone size={16} className="text-[var(--color-brand)] shrink-0" />
                  07 45 89 18 65
                </a>
                <a href="https://wa.me/33774595329" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-base text-[var(--color-text)] hover:text-[var(--color-brand)]">
                  <span className="text-[var(--color-brand)] shrink-0"><WhatsAppIcon size={16} /></span>
                  07 74 59 53 29
                </a>
              </div>
              <div className="mx-5 mt-3 mb-2" onClick={onClose}>
                <CtaButton href="/life-insurance/start" className="w-full justify-center" />
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

// ── Main Navbar ────────────────────────────────────────────────────────────

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-40 h-24 w-full bg-white border-b border-gray-200">
        <div className="px-4 lg:px-12 2xl:px-24 h-full flex items-center">

          {/* Logo */}
          <Link href="/" className="shrink-0 mr-4 lg:mr-10">
            <Logo />
          </Link>

          {/* Desktop primary nav — Radix NavigationMenu */}
          <NavMenu.Root delayDuration={100} className="hidden lg:block flex-1">
            <NavMenu.List className="flex items-center gap-0.5 list-none m-0 p-0">
              {NAV_ITEMS.map((item) => (
                <NavMenu.Item key={item.id}>
                  <NavMenu.Trigger onPointerDown={(e) => e.preventDefault()} asChild>
                    <Button variant="link" className="px-5 py-2 text-base font-semibold data-[state=open]:text-[var(--color-brand)] hover:no-underline">
                      {item.label}
                    </Button>
                  </NavMenu.Trigger>
                  <NavMenu.Content className="fixed top-24 left-0 w-screen bg-white border-b border-gray-200 shadow-lg z-50 [animation:nav-fade-in_0.15s_ease]">
                    <MegaMenuContent item={item} />
                  </NavMenu.Content>
                </NavMenu.Item>
              ))}
            </NavMenu.List>

          </NavMenu.Root>

          {/* Utility — desktop */}
          <div className="hidden lg:flex items-center gap-3 ml-auto shrink-0">
            <Button variant="link" asChild className="px-5 py-2 text-base font-semibold hover:no-underline hover:text-[var(--color-text)]">
              <Link href="/a-propos/">À propos</Link>
            </Button>
            <CtaButton href="/life-insurance/start" />
          </div>

          {/* Mobile right — Get a Quote (sm) + hamburger */}
          <div className="lg:hidden ml-auto flex items-center gap-2 shrink-0">
            <CtaButton href="/life-insurance/start" />
            <Button variant="ghost" size="icon" onClick={() => setDrawerOpen(true)} aria-label="Open menu">
              <Menu size={22} />
            </Button>
          </div>

        </div>
      </header>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
