import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { CalendarDays, PlusCircle } from 'lucide-react';

interface ClassGroup {
  id: string;
  name: string;
  academic_year: string;
  teacher_id: string;
}

export default function BatchesPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [classes, setClasses] = useState<ClassGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchClasses();
  }, [user, navigate]);

  async function fetchClasses() {
    try {
      const { data, error } = await supabase
        .from('classes')
        .select('*, users(full_name)')
        .order('name');

      if (error) throw error;
      setClasses(data || []);
    } catch (err) {
      console.error('Error fetching classes:', err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4 sm:p-8 text-slate-600 text-sm sm:text-base">Loading batches...</div>;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
      <div className="rounded-[28px] border border-slate-200/80 bg-slate-50 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs sm:text-sm text-slate-600">
              <CalendarDays className="h-3 w-3 sm:h-4 sm:w-4 text-sky-700" />
              Batch Scheduling
            </div>
            <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 break-words">Track academic groups and teaching assignments</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 leading-relaxed">The scheduling experience remains unchanged while the presentation now feels more deliberate and easier to scan.</p>
          </div>
          <Button disabled title="Coming soon in next update" className="w-full sm:w-auto whitespace-nowrap">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Batch
          </Button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {classes.map((cls) => (
          <Card key={cls.id} className="border-slate-200/80">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <CardTitle className="text-lg sm:text-xl break-words">{cls.name}</CardTitle>
                <span className="rounded-full bg-violet-100 px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-violet-700 whitespace-nowrap">{cls.academic_year}</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 break-words">
                Teacher: {(cls as any).users?.full_name || 'Unassigned'}
              </p>
            </CardContent>
          </Card>
        ))}
        {classes.length === 0 && (
          <div className="col-span-full rounded-[24px] border border-dashed border-slate-300 bg-slate-50 p-8 sm:p-12 text-center text-slate-600">
            No batches found. Create your first batch via SQL or future UI.
          </div>
        )}
      </div>
    </div>
  );
}