import { cn } from "@/lib/utils"

function Field({ className, orientation = "vertical", children, ...props }) {
  return (
    <div
      className={cn(
        "flex gap-3 border border-[#d9d9d9] rounded-lg p-4 transition-colors",
        orientation === "horizontal" && "flex-row items-center",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function FieldContent({ className, children, ...props }) {
  return (
    <div className={cn("flex flex-col gap-0.5 flex-1 min-w-0", className)} {...props}>
      {children}
    </div>
  )
}

function FieldLabel({ className, children, ...props }) {
  return (
    <label className={cn("block cursor-pointer", className)} {...props}>
      {children}
    </label>
  )
}

function FieldTitle({ className, children, ...props }) {
  return (
    <span className={cn("text-base font-medium text-[rgba(0,0,0,0.88)]", className)} {...props}>
      {children}
    </span>
  )
}

function FieldDescription({ className, children, ...props }) {
  return (
    <span className={cn("text-sm text-gray-500", className)} {...props}>
      {children}
    </span>
  )
}

export { Field, FieldContent, FieldLabel, FieldTitle, FieldDescription }
