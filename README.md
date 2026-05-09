# Kiro Workshop Resume

## About the projecy

This is a **complete, resume website** that serves as a pedagogical tool for teaching agentic coding concepts using Kiro. Students receive this pre-built site and use Kiro to customize it—editing content, styling, and structure—while learning how AI agents can accelerate development workflows.

Built for the **Vibe Coding Workshop**, this project demonstrates:
- How to use Kiro specs to plan and structure features
- Agentic coding in action: letting Kiro handle implementation while you focus on design
- Modern web development with Astro, TypeScript, and vanilla CSS
- Interactive physics-based animations (tearable overlay)
- Deployment to Cloudflare Pages

## 🚀 Key Features

### For Students
- **Pre-built, polished starting point** — No boilerplate confusion; focus on learning Kiro
- **Single data source** (`src/data/resume.ts`) — Edit one file to customize all content
- **Design tokens in CSS** (`src/styles/global.css`) — Change colors/spacing globally with CSS variables
- **Component-based structure** — Learn Astro best practices while customizing sections
- **Interactive tearable overlay** — Scratch to reveal the resume; demonstrates physics-based animations

### For Instructors
- **6 hidden Easter eggs** — Learning tips embedded throughout the codebase (see `EASTER_EGGS.md`)
- **Spec-driven workflow** — Complete `.kiro/specs/` folder shows how to use Kiro specs for planning
- **TypeScript throughout** — Strict mode enforces type safety; great for teaching correctness
- **Property-based testing ready** — Framework for teaching formal verification concepts
- **Deployment guide** — Students see their work live on Cloudflare Pages

## 🎓 Teaching Agentic Coding with Kiro

This project is purpose-built for teaching **agentic coding** the practice of using AI agents to accelerate development. Here's how it works in a workshop:

### The Workflow
1. **Students receive this repo** — A complete, working resume site
2. **Students use Kiro to customize it** — Edit content, colors, layout, animations
3. **Kiro handles implementation** — Students focus on *what* they want, not *how* to code it
4. **Students learn by doing** — They see Kiro generate code, understand the patterns, and iterate

### What Students Learn
- **Spec-driven development** — How to write clear requirements before coding
- **Agentic workflows** — Delegating implementation to AI while maintaining control
- **Modern web stack** — Astro, TypeScript, CSS, and deployment
- **Interactive design** — Building engaging user experiences
- **Code quality** — Property-based testing and type safety

### Example Workshop Tasks
- "Change the color theme to match your brand" → Edit `src/styles/global.css`
- "Add a new project to your portfolio" → Edit `src/data/resume.ts`
- "Make the tearable overlay bigger" → Adjust parameters in `src/components/TearableOverlay.astro`
- "Deploy your resume live" → Run `wrangler deploy`

## 📁 Project Structure

```
project-root/
├── src/
│   ├── pages/index.astro           # Single page entry point
│   ├── layouts/Layout.astro        # HTML shell
│   ├── components/                 # Section components (Header, About, Experience, etc.)
│   ├── data/resume.ts              # Single source of truth for all content
│   └── styles/global.css           # Design tokens and responsive layout
├── .kiro/specs/                    # Kiro spec files (requirements, design, tasks)
├── EASTER_EGGS.md                  # Instructor reference: all 6 Easter egg locations
├── astro.config.mjs                # Astro config with Cloudflare adapter
├── wrangler.toml                   # Cloudflare Pages deployment config
└── README.md                        # This file
```

## 🛠️ Local Development

### Prerequisites
- Node.js 18+ and npm
- Kiro (for agentic coding workflows)

### Setup
```bash
npm install
npm run dev
```

Visit `http://localhost:4321` to see your resume.

### Customization
1. **Edit content**: `src/data/resume.ts`
2. **Change colors/spacing**: `src/styles/global.css`
3. **Modify layout**: Edit components in `src/components/`
4. **Use Kiro**: Ask Kiro to make changes for you!

## 🚀 Deployment

Deploy to **Cloudflare Pages** in 3 steps:

```bash
# 1. Build the project
npm run build

# 2. Authenticate with Cloudflare
wrangler login

# 3. Deploy
wrangler deploy
```

## 🥚 Easter Eggs

This codebase contains **6 hidden learning tips** marked with 🥚 emoji. Find them all to master agentic coding concepts!

See `EASTER_EGGS.md` for the complete list and instructor notes.

## 🎨 Interactive Features

### Tearable Overlay
Scratch the purple overlay to reveal your resume. This demonstrates:
- Canvas-based graphics
- Physics-based interactions
- Particle effects
- Event handling

Try it: Drag your mouse across the screen to scratch away the overlay.

## 🤝 Using This for Your Workshop

### For Instructors
1. Fork this repo
2. Customize the placeholder content (Alex Rivera → your name)
3. Share with students
4. Guide them through customization using Kiro
5. Deploy their versions to Cloudflare Pages

### For Ambassadors
- Use this as a **live demo** of agentic coding in action
- Show how Kiro specs guide development
- Highlight the interactive tearable overlay
- Deploy student versions to showcase their work
- Reference the Easter eggs as teaching moments

## 📖 Learning Resources

- [Astro Docs](https://docs.astro.build)
- [Kiro Documentation](https://kiro.dev)
- [Cloudflare Pages Guide](https://developers.cloudflare.com/pages/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)


## 📝 License

MIT — Use freely for teaching, learning, and sharing.

## 🙋 Questions?

- **For Kiro help**: Visit [kiro.dev](https://kiro.dev)
- **For Astro help**: Check [docs.astro.build](https://docs.astro.build)
- **For workshop support**: Reach out to the Kiro community

---

**Built with ❤️ for the community.**
