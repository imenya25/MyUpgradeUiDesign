# MyUpgradeUiDesign - UI Redesign Guidelines

> **⚠️ CRITICAL**: This document outlines what CAN and CANNOT be changed to prevent breaking the application.

---

## 🎯 Purpose

This folder contains copies of all **UI/presentation layer** files. You can safely redesign the visual appearance while maintaining full functionality and backend connectivity.

---

## ✅ WHAT YOU CAN CHANGE

### ✨ Visual Design Elements
- **Colors** - Text colors, backgrounds, borders (use Tailwind classes)
- **Spacing** - Padding, margins, gaps (modify `p-`, `m-`, `gap-` classes)
- **Typography** - Font sizes, weights, styles (adjust `text-`, `font-` classes)
- **Layouts** - Grid columns, flex direction, arrangement (modify grid/flex classes)
- **Borders & Shadows** - Border radius, box shadows, effects
- **Hover/Active States** - Add new hover states, active states, animations
- **Icons** - Replace or reposition lucide-react icons
- **Loading States** - Modify spinner/loading UI
- **Component Structure** - Reorganize div hierarchy (keep element IDs/classes intact)

### 📝 Text Content
- Button labels
- Page titles and descriptions
- Placeholder text
- Headings and subheadings
- Help text and instructions
- Error/success messages

### 🎨 Styling Framework
- Create new Tailwind utility classes
- Modify `tailwind.config.js` colors, fonts, spacing scales
- Add new animations/transitions in `index.css`
- Update global styles

---

## ⛔ WHAT YOU MUST NOT CHANGE

### 🎯 Critical Role Values & User Structure
```
❌ DO NOT change these role strings:
- 'admin'
- 'teacher'
- 'student'

❌ DO NOT modify User object properties:
- id (string)
- email (string)
- full_name (string)
- role ('admin' | 'teacher' | 'student')
- student_id (string | null)
- teacher_id (string | null)
- created_at (string)

✅ Keep these intact - they're used throughout the app
```

### 🔧 Component Props & Interfaces
```
❌ DO NOT modify prop names or types
❌ DO NOT remove component parameters
❌ DO NOT change function signatures

✅ Example - Keep This:
interface UserTableProps {
  users: User[];
  onDelete: (id: string) => void;
}

❌ Example - Don't Change This:
// If original has these props, keep them
<Button onClick={handleSubmit}>Save</Button>
```

### 🛡️ RoleGuard Component (CRITICAL)
```
❌ DO NOT remove or modify RoleGuard wrapper
❌ DO NOT change allowedRoles prop structure
❌ DO NOT modify RoleGuard logic

✅ Keep intact:
<RoleGuard allowedRoles={['admin', 'teacher']}>
  <YourComponent />
</RoleGuard>

❌ Don't change:
// This controls page access - breaking it allows unauthorized access
```

### 📤 Component Exports
```
❌ DO NOT rename exported components
❌ DO NOT change default exports
❌ DO NOT modify import paths

✅ Keep:
export default LoginPage;
export { Button };

❌ Don't change:
export { Button as PrimaryButton }; // ✗ Breaks imports elsewhere
```

### 🔗 Form Field Names & Input IDs (CRITICAL)
```
❌ DO NOT rename these form fields:

Login Form:
- name="email" / id="email"
- name="password" / id="password"

User Creation Form:
- name="email" / email input
- name="password" / password input
- name="full_name" / name input
- name="role" / role select

Attendance Form:
- name="subject_id" / subject dropdown
- name="teacher_id" / teacher dropdown
- name="scheduled_date" / date input
- name="start_time" / time input
- name="end_time" / time input
- name="room_number" / room input
- name="attendance_type" / attendance type field
- name="remarks" / remarks field

Question Form:
- name="subject_id" / subject dropdown
- name="question_type" / type select
- name="difficulty" / difficulty select
- name="marks" / marks spinbutton
- name="question_text" / textarea
- name="options" / options array
- name="is_correct" / radio buttons per option

✅ Keep field names exactly as is
❌ Renaming breaks form submission and backend processing
```

### 🎯 Form Handler Functions (MUST KEEP)
```
❌ DO NOT rename these critical handlers:
- handleSubmit()
- handleCreate()
- handleDelete()
- handleUpdateSession()
- handleSignOut()
- handleCreateUser()
- handleSignIn()
- fetchUsers()
- fetchQuestions()
- fetchSessions()

✅ Keep exact names and signatures:
async function handleCreate(e: React.FormEvent)
function handleDelete(id: string)
async function handleSubmit(e: React.FormEvent)

❌ Don't do this:
async function submitForm(e) // ✗ Changed name
```

