import * as React from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"

const PopoverContext = React.createContext(null)

function Popover({ children, open: controlledOpen, onOpenChange }) {
  const [internal, setInternal] = React.useState(false)
  const open   = controlledOpen !== undefined ? controlledOpen : internal
  const setOpen = onOpenChange ?? setInternal
  // The trigger's wrapper — PopoverContent measures this to position itself
  // once portaled out of the normal DOM tree (see below).
  const anchorRef = React.useRef(null)
  return (
    <PopoverContext.Provider value={{ open, setOpen, anchorRef }}>
      <div ref={anchorRef} className="relative inline-block w-full">
        {children}
      </div>
    </PopoverContext.Provider>
  )
}

const PopoverTrigger = React.forwardRef(function PopoverTrigger(
  { children, asChild, ...props },
  ref
) {
  const { open, setOpen } = React.useContext(PopoverContext)
  const toggle = () => setOpen(!open)

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...props,
      ref,
      onClick(e) {
        children.props.onClick?.(e)
        toggle()
      },
    })
  }
  return (
    <button ref={ref} type="button" onClick={toggle} {...props}>
      {children}
    </button>
  )
})
PopoverTrigger.displayName = "PopoverTrigger"

// Rendered into document.body (not as a DOM descendant of the trigger) so no
// ancestor's overflow-hidden/overflow-x-clip (rounded hero cards, the app
// root's overflow-x: clip, a Card, etc.) can crop it — the same reason real
// Radix/shadcn popovers portal. Position is computed from the anchor's
// getBoundingClientRect() and kept in sync on open/scroll/resize.
const PopoverContent = React.forwardRef(function PopoverContent(
  { children, className, align = "center", sideOffset = 4, alignOffset = 0, ...props },
  ref
) {
  const { open, setOpen, anchorRef } = React.useContext(PopoverContext)
  const innerRef = React.useRef(null)
  const [pos, setPos] = React.useState(null) // { top, left } in viewport coords
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  const recalc = React.useCallback(() => {
    if (!anchorRef.current || !innerRef.current) return
    const anchorRect = anchorRef.current.getBoundingClientRect()
    const contentW = innerRef.current.offsetWidth
    const contentH = innerRef.current.offsetHeight
    const margin = 8

    let left =
      align === "end"   ? anchorRect.right - contentW - alignOffset :
      align === "start" ? anchorRect.left + alignOffset :
      anchorRect.left + anchorRect.width / 2 - contentW / 2
    if (left + contentW > window.innerWidth - margin) left = window.innerWidth - margin - contentW
    if (left < margin) left = margin

    const spaceBelow = window.innerHeight - anchorRect.bottom
    const openAbove = spaceBelow < contentH + sideOffset + margin
    const top = openAbove ? anchorRect.top - contentH - sideOffset : anchorRect.bottom + sideOffset

    setPos({ top, left })
  }, [align, alignOffset, sideOffset, anchorRef])

  React.useLayoutEffect(() => {
    if (!open) { setPos(null); return }
    recalc()
  }, [open, recalc])

  React.useEffect(() => {
    if (!open) return
    function onReposition() { recalc() }
    window.addEventListener("scroll", onReposition, true)
    window.addEventListener("resize", onReposition)
    return () => {
      window.removeEventListener("scroll", onReposition, true)
      window.removeEventListener("resize", onReposition)
    }
  }, [open, recalc])

  React.useEffect(() => {
    if (!open) return
    function onMouseDown(e) {
      const inContent = innerRef.current && innerRef.current.contains(e.target)
      const inAnchor  = anchorRef.current && anchorRef.current.contains(e.target)
      if (!inContent && !inAnchor) setOpen(false)
    }
    document.addEventListener("mousedown", onMouseDown)
    return () => document.removeEventListener("mousedown", onMouseDown)
  }, [open, setOpen, anchorRef])

  if (!open || !mounted) return null

  return createPortal(
    <div
      ref={node => {
        innerRef.current = node
        if (typeof ref === "function") ref(node)
        else if (ref) ref.current = node
      }}
      className={cn(
        "fixed z-50 rounded-xl border border-gray-200 bg-white shadow-lg outline-none",
        className
      )}
      style={{
        top: pos ? pos.top : -9999,
        left: pos ? pos.left : -9999,
        visibility: pos ? "visible" : "hidden",
      }}
      {...props}
    >
      {children}
    </div>,
    document.body
  )
})
PopoverContent.displayName = "PopoverContent"

const PopoverAnchor = ({ children }) => children

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }
