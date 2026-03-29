// Client-safe upload utilities (no Node.js builtins)

export const MAX_FILE_SIZE_MB = 200
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function validateFileSizeClient(size: number): boolean {
  return size <= MAX_FILE_SIZE_BYTES
}
