"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

// French date format: jj/mm/aaaa (e.g. "06/09/2026")
function formatDate(date) {
  if (!date) return ""
  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  return `${day}/${month}/${date.getFullYear()}`
}

// Parses a "jj/mm/aaaa" string typed by the user.
function parseFrenchDate(str) {
  const match = str?.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)
  if (!match) return undefined
  const [, d, m, y] = match
  const date = new Date(Number(y), Number(m) - 1, Number(d))
  return isNaN(date.getTime()) ? undefined : date
}

// Parses the ISO "yyyy-mm-dd" string this component receives/emits as `value`.
function parseIsoDate(str) {
  if (!str) return undefined
  const match = str.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!match) return undefined
  const [, y, m, d] = match
  const date = new Date(Number(y), Number(m) - 1, Number(d))
  return isNaN(date.getTime()) ? undefined : date
}

function toIsoDate(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, "0")
  const d = String(date.getDate()).padStart(2, "0")
  return `${y}-${m}-${d}`
}

export function DatePickerInput({
  id,
  value,
  onChange,
  placeholder = "jj/mm/aaaa",
  theme = "dark",
  error = false,
  className = "",
}) {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState(() => parseIsoDate(value))
  const [month, setMonth] = React.useState(() => parseIsoDate(value))
  const [text, setText] = React.useState(() => formatDate(parseIsoDate(value)))

  React.useEffect(() => {
    const parsed = parseIsoDate(value)
    setDate(parsed)
    setText(formatDate(parsed))
    if (parsed) setMonth(parsed)
  }, [value])

  function handleSelect(selected) {
    setDate(selected)
    setText(formatDate(selected))
    setOpen(false)
    onChange?.(selected ? toIsoDate(selected) : "")
  }

  function handleTextChange(e) {
    const next = e.target.value
    setText(next)
    const parsed = parseFrenchDate(next)
    if (parsed) {
      setDate(parsed)
      setMonth(parsed)
      onChange?.(toIsoDate(parsed))
    } else if (next === "") {
      setDate(undefined)
      onChange?.("")
    }
  }

  const isLight = theme === "light"

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <InputGroup
        className={cn(
          error
            ? "border-[var(--color-error)] has-focus-within:border-[var(--color-error)] has-focus-within:ring-[rgba(255,143,0,0.15)]"
            : isLight
              ? "border-gray-200 bg-white"
              : "border-white/30 bg-white/10",
          className
        )}
      >
        <InputGroupInput
          id={id}
          value={text}
          placeholder={placeholder}
          onChange={handleTextChange}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault()
              setOpen(true)
            }
          }}
          className={cn(isLight || error ? "text-[var(--color-text)] placeholder:text-gray-400" : "text-white placeholder:text-white/40")}
        />
        <InputGroupAddon align="inline-end">
          <PopoverTrigger asChild>
            <InputGroupButton
              id={id ? `${id}-trigger` : undefined}
              aria-label="Choisir une date"
              className={isLight || error ? "text-[var(--color-text)]" : "text-white hover:bg-white/20 hover:text-white"}
            >
              <CalendarIcon size={16} />
              <span className="sr-only">Choisir une date</span>
            </InputGroupButton>
          </PopoverTrigger>
        </InputGroupAddon>
      </InputGroup>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          selected={date}
          month={month}
          onMonthChange={setMonth}
          onSelect={handleSelect}
        />
      </PopoverContent>
    </Popover>
  )
}