### 📋 Form State Management
```
❌ DO NOT change state variable names:
- showAddModal, showModal (modal visibility)
- newEmail, newPassword, newFullName, newRole (form inputs)
- email, password (login form)
- loading, isLoading (loading state)
- users, questions, sessions (data arrays)
- selectedQuestionIds (bulk selection)
- filterSubject, filterDifficulty (filters)

✅ Keep these state variables:
const [showModal, setShowModal] = useState(false)
const [loading, setLoading] = useState(true)

❌ Don't change:
// State variable names are referenced in multiple places
```

### 📊 Form Submission & Data Flow
```
❌ DO NOT modify:
- e.preventDefault() in form handlers
- e.stopPropagation() in nested handlers
- Form data collection before submission
- supabase RPC call: supabase.rpc('create_user_with_role', {...})
- Data mapping: users.map(), items.filter()

✅ Keep the flow:
try {
  const { error } = await signIn(email, password)
  if (error) setError(error.message)
  else navigate('/dashboard')
}

❌ Don't break error handling
```

### 📊 Data Mapping & Rendering
```
❌ DO NOT change how data is mapped/filtered
❌ DO NOT remove conditional rendering logic
❌ DO NOT modify display keys

✅ Keep data structure:
{users.map((user) => (
  <div key={user.id}>{user.name}</div>
))}

❌ Don't break it:
// Don't change the key, don't change how data is accessed
```

### 🔐 Authentication & Authorization
```
❌ DO NOT remove role checks
❌ DO NOT remove RoleGuard components
❌ DO NOT modify useAuth() hook usage
❌ DO NOT change redirect logic

✅ Keep auth logic:
{user?.role === 'admin' && <AdminFeature />}
const { user, isLoading, isAuthenticated, signIn, signOut } = useAuth()

❌ Don't remove it:
// If permission check exists, keep it
// Role checks must be preserved for security
```

### 📍 Navigation & Route Protection
```
❌ DO NOT change useNavigate() usage
❌ DO NOT modify navigate() call parameters
❌ DO NOT remove redirects after auth state change
❌ DO NOT change route paths

✅ Keep navigation:
navigate('/dashboard')
navigate('/login')
<Navigate to="/login" replace />

❌ Don't break:
// Navigation paths and logic control the entire app flow
```

### 🎣 Critical Hooks
```
❌ DO NOT remove or rename:
- useAuth() - returns user, isLoading, isAuthenticated, signIn, signOut
- useNavigate() - for page navigation
- useState() - form state management
- useEffect() - data loading on component mount

✅ Keep these exact names and usage
```

### 📤 Component Exports
```
❌ DO NOT rename exported components
❌ DO NOT change default exports
❌ DO NOT modify import paths

✅ Keep:
export default LoginPage;
export { Button };
export { RoleGuard };

❌ Don't change:
export { Button as PrimaryButton }; // ✗ Breaks imports elsewhere
```

### 🔌 Component Imports
```
❌ DO NOT change import paths
❌ DO NOT rename imported components
❌ DO NOT remove hook imports (useAuth, useNavigate, etc)

✅ Keep imports:
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

❌ Don't break them:
import { PrimaryButton } from '@/components/ui/primary-button'; // ✗
```

### 🎭 CSS Classes Used by Logic
```
❌ DO NOT rename classes used for selectors
❌ DO NOT remove classes that trigger styling
❌ DO NOT change aria-* attributes

✅ Keep these:
<div className="user-table"> {/* Used for styling */}
<div aria-label="user list"> {/* Accessibility */}
```

### 🔄 Component Composition
```
❌ DO NOT wrap components in new containers that change data flow
❌ DO NOT add new prop drilling
❌ DO NOT change component hierarchy if it affects state management

✅ Keep data flow the same
❌ Don't add unnecessary wrapper components
```

---

## 📋 File-by-File Guidelines

### **pages/AppShell.tsx**
**Keep:**
- `useAuth()` hook call
- `RoleGuard` wrapper logic (in main.tsx routes)
- Navigation route structure
- `navItems` array structure:
  ```
  {
    title: string
    to: string (route path)
    icon: IconComponent
    roles: ['admin', 'teacher', 'student']
  }
  ```
- Role-based filtering: `navItems.filter((item) => item.roles.includes(user?.role))`
- `user.role` checks for menu visibility
- Active navigation styling with `isActive` parameter
- `handleSignOut()` function
- `useLocation()` hook for tracking current route

