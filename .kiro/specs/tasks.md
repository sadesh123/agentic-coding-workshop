# Implementation Plan: kiro-workshop-resume

## Overview

Build a static, single-page Astro resume boilerplate for a Kiro agentic coding workshop. The implementation proceeds in layers: project scaffolding and configuration first, then the TypeScript data model, then the layout and section components, then icon assets and Easter eggs, and finally the test suite. Each step produces runnable, integrated output.

## Tasks

- [x] 1. Scaffold Astro project structure and configuration
  - Initialize Astro project with `package.json`, `astro.config.mjs`, `tsconfig.json` (strict mode), and standard `src/` layout
  - Configure `@astrojs/cloudflare` adapter in `astro.config.mjs` with `output: 'static'`
  - Add `wrangler.toml` specifying build command `npm run build` and output directory `dist/`
  - Create `README.md` with local dev instructions and Cloudflare Pages deployment guide (covering `npm run build`, `wrangler login`, and `wrangler deploy`)
  - Add `// 🥚 KIRO TIP:` Easter egg comment in `astro.config.mjs` about adding Astro integrations
  - _Requirements: 1.1, 1.2, 1.4, 6.1, 6.3, 6.4_

- [x] 2. Define TypeScript data model and placeholder content
  - [x] 2.1 Create `src/data/resume.ts` with all exported interfaces and the `resumeData` constant
    - Define `HeaderData`, `AboutData`, `ExperienceEntry`, `EducationEntry`, `SkillCategory`, `SkillsData`, `ProjectEntry`, `ContactData`, and `ResumeData` interfaces with explicit type annotations on every field
    - Populate `resumeData` with fictional placeholder content: name "Alex Rivera", at least 2 experience entries (each with 2–3 responsibilities), at least 1 education entry, at least 8 skills in at least 2 categories, at least 2 projects, and contact fields
    - Add `// 🥚 KIRO TIP:` Easter egg comment about using Kiro specs to plan changes
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 7.2, 7.4_

  - [ ]* 2.2 Write property test for resume data completeness (Property 3)
    - **Property 3: Resume data object has all required fields populated**
    - Traverse `resumeData` and assert no leaf value is `null`, `undefined`, or empty string
    - **Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7**

  - [ ]* 2.3 Write unit tests for resume data shape
    - Assert `resumeData.experience` has at least 2 entries
    - Assert `resumeData.skills.categories` has at least 2 categories with at least 8 total skills
    - Assert `resumeData.projects` has at least 2 entries
    - Assert each `ExperienceEntry` has at least 2 `responsibilities` items
    - _Requirements: 3.3, 3.5, 3.6_

- [ ] 3. Create global CSS design tokens and layout shell
  - [ ] 3.1 Create `src/styles/global.css` with all CSS custom properties
    - Define color tokens: `--color-background`, `--color-text`, `--color-accent`, `--color-muted`, `--color-surface`, `--color-border`
    - Define typography tokens: `--font-sans`, `--font-size-h1` (2.25rem), `--font-size-h2` (1.5rem), `--font-size-h3` (1.125rem), `--font-size-body`, `--font-size-small`
    - Define spacing tokens: `--space-xs`, `--space-sm`, `--space-md`, `--space-lg`, `--space-xl`
    - Define layout tokens: `--max-width` (860px), `--sidebar-width` (280px)
    - Add `// 🥚 KIRO TIP:` Easter egg comment about using Kiro to generate a new color theme
    - _Requirements: 2.4, 2.5, 7.5_

  - [ ]* 3.2 Write property test for heading size hierarchy (Property 1)
    - **Property 1: Heading size hierarchy is strictly decreasing**
    - Parse `--font-size-h1`, `--font-size-h2`, `--font-size-h3` values from `global.css` and assert `h1 > h2 > h3`
    - **Validates: Requirements 2.4**

  - [x] 3.3 Create `src/layouts/Layout.astro` HTML shell
    - Implement `<html>`, `<head>` (meta tags, font loading, global CSS import), and `<body>` with `<main>` slot
    - Accept `title: string` prop rendered in `<title>` and `<meta property="og:title">`
    - Include leading documentation comment block describing purpose and props
    - _Requirements: 1.1, 7.3_

