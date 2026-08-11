import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { BookOpen, CalendarDays, ClipboardList, FileQuestion, LayoutGrid, Users2, BarChart3 } from 'lucide-react';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) {
    navigate('/login');
    return null;
  }

  const menuItems = [
    { title: 'User Management', desc: 'Manage students, teachers, and staff', path: '/users', roles: ['admin'], icon: Users2 },
    { title: 'Course Management', desc: 'Configure courses and subjects', path: '/courses', roles: ['admin', 'teacher'], icon: BookOpen },
    { title: 'Batch Scheduling', desc: 'Manage academic batches', path: '/batches', roles: ['admin', 'teacher'], icon: CalendarDays },
    { title: 'Attendance Management', desc: 'Create and manage attendance sessions', path: '/attendance', roles: ['admin', 'teacher'], icon: ClipboardList },
    { title: 'Reports & Analytics', desc: 'View system-wide reports', path: '/reports', roles: ['admin'], icon: BarChart3 },
    { title: 'Question Bank', desc: 'Create and manage question bank', path: '/questions', roles: ['admin', 'teacher'], icon: FileQuestion },
  ];

  const visibleItems = menuItems.filter((item) => item.roles.includes(user.role));
  const showQuickActions = visibleItems.length > 0;
  const dashboardTitle = user.role === 'teacher'
    ? 'Teacher Dashboard'
    : user.role === 'student'
      ? 'Student Dashboard'
      : 'Admin Dashboard';

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
      {/* Hero Banner with CryoBytePrime Design */}
      <div className="rounded-[28px] border border-slate-200/80 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-4 sm:p-6 lg:p-8 text-white shadow-[0_25px_60px_-30px_rgba(15,23,42,0.55)] relative overflow-hidden">
        {/* Gradient Orb Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.15),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(129,140,248,0.2),_transparent_30%)]" />
        <div className="relative flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs sm:text-sm text-slate-100 backdrop-blur-sm">
              <LayoutGrid className="h-3 w-3 sm:h-4 sm:w-4 text-cyan-300" />
              {dashboardTitle}
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight break-words">Welcome back, {user.full_name || user.email}</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-300 sm:text-base leading-relaxed">Keep your assessments, courses, and attendance activity organized from one streamlined view.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-slate-200 backdrop-blur-sm whitespace-nowrap">
            <p className="font-semibold text-cyan-200 uppercase tracking-wide text-xs">Role</p>
            <p className="mt-1 text-slate-100 font-medium">{user.role}</p>
          </div>
        </div>
      </div>

      {/* Module Cards Grid */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {visibleItems.length > 0 ? visibleItems.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.title} variant="cryo" className="group cursor-pointer border-slate-200/80 bg-white/95">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-50 to-cyan-50 text-sky-700 shadow-sm group-hover:from-cyan-50 group-hover:to-violet-50 transition-all duration-200">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 whitespace-nowrap">Module</span>
                </div>
                <CardTitle className="mt-3 text-lg sm:text-xl font-semibold tracking-tight break-words">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 leading-relaxed break-words">{item.desc}</p>
                <Button className="mt-4" variant="secondary" size="sm" onClick={(e) => { e.stopPropagation(); navigate(item.path); }} disabled={false}>
                  Open →
                </Button>
              </CardContent>
            </Card>
          )
        }) : (
          <div className="col-span-full rounded-[24px] border border-dashed border-slate-300 bg-gradient-to-br from-slate-50 to-slate-100/50 p-8 sm:p-10 text-center">
            <p className="text-lg font-semibold text-slate-800">Welcome to your dashboard.</p>
            <p className="mt-2 text-slate-600">There are no management sections available for your role yet.</p>
          </div>
        )}
      </div>

      {/* Quick Actions Section */}
      {showQuickActions && (
        <Card variant="elevated" className="border-slate-200/80 bg-white/95">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg font-semibold">Quick actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {visibleItems.map((item) => (
                <Button key={item.path} variant="outline" onClick={() => navigate(item.path)} className="transition-all hover:shadow-md text-xs sm:text-sm whitespace-nowrap">
                  + {item.title}
                </Button>
              ))}
            </div>
            <p className="mt-4 text-sm text-slate-500">More functionality will appear here as your workflow grows.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}