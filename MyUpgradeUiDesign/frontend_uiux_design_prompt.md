# AI Prompt: Professional Responsive Frontend & UI/UX Design
---

## PROMPT
Note: Always make reference to the README.md and UI_REDESIGN_PROMPT.md

You are acting as a senior Product Designer and Frontend Architect at a professional design studio. Your job is to design a **complete, production-ready frontend** for the project described below — every page, every screen state, and every interactive element — optimized for **mobile, tablet, and desktop**, following real UI/UX professional standards (not generic AI-template output).

### 0. GROUND RULE — SCOPE OF CHANGE (non-negotiable)
- **Business logic must NOT change.** Every existing rule, validation, permission, calculation, and workflow stays exactly as it is today.
- **Backend design must NOT change.** No new endpoints, no altered data models, no changed API contracts, no changed database schema. Assume the backend is fixed and frozen.
- **Only the frontend (UI/UX layer) may change.** You are restyling, restructuring, and improving how existing functionality is presented and interacted with — not what it does or how it's powered.
- If a design idea would require a backend change (new field, new endpoint, new business rule) to work, do NOT propose it as-is. Instead, either redesign it within the current backend's capabilities, or flag it separately as "Requires backend change — out of scope."
- Every button, form, and flow in the inventory below must map to functionality that already exists on the backend today.

### 1. PROJECT CONTEXT
```
[CONTEXT]
Project name: 
What the product/website does (1-2 sentences): 
Primary users / audience: 
Sectors or regions it must serve (e.g. education, fintech, healthcare — and any regional/cultural considerations): 
Core pages/screens needed (list them, e.g. Landing, Login, Dashboard, Profile, Settings, Admin, etc.): 
Brand tone (e.g. serious/enterprise, playful, minimal, premium): 
Existing brand assets (logo, colors, fonts) if any, or "none — propose one": 
```

### 2. DESIGN PRINCIPLES TO FOLLOW
- Ground every design decision in the actual subject matter and audience above — avoid generic templated layouts, default color palettes (e.g. cream + terracotta, near-black + neon accent, or dense broadsheet hairline grids), and filler stock copy.
- Define a compact design token system before designing any screen: a 4–6 color palette (named hex values, with clear roles: background, surface, primary, accent, text, border, success/warning/error states), a type system (a distinct display face + a complementary body face + a utility face for captions/data), spacing scale, and border-radius/elevation rules.
- Pick ONE signature visual/interaction element the whole product will be remembered by, and keep everything else disciplined and quiet around it.
- Write real interface copy, not lorem ipsum — every label, button, and empty/error state should say exactly what happens in plain, active-voice language (e.g. "Save changes" not "Submit"), and keep the same wording for the same action across the whole flow.

### 3. RESPONSIVE REQUIREMENTS (mandatory for every page)
For **each** page, explicitly design and describe (or code) three states:
- **Mobile** (≤480px / ~390px reference): single-column, thumb-reachable primary actions, collapsible navigation (hamburger/bottom nav), touch targets ≥44px.
- **Tablet** (~768–1024px): adaptive 2-column layouts where relevant, expanded nav, hybrid touch/cursor interactions.
- **Desktop** (≥1280px): full navigation exposed, multi-column layouts, hover states, keyboard shortcuts where relevant.

Specify breakpoints, grid behavior, and what reflows, hides, or reprioritizes at each size — don't just say "responsive," show the actual layout shift.

### 4. FULL BUTTON & COMPONENT INVENTORY (mandatory)
For **every single page/screen** listed in the context, produce a complete inventory covering:
- **Primary action button(s)** — the one main thing the user should do on that page
- **Secondary/tertiary buttons** — cancel, back, skip, "learn more," etc.
- **Navigation elements** — top nav, side nav, bottom nav (mobile), breadcrumbs, tabs
- **Form controls** — inputs, dropdowns, checkboxes, radio buttons, toggles, file uploads, with all states (default, focus, filled, error, disabled)
- **Feedback components** — loading states, success/error toasts or banners, empty states, confirmation modals/dialogs
- **Icon-only buttons** — with required accessible labels (aria-label) for each
- **Global/persistent elements** — header, footer, notification bell, user menu, search, help/support access

Do not skip any page. If a page has zero natural call-to-action, state that explicitly and explain why, rather than omitting the analysis.

### 5. ACCESSIBILITY & GLOBAL/CULTURAL CONSIDERATIONS
- WCAG 2.1 AA minimum: color contrast ratios, visible keyboard focus states, full keyboard navigability, screen-reader labels for icon buttons, reduced-motion support.
- Design for a global audience: avoid idioms/imagery tied to one culture, ensure layouts tolerate longer text strings (for future localization/translation), use locale-neutral date/number/currency formatting conventions, and consider right-to-left (RTL) layout mirroring if applicable to the target regions.
- Sector-appropriate tone and trust signals (e.g. a fintech/education/health product needs visibly more trust, compliance, and error-prevention cues than a casual consumer app).

### 6. DELIVERABLE FORMAT
Produce, in order:
1. A short design brief restating the audience, the one job each core page does, and the chosen signature element.
2. The token system (colors, type, spacing) as a compact table.
3. Page-by-page breakdown: layout description (or code), full button/component inventory, and mobile/tablet/desktop behavior for each.
4. A final self-critique: what was cut for restraint, what accessibility checks were verified, and any open questions before implementation.

Build to this standard without announcing it — responsive down to mobile, visible keyboard focus, and reduced motion respected are the floor, not a bonus.

---

**How to use this:** fill in the `[CONTEXT]` block first — the more specific the pages/audience/sector, the less generic the output. If you want code (not just a design spec), add one line at the end: *"Now implement this as [React components / plain HTML-CSS-JS / Tailwind], one file per page."*
