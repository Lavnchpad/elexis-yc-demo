import { clsx } from "clsx";
import { toast } from "sonner";
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

export const languages = {
  english: "English",
  hindi: "Hindi"
}

export const interviewLanguages = [
  { key: "english", value: "English" },
  { key: "hindi", value: "Hindi" },
  // { key: "French", value: "French" },
  // { key: "Spanish", value: "Spanish" },
  // { key: "German", value: "German" },
  // { key: "Italian", value: "Italian" },
  // { key: "Chinese", value: "Chinese" }
]