**Can Change:**
- Navigation menu styling, colors, spacing
- Header layout and positioning
- Sidebar vs hamburger menu design
- Logo styling and size
- Active/inactive link colors
- Mobile menu overlay styling
- User info display styling
- Sign out button appearance

---

### **pages/LoginPage.tsx**
**Keep:**
- Form field names: `email`, `password`
- `handleSubmit()` function logic
- `signIn()` call from AuthContext
- Error message display logic

**Can Change:**
- Page background, colors, gradients
- Form layout (vertical, horizontal, modal)
- Input field styling
- Button appearance
- Welcome text and descriptions

---

### **pages/DashboardPage.tsx**
**Keep:**
- `menuItems` array structure
- Role-based filtering logic: `visibleItems`
- `user.role` checks
- Item onClick navigation

**Can Change:**
- Card layouts and grid arrangement
- Icon positioning and size
- Card colors and shadows
- Quick actions styling
- Module title styling

---

### **pages/UsersPage.tsx**
**Keep:**
- Table column structure
- Form field names in create form: `email`, `password`, `role`, `full_name`
- `handleCreateUser()` logic
- `supabase.rpc()` call

**Can Change:**
- Table styling and colors
- Modal appearance
- Form layout
- Button styles
- Table row hover effects

---

### **pages/BatchesPage.tsx**
**Keep:**
- Batch data mapping structure
- Teacher name display logic
- Card layout for batch display

**Can Change:**
- Card styling and colors
- Grid arrangement
- Typography and spacing
- Hover effects
- Badge styling

---

### **pages/CoursesPage.tsx**
**Keep:**
- Data loading logic
- Empty state condition
- Course mapping structure

**Can Change:**
- Card layouts
- Grid styling
- Empty state design
- Button styling

---

### **pages/ReportsPage.tsx**
**Keep:**
- Stats data structure
- Status indicator mapping
- Icon associations

**Can Change:**
- Stats card layout and colors
- Stats values styling
- Status indicator styling
- Section arrangement

---

### **pages/AttendanceManagementPage.tsx**
**Keep:**
- Form field names exactly:
  - `subject_id` - subject selection
  - `teacher_id` - teacher assignment
  - `scheduled_date` - attendance date
  - `start_time` - session start time
  - `end_time` - session end time
  - `room_number` - classroom/room
  - `attendance_type` - theory/practical type
  - `remarks` - additional notes
- Form state: `form` object structure with all 8 fields
- Handler functions:
  - `handleCreate(e: React.FormEvent)` - creates session
  - `handleDeleteSession(id: string)` - deletes session
  - `handleUpdateSession(id, patch)` - updates session status
  - `handleDeleteRecord(id: string)` - removes attendance record
- Data loading function: `load()` - fetches sessions, records, teachers, subjects
- Array state:
  - `sessions` - attendance sessions list
  - `records` - attendance records list
  - `teachers` - available teachers
  - `subjects` - available subjects
- useAuth() and useNavigate() hooks
- Form reset after submission: `setForm({...initial values})`
- Status field values: 'scheduled', 'active', 'completed', 'cancelled'

**Can Change:**
- Form layout and grouping
- Field styling and colors
- Input field appearance
- Sessions list card appearance
- Records list table styling
- Empty state design
- Button positioning
- Form section spacing

---

### **pages/QuestionBankPage.tsx**
**Keep:**
- Filter state variables:
  - `filterSubject` (default: 'all')
  - `filterDifficulty` (default: 'all')
- Create modal form field names:
  - `qType` - question type (multiple_choice, true_false, short_answer, essay)
  - `qText` - question text
  - `qMarks` - marks/points (default: 1)
  - `qDifficulty` - difficulty (easy, medium, hard)
  - `qSubject` - subject_id
  - `qTFAnswer` - true/false answer for T/F questions
  - `options` - array of {id, text, is_correct}
- Handler functions:
  - `fetchSubjects()` - loads available subjects
  - `fetchQuestions()` - loads questions with filters applied
  - `fetchAllQuestions()` - loads all questions
  - `handleAddQuestion()` - submits new question
  - `handleEditQuestion(id)` - edits existing question
  - `handleDeleteQuestion(id)` - deletes single question
  - `handleBulkDelete()` - deletes multiple selected
  - `handleExport()` - exports to JSON
  - `handleImport()` - imports from JSON
  - `downloadTemplate()` - downloads template
- State variables:
  - `questions` - filtered questions list
  - `allQuestions` - all questions (unfiltered)
  - `subjects` - available subjects list
  - `selectedQuestionIds` - bulk selection state
  - `showModal` - create/edit modal visibility
  - `editingQuestionId` - tracks which question being edited
  - `showDeleteConfirm` - delete confirmation dialog
  - `showImportPreview` - import preview modal
