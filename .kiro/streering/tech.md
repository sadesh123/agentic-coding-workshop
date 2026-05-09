# Tech Stack

## Framework & Runtime

- **Astro** — static site framework, `output: 'static'` mode only (no SSR, no edge functions)
- **TypeScript** — used in all `.ts` files and `.astro` script blocks; `strict: true` in `tsconfig.json`
- **Vanilla CSS** — no CSS framework; design tokens via custom properties in `src/styles/global.css`
- **No JS framework** — no React, Vue, or Svelte; Astro components only

## Deployment

- **Cloudflare Pages** via `@astrojs/cloudflare` adapter
- Deploy tool: **Wrangler CLI** (`wrangler login` → `wrangler deploy`)
- Build output: `dist/` directory

## Testing

- **fast-check** — property-based testing (PBT) library; minimum 100 iterations per property test
- Unit tests and smoke tests complement PBT
- Integration tests run against `npm run build` output or dev server

## Common Commands

| Command | Description |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build static output to `dist/` |
| `wrangler login` | Authenticate with Cloudflare |
| `wrangler deploy` | Deploy `dist/` to Cloudflare Pages |

## Configuration Files

- `astro.config.mjs` — Astro config; references `@astrojs/cloudflare` adapter
- `tsconfig.json` — TypeScript config with `strict: true`
- `wrangler.toml` — Cloudflare Pages config; build command `npm run build`, output dir `dist/`
