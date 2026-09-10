import { cn } from "@/lib/utils"

function AttachmentGroup({ className, ...props }) {
  return <div className={cn("flex flex-col gap-2", className)} {...props} />
}

function Attachment({ className, orientation = "horizontal", state, ...props }) {
  return (
    <div
      data-slot="attachment"
      data-state={state}
      className={cn(
        "flex items-center gap-3 rounded-md border border-gray-200 bg-white p-3",
        orientation === "vertical" && "flex-col items-start",
        state === "uploading" && "opacity-70",
        className
      )}
      {...props}
    />
  )
}

function AttachmentMedia({ className, variant, ...props }) {
  return (
    <div
      data-slot="attachment-media"
      data-variant={variant}
      className={cn(
        "flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md bg-[var(--color-brand)]/10 text-[var(--color-brand)] [&_img]:size-full [&_img]:object-cover",
        className
      )}
      {...props}
    />
  )
}

function AttachmentContent({ className, ...props }) {
  return <div data-slot="attachment-content" className={cn("min-w-0 flex-1", className)} {...props} />
}

function AttachmentTitle({ className, ...props }) {
  return <p data-slot="attachment-title" className={cn("truncate text-sm font-medium text-[var(--color-text)]", className)} {...props} />
}

function AttachmentDescription({ className, ...props }) {
  return <p data-slot="attachment-description" className={cn("mt-0.5 text-xs text-gray-400", className)} {...props} />
}

function AttachmentActions({ className, ...props }) {
  return <div data-slot="attachment-actions" className={cn("ml-auto flex shrink-0 items-center", className)} {...props} />
}

function AttachmentAction({ className, type = "button", ...props }) {
  return (
    <button
      type={type}
      className={cn("flex size-8 items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-[var(--color-text)] disabled:pointer-events-none disabled:opacity-50", className)}
      {...props}
    />
  )
}

export {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
}