- Template payload structure with version: 1
- Duplicate detection logic with normalizeQuestionKey()
- Question type options: ['multiple_choice', 'true_false', 'short_answer', 'essay']
- Difficulty options: ['easy', 'medium', 'hard']
- Options array must have: id, text, is_correct (boolean)

**Can Change:**
- Filter dropdown styling
- Question card layouts
- Modal appearance and positioning
- Modal form layout
- Typography and colors
- Button styles
- Table styling (if used)
- Empty state design
- Loading indicator styling

---

### **components/ui/button.tsx**
**Keep:**
- Export name: `Button`
- Props interface
- Variant types (if any)
- Size options (if any)

**Can Change:**
- Button colors and backgrounds
- Padding and sizing
- Border radius
- Hover/active states
- Font styling

---

### **components/ui/card.tsx**
**Keep:**
- Component name and exports
- Props structure
- Children rendering

**Can Change:**
- Card background color
- Border styling
- Shadow effects
- Padding
- Corner radius

---

### **components/ui/input.tsx**
**Keep:**
- Component export name
- Props interface
- HTML input attributes

**Can Change:**
- Input styling and colors
- Border appearance
- Padding
- Focus states
- Placeholder styling

---

### **components/ui/label.tsx**
**Keep:**
- Component export name
- Props structure
- htmlFor attribute support

**Can Change:**
- Label color and font
- Size and weight
- Spacing
- Positioning

---

### **index.css**
**Keep:**
- Global selector logic (if any)
- Animation dependencies

**Can Change:**
- Global colors
- Font definitions
- Animation timings
- Base styles
- Utility classes

---

### **config/tailwind.config.js**
**Keep:**
- Config structure
- Plugin requirements

**Can Change:**
- Color palette
- Font families
- Spacing scale
- Border radius values
- Custom utilities

---

## 🎭 Critical Data Structures & Logic

### Active State & NavLink Logic
```
❌ DO NOT change NavLink className function:
className={({ isActive }) => ...}

✅ Keep the active state logic:
className={({ isActive }) =>
  `flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition-all ${
    isActive ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-600 hover:bg-slate-100'
  }`
}

❌ Don't remove isActive - it tracks current page
```

### Data Mapping & Filtering (CRITICAL LOGIC)
```
❌ DO NOT change how data is mapped or filtered:
- visibleNav.filter((item) => item.roles.includes(user?.role))
- users.map((u) => ...)
- items.filter((item) => item.roles.includes(user.role))
- questions.filter((q) => ...)

✅ Keep the filter logic:
const visibleNav = navItems.filter((item) => 
  item.roles.includes(user?.role || 'student')
)

❌ Don't modify filtering - it's role-based security
```

### Component Key Props & Structure
```
❌ DO NOT change:
- key={user.id} in map functions
- key={item.path} in map functions
- Display key structure in tables
- NavLink 'to' prop values

✅ Keep:
{users.map((user) => (
  <div key={user.id}>{user.name}</div>
))}

<NavLink key={item.to} to={item.to}>

❌ Don't break:
// Key props are crucial for React rendering
// to props control navigation
```

### Accessibility & Semantic Attributes
```
❌ DO NOT remove or change:
- aria-label attributes
- htmlFor attributes (label for input)
- role attributes (if present)
- type attributes (email, password, submit, etc)

✅ Keep these:
<Label htmlFor="email">Email</Label>
<Input id="email" type="email" ... />
<button aria-label="Open navigation">

❌ Don't break:
// Accessibility is important for all users
```

### Type Interfaces (DO NOT MODIFY)
```
❌ DO NOT change TypeScript interfaces:

interface UserRole = 'admin' | 'teacher' | 'student'

interface User {
  id: string
  email: string
  full_name: string
  role: UserRole
  student_id?: string | null
  teacher_id?: string | null
  created_at: string
}

type QuestionType = 'multiple_choice' | 'true_false' | 'short_answer' | 'essay'
type Difficulty = 'easy' | 'medium' | 'hard'

✅ Keep these type definitions
❌ Changing types breaks data handling
```

### CSS Utility Usage
```
❌ DO NOT change:
- cn() utility function from lib/utils
- className attribute structure
- Tailwind class combinations that affect logic

✅ Use cn() correctly:
import { cn } from '@/lib/utils'
className={cn('base-class', {
  'conditional-class': condition
}, className)}

❌ Don't remove cn() usage - it handles class merging
```

