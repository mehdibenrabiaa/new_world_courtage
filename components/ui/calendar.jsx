import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const MONTHS_FR = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"]
const DAYS_FR = ["Lu","Ma","Me","Je","Ve","Sa","Di"]

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOffset(year, month) {
  const day = new Date(year, month, 1).getDay()
  return day === 0 ? 6 : day - 1 // Monday-first
}

export function Calendar({ selected, onSelect, month: controlledMonth, onMonthChange, className }) {
  const [internalMonth, setInternalMonth] = React.useState(selected || new Date())
  const display = controlledMonth || internalMonth

  const year  = display.getFullYear()
  const month = display.getMonth()
  const today = new Date()

  function navigate(dir) {
    const d = new Date(year, month + dir, 1)
    onMonthChange ? onMonthChange(d) : setInternalMonth(d)
  }

  const cells = []
  for (let i = 0; i < getFirstDayOffset(year, month); i++) cells.push(null)
  for (let d = 1; d <= getDaysInMonth(year, month); d++) cells.push(d)

  function isSelected(day) {
    if (!selected) return false
    return selected.getFullYear() === year && selected.getMonth() === month && selected.getDate() === day
  }

  function isToday(day) {
    return today.getFullYear() === year && today.getMonth() === month && today.getDate() === day
  }

  return (
    <div className={cn("p-3 select-none w-[280px]", className)}>

      {/* Month nav */}
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="h-7 w-7 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft size={14} />
        </button>
        <span className="text-sm font-semibold text-gray-900">{MONTHS_FR[month]} {year}</span>
        <button
          type="button"
          onClick={() => navigate(1)}
          className="h-7 w-7 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors"
        >
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS_FR.map(d => (
          <div key={d} className="h-8 flex items-center justify-center text-[11px] font-medium text-gray-400">{d}</div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((day, i) => (
          <div key={i} className="flex items-center justify-center">
            {day ? (
              <button
                type="button"
                onClick={() => onSelect?.(new Date(year, month, day))}
                className={cn(
                  "h-8 w-8 rounded-md text-sm transition-colors",
                  isSelected(day) && "bg-[var(--color-brand)] text-white font-semibold",
                  isToday(day) && !isSelected(day) && "bg-gray-100 font-semibold text-gray-900",
                  !isSelected(day) && !isToday(day) && "text-gray-700 hover:bg-gray-100"
                )}
              >
                {day}
              </button>
            ) : null}
          </div>
        ))}
      </div>

    </div>
  )
}
