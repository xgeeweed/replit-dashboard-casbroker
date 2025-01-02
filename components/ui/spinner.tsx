import * as React from "react"
import { cn } from "@/lib/utils"

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className="h-full w-full", size = 32, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center justify-center", className)}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-spin"
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
    </div>
  )
)

Spinner.displayName = "Spinner"

export { Spinner }