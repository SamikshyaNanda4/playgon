import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getValidDomains() {
  const domains = ["gmail.com", "yahoo.com", "outlook.com", "playgon.in"]

  if (process.env.NODE_ENV === "development") {
    domains.push("example.com")
  }
  return domains;
}

export function normalizeName(name: string) {
  return name.
    trim().
    replace(/\s+/g, " ") // sam   nanda --> sam nanda
  // .replace(/[^a-zA-Z\s'-]/g, "") // sam!@31nanda-->samnanda
  // .replace(/\b\w/g, (char) => char.toUpperCase())// sam nanda -->Sam Nanda
}

// export function deepClone<T>(obj: T): T {
//   if (obj === null || typeof obj !== "object") return obj;
// 
//   if (Array.isArray(obj)) {
//     return obj.map((item) => deepClone(item)) as unknown as T;
//   }
// 
//   const cloned: unknown = {};
//   for (const key in obj) {
//     if (Object.prototype.hasOwnProperty.call(obj, key)) {
//       cloned[key] = deepClone((obj as any)[key]);
//     }
//   }
//   return cloned;
// }
