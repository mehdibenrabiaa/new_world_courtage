import * as React from "react"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"

function formatDate(date) {
  if (!date) return ""
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

function parseDate(str) {
  if (!str) return undefined
  const d = new Date(str)
  return isNaN(d.getTime()) ? undefined : d
}

export function DatePickerInput({ value, onChange, placeholder = "Sélectionnez une date", theme = "dark" }) {
  const containerRef = React.useRef(null)
  const [open, setOpen]           = React.useState(false)
  const [date, setDate]           = React.useState(() => parseDate(value))
  const [month, setMonth]         = React.useState(() => parseDate(value) || new Date())
  const [inputValue, setInputValue] = React.useState(() => formatDate(parseDate(value)))

  // Close on outside click
  React.useEffect(() => {
    if (!open) return
    function onMouseDown(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", onMouseDown)
    return () => document.removeEventListener("mousedown", onMouseDown)
  }, [open])

  function handleSelect(selected) {
    setDate(selected)
    setInputValue(formatDate(selected))
    setOpen(false)
    onChange?.(selected ? selected.toISOString().split("T")[0] : "")
  }

  function handleInputChange(e) {
    const raw = e.target.value
    setInputValue(raw)
    const parsed = new Date(raw)
    if (!isNaN(parsed.getTime())) {
      setDate(parsed)
      setMonth(parsed)
      onChange?.(parsed.toISOString().split("T")[0])
    }
  }

  return (
    <div ref={containerRef} className="relative">

      {/* Text input + icon */}
      <div className="relative flex items-center">
        <input
          type="text"
          value={inputValue}
          placeholder={placeholder}
          onChange={handleInputChange}
          onKeyDown={e => { if (e.key === "ArrowDown") { e.preventDefault(); setOpen(true) } }}
          className={theme === "light"
          ? "flex h-11 w-full rounded-[var(--radius)] border border-gray-200 bg-white px-4 pr-10 text-base text-[#131212] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent transition-shadow"
          : "flex h-11 w-full rounded-[var(--radius)] border border-white/30 bg-white/10 px-4 pr-10 text-base text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-shadow"
        }
        />
        <button
          type="button"
          onClick={() => setOpen(v => !v)}
          aria-label="Ouvrir le calendrier"
          className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${theme === "light" ? "text-gray-400 hover:text-[var(--color-brand)]" : "text-white/60 hover:text-white"}`}
        >
          <CalendarIcon size={16} />
        </button>
      </div>

      {/* Calendar dropdown */}
      {open && (
        <div className="absolute z-50 mt-2 right-0 rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden">
          <Calendar
            selected={date}
            month={month}
            onMonthChange={setMonth}
            onSelect={handleSelect}
          />
        </div>
      )}

    </div>
  )
}