- [ ] 4. Implement SVG icon components
  - [x] 4.1 Create icon components under `src/components/icons/`
    - Implement `IconEmail.astro`, `IconGitHub.astro`, `IconLinkedIn.astro`, `IconExternalLink.astro`, each accepting `size?: number` and `aria-label?: string` props
    - Implement `IconKiroGhost.astro` as the Easter egg marker icon
    - Ensure decorative SVGs have `aria-hidden="true"`; meaningful icons have `aria-label` or `<title>` child
    - Include leading documentation comment block in each icon file
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 7.3_

  - [ ]* 4.2 Write property test for accessible SVG fallbacks (Property 4)
    - **Property 4: All rendered image and icon elements have accessible fallbacks**
    - For each icon component, assert meaningful icons have `aria-label` or `<title>`, and decorative icons have `aria-hidden="true"`
    - **Validates: Requirements 4.4**

- [x] 5. Implement section components
  - [x] 5.1 Create `src/components/Header.astro`
    - Accept `data: HeaderData` prop; render name, title, and initials-based avatar block
    - Include hidden `<span class="kiro-tip" aria-hidden="true">` Easter egg element visible only on hover via CSS
    - Add `// 🥚 KIRO TIP:` Easter egg comment about Kiro steering files
    - Include leading documentation comment block
    - _Requirements: 2.2, 3.1, 4.2, 5.1, 5.4, 7.1, 7.3_

  - [x] 5.2 Create `src/components/About.astro`
    - Accept `data: AboutData` prop; render biographical paragraph
    - Include leading documentation comment block
    - _Requirements: 2.2, 3.2, 7.1, 7.3_

  - [x] 5.3 Create `src/components/Experience.astro`
    - Accept `data: ExperienceEntry[]` prop; render list of job entries with company, role, date range, and responsibilities
    - Render `<p class="empty-state">No entries yet.</p>` when array is empty
    - Add `// 🥚 KIRO TIP:` Easter egg comment about asking Kiro to refactor component structure
    - Include leading documentation comment block
    - _Requirements: 2.2, 2.6, 3.3, 5.1, 7.1, 7.3_

  - [x] 5.4 Create `src/components/Education.astro`
    - Accept `data: EducationEntry[]` prop; render list of degree entries with institution, degree title, and graduation year
    - Render `<p class="empty-state">No entries yet.</p>` when array is empty
    - Include leading documentation comment block
    - _Requirements: 2.2, 2.6, 3.4, 7.1, 7.3_

  - [x] 5.5 Create `src/components/Skills.astro`
    - Accept `data: SkillsData` prop; render skill tags grouped by category
    - Render `<p class="empty-state">No entries yet.</p>` when `categories` is empty
    - Include leading documentation comment block
    - _Requirements: 2.2, 2.6, 3.5, 7.1, 7.3_

  - [x] 5.6 Create `src/components/Projects.astro`
    - Accept `data: ProjectEntry[]` prop; render project cards with name, description, and external link icon
    - Render `<p class="empty-state">No entries yet.</p>` when array is empty
    - Include leading documentation comment block
    - _Requirements: 2.2, 2.6, 3.6, 4.1, 7.1, 7.3_

  - [x] 5.7 Create `src/components/Contact.astro`
    - Accept `data: ContactData` prop; render email, GitHub, and LinkedIn links with corresponding icons
    - Include leading documentation comment block
    - _Requirements: 2.2, 3.7, 4.1, 7.1, 7.3_

  - [ ]* 5.8 Write property test for empty section rendering (Property 2)
    - **Property 2: Empty section renders a non-empty placeholder message**
    - For each list-rendering component (Experience, Education, Skills, Projects), render with empty data and assert placeholder text is present and no empty `<ul>`/`<ol>` exists
    - **Validates: Requirements 2.6**

  - [ ]* 5.9 Write property test for component documentation convention (Property 7)
    - **Property 7: All Astro component files have a leading documentation comment block**
    - Scan all `.astro` files under `src/components/` and assert each begins with a documentation comment
    - **Validates: Requirements 7.3**

  - [ ]* 5.10 Write property test for TypeScript annotation completeness (Property 8)
    - **Property 8: All resume data fields have explicit TypeScript type annotations**
    - Parse `src/data/resume.ts` and assert every field in `ResumeData` and nested interfaces has an explicit type annotation (no implicit `any` or unannotated fields)
    - **Validates: Requirements 7.4**

