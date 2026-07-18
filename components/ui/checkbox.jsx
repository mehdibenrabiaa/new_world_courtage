"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef(function Checkbox(
  { className, checked, defaultChecked, onCheckedChange, disabled, id, ...props }, ref
) {
  const [internal, setInternal] = React.useState(defaultChecked ?? false)
  const controlled = checked !== undefined
  const current = controlled ? checked : internal

  function toggle() {
    if (disabled) return
    if (!controlled) setInternal(!current)
    onCheckedChange?.(!current)
  }

  return (
    <button
      ref={ref}
      type="button"
      id={id}
      role="checkbox"
      data-slot="checkbox"
      data-state={current ? "checked" : "unchecked"}
      aria-checked={current}
      disabled={disabled}
      onClick={toggle}
      className={cn(
        "peer border-input data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center",
        className
      )}
      {...props}
    >
      {current && (
        <span className="flex items-center justify-center text-current">
          <Check className="size-3.5" strokeWidth={3} />
        </span>
      )}
    </button>
  )
})
Checkbox.displayName = "Checkbox"

export { Checkbox }
