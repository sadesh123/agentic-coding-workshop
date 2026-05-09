# Animations & Transitions Guide

This document describes all the animations and transitions added to the kiro-workshop-resume site to enhance user experience.

## Global Animations (src/styles/global.css)

### Keyframe Animations

1. **fadeIn** - Smooth opacity fade with subtle upward movement
   - Used for: Kiro tip tooltip, title text
   - Duration: 0.2s

2. **slideInUp** - Elements slide up from below with fade-in
   - Used for: All sections, list items, contact links
   - Duration: 0.4-0.6s
   - Staggered delays for sequential appearance

3. **slideInDown** - Elements slide down from above with fade-in
   - Used for: H1 headings
   - Duration: 0.8s

4. **slideInLeft** - Elements slide in from the left with fade-in
   - Used for: H2/H3 headings, list items, header content
   - Duration: 0.4-0.6s

5. **slideInRight** - Elements slide in from the right with fade-in
   - Used for: Header title and subtitle
   - Duration: 0.8s

6. **scaleIn** - Elements scale up from 95% with fade-in
   - Used for: Skill tags
   - Duration: 0.3-0.4s
   - Staggered delays for each skill

7. **float** - Subtle vertical floating motion
   - Used for: Avatar in header
   - Duration: 3s (infinite loop)
   - Creates a gentle bobbing effect

### Section Animations

- **Staggered entrance**: Each section slides in with a delay
  - Section 1 (Header): 0.1s delay
  - Section 2 (About): 0.2s delay
  - Section 3 (Experience): 0.3s delay
  - Section 4 (Education): 0.4s delay
  - Section 5 (Skills): 0.5s delay
  - Section 6 (Projects): 0.6s delay
  - Section 7 (Contact): 0.7s delay

- **Hover effects on sections**:
  - Border color changes to accent color
  - Shadow increases (translateY -4px)
  - Shimmer effect with gradient overlay
  - Text shadow glow on h2 headings

### Link Animations

- **Underline animation**: Links have animated underline on hover
  - Underline grows from left to right
  - Duration: 0.3s

- **Icon animations**: SVG icons scale and rotate on hover
  - Scale: 1.2x
  - Rotation: 5-10 degrees
  - Duration: 0.3s

## Component-Specific Animations

### Header Component (src/components/Header.astro)

- **Avatar**: 
  - Floating animation (3s infinite)
  - Hover: scales to 1.1x and rotates 5 degrees
  - Enhanced shadow on hover

- **Name (h1)**: Slides down from above (0.8s)

- **Title (p)**: Fades in with 0.3s delay

- **Kiro Ghost Icon**: Slides up with 0.4s delay

### About Component (src/components/About.astro)

- **Bio paragraph**: Slides up with 0.2s delay
- Increased line-height for better readability

### Experience Component (src/components/Experience.astro)

- **Entry cards**:
  - Slide up with staggered delays (0s, 0.1s)
  - Background color: surface-light with left accent border
  - Hover: translateX(4px), border color lightens, shadow increases

- **Responsibilities list items**:
  - Each item slides in with staggered delays
  - Delays: 0.1s, 0.15s, 0.2s, etc.

### Education Component (src/components/Education.astro)

- **Entry cards**:
  - Similar to Experience component
  - Slide up with staggered delays
  - Hover effects with left border animation

### Skills Component (src/components/Skills.astro)

- **Skill categories**: Slide up with category-based delays

- **Skill tags**:
  - Scale in animation with staggered delays
  - Gradient background (accent to accent-light)
  - Rounded pill shape (border-radius: 20px)
  - Hover effects:
    - translateY(-4px) scale(1.1)
    - Enhanced shadow
    - Shimmer effect overlay

### Projects Component (src/components/Projects.astro)

- **Project cards**:
  - Grid layout with 1.5rem gap
  - Slide up with staggered delays (0s, 0.15s, 0.3s)
  - Gradient background
  - Hover effects:
    - translateY(-6px)
    - Border color changes to accent
    - Shadow increases significantly

- **External link icons**:
  - Hover: scale(1.3) rotate(-10deg)
  - Opacity increases from 0.7 to 1

### Contact Component (src/components/Contact.astro)

- **Contact links**:
  - Styled as buttons with background color
  - Slide up with staggered delays (0s, 0.1s, 0.2s)
  - Hover effects:
    - translateY(-4px)
    - Border color changes to accent
    - Shadow increases
    - Icon scales and rotates

## Accessibility Features

- **prefers-reduced-motion**: All animations are disabled for users who prefer reduced motion
  - Animation duration set to 0.01ms
  - Transition duration set to 0.01ms
  - Scroll behavior set to auto

## Responsive Animations

- **Mobile (max-width: 768px)**:
  - Animation durations reduced for faster feedback
  - Section animations: 0.4s (down from 0.6s)
  - List item animations: 0.3s (down from 0.4s)
  - Skill tag animations: 0.3s (down from 0.4s)

## Performance Considerations

- All animations use CSS transforms and opacity for optimal performance
- GPU acceleration enabled through transform properties
- Staggered animations prevent simultaneous rendering of multiple elements
- Smooth scroll behavior enabled for better UX

## Browser Support

- All animations use standard CSS3 features
- Supported in all modern browsers (Chrome, Firefox, Safari, Edge)
- Graceful degradation for older browsers (animations simply won't play)

## Testing the Animations

1. **Local Development**: Run `npm run dev` and visit `localhost:4321`
2. **Production Build**: Run `npm run build` and check `dist/index.html`
3. **Hover Effects**: Hover over sections, links, skill tags, and project cards
4. **Scroll**: Scroll down to see staggered section entrance animations
5. **Mobile**: Test on mobile devices to see responsive animation adjustments
