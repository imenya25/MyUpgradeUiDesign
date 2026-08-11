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
    <div className="space-y-6">
      <div className="rounded-[28px] border border-slate-200/80 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-6 text-white shadow-[0_25px_60px_-30px_rgba(15,23,42,0.55)] sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm text-slate-100">
              <LayoutGrid className="h-4 w-4" />
              {dashboardTitle}
            </div>
            <h1 className="text-2xl font-semibold sm:text-3xl">Welcome back, {user.full_name || user.email}</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-300 sm:text-base">Keep your assessments, courses, and attendance activity organized from one streamlined view.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-slate-200">
            <p className="font-semibold">Role</p>
            <p className="mt-1 text-slate-100">{user.role}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visibleItems.length > 0 ? visibleItems.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.title} className="group cursor-pointer border-slate-200/80 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Module</span>
                </div>
                <CardTitle className="mt-3 text-xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">{item.desc}</p>
                <Button className="mt-4" variant="secondary" size="sm" onClick={(e) => { e.stopPropagation(); navigate(item.path); }}>
                  Open →
                </Button>
              </CardContent>
            </Card>
          )
        }) : (
          <div className="col-span-full rounded-[24px] border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
            <p className="text-lg font-semibold text-slate-800">Welcome to your dashboard.</p>
            <p className="mt-2 text-slate-600">There are no management sections available for your role yet.</p>
          </div>
        )}
      </div>

      {showQuickActions && (
        <Card className="border-slate-200/80">
          <CardHeader>
            <CardTitle>Quick actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {visibleItems.map((item) => (
                <Button key={item.path} variant="outline" onClick={() => navigate(item.path)}>
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