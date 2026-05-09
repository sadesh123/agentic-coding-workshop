# Requirements Document

## Introduction

The `kiro-workshop-resume` is a boilerplate resume website built with the Astro framework, designed as a teaching tool for a Kiro agentic coding workshop. Students will receive this pre-built site and use Kiro to customize it — editing content, styling, and structure — learning agentic coding concepts along the way. The site is deployable to Cloudflare Pages and runs on localhost during the workshop. It features a clean, professional single-page resume layout with placeholder content, icon/logo assets, and hidden "Kiro learning points easter eggs" that surface tips about agentic coding as students explore the codebase.

## Glossary

- **Site**: The Astro-based resume boilerplate website.
- **Student**: A workshop participant who will customize the Site using Kiro.
- **Instructor**: The workshop facilitator who deploys and distributes the Site.
- **Astro**: The static site framework used to build the Site.
- **Cloudflare_Pages**: The deployment target platform for the Site.
- **Resume_Section**: A discrete content block on the resume (e.g., Header, About, Experience, Education, Skills, Projects, Contact).
- **Placeholder_Content**: Fictional but realistic boilerplate text and data that Students will replace with their own information.
- **Easter_Egg**: A hidden Kiro learning tip embedded in the codebase (comments, data files, or hidden UI elements) that Students discover while editing.
- **Kiro_Ghost**: The official Kiro friendly-ghost mascot SVG logo used as the visual marker for Easter_Egg UI elements.
- **Asset**: An image, icon, or logo file used in the Site's UI.
- **Dev_Server**: The local Astro development server run via `npm run dev`.

---

## Requirements

### Requirement 1: Astro Project Structure

**User Story:** As an Instructor, I want the Site to be a valid Astro project, so that Students can run it locally and deploy it to Cloudflare Pages without additional configuration.

#### Acceptance Criteria

1. THE Site SHALL be scaffolded as a valid Astro project with a `package.json`, `astro.config.mjs`, and standard `src/` directory layout.
2. THE Site SHALL include a `@astrojs/cloudflare` adapter configured in `astro.config.mjs` so that the project is ready for Cloudflare Pages deployment.
3. WHEN a Student runs `npm install` followed by `npm run dev`, THE Dev_Server SHALL start and serve the Site on `localhost:4321` without errors.
4. THE Site SHALL include a `README.md` with instructions for running the Dev_Server locally and deploying to Cloudflare Pages.

---

### Requirement 2: Single-Page Resume Layout

**User Story:** As a Student, I want a clean, professional single-page resume layout, so that I have a realistic starting point to customize during the workshop.

#### Acceptance Criteria

1. THE Site SHALL render all Resume_Sections on a single scrollable page with no horizontal scroll bar at any viewport width between 320px and 1440px.
2. THE Site SHALL include the following Resume_Sections in order: Header, About, Experience, Education, Skills, Projects, and Contact; no Resume_Section SHALL be truncated or overlap another at any supported viewport width.
3. THE Site SHALL use a responsive layout such that at viewport widths below 768px all multi-column layouts collapse to a single column, and at viewport widths of 768px and above a two-column or sidebar layout MAY be used.
4. THE Site SHALL apply a consistent typographic scale using a single sans-serif font family, with heading levels h1–h3 forming a strictly monotonically decreasing size hierarchy (h1 > h2 > h3), loaded via a web font or system font stack.
5. THE Site SHALL use a neutral, professional color palette defined as CSS custom properties including at minimum `--color-background`, `--color-text`, `--color-accent`, and `--color-muted`, so Students can restyle the entire site by editing those four variables.
6. IF a Resume_Section contains no data entries (e.g., an empty Experience list), THE Site SHALL render a visible placeholder message (e.g., "No entries yet") rather than an empty or broken layout block.

---

### Requirement 3: Placeholder Content

**User Story:** As a Student, I want realistic placeholder content in every Resume_Section, so that the resume looks complete and I know exactly what to replace.

#### Acceptance Criteria

1. THE Site SHALL populate the Header Resume_Section with a placeholder full name, job title, and profile photo placeholder (avatar icon or initials block).
2. THE Site SHALL populate the About Resume_Section with 2–3 sentences of placeholder biographical text.
3. THE Site SHALL populate the Experience Resume_Section with at least 2 placeholder job entries, each containing a company name, role title, date range, and 2–3 bullet-point responsibilities.
4. THE Site SHALL populate the Education Resume_Section with at least 1 placeholder degree entry containing institution name, degree title, and graduation year.
5. THE Site SHALL populate the Skills Resume_Section with at least 8 placeholder skill tags grouped into at least 2 categories (e.g., Languages, Tools).
6. THE Site SHALL populate the Projects Resume_Section with at least 2 placeholder project entries, each containing a project name, short description, and a placeholder link.
7. THE Site SHALL populate the Contact Resume_Section with placeholder email, GitHub, and LinkedIn fields.
8. THE Placeholder_Content SHALL use clearly fictional data (e.g., name "Alex Rivera", company "Acme Corp") so Students are not confused about what is real.

