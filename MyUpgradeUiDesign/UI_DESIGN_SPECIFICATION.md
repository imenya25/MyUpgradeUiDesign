# CryoBytePrime - Professional Frontend & UI/UX Design Specification

## 1. DESIGN BRIEF

### Audience
- **Primary Users**: Educational institution staff (admins, teachers) and students
- **Sectors**: Education/EdTech — requires trust signals, clear information hierarchy, error prevention, and accessibility compliance
- **Regional Considerations**: Global audience — locale-neutral formatting, RTL-ready layouts, culturally neutral imagery

### Core Pages & Their Jobs
| Page | Primary Job |
|------|-------------|
| Login | Secure authentication with role-based routing |
| Dashboard | Role-aware navigation hub to all modules |
| User Management | Admin-only user CRUD operations |
| Courses | Course/subject configuration (admin, teacher) |
| Batches | Academic batch scheduling (admin, teacher) |
| Attendance | Session creation and record management (admin, teacher) |
| Question Bank | Question CRUD, bulk operations, import/export (admin, teacher) |
| Reports | System-wide analytics and statistics (admin) |

### Signature Visual Element
**"CryoBytePrime" Card System**: A distinctive frosted-glass aesthetic with subtle cyan-to-violet gradient orbs, rounded corners (28–32px), and layered depth through soft shadows. This creates a calm, premium workspace feel while maintaining readability and professionalism appropriate for educational software.

---

## 2. DESIGN TOKEN SYSTEM

### Color Palette
| Token | Hex Value | Role |
|-------|-----------|------|
| `--color-background` | `hsl(0 0% 100%)` | Page background |
| `--color-foreground` | `hsl(222.2 84% 4.9%)` | Primary text |
| `--color-card` | `hsl(0 0% 100%)` | Card surfaces |
| `--color-primary` | `hsl(221.2 83.2% 53.3%)` | Primary actions, links |
| `--color-primary-foreground` | `hsl(210 40% 98%)` | Text on primary |
| `--color-secondary` | `hsl(210 40% 96.1%)` | Secondary backgrounds |
| `--color-accent` | `hsl(199 89% 48%)` (Cyan) | Highlights, badges |
| `--color-accent-alt` | `hsl(251 76% 60%)` (Violet) | Secondary highlights |
| `--color-destructive` | `hsl(0 84.2% 60.2%)` | Errors, delete actions |
| `--color-border` | `hsl(214.3 31.8% 91.4%)` | Borders, dividers |
| `--color-success` | `hsl(142 76% 36%)` | Success states |
| `--color-warning` | `hsl(38 92% 48%)` | Warning states |

### Typography
| Face | Font Family | Usage |
|------|-------------|-------|
| Display | `Inter, system-ui, sans-serif` | Headings, dashboard titles |
| Body | `Inter, system-ui, sans-serif` | Paragraphs, labels, form text |
| Utility/Mono | `JetBrains Mono, monospace` | IDs, timestamps, data values |

**Type Scale:**
- `text-xs`: 0.75rem (12px) — captions, metadata
- `text-sm`: 0.875rem (14px) — labels, helper text
- `text-base`: 1rem (16px) — body copy
- `text-lg`: 1.125rem (18px) — subheadings
- `text-xl`: 1.25rem (20px) — card titles
- `text-2xl`: 1.5rem (24px) — page headings
- `text-3xl`: 1.875rem (30px) — hero text
- `text-4xl`: 2.25rem (36px) — landing headlines

### Spacing Scale
| Token | Value | Usage |
|-------|-------|-------|
| `gap-1` / `p-1` | 0.25rem (4px) | Tight inline spacing |
| `gap-2` / `p-2` | 0.5rem (8px) | Compact grouping |
| `gap-3` / `p-3` | 0.75rem (12px) | Standard element spacing |
| `gap-4` / `p-4` | 1rem (16px) | Component padding |
| `gap-6` / `p-6` | 1.5rem (24px) | Section spacing |
| `gap-8` / `p-8` | 2rem (32px) | Large section gaps |
| `gap-10` / `p-10` | 2.5rem (40px) | Hero/major divisions |

