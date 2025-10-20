import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function cleanText(text: string) {
  const dashedText = text.replace(/ /g, '-')
  const lowercaseText = dashedText.toLowerCase()
  const cleanedText = lowercaseText.replace(/[^\x00-\x7F]/g, '')

  return cleanedText
}
