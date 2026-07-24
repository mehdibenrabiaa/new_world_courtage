"use client"

import { createContext, useContext, useState } from "react"
import { cn } from "@/lib/utils"

const AvatarStatusContext = createContext(null)

function Avatar({ className, ...props }) {
  const [status, setStatus] = useState("loading") // loading | loaded | error
  return (
    <AvatarStatusContext.Provider value={{ status, setStatus }}>
      <span className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)} {...props} />
    </AvatarStatusContext.Provider>
  )
}

function AvatarImage({ className, onLoad, onError, src, ...props }) {
  const ctx = useContext(AvatarStatusContext)
  if (!src || ctx?.status === "error") return null
  return (
    <img
      className={cn("aspect-square h-full w-full object-cover", className)}
      src={src}
      onLoad={(e) => { ctx?.setStatus("loaded"); onLoad?.(e) }}
      onError={(e) => { ctx?.setStatus("error"); onError?.(e) }}
      {...props}
    />
  )
}

function AvatarFallback({ className, ...props }) {
  const ctx = useContext(AvatarStatusContext)
  if (ctx?.status === "loaded") return null
  return (
    <span
      className={cn("flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-gray-500 text-sm font-medium", className)}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }
