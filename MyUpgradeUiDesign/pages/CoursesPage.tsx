import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { BookOpen, PlusCircle } from 'lucide-react';

interface Subject {
  id: string;
  name: string;
  code: string;
  description: string | null;
}

export default function CoursesPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchSubjects();
  }, [user, navigate]);

  async function fetchSubjects() {
    try {
      const { data, error } = await supabase
        .from('subjects')
        .select('*')
        .order('name');

      if (error) throw error;
      setSubjects(data || []);
    } catch (err) {
      console.error('Error fetching subjects:', err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-8 text-slate-600">Loading courses...</div>;

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-slate-200/80 bg-slate-50 p-6 sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-600">
              <BookOpen className="h-4 w-4 text-sky-700" />
              Course Management
            </div>
            <h1 className="text-2xl font-semibold text-slate-900">Organize subjects and academic offerings</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">This view stays focused on the existing course catalog while presenting it more clearly for teachers and admins.</p>
          </div>
          <Button disabled title="Coming soon in next update" className="w-full sm:w-auto">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Course
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {subjects.map((subject) => (
          <Card key={subject.id} className="border-slate-200/80">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <CardTitle className="text-xl">{subject.name}</CardTitle>
                <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">{subject.code}</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">{subject.description || 'No description provided yet.'}</p>
            </CardContent>
          </Card>
        ))}
        {subjects.length === 0 && (
          <div className="col-span-full rounded-[24px] border border-dashed border-slate-300 bg-slate-50 p-12 text-center text-slate-600">
            No courses found. Add your first course via SQL or future UI.
          </div>
        )}
      </div>
    </div>
  );
}