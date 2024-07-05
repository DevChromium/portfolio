import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getMyAge() {
  let thisYear = new Date().getFullYear()
  
  return thisYear - 2002;
}