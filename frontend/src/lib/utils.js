import { InterviewStatus } from "@/utils/StatusButton";
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

export const isInterviewEnded = (status) => {
  if (status === InterviewStatus.ENDED || status === InterviewStatus.REJECTED || status === InterviewStatus.HOLD || status === InterviewStatus.ACCEPTED) {
    // console.log("Interview is ended or rejected or on hold or accepted");
    return true;
  }
  // console.log("Interview is not ended yet");
  return false;
}

export function getRoundedFutureTime() {
  const now = new Date();
  const minutes = now.getMinutes();
  const futureTime = new Date(now.getTime());
  if (minutes < 30) {
    futureTime.setMinutes(0)
    futureTime.setHours(futureTime.getHours() + 1);;
  } else {
    futureTime.setHours(futureTime.getHours() + 1);
    futureTime.setMinutes(30);
  }

  // Ensure the seconds and milliseconds are set to 0 for consistency
  futureTime.setSeconds(0);
  futureTime.setMilliseconds(0);

  const hour = futureTime.getHours().toString().padStart(2, "0");
  const minute = futureTime.getMinutes().toString().padStart(2, "0");

  return `${hour}:${minute}`;
};