---

### Requirement 4: Icon and Logo Assets

**User Story:** As a Student, I want icons and logos already included in the project, so that the resume looks polished and I can see how assets are used in Astro.

#### Acceptance Criteria

1. THE Site SHALL include SVG icons for at least the following: email, GitHub, LinkedIn, and an external link indicator.
2. THE Site SHALL include a placeholder logo or wordmark in the Header Resume_Section (e.g., initials-based SVG or a simple geometric mark).
3. THE Site SHALL store all Asset files under `src/assets/` or `public/` following Astro conventions.
4. WHEN an Asset fails to load, THE Site SHALL display an accessible fallback (alt text or aria-label) so the layout does not break.

---

### Requirement 5: Kiro Learning Points Easter Eggs

**User Story:** As a Student, I want to discover hidden Kiro learning tips as I explore and edit the codebase, so that I learn agentic coding concepts organically during the workshop.

#### Acceptance Criteria

1. THE Site SHALL contain at least 6 Easter_Eggs distributed across different files and Resume_Sections.
2. EACH Easter_Egg SHALL be a code comment or inline annotation that begins with the prefix `// 🥚 KIRO TIP:` (in `.astro`/`.ts`/`.js` files) or `<!-- 🥚 KIRO TIP: -->` (in HTML/template contexts).
3. EACH Easter_Egg SHALL contain a concise, actionable tip (≤ 2 sentences) about a specific Kiro or agentic coding concept (e.g., using specs, steering files, asking Kiro to refactor, generating tests).
4. THE Site SHALL include at least 1 Easter_Egg that is a hidden `<span>` element with `aria-hidden="true"` and `class="kiro-tip"` visible only on hover via CSS, so Students discover it while inspecting the rendered UI.
5. THE Site SHALL include a `EASTER_EGGS.md` file in the project root listing all Easter_Egg locations and their tips, intended as an Instructor reference guide.

---

### Requirement 6: Cloudflare Pages Deployment Readiness

**User Story:** As an Instructor, I want the Site to be deployable to Cloudflare Pages with minimal configuration, so that Students can see their customized resume live on the web at the end of the workshop.

#### Acceptance Criteria

1. THE Site SHALL include a `wrangler.toml` or equivalent Cloudflare Pages configuration file specifying the build command (`npm run build`) and output directory (`dist/`).
2. WHEN `npm run build` is executed, THE Site SHALL produce a static output in the `dist/` directory without build errors.
3. THE Site SHALL not depend on any server-side runtime features that are unavailable in the Cloudflare Pages static hosting environment.
4. THE `README.md` SHALL include a step-by-step Cloudflare Pages deployment guide covering running `npm run build`, authenticating with `wrangler login`, and deploying with `wrangler deploy` from the local IDE.

---

### Requirement 7: Workshop-Friendly Code Organization

**User Story:** As a Student, I want the codebase to be clearly organized and well-commented, so that I can navigate it easily while learning to use Kiro.

#### Acceptance Criteria

1. THE Site SHALL organize each Resume_Section as a separate Astro component file under `src/components/`.
2. THE Site SHALL store all Placeholder_Content in a single data file (`src/data/resume.ts` or `src/data/resume.json`) so Students can update content in one place.
3. EACH Astro component file SHALL include a comment block at the top explaining the component's purpose and listing the props it accepts.
4. THE Site SHALL use TypeScript for all `.ts` and `.astro` script blocks, with explicit type annotations on the resume data structures.
5. THE Site SHALL include a `src/styles/global.css` file containing all CSS custom properties (design tokens) so Students can restyle the entire site by editing one file.

---

### Requirement 8: Interactive Physics-Based Animations

**User Story:** As a Student, I want to interact with the resume through playful physics-based animations, so that the experience feels tactile, responsive, and engaging.

#### Acceptance Criteria

1. THE Site SHALL include an interactive overlay that captures mouse and touch events without blocking interaction with the resume content underneath.
2. THE Site SHALL support **Tear/Scratch** interactions where dragging the mouse across the page creates visible scratch or tear effects with particle emission.
3. THE Site SHALL support **Knock/Push** interactions where clicking and dragging elements applies physics-based forces that move them around the page.
4. THE Site SHALL implement a **Cloth Simulation** that responds to mouse movement, creating a fabric-like effect that tears when stretched beyond a threshold.
5. THE Site SHALL emit **Particle Effects** when tearing, scratching, or pushing, providing visual feedback that feels tactile and responsive.
6. THE Site SHALL maintain **60 FPS performance** during all interactions, with smooth animations that feel responsive to user input.
7. THE Site SHALL use **Three.js** for 3D rendering and physics calculations, with a canvas-based overlay that sits above the resume content.
8. THE Site SHALL support both **mouse and touch events** for desktop and mobile users.
9. THE Site SHALL include visual feedback (scratches, tears, particles) that persists briefly before fading, creating a sense of impact.
10. THE Site SHALL be **optional and non-intrusive** — the resume content remains fully readable and functional even if the physics layer is disabled or fails to load.
