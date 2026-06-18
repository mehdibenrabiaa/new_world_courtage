"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

function formatDate(date) {
  if (!date) return ""
  return date.toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" })
}

function parseDate(str) {
  if (!str) return undefined
  const d = new Date(str)
  return isNaN(d.getTime()) ? undefined : d
}

export function DatePickerInput({ value, onChange, placeholder = "Sélectionnez une date", theme = "dark" }) {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState(() => parseDate(value))

  function handleSelect(selected) {
    setDate(selected)
    setOpen(false)
    onChange?.(selected ? selected.toISOString().split("T")[0] : "")
  }

  const isLight = theme === "light"

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`w-full justify-start font-normal text-base h-11 ${
            isLight
              ? "border-gray-200 text-[#131212] hover:bg-gray-50"
              : "border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
          } ${!date ? (isLight ? "text-gray-400" : "text-white/40") : ""}`}
        >
          <CalendarIcon size={16} className="mr-2 opacity-50 shrink-0" />
          {date ? formatDate(date) : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          defaultMonth={date}
          captionLayout="dropdown"
          onSelect={handleSelect}
        />
      </PopoverContent>
    </Popover>
  )
}
