# FLETO — EXTRACT COMPLETE DASHBOARD UI DESIGN SYSTEM

## Objective

Create a comprehensive, highly detailed Markdown reference documenting the exact UI/UX design system used in Fleto's dashboard.

This documentation will be used to reproduce the same visual quality, component architecture, animations, and interactions in a completely different application.

**Scope: ONLY the dashboard inside `apps/web`.**

Do not analyze or copy the marketing landing page's design system.

## 1. Source inspection

Inspect the actual source code under:

`C:\Users\exe\Desktop\Github\Fleet-Manager\apps\web`

Identify the Next.js dashboard route group and every component, CSS file, theme token, hook, utility, animation and library used by the dashboard.

Inspect `package.json`, package-lock/workspace lockfiles, imported dependencies and component implementation files.

Never assume a library is used merely because it is installed.

Distinguish actual imports from unused packages.

## 2. Create documentation file

Output:

`apps/web/DASHBOARD_UI_DESIGN_SYSTEM.md`

The file must be self-contained, detailed and immediately useful for developers and AI coding assistants.

### Required sections

**A. Design philosophy**

Describe Fleto's precise dashboard aesthetic, visual hierarchy, design principles, density, card composition, whitespace, navigation patterns, content organization and premium SaaS characteristics.

**B. Technology stack**

Identify the actual framework and UI-related packages, including their installed versions and purposes:

- React and Next.js.
- TypeScript.
- Styling framework.
- CSS architecture.
- Component primitives.
- Icon library.
- Animation library.
- Charting library.
- Form components and validation.
- Data tables.
- Date and calendar components.
- Toasts and notifications.
- Tooltips, dialogs, popovers and dropdowns.
- Any other dashboard-related UI packages.

For each dependency include the exact package name, version, usage and relevant source paths.

**C. Color system**

Extract all dashboard colors from the source code.

Document:

- Brand colors.
- Primary accents.
- Background colors.
- Surface colors.
- Typography colors.
- Border colors.
- Hover colors.
- Active navigation states.
- Success, warning, danger and information colors.
- Chart palettes.
- Shadows and overlays.
- Light/dark themes if implemented.

Provide exact HEX, RGB or CSS-variable values where available.

**D. Typography**

Document:

- Font families and font-loading method.
- Heading sizes.
- Body sizes.
- Font weights.
- Letter spacing.
- Line heights.
- Label typography.
- Table typography.
- Numeric KPI typography.
- Text hierarchy.

**E. Layout architecture**

Analyze the dashboard's:

- Sidebar.
- Header/top navigation.
- Main content container.
- Responsive grids.
- Cards.
- Tables.
- Dashboard widgets.
- Statistics.
- Search and filters.
- Forms.
- Settings pages.
- Modal dialogs.
- Mobile navigation.

Include exact widths, heights, padding, spacing, gaps and breakpoints where defined.

**F. Iconography**

Identify the exact icon library and package version.

List every icon imported by dashboard components.

For each icon document:

- Icon name.
- Source library.
- Component or page using it.
- Size.
- Weight/stroke.
- Color.
- Hover/active behavior.

Explain conventions for selecting and styling icons in future applications.

**G. Animations and motion**

This is especially important.

Inspect every dashboard animation, including:

- Page transitions.
- Card entrances.
- Hover animations.
- Button interactions.
- Sidebar transitions.
- Dropdown animations.
- Modal animations.
- Loading animations.
- Skeleton loaders.
- Toast transitions.
- Tab transitions.
- Chart animations.
- Number animations.
- Microinteractions.
- CSS transitions and keyframes.
- Reduced-motion accessibility support.

Document actual durations, easing curves, delays, transforms, libraries and implementation patterns.

For each discovered animation, include the relevant source file and a minimal working implementation example derived from the existing code.

Do not invent animations that are not implemented.

**H. Component inventory**

Build a complete catalog of reusable dashboard components.

For each component include:

- Component name.
- Purpose.
- Source path.
- Dependencies.
- Public props.
- Variants.
- States.
- Visual styling.
- Interactions.
- Responsive behavior.
- Usage example.

Cover buttons, inputs, select menus, cards, badges, tables, menus, tabs, tooltips, skeletons, empty states, notifications and other actual components.

**I. Charts and data visualization**

Identify real chart libraries and implementations.

Document chart styles, tooltip formatting, axes, legends, gridlines, colors, responsiveness and animations.

**J. Responsive behavior**

Explain behavior at every defined breakpoint.

Document sidebar collapse, mobile menu, table overflow, column changes, card stacking and mobile typography.

**K. Accessibility**

Document actual keyboard navigation, focus states, ARIA patterns, semantic markup, color contrast and reduced-motion handling.

Clearly mark missing accessibility features instead of presenting recommendations as existing behavior.

**L. Implementation recipes**

Include practical copyable examples for:

1. Dashboard shell.
2. Sidebar navigation.
3. Premium KPI card.
4. Data table.
5. Search/filter toolbar.
6. Modal dialog.
7. Form inputs.
8. Chart container.
9. Loading skeleton.
10. Animated interactive button.

Use Fleto's actual libraries and established design conventions.

**M. Replication guidelines**

Write a precise step-by-step guide for recreating Fleto's dashboard visual language inside a new React/Next.js application.

Include:

- Required dependency installation commands.
- Theme setup.
- Global CSS foundations.
- Design tokens.
- Font setup.
- Icon configuration.
- Motion configuration.
- Reusable component structure.
- Responsive conventions.
- Common mistakes to avoid.

**N. Design system audit**

Identify any inconsistent styling or duplicate UI patterns found.

Document these as findings only. Do not modify the original application.

## 3. Strict requirements

- READ-ONLY analysis of existing dashboard code.
- Create or update the documentation file only.
- Do not change UI, CSS, business logic or dependencies.
- Do not run automatic formatting on application source files.
- Do not redesign anything.
- Do not include marketing landing-page styles.
- Do not include private credentials.
- Do not copy proprietary business data.
- Cite relevant source paths throughout the document.
- Clearly distinguish confirmed implementation from recommended improvements.
- No assumptions about libraries, animations or visual tokens.

## 4. Final deliverable

Create:

`apps/web/DASHBOARD_UI_DESIGN_SYSTEM.md`

The document should be detailed enough that another AI coding agent can reproduce the dashboard's visual identity and interactions in a new application **without needing access to the original Fleto repository**.

Also provide a short summary containing:

1. Exact UI libraries and versions.
2. Exact icon library.
3. Exact animation libraries.
4. Dashboard design style.
5. Main colors and typography.
6. Number of reusable components identified.
7. Documentation file location.

Do not commit, push or deploy anything.