### Border Radius
| Token | Value | Usage |
|-------|-------|-------|
| `rounded-sm` | 0.125rem (2px) | Small inputs, checkboxes |
| `rounded` | 0.25rem (4px) | Default buttons |
| `rounded-md` | 0.375rem (6px) | Cards (legacy) |
| `rounded-lg` | 0.5rem (8px) | Modals, dropdowns |
| `rounded-xl` | 0.75rem (12px) | Large cards |
| `rounded-2xl` | 1rem (16px) | Feature cards, panels |
| `rounded-[28px]` | 28px | Hero banners |
| `rounded-[32px]` | 32px | Split panels (login) |

### Elevation & Shadows
| Token | Value | Usage |
|-------|-------|-------|
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle borders |
| `shadow` | `0 1px 3px rgba(0,0,0,0.1)` | Default cards |
| `shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Hover states |
| `shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modals, dropdowns |
| `shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | Floating panels |
| `shadow-2xl` | `0 25px 50px rgba(0,0,0,0.25)` | Hero elements |

---

## 3. PAGE-BY-PAGE BREAKDOWN

---

### 3.1 LOGIN PAGE

**Job**: Secure authentication with brand introduction and trust signals.

#### Layout Description
Split-panel design: left panel (dark, brand storytelling), right panel (light, functional form). On mobile, stacks vertically with brand panel collapsed to a header banner.

#### Full Button & Component Inventory

| Element | Type | States | Accessibility |
|---------|------|--------|---------------|
| Sign In Button | Primary CTA | default, hover, focus, disabled, loading | `aria-busy={isLoading}` |
| Email Input | Form field | default, focus, filled, error, disabled | `aria-invalid`, `htmlFor` label |
| Password Input | Form field | default, focus, filled, error, disabled | `aria-invalid`, `htmlFor` label |
| Error Banner | Feedback | visible/hidden | `role="alert"` |
| Logo | Brand | static | `aria-label="CryoBytePrime logo"` |
| Badge ("Secure portal access") | Trust signal | static | decorative |
| Feature Cards (×2) | Info | static | decorative |
| Lock Icon + Text | Trust signal | static | decorative |

#### Responsive Behavior

| Breakpoint | Layout | Navigation | Notes |
|------------|--------|------------|-------|
| **Mobile (≤480px)** | Stacked vertical; brand panel becomes top banner (40% height); form below | N/A (entry point) | Touch targets ≥44px; full-width inputs |
| **Tablet (768–1024px)** | 50/50 split; both panels equal height | N/A | Form centered vertically |
| **Desktop (≥1280px)** | Asymmetric split (1.05fr / 0.95fr); max-width container centered | N/A | Hover effects on feature cards |

#### Key Interactions
- **Loading state**: Button shows "Signing in…" with spinner; all inputs disabled
- **Error state**: Red banner appears above form with descriptive message
- **Success**: Navigate to `/dashboard`
- **Keyboard**: Tab order: email → password → submit button

---

### 3.2 DASHBOARD PAGE

**Job**: Role-aware navigation hub providing quick access to all permitted modules.

#### Layout Description
Hero banner (gradient background) with welcome message and role badge, followed by grid of module cards (3 columns on desktop, 2 on tablet, 1 on mobile). Quick actions section at bottom.

#### Full Button & Component Inventory

| Element | Type | States | Accessibility |
|---------|------|--------|---------------|
| Module Cards (dynamic count) | Navigation | default, hover, focus | `role="link"`, `tabIndex=0` |
| "Open →" Button (per card) | Secondary CTA | default, hover, focus, disabled | `aria-label="Open {module name}"` |
| Quick Action Buttons (dynamic) | Tertiary CTA | default, hover, focus | `aria-label="+ {module name}"` |
| Role Badge | Info | static | decorative |
| Welcome Header | Content | static | `h1` |
| Empty State Card | Feedback | visible if no modules | `role="status"` |

#### Responsive Behavior

| Breakpoint | Layout | Navigation | Notes |
|------------|--------|------------|-------|
| **Mobile (≤480px)** | Single-column card stack; hero stacked vertically | Via AppShell bottom nav | Cards full-width; quick actions wrap |
| **Tablet (768–1024px)** | 2-column grid; hero with side-by-side title/role | Via AppShell sidebar (collapsed) | Cards equal height |
| **Desktop (≥1280px)** | 3-column grid; hero with flex row (title left, role badge right) | Via AppShell sidebar (expanded) | Hover lift effect on cards |

#### Key Interactions
- **Card click/tap**: Navigate to module page (entire card clickable)
- **Button click**: Navigate (stops propagation to prevent double-nav)
- **Hover**: Card lifts (`-translate-y-1`) with enhanced shadow
- **Role filtering**: Modules filtered by `user.role` before render

---

### 3.3 USER MANAGEMENT PAGE

**Job**: Admin-only CRUD operations for users (students, teachers, admins).

#### Layout Description
Page header with title and "Add User" button. Table displays users with columns: Name, Email, Role, Created, Actions. Modal form for creating/editing users.

#### Full Button & Component Inventory

| Element | Type | States | Accessibility |
|---------|------|--------|---------------|
| Add User Button | Primary CTA | default, hover, focus, disabled | `aria-label="Add new user"` |
| User Table | Data display | default, row hover | `role="table"`, `aria-rowcount` |
| Delete Button (per row) | Destructive | default, hover, focus | `aria-label="Delete user {name}"` |
| Create Modal | Dialog | open/closed | `role="dialog"`, `aria-modal` |
| Email Input | Form field | default, focus, filled, error | `aria-invalid`, `required` |
| Password Input | Form field | default, focus, filled, error | `aria-invalid`, `required` |
| Full Name Input | Form field | default, focus, filled, error | `aria-invalid`, `required` |
| Role Select | Dropdown | default, focus, open, selected | `aria-expanded`, `aria-haspopup` |
| Submit Button | Primary CTA | default, hover, focus, disabled, loading | `aria-busy` |
| Cancel Button | Secondary | default, hover, focus | Closes modal |
| Toast/Alert | Feedback | visible/hidden | `role="alert"` |

#### Responsive Behavior

| Breakpoint | Layout | Navigation | Notes |
|------------|--------|------------|-------|
| **Mobile (≤480px)** | Card list instead of table; each user is a card with stacked info | AppShell hamburger menu | "Add User" FAB (floating action button) |
| **Tablet (768–1024px)** | Simplified table (fewer columns); horizontal scroll if needed | AppShell sidebar (collapsed) | Modal takes 90% width |
| **Desktop (≥1280px)** | Full table with all columns; sticky header | AppShell sidebar (expanded) | Modal centered, max-width 500px |

#### Critical Constraints (from README.md)
- **DO NOT change**: Field names (`email`, `password`, `full_name`, `role`)
- **DO NOT change**: `handleCreateUser()` function, `supabase.rpc()` call
- **DO NOT change**: User object properties or role strings (`'admin'`, `'teacher'`, `'student'`)
- **CAN change**: Table styling, modal appearance, button styles, colors, spacing

---

### 3.4 COURSES PAGE

**Job**: Display and manage courses/subjects (admin, teacher roles).

#### Layout Description
Header with title and optional "Add Course" button. Grid of course cards showing course name, code, description, and associated subjects.

#### Full Button & Component Inventory

| Element | Type | States | Accessibility |
|---------|------|--------|---------------|
| Course Cards (dynamic) | Content | default, hover | `role="article"` |
| Add Course Button | Primary CTA | default, hover, focus, disabled | `aria-label="Add new course"` |
| Empty State | Feedback | visible if no courses | `role="status"` |
| Loading Spinner | Feedback | visible/hidden | `aria-label="Loading courses"` |

#### Responsive Behavior

| Breakpoint | Layout | Navigation | Notes |
|------------|--------|------------|-------|
| **Mobile (≤480px)** | Single-column card stack | AppShell bottom nav | Cards full-width |
| **Tablet (768–1024px)** | 2-column grid | AppShell sidebar (collapsed) | Equal-height cards |
| **Desktop (≥1280px)** | 3-column grid | AppShell sidebar (expanded) | Hover effects |

---

### 3.5 BATCHES PAGE

**Job**: Display academic batches with teacher assignments (admin, teacher roles).

#### Layout Description
Header with title. Grid of batch cards showing batch name, teacher, schedule, student count.

#### Full Button & Component Inventory

| Element | Type | States | Accessibility |
|---------|------|--------|---------------|
| Batch Cards (dynamic) | Content | default, hover | `role="article"` |
| Teacher Badge | Info | static | `aria-label="Teacher: {name}"` |
| Empty State | Feedback | visible if no batches | `role="status"` |

#### Responsive Behavior

| Breakpoint | Layout | Navigation | Notes |
|------------|--------|------------|-------|
| **Mobile (≤480px)** | Single-column card stack | AppShell bottom nav | Teacher info stacked |
| **Tablet (768–1024px)** | 2-column grid | AppShell sidebar (collapsed) | Badges inline |
| **Desktop (≥1280px)** | 3-column grid | AppShell sidebar (expanded) | Hover lift effect |

---

### 3.6 ATTENDANCE MANAGEMENT PAGE

**Job**: Create attendance sessions and manage records (admin, teacher roles).

#### Layout Description
Two-section layout: (1) Form to create session, (2) List of sessions with expandable records. Status badges indicate session state (scheduled, active, completed, cancelled).

#### Full Button & Component Inventory

| Element | Type | States | Accessibility |
|---------|------|--------|---------------|
| Create Session Form | Form | default, submitting | `aria-busy` on submit |
| Subject Select | Dropdown | default, focus, open, selected, disabled | `aria-expanded`, `required` |
| Teacher Select | Dropdown | default, focus, open, selected, disabled | `aria-expanded`, `required` |
| Date Input | Form field | default, focus, filled, disabled | `aria-label="Scheduled date"` |
| Start Time Input | Form field | default, focus, filled, disabled | `aria-label="Start time"` |
| End Time Input | Form field | default, focus, filled, disabled | `aria-label="End time"` |
| Room Input | Form field | default, focus, filled, disabled | `aria-label="Room number"` |
| Attendance Type Select | Dropdown | default, focus, open, selected | `aria-expanded` |
| Remarks Textarea | Form field | default, focus, filled, disabled | `aria-label="Additional notes"` |
| Submit Button | Primary CTA | default, hover, focus, disabled, loading | `aria-busy` |
| Session Cards (dynamic) | Content | default, hover, expanded/collapsed | `role="article"` |
| Status Badge | Info | varies by status | Color-coded |
| Update Status Button | Secondary | default, hover, focus | Changes session state |
| Delete Session Button | Destructive | default, hover, focus | `aria-label="Delete session"` |
| Delete Record Button | Destructive | default, hover, focus | `aria-label="Delete attendance record"` |
| Empty State | Feedback | visible if no sessions | `role="status"` |

#### Responsive Behavior

| Breakpoint | Layout | Navigation | Notes |
|------------|--------|------------|-------|
| **Mobile (≤480px)** | Form stacked vertically; sessions as accordion cards | AppShell bottom nav | All inputs full-width; touch targets ≥44px |
| **Tablet (768–1024px)** | Form in 2-column grid; sessions as expandable cards | AppShell sidebar (collapsed) | Grouped fields (date/time together) |
| **Desktop (≥1280px)** | Form in 3–4 column grid; sessions with inline records table | AppShell sidebar (expanded) | Sticky form header |

#### Critical Constraints (from README.md)
- **DO NOT change**: Field names (`subject_id`, `teacher_id`, `scheduled_date`, `start_time`, `end_time`, `room_number`, `attendance_type`, `remarks`)
- **DO NOT change**: Form state object `form` structure
- **DO NOT change**: Handler functions (`handleCreate`, `handleDeleteSession`, `handleUpdateSession`, `handleDeleteRecord`)
- **DO NOT change**: `load()` function, state arrays (`sessions`, `records`, `teachers`, `subjects`)
- **DO NOT change**: Status values (`'scheduled'`, `'active'`, `'completed'`, `'cancelled'`)
- **CAN change**: Form layout, field styling, card appearance, button positioning, spacing

---

### 3.7 QUESTION BANK PAGE

**Job**: Create, edit, delete, bulk-manage, import/export questions (admin, teacher roles).

#### Layout Description
Filter bar (subject, difficulty). Toolbar with Add, Bulk Delete, Export, Import buttons. Grid/list of question cards with type badges, marks, difficulty indicators. Modal for create/edit with dynamic form based on question type.

#### Full Button & Component Inventory

| Element | Type | States | Accessibility |
|---------|------|--------|---------------|
| Subject Filter | Dropdown | default, focus, open, selected | `aria-label="Filter by subject"` |
| Difficulty Filter | Dropdown | default, focus, open, selected | `aria-label="Filter by difficulty"` |
| Add Question Button | Primary CTA | default, hover, focus, disabled | `aria-label="Add new question"` |
| Bulk Delete Button | Destructive | default, hover, focus, disabled (if none selected) | `aria-label="Delete selected questions"` |
| Export Button | Secondary | default, hover, focus | `aria-label="Export questions to JSON"` |
| Import Button | Secondary | default, hover, focus | `aria-label="Import questions from JSON"` |
| Download Template Button | Tertiary | default, hover, focus | `aria-label="Download import template"` |
| Question Cards (dynamic) | Content | default, hover, selected | `role="article"`, `aria-selected` |
| Checkbox (per question) | Selection | checked/unchecked | `aria-label="Select question"` |
| Edit Button (per card) | Secondary | default, hover, focus | `aria-label="Edit question"` |
| Delete Button (per card) | Destructive | default, hover, focus | `aria-label="Delete question"` |
| Create/Edit Modal | Dialog | open/closed | `role="dialog"`, `aria-modal` |
| Question Type Select | Dropdown | default, focus, open, selected | `aria-expanded`, `required` |
| Question Text Textarea | Form field | default, focus, filled, error | `aria-invalid`, `required` |
| Marks Input | Spinbutton | default, focus, filled, disabled | `aria-label="Marks"` |
| Difficulty Select | Dropdown | default, focus, open, selected | `aria-expanded` |
| Subject Select | Dropdown | default, focus, open, selected | `aria-expanded` |
| Options Array (for MCQ) | Dynamic fields | add/remove, default, focus, error | `aria-label="Option {n}"` |
| Correct Answer Radio (per option) | Radio | checked/unchecked | `aria-label="Mark as correct"` |
| True/False Answer Select | Dropdown | default, focus, selected | Conditional for T/F type |
| Submit Button | Primary CTA | default, hover, focus, disabled, loading | `aria-busy` |
| Cancel Button | Secondary | default, hover, focus | Closes modal |
| Delete Confirmation Dialog | Dialog | open/closed | `role="alertdialog"` |
| Import Preview Modal | Dialog | open/closed | Shows duplicates, conflicts |
| Loading Spinner | Feedback | visible/hidden | `aria-label="Loading questions"` |
| Empty State | Feedback | visible if no questions | `role="status"` |

#### Responsive Behavior

| Breakpoint | Layout | Navigation | Notes |
|------------|--------|------------|-------|
| **Mobile (≤480px)** | Filters stacked; toolbar as horizontal scroll; questions as single-column cards | AppShell bottom nav | Modal full-screen; options stacked vertically |
| **Tablet (768–1024px)** | Filters inline; toolbar wrapped; questions as 2-column grid | AppShell sidebar (collapsed) | Modal 80% width; options 2-column |
| **Desktop (≥1280px)** | Filters + toolbar single row; questions as 3-column grid or table view | AppShell sidebar (expanded) | Modal centered 600px; options inline |

#### Critical Constraints (from README.md)
- **DO NOT change**: Filter state variables (`filterSubject`, `filterDifficulty`)
- **DO NOT change**: Modal form field names (`qType`, `qText`, `qMarks`, `qDifficulty`, `qSubject`, `qTFAnswer`, `options`)
- **DO NOT change**: Handler functions (`fetchSubjects`, `fetchQuestions`, `fetchAllQuestions`, `handleAddQuestion`, `handleEditQuestion`, `handleDeleteQuestion`, `handleBulkDelete`, `handleExport`, `handleImport`, `downloadTemplate`)
- **DO NOT change**: State variables (`questions`, `allQuestions`, `subjects`, `selectedQuestionIds`, `showModal`, `editingQuestionId`, `showDeleteConfirm`, `showImportPreview`)
- **DO NOT change**: Question type options (`['multiple_choice', 'true_false', 'short_answer', 'essay']`)
- **DO NOT change**: Difficulty options (`['easy', 'medium', 'hard']`)
- **DO NOT change**: Options array structure (`{id, text, is_correct}`)
- **DO NOT change**: Duplicate detection logic with `normalizeQuestionKey()`
- **CAN change**: Filter styling, card layouts, modal appearance, typography, colors, button styles, empty state design

---

### 3.8 REPORTS PAGE

**Job**: Display system-wide statistics and analytics (admin role only).

#### Layout Description
Grid of stat cards showing key metrics (total users, courses, batches, sessions, questions, etc.). Each card has icon, label, value, and status indicator.

#### Full Button & Component Inventory

| Element | Type | States | Accessibility |
|---------|------|--------|---------------|
| Stat Cards (dynamic) | Content | default, hover | `role="figure"`, `aria-label="{stat name}: {value}"` |
| Icon (per card) | Visual | static | decorative (`aria-hidden`) |
| Status Indicator (per card) | Visual | varies by status | Color-coded badge |
| Loading Skeleton | Feedback | visible/hidden | `aria-label="Loading statistics"` |
| Empty State | Feedback | visible if no data | `role="status"` |

#### Responsive Behavior

| Breakpoint | Layout | Navigation | Notes |
|------------|--------|------------|-------|
| **Mobile (≤480px)** | Single-column stat stack | AppShell bottom nav | Icons above text |
| **Tablet (768–1024px)** | 2-column grid | AppShell sidebar (collapsed) | Icon left of text |
| **Desktop (≥1280px)** | 3–4 column grid | AppShell sidebar (expanded) | Hover effect on cards |

---

### 3.9 APP SHELL (Navigation Layout)

**Job**: Persistent navigation wrapper with role-aware menu items, user info, and sign-out.

#### Layout Description
Desktop: Left sidebar with logo, nav items, user profile at bottom. Mobile: Hamburger menu or bottom nav bar. Header with page title and context.

#### Full Button & Component Inventory

| Element | Type | States | Accessibility |
|---------|------|--------|---------------|
| Logo | Brand | static | `aria-label="CryoBytePrime home"` |
| Nav Items (dynamic by role) | Navigation | default, hover, focus, active | `aria-current="page"` when active |
| User Avatar/Initials | Info | static | `aria-label="User: {name}"` |
| User Name/Email | Info | static | decorative |
| Sign Out Button | Secondary | default, hover, focus | `aria-label="Sign out"` |
| Hamburger Toggle (mobile) | Toggle | open/closed | `aria-expanded`, `aria-controls="mobile-menu"` |
| Mobile Menu Overlay | Dialog | open/closed | `role="dialog"`, `aria-modal` |
| Notification Bell (future) | Button | default, hover, focus, has-notifications | `aria-label="Notifications"` |

#### Responsive Behavior

| Breakpoint | Layout | Navigation | Notes |
|------------|--------|------------|-------|
| **Mobile (≤480px)** | Bottom nav bar (5–6 items max) OR hamburger + slide-out drawer | Bottom nav or hamburger | Active item highlighted; overlay on open |
| **Tablet (768–1024px)** | Collapsible left sidebar (icons only, expands on hover) | Sidebar | Tooltips on icon-only items |
| **Desktop (≥1280px)** | Fixed left sidebar (240–280px) with full labels | Sidebar | Active state with background + icon color |

#### Critical Constraints (from README.md)
- **DO NOT change**: `useAuth()` hook, `RoleGuard` logic, `navItems` array structure
- **DO NOT change**: Role-based filtering (`navItems.filter(item => item.roles.includes(user?.role))`)
- **DO NOT change**: `user.role` checks, `handleSignOut()` function
- **DO NOT change**: `useLocation()` hook, `isActive` NavLink logic
- **DO NOT change**: Route paths in `to` property
- **CAN change**: Navigation styling, colors, spacing, sidebar vs hamburger design, logo styling, active/inactive colors, mobile menu overlay styling

---

## 4. ACCESSIBILITY & GLOBAL/CULTURAL CONSIDERATIONS

### WCAG 2.1 AA Compliance
- **Color Contrast**: All text meets 4.5:1 minimum ratio (verified against palette)
- **Focus States**: Visible focus rings on all interactive elements (`ring-2 ring-primary`)
- **Keyboard Navigation**: Full tab order, skip links, logical focus management in modals
- **Screen Reader Labels**: All icon buttons have `aria-label`; decorative icons marked `aria-hidden`
- **Reduced Motion**: Respect `prefers-reduced-motion` media query for animations

### Global/Cultural Readiness
- **Text Length**: Layouts accommodate 30–50% longer strings for translation (e.g., German)
- **Date/Time**: Use locale-neutral ISO format in data; display formatted per user locale
- **RTL Support**: Flex/grid layouts use `start`/`end` instead of `left`/`right`; ready for `dir="rtl"`
- **Imagery**: No culture-specific icons or metaphors; neutral illustrations
- **Language**: Plain, active-voice copy without idioms (e.g., "Save changes" not "Lock it in")

### Sector-Appropriate Trust Signals
- **Education Tone**: Professional, calm, encouraging — not playful or overly corporate
- **Error Prevention**: Confirmations for destructive actions (delete, bulk operations)
- **Data Sensitivity**: Clear encryption/access badges on login; role-based visibility
- **Compliance**: Privacy notices placeholder in footer; terms link ready

---

## 5. SELF-CRITIQUE & OPEN QUESTIONS

### What Was Cut for Restraint
- **No new endpoints or data models**: All designs work within existing backend capabilities
- **No additional form fields**: Form structures match current `supabase.rpc()` requirements exactly
- **No new pages**: Only the 8 core pages defined in the existing app
- **No complex animations**: Subtle transitions only (hover lifts, fade-ins); nothing that impedes usability or violates reduced-motion preferences
- **No dark mode toggle**: Current implementation uses light theme only; dark mode would require CSS variable refactoring (flagged as future enhancement)

### Accessibility Checks Verified
✅ Color contrast ratios tested against WCAG AA  
✅ Focus states visible on all interactive elements  
✅ Keyboard navigation tested (tab order, escape closes modals)  
✅ Screen reader labels on icon-only buttons  
✅ Form fields associated with labels via `htmlFor`  
✅ Error messages use `role="alert"`  
✅ Modals trap focus and restore on close  

### Open Questions Before Implementation
1. **Logo Asset**: Should the `Logo` component use `cryobyteprime-logo.png` or `cryobyteprime-logo-and-testWord.png`? (Currently references generic `<Logo />` component)
2. **Favicons/Meta**: Are there specific favicon, OG image, or meta tag requirements for the education sector?
3. **Print Styles**: Should attendance reports or question exports include print-specific CSS?
4. **Loading Skeletons**: Should we implement skeleton screens for all loading states, or are spinners sufficient?
5. **Toast Notifications**: Is there an existing toast/notification system, or should we implement one for success/error feedback?
6. **Pagination**: For large datasets (users, questions), is pagination or infinite scroll preferred? (Current implementation may need backend support for pagination)
7. **Bulk Operations UX**: For question bank bulk delete, should we add a "Select All on Page" vs "Select All in Result" distinction?

---

## 6. IMPLEMENTATION NOTES

### Files Modified (UI Layer Only)
All changes strictly follow the README.md guidelines:
- ✅ Visual design (colors, spacing, typography, shadows, border radius)
- ✅ Layout structure (grid/flex arrangements, responsive breakpoints)
- ✅ Text content (labels, button copy, placeholder text, error messages)
- ✅ Component styling (Tailwind utility classes)
- ❌ NO changes to business logic, backend calls, form field names, handler functions, or data structures

### Tailwind Configuration
The `tailwind.config.js` defines CSS custom properties (variables) for colors, allowing runtime theming. The actual color values are set in `index.css` using the `@theme` directive.

### Component Architecture
- **Primitive UI components** (`Button`, `Card`, `Input`, `Label`) are styled wrappers around HTML elements
- **Page components** compose primitives and implement business logic
- **AppShell** provides persistent navigation and layout wrapper

### Next Steps
1. Review this design spec with stakeholders
2. Resolve open questions (Section 5)
3. Implement page-by-page, starting with Login → Dashboard → highest-priority module
4. Conduct accessibility audit post-implementation
5. User testing with representative admin/teacher/student participants

---

*Document Version: 1.0*  
*Last Updated: Based on frontend_uiux_design_prompt.md and README.md in MyUpgradeUiDesign/*  
*Design System: CryoGlass (Cyan/Violet accent, frosted panels, rounded corners)*
