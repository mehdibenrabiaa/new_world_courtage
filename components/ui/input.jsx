import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef(function Input({ className, type, ...props }, ref) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-lg border border-[#d9d9d9] bg-white px-3 text-sm text-[var(--color-text)] placeholder:text-gray-400 outline-none hover:border-[var(--color-brand)] focus:border-[var(--color-brand)] focus:shadow-[0_0_0_2px_rgba(19,110,183,0.15)] transition-all",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"
export { Input }
