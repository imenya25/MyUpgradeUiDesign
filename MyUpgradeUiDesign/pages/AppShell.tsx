import { useState } from 'react'
import { Outlet, Navigate, NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { LogOut, User, Menu, X, LayoutGrid, Users2, BookOpen, CalendarDays, ClipboardList, BarChart3, FileQuestion, GraduationCap } from 'lucide-react'
import Logo from '@/components/ui/logo'

export default function AppShell() {
  const { user, signOut, isAuthenticated, isLoading } = useAuth()
  const [isNavOpen, setIsNavOpen] = useState(false)
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.12),_transparent_38%),linear-gradient(135deg,_#eff6ff_0%,_#faf5ff_100%)] text-muted-foreground">
        <div className="rounded-2xl border border-slate-200 bg-white/90 px-6 py-5 shadow-sm">
          Checking authentication…
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  const handleSignOut = async () => {
    await signOut()
  }

  const navItems = [
    { title: 'Dashboard', to: '/dashboard', icon: LayoutGrid, roles: ['admin', 'teacher', 'student'] },
    { title: 'User Management', to: '/users', icon: Users2, roles: ['admin'] },
    { title: 'Course Management', to: '/courses', icon: BookOpen, roles: ['admin', 'teacher'] },
    { title: 'Batch Scheduling', to: '/batches', icon: CalendarDays, roles: ['admin', 'teacher'] },
    { title: 'Attendance', to: '/attendance', icon: ClipboardList, roles: ['admin', 'teacher'] },
    { title: 'Reports', to: '/reports', icon: BarChart3, roles: ['admin'] },
    { title: 'Question Bank', to: '/questions', icon: FileQuestion, roles: ['admin', 'teacher'] },
  ]

  const visibleNav = navItems.filter((item) => item.roles.includes(user?.role || 'student'))
  const currentTitle = visibleNav.find((item) => item.to === location.pathname)?.title || 'Workspace'

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.14),_transparent_35%),linear-gradient(135deg,_#f8fbff_0%,_#f5f3ff_100%)] text-slate-800">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-3 py-3 sm:px-4 lg:px-6 lg:py-6">
        <header className="rounded-[26px] border border-slate-200/80 bg-white/80 px-3 py-3 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.35)] backdrop-blur-xl sm:px-4 lg:px-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-700 lg:hidden"
                onClick={() => setIsNavOpen(true)}
                aria-label="Open navigation"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 p-2 text-white shadow-lg shadow-slate-900/15">
                  <Logo className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-base font-semibold text-slate-900">CryoBytePrime</p>
                  <p className="text-sm text-slate-500">CBT & Attendance</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 sm:flex">
                <User className="h-4 w-4" />
                <span className="max-w-[140px] truncate">{user?.full_name || user?.email}</span>
                <span className="rounded-full bg-sky-100 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-700">
                  {user?.role}
                </span>
              </div>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </header>

        <div className="mt-4 flex-1 lg:grid lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-4">
          <aside className="hidden lg:block">
            <div className="h-full rounded-[28px] border border-slate-200/80 bg-white/85 p-4 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.35)] backdrop-blur-xl">
              <div className="mb-4 rounded-2xl border border-sky-100 bg-sky-50/80 p-4">
                <p className="text-sm font-semibold text-slate-900">{currentTitle}</p>
                <p className="mt-1 text-sm text-slate-600">A calm, focused workspace for daily operations.</p>
              </div>
              <nav className="space-y-1">
                {visibleNav.map((item) => {
                  const Icon = item.icon
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition-all ${
                          isActive ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/10' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                        }`
                      }
                    >
                      <Icon className="h-4 w-4" />
                      {item.title}
                    </NavLink>
                  )
                })}
              </nav>
              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                <div className="flex items-center gap-2 text-slate-900">
                  <GraduationCap className="h-4 w-4" />
                  <span className="font-semibold">Secure portal</span>
                </div>
                <p className="mt-2">Every action below follows the existing role-based workflow and database access rules.</p>
              </div>
            </div>
          </aside>

          {isNavOpen && (
            <div className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden" onClick={() => setIsNavOpen(false)} />
          )}

          <div className={`fixed left-0 top-0 z-50 h-full w-[85%] max-w-[280px] bg-white p-4 shadow-2xl transition-transform duration-200 lg:hidden ${isNavOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 p-2 text-white">
                  <Logo className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">CryoBytePrime</p>
                  <p className="text-xs text-slate-500">CBT & Attendance</p>
                </div>
              </div>
              <button type="button" className="rounded-xl border border-slate-200 p-2" onClick={() => setIsNavOpen(false)} aria-label="Close navigation">
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="space-y-1">
              {visibleNav.map((item) => {
                const Icon = item.icon
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsNavOpen(false)}
                    className={({ isActive }) => `flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium ${isActive ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.title}
                  </NavLink>
                )
              })}
            </nav>
          </div>

          <main className="min-w-0 rounded-[28px] border border-slate-200/80 bg-white/85 p-4 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.35)] backdrop-blur-xl sm:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