---

### Rule 1: Test After Changes
```
After each file redesign:
1. Run: npm run build
2. Check for TypeScript errors
3. Test the feature in browser
4. Verify form submissions work
5. Verify navigation works
```

### Rule 2: Preserve Imports
```
❌ Wrong:
import { MyButton } from '@/components/ui/button'; // Changed export name

✅ Right:
import { Button } from '@/components/ui/button'; // Keep original export
```

### Rule 3: Keep Data Flow
```
❌ Wrong:
const userData = transformData(user); // Changed prop name
<UserCard data={userData} />

✅ Right:
<UserCard user={user} /> // Keep prop name as is
```

### Rule 4: Maintain Handler Contracts
```
❌ Wrong:
onClick={() => deleteUser(id)} // Function name changed

✅ Right:
onClick={() => handleDelete(id)} // Keep original handler name
```

---

## ✅ Verification Checklist Before Merge

- [ ] All TypeScript builds with zero errors
- [ ] All form submissions work (try creating user, logging in, etc)
- [ ] All navigation links work correctly
- [ ] Role-based access control still enforces restrictions
- [ ] All tables render with data
- [ ] All modals open/close properly
- [ ] All buttons trigger correct actions
- [ ] No console errors in browser DevTools
- [ ] Responsive layout works (test with different viewport sizes)
- [ ] All imports still resolve correctly
- [ ] Component prop interfaces unchanged

---

## 🔄 Merge Back to Main

Once redesign is complete and verified:

1. Copy redesigned files from `MyUpgradeUiDesign/` back to `src/`
2. Run `npm run build` to confirm
3. Test the application in browser
4. Commit changes

---

## 📞 Questions About What to Change?

**Ask yourself:**
1. "Does this change affect how data flows?" → DON'T change it
2. "Does this change affect form submission?" → DON'T change it
3. "Does this only affect how it looks?" → SAFE to change it
4. "Does this change prop names or imports?" → DON'T change it
5. "Does this modify authentication logic?" → DON'T change it

---

---

## ⚠️ Critical Mistakes to Avoid When Redesigning

### ❌ Form Field Name Changes (System Breaking)
```
WRONG - These will break everything:
- Email field: "email" → "user_email"
- Password field: "password" → "pwd"
- Role field: "role" → "userRole"
- Subject: "subject_id" → "subject"

RIGHT:
Keep ALL form field names EXACTLY as they are
Form submission depends on correct field names
```

### ❌ Handler Function Renames (Feature Breaking)
```
WRONG:
handleCreate → submitForm
handleDelete → removeItem
handleSubmit → formSubmit

RIGHT:
Keep function names exactly as they are
onClick, onChange handlers reference these by name
```

### ❌ State Variable Changes
```
WRONG:
showModal → isOpen
loading → isLoading
users → userList
email → userEmail

RIGHT:
Keep state variable names unchanged
If one is changed, all references break
```

### ❌ Role Value Mistakes
```
WRONG:
'Admin' (capitalized)
'ADMIN' (all caps)
'adm' (abbreviated)
'administrator' (different)

RIGHT:
ONLY these three:
'admin' (lowercase)
'teacher' (lowercase)
'student' (lowercase)
```

### ❌ Import/Export Changes
```
WRONG:
import Button from '@/components/ui/button' // Changed to default export
export { MyButton } // Changed export name

RIGHT:
import { Button } from '@/components/ui/button' // Keep named export
export { Button } // Keep original name
```

### ❌ Navigation Path Changes
```
WRONG:
to="/user-management" (changed from "/users")
to="/page/dashboard" (added prefix)
navigate('/home') (changed from navigate('/dashboard'))

RIGHT:
to="/users"
to="/dashboard"
navigate('/dashboard')
Keep all paths EXACTLY as they are
```

### ❌ Filter Logic Corruption
```
WRONG:
navItems.filter(i => i.roles.some(r => r === user.role))
users.filter(u => u.active) (added new condition)

RIGHT:
navItems.filter(item => item.roles.includes(user.role))
Keep filtering logic unchanged
```

### ❌ useAuth Hook Issues
```
WRONG:
const user = getUser() // Using different hook
const auth = useAuth() // Changed variable name

RIGHT:
const { user, isLoading, isAuthenticated, signIn, signOut } = useAuth()
Always use exact destructuring
```

### ❌ Modal State Naming
```
WRONG:
showQuestion (inconsistent naming)
isUserModalOpen (too specific)
displayAdd (unclear)

RIGHT:
showModal
showAddModal
showImportPreview
Keep consistent naming patterns
```

