import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function generateUniqueId(length: number = 21): string {
  // Generate random bytes
  const randomBytes = crypto.getRandomValues(new Uint8Array(length));
  // Convert bytes to Base64 URL-friendly string
  return Array.from(randomBytes)
    .map((byte) => byte.toString(36))
    .join('')
    .replace(/[^a-z0-9]/gi, '')
    .slice(0, length);
}



