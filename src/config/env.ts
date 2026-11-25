const apiUrl = import.meta.env.VITE_API_URL?.trim()

if (!apiUrl) {
  throw new Error(
    'VITE_API_URL is missing. Please configure your environment variables.',
  )
}

export const env = {
  apiUrl: apiUrl.replace(/\/+$/, ''),
} as const