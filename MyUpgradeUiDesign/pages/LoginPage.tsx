import { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import Logo from '@/components/ui/logo';
import { ShieldCheck, Sparkles, LockKeyhole, BookOpenCheck } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { signIn } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const { error } = await signIn(email, password)
      if (error) {
        setError(error.message)
        addToast(error.message, 'error')
      } else {
        addToast('Successfully signed in!', 'success')
        navigate('/dashboard')
      }
    } catch (err) {
      const errorMsg = 'An unexpected error occurred'
      setError(errorMsg)
      addToast(errorMsg, 'error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.12),_transparent_35%),linear-gradient(135deg,_#f8fbff_0%,_#fafaff_100%)] text-slate-800">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-[32px] border border-slate-200/80 bg-white/95 shadow-[0_30px_70px_-35px_rgba(15,23,42,0.55)] backdrop-blur-xl lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left Panel - Brand Side */}
          <div className="relative flex flex-col justify-between bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-6 py-8 text-slate-100 sm:px-8 lg:px-10 lg:py-10">
            {/* CryoGlass Gradient Orbs */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(129,140,248,0.22),_transparent_30%)]" />
            
            <div className="relative space-y-6">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-sm text-slate-200 backdrop-blur-sm shadow-lg">
                <ShieldCheck className="h-4 w-4 text-cyan-300" />
                Secure portal access
              </div>
              
              {/* Brand Header */}
              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.32em] text-cyan-300/90 font-semibold">CryoBytePrime</p>
                <h1 className="text-3xl font-semibold sm:text-4xl leading-tight">Run assessments, attendance, and academic operations from one calm workspace.</h1>
                <p className="max-w-lg text-base text-slate-300 leading-relaxed">A modern, role-aware experience for teachers, admins, and learners.</p>
              </div>
              
              {/* Feature Cards */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="group rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm transition-all duration-200 hover:bg-white/15 hover:shadow-lg hover:-translate-y-0.5">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-400/20 text-cyan-200 group-hover:scale-110 transition-transform">
                    <BookOpenCheck className="h-5 w-5" />
                  </div>
                  <p className="font-semibold text-slate-100">Question banks</p>
                  <p className="mt-1 text-sm text-slate-300 leading-relaxed">Organize and manage assessments without leaving the portal.</p>
                </div>
                <div className="group rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm transition-all duration-200 hover:bg-white/15 hover:shadow-lg hover:-translate-y-0.5">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-400/20 text-violet-200 group-hover:scale-110 transition-transform">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <p className="font-semibold text-slate-100">Attendance-ready</p>
                  <p className="mt-1 text-sm text-slate-300 leading-relaxed">Create sessions and keep the day moving with clear status updates.</p>
                </div>
              </div>
            </div>
            
            {/* Security Footer */}
            <div className="relative mt-8 flex items-center gap-2 text-sm text-slate-400">
              <LockKeyhole className="h-4 w-4 text-cyan-400/80" />
              <span>Encrypted sign-in and role-based access.</span>
            </div>
          </div>

          {/* Right Panel - Form Side */}
          <div className="px-6 py-8 sm:px-8 lg:px-10 bg-gradient-to-br from-white via-slate-50/50 to-slate-100/30">
            <div className="mx-auto max-w-md">
              {/* Logo and Welcome */}
              <div className="mb-8 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[22px] border border-slate-200 bg-gradient-to-br from-slate-50 to-white shadow-lg shadow-slate-900/5">
                  <Logo className="h-12 w-12 text-primary" />
                </div>
                <p className="mt-4 text-sm uppercase tracking-[0.28em] text-sky-700 font-semibold">Welcome back</p>
                <h2 className="mt-2 text-3xl font-semibold text-slate-900 tracking-tight">Sign in to continue</h2>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-700 font-medium">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@school.edu" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    disabled={isLoading}
                    className="bg-white/80 backdrop-blur-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-slate-700 font-medium">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    disabled={isLoading}
                    className="bg-white/80 backdrop-blur-sm"
                  />
                </div>

                {/* Error Banner */}
                {error && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 p-3.5 text-sm text-red-700 shadow-sm flex items-start gap-2">
                    <svg className="h-4 w-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full py-3 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-200" 
                  disabled={isLoading}
                  variant="cryo"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Signing in…
                    </span>
                  ) : 'Sign In'}
                </Button>
              </form>

              {/* Helper Text */}
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
