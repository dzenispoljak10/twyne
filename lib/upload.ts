import fs from 'fs'
import path from 'path'
import os from 'os'
export { formatFileSize } from '@/lib/upload-utils'

const UPLOAD_BASE = path.join(os.tmpdir(), 'twyne-uploads')
export const MAX_FILE_SIZE = 200 * 1024 * 1024 // 200 MB

export function ensureUploadDir(token: string): string {
  const dir = path.join(UPLOAD_BASE, token)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  return dir
}

export function validateZipFile(buffer: Buffer): boolean {
  // Check ZIP magic bytes: 50 4B 03 04
  if (buffer.length < 4) return false
  return (
    buffer[0] === 0x50 &&
    buffer[1] === 0x4b &&
    buffer[2] === 0x03 &&
    buffer[3] === 0x04
  )
}

export function validateFileSize(size: number): boolean {
  return size <= MAX_FILE_SIZE
}

export function resolveFilePath(dateipfad: string): string {
  // New uploads store absolute paths; legacy uploads are relative to public/
  return path.isAbsolute(dateipfad)
    ? dateipfad
    : path.join(process.cwd(), 'public', dateipfad)
}

export function deleteFile(filePath: string): void {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
    // Clean up empty directory
    const dir = path.dirname(filePath)
    try {
      const files = fs.readdirSync(dir)
      if (files.length === 0) {
        fs.rmdirSync(dir)
      }
    } catch {
      // ignore cleanup errors
    }
  }
}
