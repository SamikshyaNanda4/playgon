import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base styling with thick border and better visibility
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30",
        // Gentle visible border - Always present
        "border-2 border-lime-200/40 rounded-md bg-transparent px-3 py-2 h-9",
        "flex w-full min-w-0 text-base shadow-sm transition-all duration-200 outline-none",
        // File input styling
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        // Hover effects - subtle
        "hover:border-lime-200/60 hover:shadow-md",
        // Focus effects - clean and visible
        "focus-visible:border-lime-300/70 focus-visible:ring-2 focus-visible:ring-lime-200/30",
        // Error states
        "aria-invalid:border-red-500/80 aria-invalid:ring-2 aria-invalid:ring-red-500/30",
        // Disabled state
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:border-lime-400/30",
        // Responsive text sizing
        "md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Input }