- [ ] 6. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Wire page entry point and apply responsive layout
  - [x] 7.1 Create `src/pages/index.astro`
    - Import `resumeData` and all section components; compose them in order inside `<Layout>`
    - Pass typed props to each component: `Header`, `About`, `Experience`, `Education`, `Skills`, `Projects`, `Contact`
    - Add `// 🥚 KIRO TIP:` Easter egg comment about using Kiro to generate tests for components
    - _Requirements: 2.1, 2.2, 7.1_

  - [x] 7.2 Apply responsive CSS layout in `src/styles/global.css` and component styles
    - Ensure no horizontal scroll at 320px–1440px viewport widths
    - Collapse multi-column layouts to single column below 768px; allow two-column/sidebar layout at 768px and above
    - Style `.kiro-tip` span to be visible only on hover
    - Style `.empty-state` paragraph for visible placeholder display
    - _Requirements: 2.1, 2.2, 2.3, 5.4_

- [x] 8. Add Easter eggs and create instructor reference
  - [x] 8.1 Verify all 6 Easter egg placements are in place across the codebase
    - Confirm Easter eggs exist in: `src/data/resume.ts`, `src/components/Experience.astro`, `src/styles/global.css`, `src/components/Header.astro` (hidden span + comment), `astro.config.mjs`, `src/pages/index.astro`
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

  - [x] 8.2 Create `EASTER_EGGS.md` in project root
    - List all Easter egg locations, file paths, and tip text as an instructor reference guide
    - _Requirements: 5.5_

  - [ ]* 8.3 Write property test for Easter egg prefix format (Property 5)
    - **Property 5: All Easter egg comments follow the required prefix format**
    - Scan source files for 🥚 emoji; assert each comment begins with `// 🥚 KIRO TIP:` or `<!-- 🥚 KIRO TIP:`
    - **Validates: Requirements 5.2**

  - [ ]* 8.4 Write property test for Easter egg tip conciseness (Property 6)
    - **Property 6: All Easter egg tips are concise (≤ 2 sentences)**
    - For each Easter egg tip text, assert it contains at most 2 sentences (ending with `.`, `!`, or `?`)
    - **Validates: Requirements 5.3**

- [ ] 9. Implement smoke and integration tests
  - [ ] 9.1 Write smoke tests for project structure
    - Assert `package.json` exists with `dev` and `build` scripts
    - Assert `astro.config.mjs` exists and references `@astrojs/cloudflare`
    - Assert `src/styles/global.css` defines `--color-background`, `--color-text`, `--color-accent`, `--color-muted`
    - Assert `wrangler.toml` exists with correct build command and output directory
    - Assert `EASTER_EGGS.md` exists and is non-empty
    - Assert all SVG icon files exist under `src/components/icons/`
    - Assert `src/data/resume.ts` exists and exports `resumeData`
    - Assert all section component files exist under `src/components/`
    - _Requirements: 1.1, 1.2, 2.5, 5.5, 6.1, 7.1, 7.2_

  - [ ] 9.2 Write integration tests for rendered output
    - Run `npm run build` and assert it completes without errors and produces `dist/index.html`
    - Assert rendered HTML contains all 7 section `id` attributes in document order: `header`, `about`, `experience`, `education`, `skills`, `projects`, `contact`
    - Assert at least one `span.kiro-tip[aria-hidden="true"]` element exists in rendered HTML
    - Assert all `<img>` elements in rendered HTML have non-empty `alt` attributes
    - _Requirements: 2.2, 4.4, 5.4, 6.2_

