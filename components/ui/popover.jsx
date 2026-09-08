import * as React from "react"
import { cn } from "@/lib/utils"

const PopoverContext = React.createContext(null)

function Popover({ children, open: controlledOpen, onOpenChange }) {
  const [internal, setInternal] = React.useState(false)
  const open   = controlledOpen !== undefined ? controlledOpen : internal
  const setOpen = onOpenChange ?? setInternal
  return (
    <PopoverContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-block w-full">
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

const PopoverContent = React.forwardRef(function PopoverContent(
  { children, className, align = "center", sideOffset = 4, alignOffset = 0, ...props },
  ref
) {
  const { open, setOpen } = React.useContext(PopoverContext)
  const innerRef = React.useRef(null)
  const [openAbove, setOpenAbove] = React.useState(false)
  const [shiftX, setShiftX] = React.useState(0)

  // Detect whether to flip above (collision detection) and whether to shift
  // horizontally back into the viewport. This popover isn't portaled to
  // document.body like a real Radix/shadcn one would be — it's a plain
  // absolutely-positioned DOM child — so a page-wide `overflow-x: clip`
  // ancestor (see pages/_app.js) would otherwise silently crop it instead
  // of letting it scroll into view whenever it runs past a viewport edge.
  React.useLayoutEffect(() => {
    if (!open || !innerRef.current) return
    const trigger = innerRef.current.parentElement
    if (!trigger) return
    const triggerRect = trigger.getBoundingClientRect()
    const contentH    = innerRef.current.offsetHeight
    const spaceBelow  = window.innerHeight - triggerRect.bottom
    setOpenAbove(spaceBelow < contentH + sideOffset + 8)

    const rect = innerRef.current.getBoundingClientRect()
    const margin = 8
    let shift = 0
    if (rect.right > window.innerWidth - margin) shift -= rect.right - (window.innerWidth - margin)
    if (rect.left + shift < margin) shift += margin - (rect.left + shift)
    setShiftX(shift)
  }, [open, sideOffset])

  React.useEffect(() => {
    if (!open) return
    function onMouseDown(e) {
      if (innerRef.current && !innerRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", onMouseDown)
    return () => document.removeEventListener("mousedown", onMouseDown)
  }, [open, setOpen])

  if (!open) return null

  const alignStyle =
    align === "end"   ? { right: alignOffset } :
    align === "start" ? { left: alignOffset }  :
    { left: "50%" }

  const transforms = []
  if (align === "center") transforms.push("translateX(-50%)")
  if (shiftX) transforms.push(`translateX(${shiftX}px)`)

  const positionStyle = {
    ...(openAbove ? { bottom: `calc(100% + ${sideOffset}px)` } : { top: `calc(100% + ${sideOffset}px)` }),
    ...alignStyle,
    ...(transforms.length ? { transform: transforms.join(" ") } : {}),
  }

  return (
    <div
      ref={node => {
        innerRef.current = node
        if (typeof ref === "function") ref(node)
        else if (ref) ref.current = node
      }}
      className={cn(
        "absolute z-50 rounded-xl border border-gray-200 bg-white shadow-lg outline-none",
        className
      )}
      style={positionStyle}
      {...props}
    >
      {children}
    </div>
  )
})
PopoverContent.displayName = "PopoverContent"

const PopoverAnchor = ({ children }) => children

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }
