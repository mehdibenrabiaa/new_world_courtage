import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import * as NavMenu from '@radix-ui/react-navigation-menu'
import * as Dialog from '@radix-ui/react-dialog'
import { Menu, X, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CtaButton from '@/components/CtaButton'
import { NAV_ITEMS } from './navData'

// ── Mega-menu content (renders inside Radix Viewport) ─────────────────────

function MegaMenuContent({ item }) {
  return (
    <div className="w-full bg-white">
      <div className="px-12 2xl:px-24 py-10">
        <div className="grid grid-cols-3 gap-6 max-w-3xl">
          {item.sections.map((section) => (
            <div key={section.heading}>
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#131212] mb-2.5">
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

        <div className="mt-5 pt-4 border-t border-gray-200 flex items-center justify-between gap-4">
          <p className="text-sm font-semibold text-gray-900">{item.cta.tagline}</p>
          <CtaButton href={item.cta.href} label={item.cta.button} className="shrink-0" />
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
        className="flex items-center gap-2 w-full px-5 py-4 text-base font-bold text-[#131212] border-b border-gray-200 hover:bg-gray-50"
      >
        {item.label}
      </button>

      <div className="pb-4">
        {item.sections.map((section) => (
          <div key={section.heading} className="px-5 pt-4">
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#131212] mb-2">
              {section.heading}
            </p>
            {section.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2.5 text-sm text-[#131212] border-b border-gray-100 last:border-0 hover:text-[var(--color-brand)]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        ))}

        <div className="mx-5 mt-5 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-[13.5px] font-semibold text-[#131212] mb-3">{item.cta.tagline}</p>
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
    <Dialog.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 z-50 bg-black/50 [animation:overlay-fade-in_0.2s_ease]"
        />
        <Dialog.Content
          className="fixed left-0 top-0 z-50 h-full w-[min(480px,100vw)] bg-white shadow-2xl flex flex-col overflow-hidden [animation:drawer-slide-in_0.28s_ease]"
          aria-label="Navigation menu"
        >
          <div className="flex items-center justify-between px-5 h-24 border-b border-gray-200 shrink-0">
            <Link href="/" onClick={onClose}>
              <Image src="/logo.svg" alt="Logo" width={197} height={35} priority unoptimized />
            </Link>
            <Dialog.Close asChild>
              <button aria-label="Close menu" className="flex items-center justify-center p-1.5 rounded-md hover:bg-gray-100">
                <X size={22} />
              </button>
            </Dialog.Close>
          </div>

          <div className="flex-1 overflow-y-auto">
            {activePanel ? (
              <MobilePanel item={activePanel} onBack={() => setActivePanel(null)} />
            ) : (
              <div className="py-2">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActivePanel(item)}
                    className="w-full text-left px-5 py-3.5 text-base font-semibold text-[#131212] hover:bg-gray-50"
                  >
                    {item.label}
                  </button>
                ))}

                <div className="h-px bg-gray-200 mx-5 my-2" />

                <Link href="/about/" onClick={onClose} className="block px-5 py-3 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-[#131212]">
                  À propos
                </Link>
                <a href="tel:+33800000000" className="flex items-center gap-3 px-5 py-3 text-base font-semibold text-[#131212] hover:bg-gray-50">
                  <Phone size={16} className="text-[var(--color-brand)]" />
                  0 800 000 000
                </a>
                <Link href="/life-insurance/start" onClick={onClose} className="block mx-5 mt-3 mb-2 py-3.5 text-center text-base font-bold text-white bg-[var(--color-brand)] rounded-full hover:bg-[var(--color-brand-hover)] transition-colors">
                  Obtenir un devis
                </Link>
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
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
            <Image src="/logo.svg" alt="Logo" width={197} height={35} priority unoptimized />
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
            <Button variant="link" asChild className="px-5 py-2 text-base font-semibold hover:no-underline hover:text-[#131212]">
              <Link href="/about/">À propos</Link>
            </Button>
            <CtaButton href="/life-insurance/start" />
          </div>

          {/* Mobile right — Get a Quote (sm) + hamburger */}
          <div className="lg:hidden ml-auto flex items-center gap-2 shrink-0">
            <CtaButton href="/life-insurance/start" className="text-sm" />
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
