import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/context/AuthContext'
import Logo from '@/components/ui/logo'
import { ShieldCheck, Sparkles, LockKeyhole, BookOpenCheck } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const { error } = await signIn(email, password)
      if (error) {
        setError(error.message)
      } else {
        navigate('/dashboard')
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.16),_transparent_32%),linear-gradient(135deg,_#f8fbff_0%,_#f5f3ff_100%)] text-slate-800">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-[32px] border border-slate-200/80 bg-white/90 shadow-[0_30px_70px_-35px_rgba(15,23,42,0.55)] backdrop-blur-xl lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative flex flex-col justify-between bg-slate-950 px-6 py-8 text-slate-100 sm:px-8 lg:px-10 lg:py-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.2),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(129,140,248,0.24),_transparent_28%)]" />
            <div className="relative space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm text-slate-200">
                <ShieldCheck className="h-4 w-4 text-cyan-300" />
                Secure portal access
              </div>
              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/80">CryoBytePrime</p>
                <h1 className="text-3xl font-semibold sm:text-4xl">Run assessments, attendance, and academic operations from one calm workspace.</h1>
                <p className="max-w-lg text-base text-slate-300">A modern, role-aware experience for teachers, admins, and learners.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-400/20 text-cyan-200">
                    <BookOpenCheck className="h-5 w-5" />
                  </div>
                  <p className="font-semibold">Question banks</p>
                  <p className="mt-1 text-sm text-slate-300">Organize and manage assessments without leaving the portal.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-400/20 text-violet-200">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <p className="font-semibold">Attendance-ready</p>
                  <p className="mt-1 text-sm text-slate-300">Create sessions and keep the day moving with clear status updates.</p>
                </div>
              </div>
            </div>
            <div className="relative mt-8 flex items-center gap-2 text-sm text-slate-400">
              <LockKeyhole className="h-4 w-4" />
              <span>Encrypted sign-in and role-based access.</span>
            </div>
          </div>

          <div className="px-6 py-8 sm:px-8 lg:px-10">
            <div className="mx-auto max-w-md">
              <div className="mb-8 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[22px] border border-slate-200 bg-slate-50 shadow-lg shadow-slate-900/5">
                  <Logo className="h-12 w-12" />
                </div>
                <p className="mt-4 text-sm uppercase tracking-[0.28em] text-sky-700">Welcome back</p>
                <h2 className="mt-2 text-3xl font-semibold text-slate-900">Sign in to continue</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="name@school.edu" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isLoading} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={isLoading} />
                </div>

                {error && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <Button type="submit" className="w-full py-3" disabled={isLoading}>
                  {isLoading ? 'Signing in…' : 'Sign In'}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-slate-500">
                <p>Need access? Contact your administrator for credentials.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
