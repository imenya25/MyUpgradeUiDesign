import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { ArrowLeft } from 'lucide-react'

type QuestionType = 'multiple_choice' | 'true_false' | 'short_answer' | 'essay'

type Difficulty = 'easy' | 'medium' | 'hard'

interface SubjectRow {
  id: string
  name: string
  code?: string
}

interface QuestionRow {
  id: string
  subject_id: string
  question_text: string
  question_type: QuestionType
  options?: any
  correct_answer?: string
  marks?: number
  difficulty?: Difficulty
  created_by?: string
  created_at?: string
}

interface ImportValidationResult {
  validQuestions: any[]
  errors: string[]
}

const templatePayload = {
  version: 1,
  questions: [
    {
      type: 'mcq',
      text: 'What does CPU stand for?',
      options: [
        'Central Processing Unit',
        'Core Power Unit',
        'Central Power Usage',
        'Computer Processing Unit',
      ],
      correctIndex: 0,
      subject: 'Computer Architecture',
      difficulty: 'Easy',
    },
    {
      type: 'truefalse',
      text: 'Python is a compiled language.',
      answer: false,
      subject: 'Programming',
      difficulty: 'Easy',
    },
    {
      type: 'fill',
      text: 'The process of converting source code to machine code is called ______.',
      answer: 'compilation',
      subject: 'Programming',
      difficulty: 'Medium',
    },
  ],
}

