import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function copyLink(text) {
  if (!text) {
    toast.error('Interview Link is not available at the moment!')
    return;
  }
  navigator.clipboard.writeText(text);
  toast.success(`Link copied! ${text}`);
}