### ❌ Type/Difficulty/QuestionType Values
```
WRONG for Question Types:
'mcq' → should be 'multiple_choice'
'tf' → should be 'true_false'
'sa' → should be 'short_answer'

WRONG for Difficulty:
'E' → should be 'easy'
'MED' → should be 'medium'
'H' → should be 'hard'

RIGHT:
Only use exact values from type definition
```

---

## 🔍 Quick Reference: What Breaks What

| Change | Impact | Severity |
|--------|--------|----------|
| Form field name | Form submissions fail | 🔴 CRITICAL |
| Handler function name | Button clicks do nothing | 🔴 CRITICAL |
| Role value (typo) | Authorization fails | 🔴 CRITICAL |
| State variable name | Feature stops working | 🔴 CRITICAL |
| Import path | Page won't load | 🔴 CRITICAL |
| Route path | Navigation fails | 🔴 CRITICAL |
| useAuth() hook name | User data unavailable | 🔴 CRITICAL |
| NavLink structure | Active state doesn't work | 🟠 HIGH |
| Filter logic | Wrong data displays | 🟠 HIGH |
| Type interface | Type mismatches | 🟠 HIGH |
| Button variant | Wrong styling | 🟢 LOW |
| Card spacing | Layout issues | 🟢 LOW |
| Color values | Visual issues | 🟢 LOW |

---

## ✅ Smart Redesign Strategy

**Start Safe:**
1. Change ONLY styling first (colors, spacing, fonts)
2. Keep ALL logic, handlers, state names unchanged
3. Build and test before making more changes

**Gradually Add:**
4. After styling works, try layout changes
5. Keep component hierarchy the same
6. Don't add/remove any HTML elements if they have event handlers

**Never Touch:**
❌ Form field names
❌ Handler functions
❌ State variables
❌ Role values
❌ Import paths
❌ Route paths
❌ Type interfaces
❌ Data mapping logic

---

## 🧪 Test-Driven Redesign Process

**After each file change:**
1. `npm run build` → Must have 0 errors
2. Open browser
3. Test the specific feature
4. Verify no console errors (F12 → Console)
5. If something breaks, immediately revert that change

**After all files redesigned:**
1. Complete verification checklist
2. Test every feature end-to-end
3. Only then commit changes

---

**High Impact Design Improvements:**
- Modern color palette (dark mode, accent colors)
- Better typography hierarchy
- Improved spacing and whitespace
- Smooth animations and transitions
- Better form input styling
- Enhanced button hover states
- Card shadow and depth effects
- Responsive grid improvements
- Better empty states
- Improved table styling

---

## 📦 Frontend Frameworks & Dependencies - MUST MAINTAIN

> **⚠️ CRITICAL**: These frameworks form the **structural backbone** of the application. Do NOT change them.

---

### 🎯 Core Frameworks (DO NOT MODIFY)

#### **1. React 18+**
- **Purpose**: Component library and UI rendering engine
- **Critical Features**:
  - Functional components with hooks
  - `useState()`, `useEffect()`, `useContext()`
  - JSX syntax
- **Must Keep**: React version 18 or higher
- **Breaking Risk**: 🔴 CRITICAL

#### **2. React Router v6+**
- **Purpose**: Client-side routing and navigation
- **Critical Components**:
  - `<BrowserRouter>`, `<Routes>`, `<Route>`, `<Outlet>`, `<Navigate>`, `<NavLink>`
- **Critical Hooks**:
  - `useNavigate()` - navigate to routes
  - `useLocation()` - get current route
- **Must Keep**: Version 6 or higher
- **Breaking Risk**: 🔴 CRITICAL (changing routes/navigation breaks entire app)

#### **3. TypeScript**
- **Purpose**: Static type checking
- **Critical Features**:
  - Strict mode enabled
  - Type definitions for all props
  - Interface definitions
- **Must Keep**: TypeScript strict mode
- **Breaking Risk**: 🔴 CRITICAL (removing types causes runtime errors)

#### **4. Tailwind CSS**
- **Purpose**: Utility-first CSS framework for styling
- **Critical Features**:
  - Utility classes (px-, py-, bg-, text-, etc.)
  - Responsive breakpoints (sm:, md:, lg:)
  - `tailwind.config.js` customization
- **Must Keep**: Tailwind as styling framework
- **Breaking Risk**: 🟠 HIGH (removing causes complete styling loss)

---

### 🎭 Icon & UI Library

