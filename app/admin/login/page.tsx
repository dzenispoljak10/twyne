'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import LogoLight from '@/components/logo/LogoLight'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })
    if (result?.error) {
      setError('Ungültige E-Mail oder Passwort.')
      setLoading(false)
    } else {
      router.push('/admin')
    }
  }

  return (
    <div className="min-h-screen bg-[#F4F4F6] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <LogoLight />
        </div>
        <div className="bg-white rounded-xl border border-[#E8E8ED] shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-8">
          <h1 className="text-xl font-bold text-[#111111] mb-1" style={{ letterSpacing: '-0.5px' }}>
            Admin-Login
          </h1>
          <p className="text-sm text-[#6B7280] mb-6">Melden Sie sich mit Ihren Zugangsdaten an.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              id="email"
              type="email"
              label="E-Mail"
              placeholder="admin@twyne.ch"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              id="password"
              type="password"
              label="Passwort"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                {error}
              </div>
            )}
            <Button type="submit" className="w-full" size="lg" loading={loading}>
              Anmelden
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
