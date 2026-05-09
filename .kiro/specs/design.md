# Design Document: kiro-workshop-resume

## Overview

The `kiro-workshop-resume` is a static, single-page resume website built with the [Astro](https://astro.build) framework. It serves as a workshop boilerplate that students receive pre-built and then customize using Kiro. The site is designed to be immediately runnable (`npm run dev`) and deployable to Cloudflare Pages (`npm run build`) with zero additional configuration.

The design prioritizes three goals in order:

1. **Pedagogical clarity** — the codebase must be easy to navigate and understand for someone new to Astro and agentic coding.
2. **Realistic starting point** — the resume must look polished and complete with fictional placeholder content so students have a meaningful customization target.
3. **Deployment simplicity** — the build pipeline must produce a static artifact that deploys to Cloudflare Pages without server-side runtime dependencies.

### Key Design Decisions

- **Static output only**: The site uses Astro's static generation mode (`output: 'static'`). The `@astrojs/cloudflare` adapter is included for Cloudflare Pages compatibility but no server-side features (SSR, edge functions) are used. This keeps the deployment model simple and avoids Cloudflare Workers runtime constraints.
- **Single data file**: All placeholder content lives in `src/data/resume.ts`. This is the primary file students edit, making the workshop task concrete and focused.
- **Component-per-section**: Each resume section is its own Astro component. This teaches component composition and gives students clear, isolated files to modify.
- **CSS custom properties as design tokens**: All colors, spacing, and typography values are defined as CSS custom properties in `src/styles/global.css`. Students can restyle the entire site by editing one file.
- **No JavaScript framework dependency**: The site uses only Astro components and vanilla CSS. No React, Vue, or Svelte is introduced, keeping the learning surface focused on Astro and Kiro.

---

## Architecture

The site is a standard Astro static site with a flat, single-page layout. There are no dynamic routes, API endpoints, or client-side state management concerns.

```
┌─────────────────────────────────────────────────────────┐
│                    Build Pipeline                        │
│                                                          │
│  src/data/resume.ts  ──►  Astro Components  ──►  dist/  │
│  (content)               (templates)          (static)  │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                  Runtime (Browser)                       │
│                                                          │
│  index.html  ──►  global.css  ──►  Rendered Resume       │
│  (single page)   (design tokens)                         │
└─────────────────────────────────────────────────────────┘
```

### Data Flow

```
src/data/resume.ts
       │
       │  imported by
       ▼
src/pages/index.astro
       │
       │  passes typed props to
       ▼
src/components/
  ├── Header.astro
  ├── About.astro
  ├── Experience.astro
  ├── Education.astro
  ├── Skills.astro
  ├── Projects.astro
  └── Contact.astro
       │
       │  uses assets from
       ▼
src/assets/  (SVG icons, logo)
public/      (favicon, open graph image)
```

### Deployment Architecture

```
Local IDE (Kiro)
       │
       │  npm run build
       ▼
dist/  (static output)
       │
       │  wrangler deploy
       ▼
Cloudflare Pages
  (instructor's personal Cloudflare account)
       │
       │  serves
       ▼
Static HTML/CSS/JS (CDN edge)
```

Deployment is done directly from the IDE using the Wrangler CLI (`wrangler deploy`). There is no CI/CD pipeline or GitHub repository connection required. The instructor runs `npm run build` to produce the `dist/` output, then `wrangler deploy` to push it to their personal Cloudflare account.

---

## Components and Interfaces

### Page Entry Point

**`src/pages/index.astro`**

The single page of the site. Imports `resumeData` from `src/data/resume.ts`, imports all section components, and composes them in order. Also imports the `Layout` wrapper.

```astro
---
import Layout from '../layouts/Layout.astro';
import Header from '../components/Header.astro';
import About from '../components/About.astro';
import Experience from '../components/Experience.astro';
import Education from '../components/Education.astro';
import Skills from '../components/Skills.astro';
import Projects from '../components/Projects.astro';
import Contact from '../components/Contact.astro';
import { resumeData } from '../data/resume';
---
<Layout title={resumeData.header.name}>
  <Header data={resumeData.header} />
  <About data={resumeData.about} />
  <Experience data={resumeData.experience} />
  <Education data={resumeData.education} />
  <Skills data={resumeData.skills} />
  <Projects data={resumeData.projects} />
  <Contact data={resumeData.contact} />
</Layout>
```

### Layout Component

**`src/layouts/Layout.astro`**

Provides the HTML shell: `<html>`, `<head>` (meta tags, font loading, global CSS import), and `<body>` with a `<main>` slot. Accepts a `title` prop for the `<title>` tag.

Props:
- `title: string` — page title rendered in `<title>` and `<meta property="og:title">`

### Section Components

Each component follows the same pattern: a typed props interface, a comment block at the top, and a `<section>` element with a semantic `id` attribute. If the data array is empty, the component renders a `<p class="empty-state">No entries yet.</p>` fallback.

| Component | File | Key Props |
|---|---|---|
| Header | `src/components/Header.astro` | `data: HeaderData` |
| About | `src/components/About.astro` | `data: AboutData` |
| Experience | `src/components/Experience.astro` | `data: ExperienceEntry[]` |
| Education | `src/components/Education.astro` | `data: EducationEntry[]` |
| Skills | `src/components/Skills.astro` | `data: SkillsData` |
| Projects | `src/components/Projects.astro` | `data: ProjectEntry[]` |
| Contact | `src/components/Contact.astro` | `data: ContactData` |

### Icon Components

SVG icons are stored as `.astro` components under `src/components/icons/` so they can be inlined into the HTML (no external requests, no broken image fallbacks). Each icon component accepts `size?: number` and `aria-label?: string` props.

| Icon | File |
|---|---|
| Email | `src/components/icons/IconEmail.astro` |
| GitHub | `src/components/icons/IconGitHub.astro` |
| LinkedIn | `src/components/icons/IconLinkedIn.astro` |
| External Link | `src/components/icons/IconExternalLink.astro` |
| Kiro Ghost (Easter Egg marker) | `src/components/icons/IconKiroGhost.astro` |

---

## Data Models

All types are defined in `src/data/resume.ts` and exported alongside the `resumeData` constant.

```typescript
// src/data/resume.ts

export interface HeaderData {
  name: string;           // e.g. "Alex Rivera"
  title: string;          // e.g. "Full-Stack Developer"
  avatarInitials: string; // e.g. "AR" — used in initials avatar block
  avatarAlt: string;      // accessible alt text for the avatar
}

export interface AboutData {
  bio: string; // 2–3 sentence biographical paragraph
}

export interface ExperienceEntry {
  company: string;
  role: string;
  dateRange: string;       // e.g. "Jan 2021 – Present"
  responsibilities: string[]; // 2–3 bullet points
}

export interface EducationEntry {
  institution: string;
  degree: string;
  graduationYear: string;  // e.g. "2019"
}

export interface SkillCategory {
  category: string;        // e.g. "Languages"
  skills: string[];        // e.g. ["TypeScript", "Python"]
}

export interface SkillsData {
  categories: SkillCategory[];
}

export interface ProjectEntry {
  name: string;
  description: string;
  url: string;             // placeholder URL, e.g. "https://github.com/alexrivera/project"
}

export interface ContactData {
  email: string;
  github: string;          // GitHub profile URL
  linkedin: string;        // LinkedIn profile URL
}

export interface ResumeData {
  header: HeaderData;
  about: AboutData;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skills: SkillsData;
  projects: ProjectEntry[];
  contact: ContactData;
}

export const resumeData: ResumeData = {
  header: {
    name: "Alex Rivera",
    title: "Full-Stack Developer",
    avatarInitials: "AR",
    avatarAlt: "Alex Rivera profile avatar",
  },
  about: {
    bio: "I'm a passionate full-stack developer with 5 years of experience building web applications. I love working at the intersection of design and engineering to create intuitive user experiences. When I'm not coding, you'll find me hiking or experimenting with new recipes.",
  },
  experience: [
    {
      company: "Acme Corp",
      role: "Senior Software Engineer",
      dateRange: "Mar 2021 – Present",
      responsibilities: [
        "Led migration of monolithic Rails app to microservices, reducing deploy time by 40%.",
        "Mentored a team of 4 junior engineers through weekly code reviews and pair programming.",
        "Designed and shipped a real-time notification system serving 50k daily active users.",
      ],
    },
    {
      company: "Globex Solutions",
      role: "Software Engineer",
      dateRange: "Jun 2019 – Feb 2021",
      responsibilities: [
        "Built RESTful APIs in Node.js consumed by iOS and Android clients.",
        "Improved test coverage from 42% to 87% by introducing property-based testing.",
        "Collaborated with product and design to ship 3 major feature releases on schedule.",
      ],
    },
  ],
  education: [
    {
      institution: "State University",
      degree: "B.Sc. Computer Science",
      graduationYear: "2019",
    },
  ],
  skills: {
    categories: [
      {
        category: "Languages",
        skills: ["TypeScript", "JavaScript", "Python", "SQL"],
      },
      {
        category: "Tools & Frameworks",
        skills: ["Astro", "React", "Node.js", "PostgreSQL", "Docker", "Git"],
      },
    ],
  },
  projects: [
    {
      name: "DevDash",
      description: "A developer productivity dashboard that aggregates GitHub activity, CI status, and Jira tickets into a single view.",
      url: "https://github.com/alexrivera/devdash",
    },
    {
      name: "RecipeBox",
      description: "A full-stack recipe management app with ingredient scaling, meal planning, and a public recipe discovery feed.",
      url: "https://github.com/alexrivera/recipebox",
    },
  ],
  contact: {
    email: "alex.rivera@example.com",
    github: "https://github.com/alexrivera",
    linkedin: "https://linkedin.com/in/alexrivera",
  },
};
```

### CSS Design Tokens

All design tokens are defined as CSS custom properties in `src/styles/global.css`:

```css
:root {
  /* Colors */
  --color-background: #f9f9f7;
  --color-text: #1a1a1a;
  --color-accent: #2563eb;
  --color-muted: #6b7280;
  --color-surface: #ffffff;
  --color-border: #e5e7eb;

  /* Typography */
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-size-h1: 2.25rem;   /* 36px */
  --font-size-h2: 1.5rem;    /* 24px */
  --font-size-h3: 1.125rem;  /* 18px */
  --font-size-body: 1rem;    /* 16px */
  --font-size-small: 0.875rem; /* 14px */

  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 2rem;
  --space-xl: 4rem;

  /* Layout */
  --max-width: 860px;
  --sidebar-width: 280px;
}
```

### Easter Egg Structure

Easter eggs are distributed across the codebase in two forms:

1. **Code comments** — in `.astro`, `.ts`, and `.css` files using the prefix `// 🥚 KIRO TIP:` or `<!-- 🥚 KIRO TIP: -->`.
2. **Hidden UI element** — a `<span class="kiro-tip" aria-hidden="true">` element visible only on hover via CSS, placed in the Header component.

Minimum 6 easter eggs are distributed as follows:

| # | Location | Type | Tip Topic |
|---|---|---|---|
| 1 | `src/data/resume.ts` | Code comment | Using Kiro specs to plan changes |
| 2 | `src/components/Experience.astro` | Code comment | Asking Kiro to refactor component structure |
| 3 | `src/styles/global.css` | Code comment | Using Kiro to generate a new color theme |
| 4 | `src/components/Header.astro` | Hidden UI span | Kiro steering files for persistent context |
| 5 | `astro.config.mjs` | Code comment | Asking Kiro to add a new Astro integration |
| 6 | `src/pages/index.astro` | Code comment | Using Kiro to generate tests for components |

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

This feature is primarily a static site boilerplate. Most acceptance criteria are structural checks (file existence, configuration presence) that are best verified with smoke tests and integration tests. However, several criteria express universal properties about data shape, rendering behavior, and code conventions that hold across all inputs and are suitable for property-based testing.

### Property 1: Heading size hierarchy is strictly decreasing

*For any* set of heading font size values defined in the CSS custom properties (`--font-size-h1`, `--font-size-h2`, `--font-size-h3`), the values must satisfy `h1 > h2 > h3` strictly (no two heading levels may share the same size).

**Validates: Requirements 2.4**

---

### Property 2: Empty section renders a non-empty placeholder message

*For any* resume section component (Experience, Education, Skills, Projects) given an empty data array or empty categories list, the rendered HTML output must contain a visible, non-empty placeholder message string and must not contain an empty `<ul>` or `<ol>` element with no children.

**Validates: Requirements 2.6**

---

### Property 3: Resume data object has all required fields populated

*For any* field in the `ResumeData` type hierarchy (header, about, experience entries, education entries, skill categories, project entries, contact), the corresponding value in `resumeData` must be a non-empty string or a non-empty array — no field may be `null`, `undefined`, or an empty string.

**Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7**

---

### Property 4: All rendered image and icon elements have accessible fallbacks

*For any* `<img>` element in the rendered HTML, it must have a non-empty `alt` attribute. *For any* inline SVG used as a meaningful icon (not purely decorative), it must have either an `aria-label` attribute or a `<title>` child element. Purely decorative SVGs must have `aria-hidden="true"`.

**Validates: Requirements 4.4**

---

### Property 5: All Easter Egg comments follow the required prefix format

*For any* Easter Egg comment found in the codebase (identified by containing the 🥚 emoji), the comment must begin with exactly `// 🥚 KIRO TIP:` (in `.astro`/`.ts`/`.js` files) or `<!-- 🥚 KIRO TIP:` (in HTML template contexts). No Easter Egg comment may use a different prefix or format.

**Validates: Requirements 5.2**

---

### Property 6: All Easter Egg tips are concise (≤ 2 sentences)

*For any* Easter Egg tip text (the content after the `// 🥚 KIRO TIP:` prefix), the text must contain at most 2 sentences, where a sentence is defined as a sequence of characters ending with `.`, `!`, or `?`.

**Validates: Requirements 5.3**

---

### Property 7: All Astro component files have a leading documentation comment block

*For any* `.astro` file under `src/components/`, the file must begin with a comment block (either `---` frontmatter containing a `//` comment, or an HTML `<!-- -->` comment before the frontmatter) that describes the component's purpose and lists its accepted props.

**Validates: Requirements 7.3**

---

### Property 8: All resume data fields have explicit TypeScript type annotations

*For any* top-level field in the `ResumeData` interface and its nested interfaces (`HeaderData`, `AboutData`, `ExperienceEntry`, `EducationEntry`, `SkillsData`, `SkillCategory`, `ProjectEntry`, `ContactData`), the field must have an explicit TypeScript type annotation — no field may use implicit `any` or be unannotated.

**Validates: Requirements 7.4**

---

### Property 9: Cloth simulation maintains structural integrity

*For any* cloth simulation frame, the distance between connected points must not exceed `tearDistance` (1.5 × spacing) unless the connection has been explicitly broken. All pinned points must remain at their pinned positions throughout the simulation.

**Validates: Requirements 8.3, 8.4**

---

### Property 10: Particle effects emit on interaction

*For any* tear, scratch, or push interaction, at least one particle must be emitted from the interaction point. Particles must have non-zero velocity and must decay to zero life over time.

**Validates: Requirements 8.2, 8.5**

---

### Property 11: Physics layer maintains 60 FPS performance

*For any* animation frame, the time between consecutive `requestAnimationFrame` callbacks must be ≤ 16.67ms (60 FPS). The cloth simulation and particle rendering must complete within this time budget.

**Validates: Requirements 8.6**

---

### Property 12: Interactive overlay does not block resume content

*For any* resume element (link, button, text), the element must remain clickable and interactive even when the physics overlay is active. The overlay must use `pointer-events: none` on non-interactive areas or manage event propagation correctly.

**Validates: Requirements 8.1, 8.10**

---

## Interactive Physics-Based Animations

### Overview

The physics-based animations layer adds playful, tactile interactions to the resume. Users can tear, scratch, push, and interact with a cloth simulation that responds to their input. The layer is implemented as a canvas overlay that sits above the resume content, capturing mouse and touch events without blocking interaction with the underlying page.

### Architecture

The physics system consists of three main components:

1. **Cloth Simulation** — A grid of connected points that simulate fabric behavior with gravity, damping, and constraint satisfaction.
2. **Particle System** — Particles that emit when tearing, scratching, or pushing, providing visual feedback.
3. **Interaction Handler** — Mouse and touch event listeners that apply forces to the cloth and trigger particle emission.

```
┌─────────────────────────────────────────────────────────┐
│              Interactive Physics Layer                   │
│                                                          │
│  Canvas Overlay (mouse/touch events)                    │
│       ↓                                                  │
│  Cloth Simulation (Verlet integration)                  │
│       ↓                                                  │
│  Particle System (emission & animation)                 │
│       ↓                                                  │
│  Rendered Output (canvas drawing)                       │
└─────────────────────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────────────────────┐
│              Resume Content (HTML/CSS)                   │
│                                                          │
│  Fully interactive and readable underneath              │
└─────────────────────────────────────────────────────────┘
```

### Physics Implementation

#### Cloth Simulation

The cloth is represented as a grid of points connected by constraints. Each point has:
- Current position (x, y)
- Previous position (px, py) — used for Verlet integration
- Pinned state — top row is pinned to prevent falling

**Verlet Integration:**
```
velocity = (x - px) * damping
px = x
py = y
x += velocity
y += velocity + gravity
```

**Constraint Satisfaction:**
- Horizontal constraints connect adjacent points in a row
- Vertical constraints connect adjacent points in a column
- Constraints are satisfied iteratively (3 iterations per frame for stability)
- If a constraint distance exceeds `tearDistance`, the connection breaks and particles emit

#### Particle System

Particles are simple objects with:
- Position (x, y)
- Velocity (vx, vy)
- Life (0–1, fades out over time)

Particles are emitted when:
- Cloth constraints break (tearing)
- Mouse drags across cloth (scratching)
- User pushes cloth (knocking)

#### Interaction Modes

**Tear/Scratch:**
- User drags mouse across the cloth
- Points within a radius of the mouse are pushed outward
- Particles emit from the interaction point
- Cloth constraints may break if stretched too far

**Knock/Push:**
- User clicks and drags to apply a directional force
- Cloth points accelerate in the direction of the drag
- Particles emit from the impact point

**Cloth Response:**
- Cloth sways and oscillates in response to forces
- Gravity pulls the cloth downward
- Damping causes oscillations to decay over time
- Pinned top edge prevents the cloth from falling off-screen

### Performance Considerations

- **Canvas rendering** — Direct 2D canvas drawing is fast and suitable for 60 FPS
- **Constraint iterations** — Limited to 3 iterations per frame to balance stability and performance
- **Particle pooling** — Particles are created and destroyed dynamically; old particles are filtered out when life reaches 0
- **Cloth grid size** — 10×10 grid (121 points) is a good balance between visual quality and performance
- **Throttling** — Mouse events are processed every frame via `requestAnimationFrame`

### Visual Design

**Cloth Appearance:**
- Gradient background (purple to violet)
- White grid lines with 60% opacity
- Cloth responds to mouse with smooth deformation

**Particle Effects:**
- Small white circles (2px radius)
- Fade out over ~50 frames
- Emit with random velocity in all directions
- Affected by gravity (slight downward acceleration)

**Interaction Feedback:**
- Cursor changes to `grab` when hovering over cloth
- Cursor changes to `grabbing` when dragging
- Particles burst outward on tear/scratch
- Cloth deforms smoothly in response to push

### Component Structure

**`src/components/TearableOverlay.astro`**

The main interactive component. Renders a canvas overlay with cloth simulation and particle effects. Includes:
- Canvas element for rendering
- TypeScript script block with cloth and particle simulation
- Event listeners for mouse and touch
- Animation loop via `requestAnimationFrame`

**Styling:**
- Positioned absolutely or relatively to sit above resume content
- Full width and height to capture all interactions
- Pointer events managed to allow interaction with content underneath

### Integration with Resume

The overlay is placed in `src/pages/index.astro` as a sibling to the resume sections. It:
- Does not block interaction with resume content
- Sits visually above the resume (via z-index or positioning)
- Can be toggled on/off via a CSS class or data attribute
- Gracefully degrades if JavaScript is disabled

### Error Handling

- If canvas is not supported, the overlay is hidden and resume remains fully functional
- If animation loop fails, the page continues to work normally
- Touch events are supported alongside mouse events for mobile compatibility

---

### Asset Loading Failures

All SVG icons are inlined as Astro components rather than referenced via `<img src>`. This eliminates the possibility of a 404 on icon assets. The profile avatar uses an initials-based CSS block (not an image file), so there is no avatar image to fail to load.

For any future image assets added by students, the `alt` attribute requirement (Property 4) ensures the layout degrades gracefully.

### Empty Data Sections

If a student deletes all entries from an array in `resume.ts` (e.g., clears the `experience` array), the corresponding component renders an `<p class="empty-state">No entries yet.</p>` message. This is enforced by a conditional in each list-rendering component (Property 2).

### Build Errors

The TypeScript strict mode configuration (`tsconfig.json` with `"strict": true`) catches type errors at build time. If a student introduces a type mismatch in `resume.ts`, `npm run build` will fail with a clear TypeScript error pointing to the offending line.

### Cloudflare Pages Deployment Errors

The site uses `output: 'static'` in `astro.config.mjs`. No server-side APIs (`Astro.locals`, `Astro.request`, edge functions) are used. This ensures the build output is pure static HTML/CSS/JS with no runtime dependencies that could fail in the Cloudflare Pages environment.

---

## Testing Strategy

This feature is a static site boilerplate. The testing approach is intentionally lightweight — the site itself is the artifact, and the primary verification is that it builds and renders correctly.

### PBT Applicability Assessment

Property-based testing applies to a subset of the acceptance criteria: those involving universal properties of data shape, rendering behavior, and code conventions. Infrastructure checks (file existence, build success, dev server startup) are better served by smoke tests and integration tests.

PBT is **not** appropriate for:
- File existence checks (smoke tests)
- Build pipeline verification (integration tests)
- Visual layout and responsive design (browser-based integration tests)
- Documentation content checks (smoke tests)

PBT **is** appropriate for:
- CSS heading hierarchy invariant (Property 1)
- Empty section rendering behavior (Property 2)
- Resume data completeness (Property 3)
- Accessible fallback presence (Property 4)
- Easter egg format consistency (Properties 5, 6)
- Component documentation convention (Property 7)
- TypeScript annotation completeness (Property 8)

### Property-Based Tests

Use [fast-check](https://github.com/dubzzz/fast-check) (TypeScript/JavaScript PBT library) for all property tests. Each test runs a minimum of 100 iterations.

**Property 1 — Heading hierarchy**
```typescript
// Feature: kiro-workshop-resume, Property 1: heading size hierarchy is strictly decreasing
fc.assert(fc.property(
  fc.record({ h1: fc.float({ min: 1 }), h2: fc.float({ min: 1 }), h3: fc.float({ min: 1 }) }),
  ({ h1, h2, h3 }) => h1 > h2 && h2 > h3
), { numRuns: 100 });
// Applied to the actual token values from global.css
```

**Property 2 — Empty section fallback**
```typescript
// Feature: kiro-workshop-resume, Property 2: empty section renders non-empty placeholder
// For each section component, render with empty array and assert placeholder text is present
```

**Property 3 — Resume data completeness**
```typescript
// Feature: kiro-workshop-resume, Property 3: resume data has all required fields populated
// Traverse the resumeData object and assert no leaf value is null/undefined/empty string
```

**Properties 5 & 6 — Easter egg format and conciseness**
```typescript
// Feature: kiro-workshop-resume, Property 5: Easter egg prefix format
// Feature: kiro-workshop-resume, Property 6: Easter egg tip conciseness
// Scan source files for 🥚 comments, assert prefix and sentence count for each
```

### Smoke Tests

Run once to verify project structure and configuration:

- `package.json` exists with `dev` and `build` scripts
- `astro.config.mjs` exists and references `@astrojs/cloudflare`
- `src/styles/global.css` defines `--color-background`, `--color-text`, `--color-accent`, `--color-muted`
- `wrangler.toml` exists with correct build command and output directory
- `EASTER_EGGS.md` exists and is non-empty
- All SVG icon files exist under `src/components/icons/`
- `src/data/resume.ts` exists and exports `resumeData`
- All section component files exist under `src/components/`

### Integration Tests

Run against the built output or dev server:

- `npm run build` completes without errors and produces `dist/index.html`
- Rendered HTML contains all 7 section `id` attributes in document order: `header`, `about`, `experience`, `education`, `skills`, `projects`, `contact`
- At least one `span.kiro-tip[aria-hidden="true"]` element exists in rendered HTML
- All `<img>` elements in rendered HTML have non-empty `alt` attributes

### Unit Tests

Example-based tests for specific behaviors:

- `resumeData.experience` has at least 2 entries
- `resumeData.skills.categories` has at least 2 categories with at least 8 total skills
- `resumeData.projects` has at least 2 entries
- Each `ExperienceEntry` has at least 2 `responsibilities` items
