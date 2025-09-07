import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Classic utility for merging Tailwind classes
// This is pretty much a standard in every React/Tailwind project I work on
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
