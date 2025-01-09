import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateYearsSince(
  startYear: number,
  startMonth: number
): number {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  let years = currentYear - startYear;

  if (currentMonth < startMonth) {
    years -= 1;
  }

  return years;
}
