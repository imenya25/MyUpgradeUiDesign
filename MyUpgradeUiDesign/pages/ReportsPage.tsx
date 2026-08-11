import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { BarChart3, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ReportsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
  }, [user, navigate]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
      <div className="rounded-[28px] border border-slate-200/80 bg-slate-50 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs sm:text-sm text-slate-600">
              <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4 text-sky-700" />
              Reports & Analytics
            </div>
            <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 break-words">Monitor the health of your academic operations</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 leading-relaxed">The existing reporting experience remains intact, while the overview now reads more clearly and feels more polished.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="border-slate-200/80">
          <CardHeader><CardTitle className="text-base sm:text-lg">Total Students</CardTitle></CardHeader>
          <CardContent><p className="text-2xl sm:text-3xl font-bold text-slate-900">0</p></CardContent>
        </Card>
        <Card className="border-slate-200/80">
          <CardHeader><CardTitle className="text-base sm:text-lg">Total Teachers</CardTitle></CardHeader>
          <CardContent><p className="text-2xl sm:text-3xl font-bold text-slate-900">0</p></CardContent>
        </Card>
        <Card className="border-slate-200/80">
          <CardHeader><CardTitle className="text-base sm:text-lg">Active Exams</CardTitle></CardHeader>
          <CardContent><p className="text-2xl sm:text-3xl font-bold text-slate-900">0</p></CardContent>
        </Card>
        <Card className="border-slate-200/80">
          <CardHeader><CardTitle className="text-base sm:text-lg">Attendance Rate</CardTitle></CardHeader>
          <CardContent><p className="text-2xl sm:text-3xl font-bold text-slate-900">--%</p></CardContent>
        </Card>
      </div>

      <Card className="border-slate-200/80">
        <CardHeader><CardTitle className="text-base sm:text-lg">System status</CardTitle></CardHeader>
        <CardContent className="space-y-3 text-sm text-slate-600">
          <div className="flex items-center gap-2 text-emerald-700"><CheckCircle2 className="h-4 w-4" /> Database connected</div>
          <div className="flex items-center gap-2 text-emerald-700"><CheckCircle2 className="h-4 w-4" /> Authentication active</div>
          <div className="flex items-center gap-2 text-amber-700"><AlertCircle className="h-4 w-4" /> Reports module under construction</div>
        </CardContent>
      </Card>
    </div>
  );
}