import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const InputGroup = React.forwardRef(function InputGroup({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      role="group"
      data-slot="input-group"
      className={cn(
        "group/input-group border-input relative flex w-full items-center rounded-md border shadow-xs transition-[color,box-shadow] outline-none",
        "h-9 has-[>textarea]:h-auto",
        "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
        "has-[[data-slot=input-group-control][aria-invalid=true]]:ring-destructive/20 has-[[data-slot=input-group-control][aria-invalid=true]]:border-destructive",
        "[&>input]:flex-1",
        className
      )}
      {...props}
    />
  )
})
InputGroup.displayName = "InputGroup"

const inputGroupAddonVariants = cva(
  "text-muted-foreground flex h-auto items-center justify-center gap-2 py-1.5 text-sm font-medium select-none [&>svg:not([class*='size-'])]:size-4",
  {
    variants: {
      align: {
        "inline-start": "order-first pl-3 has-[>button]:ml-[-0.45rem]",
        "inline-end": "order-last ml-auto pr-3 has-[>button]:mr-[-0.45rem]",
      },
    },
    defaultVariants: { align: "inline-start" },
  }
)

const InputGroupAddon = React.forwardRef(function InputGroupAddon(
  { className, align = "inline-start", ...props },
  ref
) {
  return (
    <div
      ref={ref}
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      {...props}
    />
  )
})
InputGroupAddon.displayName = "InputGroupAddon"

const InputGroupButton = React.forwardRef(function InputGroupButton(
  { className, type = "button", variant = "ghost", size = "icon-xs", ...props },
  ref
) {
  return (
    <Button
      ref={ref}
      type={type}
      variant={variant}
      size={size}
      className={cn("shrink-0", className)}
      {...props}
    />
  )
})
InputGroupButton.displayName = "InputGroupButton"

const InputGroupInput = React.forwardRef(function InputGroupInput({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      data-slot="input-group-control"
      className={cn(
        "flex-1 rounded-none border-0 bg-transparent px-3 py-1 text-base shadow-none outline-none placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  )
})
InputGroupInput.displayName = "InputGroupInput"

export { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput }
