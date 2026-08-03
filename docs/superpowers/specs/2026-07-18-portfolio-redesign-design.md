# KMAWeb Portfolio Redesign

## Purpose

Rebuild Kenny Ma's portfolio as a single-page Next.js site for robotics hiring managers and technical recruiters. The site must communicate within ten seconds that Kenny builds complete robotic systems spanning mechanical design, electronics, simulation, controls, and autonomy.

The redesign keeps the existing project-card browsing model, adds experience cards, and replaces the generic developer-portfolio aesthetic with a robotics-specific technical catalogue.

## Audience and positioning

Primary audience: robotics hiring managers and technical recruiters.

Primary message: **I build complete robotic systems—from physical design to autonomous behavior.**

Secondary audiences include engineering collaborators, research labs, and startup teams. Copy prioritizes demonstrated work and measurable evidence over broad self-description.

## Information architecture

The site remains one public route with anchor navigation:

1. Hero
2. Experience
3. Project catalogue
4. About
5. Contact

Experience contains two cards:

- Undergraduate Researcher, NYU GRAIL — Spring 2026–Present
- Robotics Intern, Rose City Robotics — Spring–Summer 2025

All projects use equal card dimensions and detail depth. Recent projects appear first and receive a red top rule and a `Current work` label. Previous work follows in the same grid without reduced opacity, smaller sizing, or an archive boundary.

Project filters cover Robotics, Mechanical Design, Control/RL, Simulation, and Software. Status labels distinguish Published, Complete, and In Progress without implying importance.

## Project content

Current projects include:

- YOR v3 — In Progress (current work)
- BEBOP — working title for “Balancing Expressive Biped for Observation and Play” — In Progress (current work)
- Double Pendulum RL — In Progress (current work)
- RUKA-v2 — Published (prior work; no current-work highlight)

Existing projects remain available:

- SPARK
- Puzzle Solving with Search Algorithms
- Blackjack Card Counting Monte Carlo
- RSA Key Generation and Message Encryption
- KMACoin

Each project record contains:

- title, date, status, categories, and technologies
- one-sentence purpose
- Kenny's role
- three to five evidence-based personal contribution bullets
- separately labeled team or project outcomes
- optional repository, paper, external site, and media links

Personal contributions and team outcomes must never be blended. For example, the RUKA-v2 card credits Kenny's wrist and finger reinforcement, hardware testing, teleoperation, inverse kinematics, and retargeting work. The published evaluation improvements remain project-level outcomes.

## Project details interaction

Selecting a project opens a side drawer on desktop and a full-screen panel on mobile. The drawer contains:

1. Challenge
2. My contribution
3. System design
4. Results and team outcomes
5. Media and links

The drawer traps focus, closes with Escape or the overlay, restores focus to the originating card, and locks background scrolling. Missing media uses an intentional typographic fallback. Optional links render only when valid.

## Visual system

The visual direction is **Technical Catalogue**, inspired by OnePlus's black, red, and white product discipline without copying its storefront.

### Color

- Carbon `#080808` — dominant canvas
- Graphite `#171717` — cards and drawers
- Signal red `#f50514` — active states, current-work rules, primary actions
- Technical white `#f4f4f2` — headlines and occasional light planes
- Steel `#a7a7a7` — secondary copy

Red stays sparse. No neon, gradients, or glow effects.

### Typography

- Space Grotesk — geometric display headings
- Manrope — compact, readable body copy
- IBM Plex Mono — dates, status, tools, measurements, and metadata

The typography-led hero uses oversized stacked words such as `DESIGN / BUILD / CONTROL` beside the positioning statement. Headlines use sentence case rather than forced uppercase.

### Signature element

An engineering datum rail—a thin red line with category ticks—connects navigation, section labels, and current-work cards. Structural labels encode real content categories rather than acting as decoration.

Cards use hard geometry, restrained corner radii, clear alignment, and strong whitespace. The design removes blue-purple gradients, glow, faux terminal chrome, generic skill pills, and placeholder screenshot panels.

## Motion and responsive behavior

Motion consists of one orchestrated hero reveal plus precise card, filter, and drawer transitions. Reduced-motion preferences disable nonessential transforms and sequencing.

Desktop uses a dense multi-column catalogue. Tablet reduces columns while preserving filters. Mobile uses a single-column catalogue, horizontal filter overflow where needed, and a full-screen project panel.

## Application architecture

Use Next.js App Router with TypeScript and one `app/page.tsx`. Content is statically rendered; no database, API, or server runtime is required.

Typed data modules hold experience and project content. Components cover Header, Hero, ExperienceGrid, ProjectCatalogue, FilterBar, ProjectCard, ProjectDrawer, About, Contact, and Footer. Client JavaScript is limited to navigation, filtering, search, drawer state, and restrained motion.

Contact uses direct email and social links. No fake or nonfunctional form is included.

## Hosting

The same repository supports two targets:

- Vercel at the deployment root using the Next.js preset
- GitHub Pages static export at `/KMAWeb`

GitHub Pages remains available at `https://kmang0.github.io/KMAWeb/` so previously published links continue working. Environment-specific Next.js configuration applies the GitHub base path and asset prefix only for the Pages build.

## Media

Initial implementation provides polished media slots and intentional fallbacks. Real project photography, video, and diagrams can replace these assets without changing component structure or data shape.

## Validation

Validation includes:

- unique project IDs and valid statuses
- required contribution fields and optional-link handling
- filtering, search, drawer, and missing-media component tests
- keyboard navigation, focus restoration, mobile drawer, and anchor-navigation browser tests
- production builds for Vercel root and GitHub Pages `/KMAWeb`
- broken-link checks
- desktop, tablet, phone, reduced-motion, and high-contrast visual QA
- no critical accessibility violations

