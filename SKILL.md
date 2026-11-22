---
name: nexus-frontend-design-system
description: Build and refine Nexus B2B networking frontend screens using the approved LeadSpark-inspired enterprise CRM visual language. Use for dashboard, profile, events, networking, matching, meetings, messages, company, shared UI components, responsive layouts, design-system adoption and UI reviews. Frontend only; backend is owned by a separate developer.
---

# Nexus Frontend Design System

## When to use

Use this skill for **every Nexus frontend UI task**, including new screens, visual revisions, component refactors, and design reviews. The LeadSpark dashboard screenshot shared by the project owner is the visual benchmark for **authenticated application screens**. The screenshot is a style reference, not an instruction to copy unrelated CRM functionality.

Read [design-tokens.md](references/design-tokens.md) before changing styles and [component-patterns.md](references/component-patterns.md) before implementing components. Read [product-and-screens.md](references/product-and-screens.md) when designing domain-specific pages. Use [qa-checklist.md](references/qa-checklist.md) before delivering.

## Non-negotiable boundaries

- **Frontend-only ownership.** A separate developer owns API/backend services, database, migrations, RLS, Supabase configuration, server-side permissions, and business logic. Do not create or edit those.
- Work in the **existing React/Next.js project**; inspect routing, installed packages, styles, and components before making changes. Use TypeScript when consistent with the repository. Do not migrate frameworks without being asked.
- Preserve existing auth flows, Google OAuth, routing, validation, and working functionality. An auth integration already exists; do not remove it in pursuit of mock-only pages.
- For unfinished integrations, use typed contracts and **clearly labeled mock data in separate fixtures/services**, never backend-looking hardcoded URLs or claims of persistence.
- Implement code, not only a concept or mockup. Run available checks and report what succeeded and what could not be tested.

## Visual north star

- Premium, restrained, **light enterprise CRM** interface.
- White cards on very light gray workspace; subtle 1px borders; minimal shadows.
- Compact typography and dense, readable information layout (not huge marketing-page headings).
- Sidebar navigation (~240px expanded), compact top header (~64px), contextual right rail only when useful.
- Royal-blue primary actions, neutral navigation selection, muted status indicators.
- Clear grids, tables, tabs, forms, filters, contextual actions and empty states.
- Avoid playful social-media aesthetics, gradients across application cards, heavy glassmorphism, decorative neon, bouncing effects and oversized round corners.
- **Authentication exception:** Existing Nexus auth layout and `formspic.png` promotional imagery may retain a more expressive visual treatment. Do not add duplicate copy over an image that already includes text. Preserve shared logo/typography where appropriate.

## Preferred stack (check existing dependencies first)

- Tailwind CSS for styling; `shadcn/ui` components built on accessible primitives as a preferred starting point.
- `lucide-react` for UI icons; standard 16px button, 18px navigation icons with consistent stroke.
- `motion` only when CSS transitions are insufficient; honor reduced motion.
- TanStack Table for complex tables; Recharts for analytic charts.
- React Hook Form + Zod for forms/validation; Sonner for toasts; date-fns for date presentation.
- Do **not** install the entire stack without a feature need; avoid duplicate UI libraries or incompatible versions. Validate installation commands against current official docs and current repository.

## Workflow for each request

1. **Inspect.** Identify existing page, route, components, layout, tokens, and dependencies. Locate the LeadSpark screenshot if available in the project. If absent, use the documented design specification; do not claim pixel-perfect comparison.
2. **Scope.** Determine which Nexus MVP journey and user context the page serves. Preserve existing routing, functionality and role boundaries.
3. **Reuse.** Prefer existing theme tokens and primitives. If missing, implement reusable components instead of page-specific visual variants.
4. **Build.** Implement responsive desktop-first CRM layout, accessible controls, realistic blank/loading/error states, typed models and isolated fixtures.
5. **Verify.** Run available lint, typecheck and build; inspect at 1920, 1440, 1280, 1024, 768 and 390px when browser/device tools are available. Check keyboard access and reduced motion.
6. **Report.** Summarize actual files changed, UI behavior built, tests run, and any pending backend API contracts. Do not imply backend-connected behavior is real when mocked.

## Acceptance rules

- New UI conforms to the approved design tokens and reusable app shell.
- Information hierarchy is legible; 13–14px body text; 1px subtle borders; consistent compact spacing.
- Buttons, tables, inputs, cards and status indicators use common patterns.
- Screens work for desktop and mobile without horizontal overflow or clipped key content.
- User actions give actual frontend feedback; no inert decorative controls presented as working features.
- No backend, Supabase schema/config or authorization changes.
- All newly introduced sample content is identified as mock content, not actual authenticated-user data.

## Relevant reference files

- [Visual tokens, typography and layout](references/design-tokens.md)
- [Reusable UI, animations, dependencies](references/component-patterns.md)
- [Nexus MVP domain screens and rules](references/product-and-screens.md)
- [Delivery QA](references/qa-checklist.md)