#### **5. Lucide React**
- **Purpose**: SVG icon library (30+ icons used)
- **Icons Used**:
  - Navigation: Menu, X, LayoutGrid, Users2, BookOpen, CalendarDays, ClipboardList, BarChart3, FileQuestion
  - Actions: LogOut, User, ArrowLeft, Edit2, Trash2, Plus, Download, Upload
  - Status: CheckCircle2, AlertCircle, ShieldCheck, Sparkles, LockKeyhole, BookOpenCheck
- **Must Keep**: Lucide React for all icons
- **Breaking Risk**: 🟠 HIGH (icons disappear if replaced)

#### **6. Custom UI Components**
- **Files**: `src/components/ui/button.tsx`, `card.tsx`, `input.tsx`, `label.tsx`, `logo.tsx`
- **Purpose**: Reusable component primitives
- **Must Keep**: All component files and exports
- **Breaking Risk**: 🔴 CRITICAL (components won't load if renamed)

---

### 🔐 Backend & Authentication

#### **7. Supabase JS Client**
- **Purpose**: PostgreSQL database and authentication
- **Critical Methods**:
  - Auth: `getSession()`, `signInWithPassword()`, `signOut()`, `onAuthStateChange()`
  - Database: `from('table').select()`, `.insert()`, `.update()`, `.delete()`
  - RPC: `supabase.rpc('create_user_with_role', {params})`
- **Environment Variables**:
  - `VITE_SUPABASE_URL=https://umkoscbcijevkwimkfdj.supabase.co`
  - `VITE_SUPABASE_ANON_KEY=...`
- **Must Keep**: Supabase as backend service
- **Breaking Risk**: 🔴 CRITICAL (no database = no data)

#### **8. React Context API**
- **Purpose**: Global auth state management
- **File**: `src/context/AuthContext.tsx`
- **Hook**: `useAuth()` - returns `{user, isLoading, isAuthenticated, signIn, signOut}`
- **Must Keep**: Context API for auth
- **Breaking Risk**: 🔴 CRITICAL (losing auth breaks everything)

#### **9. Custom RoleGuard Component**
- **File**: `src/components/RoleGuard.tsx`
- **Purpose**: Protect routes by user role
- **Props**: `allowedRoles: ['admin'|'teacher'|'student']`, `children`
- **Usage**: `<RoleGuard allowedRoles={['admin']}><Page /></RoleGuard>`
- **Must Keep**: RoleGuard for authorization
- **Breaking Risk**: 🔴 CRITICAL (security breach if removed)

---

### 🏗️ Build & Development

#### **10. Vite 7.3.6+**
- **Purpose**: Fast build tool and dev server
- **Files**: `vite.config.ts`, `vite.config.js`
- **Commands**:
  - `npm run dev` - start dev server
  - `npm run build` - production build
- **Must Keep**: Vite as build tool
- **Breaking Risk**: 🟢 LOW (build config changes unlikely to break UI)

#### **11. npm & package.json**
- **Purpose**: Dependency management
- **Critical Packages** (DO NOT REMOVE):
  - `react`
  - `react-dom`
  - `react-router-dom`
  - `typescript`
  - `tailwindcss`
  - `lucide-react`
  - `@supabase/supabase-js`
- **Must Keep**: All dependencies listed
- **Breaking Risk**: 🟠 HIGH (missing packages = broken app)

---

### 🧠 State & Utilities

#### **12. React Hooks** (DO NOT RENAME)
```
✅ MUST USE (exact names):
- useState() - for state variables
- useEffect() - for side effects
- useContext() - for consuming context
- useRef() - for DOM references

✅ From React Router:
- useNavigate() - for navigation
- useLocation() - for current route

✅ From Custom:
- useAuth() - for auth state
```

#### **13. Utility Functions**
- **File**: `src/lib/utils.ts`
- **Critical Function**: `cn()` - Tailwind class merging
- **File**: `src/lib/attendance.ts`
- **Functions**: `getSessions()`, `createSession()`, `updateSession()`, `deleteSession()`, `getRecords()`, `getSubjects()`, `getTeachers()`
- **Must Keep**: All utility functions
- **Breaking Risk**: 🟠 HIGH (missing utilities break features)

---

### 📝 Type System & Interfaces

#### **14. TypeScript Interfaces** (DO NOT MODIFY)
```typescript
type UserRole = 'admin' | 'teacher' | 'student'

interface User {
  id: string
  email: string
  full_name: string
  role: UserRole
  student_id?: string | null
  teacher_id?: string | null
  created_at: string
}

type QuestionType = 'multiple_choice' | 'true_false' | 'short_answer' | 'essay'
type Difficulty = 'easy' | 'medium' | 'hard'
```
- **File**: `src/types/database.types.ts`
- **Must Keep**: All type definitions
- **Breaking Risk**: 🔴 CRITICAL (type changes break data validation)

---

## 🚫 What NOT to Replace/Change

| Framework | Current | ❌ Don't Change To |
|-----------|---------|------------------|
| React | 18+ | Vue, Angular, Svelte |
| React Router | v6+ | Reach Router, TanStack Router |
| Tailwind CSS | Latest | CSS Modules, styled-components |
| TypeScript | Strict | JavaScript, `any`-type |
| Supabase | PostgreSQL | Firebase, MongoDB |
| Lucide Icons | React | FontAwesome, Material Icons |
| Context API | Current | Redux, Zustand, Jotai |
| Vite | 7.3.6+ | Webpack, Create React App |

---

## ✅ Framework Dependency Architecture

```
App Entry (main.tsx)
├── React (renders components)
├── React Router (handles routing)
│   ├── BrowserRouter
│   ├── Routes & Route
│   └── Outlet
├── AuthProvider (Context API)
│   ├── useAuth hook
│   └── Supabase Auth
├── UI Components
│   ├── Button (Tailwind)
│   ├── Card (Tailwind)
│   ├── Input (Tailwind)
│   └── Label (Tailwind)
├── Icons (Lucide React)
├── Database (Supabase Client)
│   ├── Auth methods
│   ├── CRUD methods
│   └── RPC calls
└── Styling (Tailwind CSS)
    └── Utility classes
```

---

## 🎯 Critical System Dependencies

These must remain intact for the app to function:

1. ✅ **React 18+** - Core rendering
2. ✅ **React Router v6+** - Navigation & routing
3. ✅ **TypeScript** - Type safety
4. ✅ **Tailwind CSS** - Styling framework
5. ✅ **Supabase JS Client** - Backend connectivity
6. ✅ **React Context API** - Auth state management
7. ✅ **Lucide React** - Icons
8. ✅ **Vite 7.3.6+** - Build tool
9. ✅ **RoleGuard Component** - Authorization layer
10. ✅ **TypeScript Interfaces** - Data validation

---

## 🚨 If You Change These, Everything Breaks

| Change | Result | Severity |
|--------|--------|----------|
| Remove Supabase client | No database connection | 🔴 CRITICAL |
| Change role strings ('admin' → 'Admin') | Authorization fails | 🔴 CRITICAL |
| Remove RoleGuard | Security breach | 🔴 CRITICAL |
| Change form field names | Form submission fails | 🔴 CRITICAL |
| Remove React Router | Navigation broken | 🔴 CRITICAL |
| Remove TypeScript | Type errors everywhere | 🔴 CRITICAL |
| Remove Tailwind CSS | All styling lost | 🔴 CRITICAL |
| Remove useAuth hook | Login/auth broken | 🔴 CRITICAL |
| Change component exports | Import errors | 🔴 CRITICAL |
| Modify type interfaces | Data validation broken | 🔴 CRITICAL |
| Replace button component | UI components don't work | 🟠 HIGH |
| Change Supabase tables | Data queries fail | 🟠 HIGH |
| Remove npm packages | Dependencies missing | 🟠 HIGH |

---

## ✅ Safe to Customize

You are SAFE to customize these frameworks:
- ✨ **Tailwind**: Modify colors, fonts, spacing in `tailwind.config.js`
- 🎨 **CSS**: Add animations and transitions in `index.css`
- 🎭 **Icons**: Reposition or resize lucide icons (keep import)
- 💅 **Components**: Redesign UI while keeping props/exports
- 📝 **TypeScript**: Add new types, but don't modify existing ones

---

## 📋 Framework Checklist Before Redesign

Before starting your UI redesign, verify:

- [ ] React 18+ installed (check `package.json`)
- [ ] React Router v6+ installed
- [ ] TypeScript strict mode enabled (`tsconfig.json`)
- [ ] Tailwind CSS configured (`tailwind.config.js`)
- [ ] Supabase environment variables set (`.env`)
- [ ] All UI components exported correctly
- [ ] `useAuth()` hook available
- [ ] RoleGuard component exists
- [ ] `npm run build` completes with 0 errors
- [ ] Dev server starts with `npm run dev`

---

**Remember**: These frameworks are the **app's foundation**. Your redesign only touches the **presentation layer** (colors, spacing, layout) — NOT the frameworks themselves! 🎨

---

**Happy Redesigning! 🚀**

Remember: You're only changing the *appearance*, not the *functionality*.