export default function QuestionBankPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [subjects, setSubjects] = useState<SubjectRow[]>([])
  const [questions, setQuestions] = useState<QuestionRow[]>([])
  const [allQuestions, setAllQuestions] = useState<QuestionRow[]>([])
  const [loading, setLoading] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [toastType, setToastType] = useState<'success' | 'error'>('success')
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null)
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>([])
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null)
  const [deleteMode, setDeleteMode] = useState<'single' | 'bulk'>('single')

  const [importPreviewDuplicateCount, setImportPreviewDuplicateCount] = useState(0)

  // Filters
  const [filterSubject, setFilterSubject] = useState<string | 'all'>('all')
  const [filterDifficulty, setFilterDifficulty] = useState<string | 'all'>('all')

  // Create modal state
  const [showModal, setShowModal] = useState(false)
  const [qType, setQType] = useState<QuestionType>('multiple_choice')
  const [qText, setQText] = useState('')
  const [qMarks, setQMarks] = useState<number>(1)
  const [qDifficulty, setQDifficulty] = useState<Difficulty>('easy')
  const [qSubject, setQSubject] = useState<string | null>(null)
  const [qTFAnswer, setQTFAnswer] = useState<'true' | 'false' | null>(null)

  const [options, setOptions] = useState<{ id: string; text: string; is_correct: boolean }[]>([
    { id: 'a', text: '', is_correct: false },
    { id: 'b', text: '', is_correct: false },
    { id: 'c', text: '', is_correct: false },
    { id: 'd', text: '', is_correct: false },
  ])

  // Import preview state
  const [showImportPreview, setShowImportPreview] = useState(false)
  const [importPreviewErrors, setImportPreviewErrors] = useState<string[]>([])
  const [importPreviewValidCount, setImportPreviewValidCount] = useState(0)
  const [importPreviewInvalidCount, setImportPreviewInvalidCount] = useState(0)
  const [validatedImportPayload, setValidatedImportPayload] = useState<any[]>([])

  useEffect(() => {
    if (!user) return
    fetchSubjects()
    fetchQuestions()
    fetchAllQuestions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  useEffect(() => {
    fetchQuestions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterSubject, filterDifficulty])

  async function fetchSubjects() {
    const { data, error } = await (supabase.from as any)('subjects').select('*').order('name')
    if (error) {
      console.error('Error fetching subjects', error)
      return
    }
    const subjectData = (data as SubjectRow[]) || []
    setSubjects(subjectData)
    if (subjectData.length && !qSubject) setQSubject(subjectData[0].id)
  }

  async function fetchQuestions() {
    if (!user) return
    setLoading(true)

    let query: any = supabase.from('questions').select('*').order('created_at', { ascending: false })
    if (filterSubject !== 'all') query = query.eq('subject_id', filterSubject)
    if (filterDifficulty !== 'all') query = query.eq('difficulty', filterDifficulty)

    const { data, error } = await query
    if (error) console.error('Error fetching questions', error)
    const questionData = (data as QuestionRow[]) || []
    setQuestions(questionData)
    setSelectedQuestionIds((prev) => prev.filter((id) => questionData.some((q) => q.id === id)))
    setLoading(false)
  }

  async function fetchAllQuestions() {
    if (!user) return

    const { data, error } = await supabase.from('questions').select('*')
    if (error) {
      console.error('Error fetching all questions', error)
      return
    }

    setAllQuestions((data as QuestionRow[]) || [])
  }

  function downloadJson(payload: unknown, filename: string) {
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  function downloadTemplate() {
    downloadJson(templatePayload, 'question_template.json')
  }

  function exportQuestions() {
    const payload = {
      version: 1,
      questions: questions.map((question) => {
        const type = question.question_type === 'multiple_choice' ? 'mcq' :
          question.question_type === 'true_false' ? 'truefalse' :
          'fill'

        const base: any = {
          type,
          text: question.question_text,
          subject: subjects.find((subject) => subject.id === question.subject_id)?.name || '',
          difficulty: String(question.difficulty || '').charAt(0).toUpperCase() + String(question.difficulty || '').slice(1),
          marks: question.marks,
        }

        if (question.question_type === 'multiple_choice') {
          base.options = Array.isArray(question.options)
            ? question.options.map((opt: any) => opt.text)
            : []
          base.correctIndex = Array.isArray(question.options)
            ? question.options.findIndex((opt: any) => opt.is_correct)
            : -1
        } else if (question.question_type === 'true_false') {
          base.answer = question.correct_answer === 'true'
        } else {
          base.answer = question.correct_answer
        }

        return base
      }),
    }

    downloadJson(payload, 'question_bank_export.json')
  }

  function normalizeQuestionKey(question: { subject_id: string | null; question_text: string; question_type: string; difficulty: string }) {
    return [question.subject_id, question.question_type, question.difficulty, question.question_text.trim().toLowerCase()].join('|')
  }

  function hasQuestionDuplicate(payload: { subject_id: string; question_text: string; question_type: string; difficulty: string }, ignoreId?: string) {
    const normalizedKey = normalizeQuestionKey(payload)
    return allQuestions.some((existing) => {
      const existingKey = normalizeQuestionKey({
        subject_id: existing.subject_id,
        question_text: existing.question_text,
        question_type: existing.question_type,
        difficulty: existing.difficulty || '',
      })
      return existing.id !== ignoreId && existingKey === normalizedKey
    })
  }

  function validateImportPayload(rawItems: any[]): ImportValidationResult {
    const validQuestions: any[] = []
    const errors: string[] = []
    const seenKeys = new Set<string>()

    rawItems.forEach((item, index) => {
      const row = item || {}
      const rowIndex = index + 1
      const normalizedType = typeof row.type === 'string' ? row.type.toLowerCase() : ''
      const question_type: QuestionType | '' = normalizedType === 'mcq' ? 'multiple_choice' :
        normalizedType === 'truefalse' ? 'true_false' :
        normalizedType === 'fill' ? 'short_answer' :
        ''
      const subject_id = row.subject_id || findSubjectIdByCode(row.subject)
      const question_text = typeof row.text === 'string' ? row.text.trim() : ''
      const marks = Number.isFinite(Number(row.marks)) ? Number(row.marks) : 1
      const difficulty = typeof row.difficulty === 'string' ? row.difficulty.toLowerCase() : ''
      const payload: any = {
        subject_id,
        question_text,
        question_type,
        marks,
        difficulty,
        created_by: user?.id,
      }

      if (!subject_id) {
        const availableSubjects = subjects.map((subject) => subject.name).join(', ')
        errors.push(
          `Item ${rowIndex}: subject is invalid. Must match an existing subject name or id. Available subjects: ${availableSubjects}`,
        )
      }

      if (!question_text) {
        errors.push(`Item ${rowIndex}: Missing question_text.`)
      }

      if (!['multiple_choice', 'true_false', 'short_answer', 'essay'].includes(question_type)) {
        errors.push(`Item ${rowIndex}: Invalid type '${row.type}'. Supported values: mcq, truefalse, fill.`)
      }

      if (!Number.isFinite(marks) || marks <= 0) {
        errors.push(`Item ${rowIndex}: marks must be a positive number.`)
      }

      if (!['easy', 'medium', 'hard'].includes(difficulty)) {
        errors.push(`Item ${rowIndex}: difficulty must be 'Easy', 'Medium', or 'Hard'.`)
      }

      if (!subject_id) {
        errors.push(`Item ${rowIndex}: subject is required and must match an existing subject name or id.`)
      }

      if (question_type === 'multiple_choice') {
        if (!Array.isArray(row.options) || row.options.length < 2) {
          errors.push(`Item ${rowIndex}: mcq must have an options array with at least 2 items.`)
        } else {
          const correctIndex = Number(row.correctIndex)
          const hasValidCorrectIndex = Number.isInteger(correctIndex) && correctIndex >= 0 && correctIndex < row.options.length
          const invalidOption = row.options.find((opt: any) => typeof opt !== 'string')
          if (!hasValidCorrectIndex) {
            errors.push(`Item ${rowIndex}: mcq must have a valid correctIndex.`)
          }
          if (invalidOption) {
            errors.push(`Item ${rowIndex}: mcq options must be strings.`)
          }
        }
        payload.options = row.options.map((option: string, index: number) => ({
          id: String.fromCharCode(97 + index),
          text: option,
          is_correct: index === Number(row.correctIndex),
        }))
        payload.correct_answer = String.fromCharCode(97 + Number(row.correctIndex))
      } else if (question_type === 'true_false') {
        if (typeof row.answer !== 'boolean') {
          errors.push(`Item ${rowIndex}: truefalse requires answer true or false.`)
        }
        payload.correct_answer = row.answer === true ? 'true' : row.answer === false ? 'false' : undefined
      } else if (question_type === 'short_answer') {
        if (!row.answer || typeof row.answer !== 'string') {
          errors.push(`Item ${rowIndex}: fill requires answer text.`)
        }
        payload.correct_answer = row.answer
      }

      const questionKey = normalizeQuestionKey(payload)
      if (seenKeys.has(questionKey)) {
        errors.push(`Item ${rowIndex}: duplicate question found within the import file.`)
      }

      if (hasQuestionDuplicate(payload)) {
        errors.push(`Item ${rowIndex}: duplicate question already exists in the question bank.`)
      }

      if (!errors.some((error) => error.startsWith(`Item ${rowIndex}:`))) {
        seenKeys.add(questionKey)
        validQuestions.push(payload)
      }
    })

    return { validQuestions, errors }
  }

  function findSubjectIdByCode(subjectCode: string | undefined) {
    if (!subjectCode) return null
    const search = String(subjectCode).toLowerCase()
    const match = subjects.find(
      (subject) =>
        subject.code?.toLowerCase() === search ||
        subject.name.toLowerCase() === search,
    )
    return match?.id ?? null
  }

  function openFilePicker() {
    fileInputRef.current?.click()
  }

  function getSubjectName(subjectId: string) {
    return subjects.find((subject) => subject.id === subjectId)?.name || 'Unknown'
  }

  function toggleQuestionSelection(questionId: string) {
    setSelectedQuestionIds((prev) =>
      prev.includes(questionId) ? prev.filter((id) => id !== questionId) : [...prev, questionId],
    )
  }

  function selectAllQuestions() {
    setSelectedQuestionIds(questions.map((question) => question.id))
  }

  function clearQuestionSelection() {
    setSelectedQuestionIds([])
  }

  function openBulkDeleteConfirm() {
    if (selectedQuestionIds.length === 0) {
      showToast('error', 'Select at least one question to delete.')
      return
    }
    setDeleteMode('bulk')
    setShowDeleteConfirm(true)
  }

  async function performDelete() {
    const targets = deleteMode === 'bulk' ? selectedQuestionIds : deleteTargetId ? [deleteTargetId] : []
    if (targets.length === 0) {
      showToast('error', 'No questions selected for deletion.')
      setShowDeleteConfirm(false)
      return
    }

    let data = null
    let error = null

    if (deleteMode === 'bulk') {
      const response = await supabase.from('questions').delete().in('id', targets).select('id')
      data = response.data
      error = response.error
    } else if (deleteTargetId) {
      const response = await supabase.from('questions').delete().eq('id', deleteTargetId).select('id')
      data = response.data
      error = response.error
    }

    if (error) {
      console.error('Delete error', error)
      showToast('error', `Failed to delete questions: ${error.message || 'Please try again.'}`)
      setShowDeleteConfirm(false)
      return
    }

    if (!Array.isArray(data) || data.length === 0) {
      showToast('error', 'No matching question was deleted. Please refresh and try again.')
      setShowDeleteConfirm(false)
      return
    }

    if (deleteMode === 'bulk') {
      setSelectedQuestionIds((prev) => prev.filter((id) => !targets.includes(id)))
      showToast('success', `${data.length} questions deleted successfully.`)
    } else {
      showToast('success', 'Question deleted successfully.')
    }

    setDeleteTargetId(null)
    setShowDeleteConfirm(false)
    fetchQuestions()
  }

  function openDeleteConfirm(questionId: string) {
    setDeleteMode('single')
    setDeleteTargetId(questionId)
    setShowDeleteConfirm(true)
  }

  function cancelDelete() {
    setDeleteTargetId(null)
    setShowDeleteConfirm(false)
  }

  function resetModalForm() {
    setEditingQuestionId(null)
    setQType('multiple_choice')
    setQText('')
    setQMarks(1)
    setQDifficulty('easy')
    setQTFAnswer(null)
    setOptions([
      { id: 'a', text: '', is_correct: false },
      { id: 'b', text: '', is_correct: false },
      { id: 'c', text: '', is_correct: false },
      { id: 'd', text: '', is_correct: false },
    ])
    setQSubject(subjects[0]?.id ?? null)
  }

  function openCreateModal() {
    resetModalForm()
    setShowModal(true)
  }

  function openEditModal(question: QuestionRow) {
    setEditingQuestionId(question.id)
    setQType(question.question_type)
    setQText(question.question_text)
    setQMarks(question.marks ?? 1)
    setQDifficulty(question.difficulty ?? 'easy')
    setQSubject(question.subject_id)
    setQTFAnswer(question.question_type === 'true_false' ? (question.correct_answer === 'true' ? 'true' : 'false') : null)

    if (question.question_type === 'multiple_choice' && Array.isArray(question.options)) {
      setOptions(
        question.options.map((opt: any) => ({
          id: opt.id,
          text: opt.text,
          is_correct: Boolean(opt.is_correct),
        })),
      )
    } else {
      setOptions([
        { id: 'a', text: '', is_correct: false },
        { id: 'b', text: '', is_correct: false },
        { id: 'c', text: '', is_correct: false },
        { id: 'd', text: '', is_correct: false },
      ])
    }

    setShowModal(true)
  }

  function showToast(type: 'success' | 'error', message: string) {
    setToastType(type)
    setToastMessage(message)
    window.setTimeout(() => setToastMessage(null), 4000)
  }

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''

    if (!file) {
      return
    }

    if (!file.name.toLowerCase().endsWith('.json')) {
      showToast('error', 'Please upload a JSON file.')
      return
    }

    try {
      const text = await file.text()
      const data = JSON.parse(text)
      if (!data || typeof data !== 'object' || !Array.isArray(data.questions)) {
        showToast('error', 'JSON must match the import wrapper format: { version: 1, questions: [] }.')
        return
      }

      const { validQuestions, errors } = validateImportPayload(data.questions)
      setImportPreviewValidCount(validQuestions.length)
      setImportPreviewInvalidCount(errors.length)
      setImportPreviewDuplicateCount(errors.filter((error) => error.toLowerCase().includes('duplicate question')).length)
      setImportPreviewErrors(errors)
      setValidatedImportPayload(validQuestions)
      setShowImportPreview(true)
    } catch (err) {
      console.error('Import parse error', err)
      showToast('error', 'Unable to read JSON file. Please check the file format.')
    }
  }

  async function confirmImport() {
    if (!user) return
    if (validatedImportPayload.length === 0) {
      showToast('error', 'No valid questions to import.')
      return
    }

    const { error } = await supabase.from('questions').insert(validatedImportPayload as any)
    if (error) {
      console.error('Bulk import error', error)
      showToast('error', 'Failed to import questions. Check console for details.')
      return
    }

    setShowImportPreview(false)
    setImportPreviewErrors([])
    setImportPreviewValidCount(0)
    setImportPreviewInvalidCount(0)
    setValidatedImportPayload([])
    showToast('success', `Successfully imported ${validatedImportPayload.length} questions.`)
    fetchQuestions()
  }

  function updateOptionText(id: string, text: string) {
    setOptions((prev) => prev.map((o) => (o.id === id ? { ...o, text } : o)))
  }

  function toggleCorrect(id: string) {
    setOptions((prev) => prev.map((o) => ({ ...o, is_correct: o.id === id })))
  }

  function addOption() {
    const letter = String.fromCharCode(97 + options.length)
    setOptions((prev) => [...prev, { id: letter, text: '', is_correct: false }])
  }

  function removeOption(id: string) {
    setOptions((prev) => prev.filter((o) => o.id !== id))
  }

  async function handleSave() {
    if (!user) return
    if (!qSubject) {
      showToast('error', 'Please select a subject.')
      return
    }

    const payload: any = {
      subject_id: qSubject,
      question_text: qText,
      question_type: qType,
      marks: qMarks,
      difficulty: qDifficulty,
      created_by: user.id,
    }

    if (qType === 'multiple_choice') {
      payload.options = options.map((o) => ({ id: o.id, text: o.text, is_correct: o.is_correct }))
      const correct = options.find((o) => o.is_correct)
      payload.correct_answer = correct ? correct.id : null
    } else if (qType === 'true_false') {
      payload.correct_answer = qTFAnswer
    }

    const duplicateError = hasQuestionDuplicate(payload, editingQuestionId ?? undefined)
    if (duplicateError) {
      showToast('error', 'A question with the same subject, type, difficulty, and text already exists.')
      return
    }

    const query = editingQuestionId
      ? (supabase.from as any)('questions').update(payload).eq('id', editingQuestionId)
      : (supabase.from as any)('questions').insert(payload)

    const { error } = await query

    if (error) {
      console.error('Error saving question', error)
      showToast('error', 'Failed to save question. Please try again.')
      return
    }

    setShowModal(false)
    showToast('success', editingQuestionId ? 'Question updated successfully.' : 'Question created successfully.')
    resetModalForm()
    fetchQuestions()
  }

  if (!user) {
    navigate('/login')
    return null
  }

  const handleClosePage = () => {
    if (window.history.length > 1) {
      navigate(-1)
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <div className="p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-6">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={handleClosePage}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Close
          </Button>
          <h1 className="text-2xl font-bold">Question Bank</h1>
        </div>
        <div className="flex flex-wrap gap-2 justify-start lg:justify-end">
          <Button variant="outline" onClick={downloadTemplate}>Download Template</Button>
          <Button variant="outline" onClick={exportQuestions}>Export JSON</Button>
          <Button variant="outline" onClick={openFilePicker}>Import JSON</Button>
          {selectedQuestionIds.length > 0 ? (
            <Button variant="destructive" onClick={openBulkDeleteConfirm}>
              Delete Selected ({selectedQuestionIds.length})
            </Button>
          ) : null}
          <Button onClick={openCreateModal}>+ Create Question</Button>
        </div>
      </div>

      {toastMessage ? (
        <div className={`mb-4 rounded-lg px-4 py-3 shadow-sm ${toastType === 'success' ? 'border border-green-200 bg-green-50 text-green-900' : 'border border-red-200 bg-red-50 text-red-900'}`}>
          {toastMessage}
        </div>
      ) : null}

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        className="hidden"
        onChange={handleFileChange}
      />

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div>
              <Label>Subject</Label>
              <select className="block mt-1" value={filterSubject} onChange={(e) => setFilterSubject(e.target.value as any)}>
                <option value="all">All Subjects</option>
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            <div>
              <Label>Difficulty</Label>
              <select className="block mt-1" value={filterDifficulty} onChange={(e) => setFilterDifficulty(e.target.value as any)}>
                <option value="all">All</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div className="ml-auto flex flex-wrap gap-2 items-center">
              <Button variant="outline" onClick={() => { setFilterSubject('all'); setFilterDifficulty('all') }}>Reset</Button>
              <Button variant="outline" onClick={selectAllQuestions}>Select All</Button>
              <Button variant="outline" onClick={clearQuestionSelection}>Clear Selection</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {loading && <div>Loading...</div>}
        {!loading && questions.length === 0 && <div className="text-gray-600">No questions found.</div>}
        {questions.map((q) => (
          <Card key={q.id}>
            <CardHeader>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between w-full">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    className="mt-2 h-4 w-4"
                    checked={selectedQuestionIds.includes(q.id)}
                    onChange={() => toggleQuestionSelection(q.id)}
                  />
                  <div>
                    <CardTitle className="text-lg">{q.question_text}</CardTitle>
                    <div className="text-sm text-gray-600 mt-1">{getSubjectName(q.subject_id)}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={() => openEditModal(q)}>Edit</Button>
                  <Button variant="destructive" size="sm" onClick={() => openDeleteConfirm(q.id)}>Delete</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-600">Type: {q.question_type} • Difficulty: {q.difficulty || 'N/A'} • Marks: {q.marks || 1}</div>
              {q.options && Array.isArray(q.options) && (
                <ul className="mt-3 list-disc pl-5">
                  {q.options.map((opt: any) => (
                    <li key={opt.id} className={opt.is_correct ? 'font-semibold' : ''}>{opt.id.toUpperCase()}. {opt.text}</li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {showImportPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black opacity-50" onClick={() => setShowImportPreview(false)} />
          <div className="relative bg-white rounded-lg w-full max-w-3xl p-6 shadow-lg overflow-y-auto max-h-[90vh]">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h2 className="text-xl font-semibold">Import Preview</h2>
                <p className="text-sm text-gray-600 mt-1">{importPreviewValidCount} valid questions and {importPreviewInvalidCount} errors found.</p>
              </div>
              <Button variant="outline" onClick={() => setShowImportPreview(false)}>Close</Button>
            </div>
            <div className="grid gap-4">
              <div className="rounded-lg border bg-surface p-4">
                <div className="font-semibold">Summary</div>
                <div className="text-sm text-gray-700 mt-2">Valid questions: {importPreviewValidCount}</div>
                <div className="text-sm text-gray-700">Errors: {importPreviewInvalidCount}</div>
                {importPreviewDuplicateCount > 0 && (
                  <div className="text-sm text-orange-700 mt-1">Duplicate questions detected: {importPreviewDuplicateCount}. These will not be imported.</div>
                )}
              </div>
              {importPreviewErrors.length > 0 && (
                <div className="rounded-lg border bg-surface p-4">
                  <div className="font-semibold">Errors</div>
                  <ul className="mt-2 list-disc pl-5 text-sm text-gray-700 space-y-1">
                    {importPreviewErrors.slice(0, 20).map((message, index) => (
                      <li key={`${message}-${index}`}>{message}</li>
                    ))}
                  </ul>
                  {importPreviewErrors.length > 20 && <div className="text-xs text-gray-500 mt-2">Showing first 20 errors.</div>}
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-2 justify-end mt-6">
              <Button variant="outline" onClick={() => setShowImportPreview(false)}>Cancel</Button>
              <Button onClick={confirmImport} disabled={importPreviewValidCount === 0}>Import Valid Questions</Button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black opacity-50" onClick={cancelDelete} />
          <div className="relative bg-white rounded-lg w-full max-w-md p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
            <p className="text-sm text-gray-600 mb-4">
              {deleteMode === 'bulk'
                ? `Delete ${selectedQuestionIds.length} selected questions? This cannot be undone.`
                : 'Delete this question? This action cannot be undone.'}
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={cancelDelete}>Cancel</Button>
              <Button variant="destructive" onClick={performDelete}>Delete</Button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-lg w-full max-w-2xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">{editingQuestionId ? 'Edit Question' : 'Create Question'}</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Subject</Label>
                <select className="block mt-1 w-full" value={qSubject ?? ''} onChange={(e) => setQSubject(e.target.value)}>
                  <option value="">Select subject</option>
                  {subjects.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label>Type</Label>
                <select className="block mt-1 w-full" value={qType} onChange={(e) => setQType(e.target.value as QuestionType)}>
                  <option value="multiple_choice">Multiple Choice</option>
                  <option value="true_false">True / False</option>
                  <option value="short_answer">Short Answer</option>
                  <option value="essay">Essay</option>
                </select>
              </div>

              <div>
                <Label>Difficulty</Label>
                <select className="block mt-1 w-full" value={qDifficulty} onChange={(e) => setQDifficulty(e.target.value as Difficulty)}>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              <div>
                <Label>Marks</Label>
                <Input type="number" className="mt-1" value={qMarks} onChange={(e) => setQMarks(Number(e.target.value))} />
              </div>
            </div>

            <div className="mt-4">
              <Label>Question Text</Label>
              <textarea className="w-full mt-1 p-2 border rounded" rows={3} value={qText} onChange={(e) => setQText(e.target.value)} />
            </div>

            {qType === 'multiple_choice' && (
              <div className="mt-4">
                <Label>Options</Label>
                <div className="space-y-2 mt-2">
                  {options.map((opt) => (
                    <div key={opt.id} className="flex items-center gap-2">
                      <label className="w-6">{opt.id.toUpperCase()}</label>
                      <Input value={opt.text} onChange={(e) => updateOptionText(opt.id, e.target.value)} />
                      <label className="flex items-center gap-2 ml-2">
                        <input type="radio" name="correct" checked={opt.is_correct} onChange={() => toggleCorrect(opt.id)} />
                        <span className="text-sm">Correct</span>
                      </label>
                      <Button variant="ghost" onClick={() => removeOption(opt.id)}>Remove</Button>
                    </div>
                  ))}
                </div>
                <div className="mt-2">
                  <Button variant="outline" onClick={addOption}>+ Add Option</Button>
                </div>
              </div>
            )}

            {qType === 'true_false' && (
              <div className="mt-4">
                <Label>Correct Answer</Label>
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="tf" value="true" checked={qTFAnswer === 'true'} onChange={() => setQTFAnswer('true')} />
                    True
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="tf" value="false" checked={qTFAnswer === 'false'} onChange={() => setQTFAnswer('false')} />
                    False
                  </label>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button onClick={handleSave}>Save Question</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
