# Easter Eggs Reference Guide

This document is an instructor reference guide listing all hidden Kiro learning tips ("Easter Eggs") embedded in the `kiro-workshop-resume` codebase. Students discover these tips as they explore and edit the code during the workshop.

## Easter Egg Locations

### 1. Data File — Planning Changes with Specs
**File:** `src/data/resume.ts` (line 1)  
**Type:** Code comment  
**Tip:** "Use Kiro specs to plan changes to your resume structure before editing this file."

**Learning Goal:** Introduces the concept of using Kiro specs to plan changes before implementation.

---

### 2. Global CSS — Generating Color Themes
**File:** `src/styles/global.css` (line 1)  
**Type:** Code comment  
**Tip:** "Ask Kiro to generate a new color theme by providing a mood or style description."

**Learning Goal:** Shows how to use Kiro to generate design variations based on natural language descriptions.

---

### 3. Experience Component — Refactoring Components
**File:** `src/components/Experience.astro` (end of file)  
**Type:** Code comment  
**Tip:** "Ask Kiro to refactor this component to use a separate card component for each entry."

**Learning Goal:** Demonstrates asking Kiro to improve code structure and component composition.

---

### 4. Header Component — Hidden UI Element (Steering Files)
**File:** `src/components/Header.astro` (within the section)  
**Type:** Hidden `<span>` element with `class="kiro-tip"` and `aria-hidden="true"`  
**Visible:** On hover via CSS  
**Tip:** "Use steering files for persistent context!"

**Learning Goal:** Introduces steering files as a way to maintain persistent context across multiple Kiro interactions.

---

### 5. Astro Config — Adding Integrations
**File:** `astro.config.mjs` (line 3)  
**Type:** Code comment  
**Tip:** "Use Kiro to add new Astro integrations like @astrojs/react or @astrojs/sitemap by asking it to update this config file."

**Learning Goal:** Shows how Kiro can manage project configuration and dependencies.

---

### 6. Index Page — Generating Tests
**File:** `src/pages/index.astro` (line 1)  
**Type:** Code comment  
**Tip:** "Ask Kiro to generate property-based tests for these components to ensure they render correctly with various data inputs."

**Learning Goal:** Introduces property-based testing as a way to verify component behavior across many inputs.

---

## How Students Discover Easter Eggs

1. **Code Comments:** Students find these while reading or editing `.astro`, `.ts`, and `.css` files.
2. **Hidden UI Element:** Students discover this by hovering over the Kiro ghost icon in the Header component (visible in the rendered page).
3. **Instructor Guidance:** The instructor can point students to specific files or sections to find Easter eggs during the workshop.

## Instructor Tips

- **Pacing:** Reveal Easter eggs gradually throughout the workshop to maintain engagement.
- **Discussion:** Use each Easter egg as a springboard for discussing Kiro concepts (specs, steering files, refactoring, testing).
- **Customization:** Feel free to add or modify Easter eggs to match your workshop curriculum.
- **Student Exploration:** Encourage students to search the codebase for the 🥚 emoji to find all Easter eggs independently.

## Easter Egg Format

All Easter eggs follow a consistent format:

- **Code comments:** `// 🥚 KIRO TIP: [tip text]` (in `.astro`/`.ts`/`.js` files) or `<!-- 🥚 KIRO TIP: [tip text] -->` (in HTML contexts)
- **Tip text:** Concise, actionable, and ≤ 2 sentences
- **Hidden UI:** `<span class="kiro-tip" aria-hidden="true">[tip text]</span>` visible only on hover

## Total Count

**6 Easter Eggs** distributed across the codebase:
- 5 code comments
- 1 hidden UI element
