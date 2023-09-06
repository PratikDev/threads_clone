import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isImageValid(file: File) {
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpg", "image/jpeg"];

  const response = {
    success: false,
    message: "",
  };

  if (!(file instanceof File)) {
    response.message = "Please Upload a valid Image";
    return response;
  }

  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    response.message = "Image must be a PNG, JPG or JPEG";
    return response;
  }

  if (file.size > MAX_FILE_SIZE) {
    response.message = "Max file size is 5MB";
    return response;
  }

  response.success = true;
  return response;
}

export function isBase64Image(url: string) {
  // Check if the input starts with a valid base64 data URL header for an image
  return /^data:image\/(png|jpg|jpeg);base64,/.test(url);
}

export function formatDateString(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString(undefined, options);

  const time = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${time} - ${formattedDate}`;
}

export function formatThreadCount(count: number): string {
  if (count === 0) {
    return "No Threads";
  } else {
    const threadCount = count.toString().padStart(2, "0");
    const threadWord = count === 1 ? "Thread" : "Threads";
    return `${threadCount} ${threadWord}`;
  }
}
