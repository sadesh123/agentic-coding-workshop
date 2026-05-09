# Project Structure

```
project-root/
├── astro.config.mjs          # Astro config; @astrojs/cloudflare adapter, output: 'static'
├── tsconfig.json             # TypeScript strict mode config
├── wrangler.toml             # Cloudflare Pages deployment config
├── package.json              # Scripts: dev, build
├── README.md                 # Local dev + Cloudflare Pages deployment guide
├── EASTER_EGGS.md            # Instructor reference: all Easter egg locations and tips
│
├── src/
│   ├── pages/
│   │   └── index.astro       # Single page entry point; imports all section components
│   │
│   ├── layouts/
│   │   └── Layout.astro      # HTML shell (<html>, <head>, <body>); accepts title prop
│   │
│   ├── components/
│   │   ├── Header.astro
│   │   ├── About.astro
│   │   ├── Experience.astro
│   │   ├── Education.astro
│   │   ├── Skills.astro
│   │   ├── Projects.astro
│   │   ├── Contact.astro
│   │   └── icons/
│   │       ├── IconEmail.astro
│   │       ├── IconGitHub.astro
│   │       ├── IconLinkedIn.astro
│   │       ├── IconExternalLink.astro
│   │       └── IconKiroGhost.astro   # Easter egg marker icon
│   │
│   ├── data/
│   │   └── resume.ts         # Single source of truth for all content + TypeScript interfaces
│   │
│   ├── styles/
│   │   └── global.css        # All CSS custom properties (design tokens); colors, typography, spacing
│   │
│   └── assets/               # Static assets (SVGs, images) per Astro conventions
│
├── public/                   # Favicon, open graph image
└── dist/                     # Build output (gitignored); produced by npm run build
```

## Key Conventions

- **One data file**: All placeholder content and TypeScript interfaces live in `src/data/resume.ts`. This is the primary file students edit.
- **One component per section**: Each resume section (`Header`, `About`, `Experience`, etc.) is its own `.astro` file under `src/components/`.
- **One CSS file for tokens**: All design tokens (colors, spacing, typography) are CSS custom properties in `src/styles/global.css`. Restyling the entire site means editing this one file.
- **Component documentation**: Every `.astro` file under `src/components/` must begin with a comment block describing its purpose and accepted props.
- **Icon components**: SVG icons are inlined as `.astro` components (not `<img>` tags) to eliminate 404 risks and simplify accessible fallbacks. Each accepts `size?: number` and `aria-label?: string`.
- **Empty state handling**: List-rendering components (Experience, Education, Skills, Projects) render `<p class="empty-state">No entries yet.</p>` when their data array is empty.
- **Easter eggs**: Tip comments use the prefix `// 🥚 KIRO TIP:` in `.astro`/`.ts` files and `<!-- 🥚 KIRO TIP: -->` in HTML contexts. Max 2 sentences per tip.
