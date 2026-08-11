import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { getSessions, createSession, deleteSession, getRecords, deleteRecord, updateSession, getTeachers, getSubjects } from '@/lib/attendance'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AttendanceManagementPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [sessions, setSessions] = useState<any[]>([])
  const [records, setRecords] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    subject_id: '',
    teacher_id: user?.id || '',
    scheduled_date: '',
    start_time: '',
    end_time: '',
    attendance_type: 'theory',
    room_number: '',
    remarks: '',
  })
  const [teachers, setTeachers] = useState<any[]>([])
  const [subjects, setSubjects] = useState<any[]>([])

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    load()
  }, [user])

  async function load() {
    setLoading(true)
    const s = await getSessions()
    if (!s.error && s.data) setSessions(s.data)
    const r = await getRecords()
    if (!r.error && r.data) setRecords(r.data)
    const t = await getTeachers()
    if (!t.error && t.data) setTeachers(t.data)
    const sub = await getSubjects()
    if (!sub.error && sub.data) setSubjects(sub.data)
    setLoading(false)
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await createSession({
      subject_id: form.subject_id,
      teacher_id: form.teacher_id,
      scheduled_date: form.scheduled_date,
      start_time: form.start_time,
      end_time: form.end_time,
      attendance_type: form.attendance_type as any,
      room_number: form.room_number,
      remarks: form.remarks,
      status: 'scheduled',
    })
    await load()
    setLoading(false)
  }

  async function handleDeleteSession(id: string) {
    setLoading(true)
    await deleteSession(id)
    await load()
    setLoading(false)
  }

  async function handleUpdateSession(id: string, patch: Partial<any>) {
    setLoading(true)
    await updateSession(id, patch)
    await load()
    setLoading(false)
  }

  async function handleDeleteRecord(id: string) {
    setLoading(true)
    await deleteRecord(id)
    await load()
    setLoading(false)
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold break-words">Attendance Management</h1>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Create Session</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <Label>Subject</Label>
                <select value={form.subject_id} onChange={(e) => setForm({ ...form, subject_id: e.target.value })} className="w-full rounded-md border bg-transparent px-3 py-2 text-sm">
                  <option value="">Select subject</option>
                  {subjects.map((sub) => (
                    <option key={sub.id} value={sub.id}>{sub.name} ({sub.code})</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Scheduled Date</Label>
                <Input type="date" value={form.scheduled_date} onChange={(e) => setForm({ ...form, scheduled_date: e.target.value })} className="text-sm" />
              </div>
              <div className="flex gap-2">
                <div className="flex-1 min-w-0">
                  <Label>Start</Label>
                  <Input type="time" value={form.start_time} onChange={(e) => setForm({ ...form, start_time: e.target.value })} className="text-sm" />
                </div>
                <div className="flex-1 min-w-0">
                  <Label>End</Label>
                  <Input type="time" value={form.end_time} onChange={(e) => setForm({ ...form, end_time: e.target.value })} className="text-sm" />
                </div>
              </div>
              <div>
                <Label>Room</Label>
                <Input value={form.room_number} onChange={(e) => setForm({ ...form, room_number: e.target.value })} className="text-sm" />
              </div>
              <div>
                <Label>Teacher</Label>
                <select value={form.teacher_id} onChange={(e) => setForm({ ...form, teacher_id: e.target.value })} className="w-full rounded-md border bg-transparent px-3 py-2 text-sm">
                  <option value="">Select teacher</option>
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id}>{t.full_name} ({t.employee_id})</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end">
                <Button type="submit" disabled={loading} size="sm" className="whitespace-nowrap">Create</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            {sessions.length === 0 ? (
              <p className="text-sm text-slate-400">No sessions scheduled.</p>
            ) : (
              <ul className="space-y-3 max-h-72 overflow-auto">
                {sessions.map((s) => (
                  <li key={s.id} className="flex flex-col gap-2 rounded-md border p-3">
                    <div>
                      <div className="font-medium text-sm break-words">{(subjects.find(x => x.id === s.subject_id)?.name) || s.subject_id} — {s.attendance_type}</div>
                      <div className="text-xs text-slate-400 whitespace-nowrap">{s.scheduled_date} {s.start_time} — {s.end_time}</div>
                      <div className="text-xs mt-1">Status: <span className="font-medium">{s.status}</span></div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {s.status !== 'active' && (
                        <Button size="sm" onClick={() => handleUpdateSession(s.id, { status: 'active' })} disabled={loading} className="text-xs">Activate</Button>
                      )}
                      {s.status !== 'completed' && (
                        <Button size="sm" onClick={() => handleUpdateSession(s.id, { status: 'completed' })} disabled={loading} className="text-xs">Complete</Button>
                      )}
                      {s.status !== 'cancelled' && (
                        <Button size="sm" onClick={() => handleUpdateSession(s.id, { status: 'cancelled' })} disabled={loading} className="text-xs">Cancel</Button>
                      )}
                      <Button variant="destructive" onClick={() => handleDeleteSession(s.id)} disabled={loading} size="sm" className="text-xs">Delete</Button>
                      <Button onClick={async () => { const r = await getRecords(s.id); if (!r.error) setRecords(r.data || []); }} size="sm" className="text-xs">View Records</Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

        <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Attendance Records (read-only)</CardTitle>
        </CardHeader>
          <CardContent>
          {records.length === 0 ? (
            <p className="text-sm text-slate-400">No attendance records available.</p>
          ) : (
            <ul className="space-y-2 max-h-80 overflow-auto">
              {records.map((r) => (
                <li key={r.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-md border p-3">
                  <div>
                    <div className="text-sm break-words">Student: {r.student_id}</div>
                    <div className="text-xs text-slate-400 whitespace-nowrap">{r.status} — marked {r.marked_at}</div>
                  </div>
                  <div>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteRecord(r.id)} disabled={loading} className="text-xs">Delete</Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
