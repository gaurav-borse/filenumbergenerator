"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SliderProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number[]
  onValueChange: (value: number[]) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ className, value, onValueChange, min = 0, max = 100, step = 1, disabled = false, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onValueChange([Number(e.target.value)])
    }

    return (
      <div ref={ref} className={cn("relative flex w-full touch-none select-none items-center", className)} {...props}>
        <div className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
          <div
            className="absolute h-full bg-primary"
            style={{
              width: `${((value[0] - min) / (max - min)) * 100}%`,
            }}
          />
        </div>
        <input
          type="range"
          value={value[0]}
          min={min}
          max={max}
          step={step}
          onChange={handleChange}
          disabled={disabled}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
        <div
          className="absolute block h-5 w-5 rounded-full border-2 border-primary bg-background"
          style={{
            left: `calc(${((value[0] - min) / (max - min)) * 100}% - 10px)`,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
      </div>
    )
  },
)
Slider.displayName = "Slider"

export { Slider }