- [ ] 10. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 11. Implement interactive physics-based animations
  - [ ] 11.1 Install Three.js and physics dependencies
    - Install `three` package for 3D rendering and physics calculations
    - Verify installation and check for any peer dependency warnings
    - _Requirements: 8.7_

  - [ ] 11.2 Enhance TearableOverlay component with full physics simulation
    - Expand the existing `src/components/TearableOverlay.astro` with:
      - Cloth simulation using Verlet integration (10×10 grid)
      - Particle system with emission on tear/scratch/push
      - Mouse and touch event handling
      - Constraint satisfaction with tear detection
      - Gravity and damping physics
    - Ensure cloth grid is properly initialized with pinned top edge
    - Implement particle pooling for performance
    - Add visual feedback (gradient background, grid lines, particle rendering)
    - _Requirements: 8.2, 8.3, 8.4, 8.5, 8.6, 8.8_

  - [ ] 11.3 Implement tear/scratch interaction mode
    - When user drags mouse, push cloth points outward from cursor
    - Emit particles from interaction point
    - Allow cloth constraints to break when stretched beyond `tearDistance`
    - Create visible scratch/tear marks that persist briefly
    - _Requirements: 8.2, 8.5, 8.9_

  - [ ] 11.4 Implement knock/push interaction mode
    - When user clicks and drags, apply directional force to cloth
    - Emit particles from impact point
    - Allow cloth to swing and oscillate in response to push
    - Provide visual feedback via cursor change (grab/grabbing)
    - _Requirements: 8.3, 8.5, 8.9_

  - [ ] 11.5 Implement cloth simulation with physics
    - Verlet integration for point movement
    - Gravity and damping for realistic motion
    - Constraint satisfaction (3 iterations per frame)
    - Tear detection and particle emission on constraint break
    - Bounds checking to keep cloth on-screen
    - _Requirements: 8.3, 8.4, 8.6_

  - [ ] 11.6 Implement particle system
    - Particle creation with random velocity
    - Particle animation with gravity and fade-out
    - Particle pooling and cleanup
    - Emission on tear, scratch, and push interactions
    - _Requirements: 8.5, 8.6_

  - [ ] 11.7 Ensure overlay does not block resume content
    - Use `pointer-events: none` on canvas or manage event propagation
    - Verify all resume links, buttons, and text remain clickable
    - Test interaction with resume content while physics layer is active
    - _Requirements: 8.1, 8.10_

  - [ ] 11.8 Add touch event support
    - Implement `touchmove`, `touchstart`, `touchend` event listeners
    - Map touch coordinates to canvas coordinates
    - Ensure touch interactions work on mobile devices
    - Test on both desktop and mobile browsers
    - _Requirements: 8.8_

  - [ ] 11.9 Optimize for 60 FPS performance
    - Profile animation loop to ensure frame time ≤ 16.67ms
    - Reduce cloth grid size or constraint iterations if needed
    - Implement particle pooling to reduce garbage collection
    - Use `requestAnimationFrame` for smooth animation
    - _Requirements: 8.6_

  - [ ]* 11.10 Write property test for cloth structural integrity (Property 9)
    - **Property 9: Cloth simulation maintains structural integrity**
    - Simulate cloth for 100 frames and assert all connected points are within `tearDistance`
    - Assert pinned points remain at their pinned positions
    - **Validates: Requirements 8.3, 8.4**

  - [ ]* 11.11 Write property test for particle emission (Property 10)
    - **Property 10: Particle effects emit on interaction**
    - Simulate tear/scratch/push interactions and assert particles are emitted
    - Assert particles have non-zero velocity
    - Assert particles decay to zero life over time
    - **Validates: Requirements 8.2, 8.5**

  - [ ]* 11.12 Write property test for 60 FPS performance (Property 11)
    - **Property 11: Physics layer maintains 60 FPS performance**
    - Measure frame time for 100 animation frames
    - Assert average frame time ≤ 16.67ms
    - Assert no frame exceeds 33.34ms (2× target)
    - **Validates: Requirements 8.6**

  - [ ]* 11.13 Write property test for overlay non-blocking (Property 12)
    - **Property 12: Interactive overlay does not block resume content**
    - Render overlay and resume together
    - Assert resume elements are clickable and interactive
    - Assert overlay uses `pointer-events: none` or manages events correctly
    - **Validates: Requirements 8.1, 8.10**

  - [ ] 11.14 Integration test for physics animations
    - Build project and verify no errors
    - Load page in browser and verify canvas renders
    - Test tear/scratch interaction and verify particles emit
    - Test knock/push interaction and verify cloth moves
    - Test touch events on mobile device or emulator
    - Verify resume content remains readable and interactive
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.8, 8.10_

- [ ] 12. Final checkpoint — Ensure all physics tests pass
  - Ensure all physics-related tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at key milestones
- Property tests use [fast-check](https://github.com/dubzzz/fast-check) with a minimum of 100 iterations each
- Unit tests and property tests are complementary — both are included where applicable
- The design uses TypeScript throughout; all code examples and implementations use TypeScript

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["2.1", "3.1", "3.3"] },
    { "id": 1, "tasks": ["2.2", "2.3", "3.2", "4.1"] },
    { "id": 2, "tasks": ["4.2", "5.1", "5.2", "5.3", "5.4", "5.5", "5.6", "5.7"] },
    { "id": 3, "tasks": ["5.8", "5.9", "5.10", "7.1"] },
    { "id": 4, "tasks": ["7.2", "8.1"] },
    { "id": 5, "tasks": ["8.2", "8.3", "8.4", "9.1"] },
    { "id": 6, "tasks": ["9.2"] },
    { "id": 7, "tasks": ["11.1", "11.2"] },
    { "id": 8, "tasks": ["11.3", "11.4", "11.5", "11.6", "11.7", "11.8", "11.9"] },
    { "id": 9, "tasks": ["11.10", "11.11", "11.12", "11.13", "11.14"] }
  ]
}
```
