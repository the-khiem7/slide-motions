---
name: slide-motions
description: Build a HyperFrames slideshow to present live - slides, fragment reveals, presenter mode with speaker notes, and motion that plays in the presented deck (entrances at real speed, ambient loops) - served by `hyperframes present`, or turn an existing page into one. Also runs the deck project from an idea or a content file - brainstormed content and script, one folder per deck, shared toolchain, .gitignore and a README listing every deck. Use when the person wants a deck or presentation rather than a rendered video, or asks for a HyperFrames slideshow with animation. A wrapper over the official HyperFrames skills: it resolves them first, installs them with the person's approval when missing, then layers the live-motion rules on top of the stock slideshow skill.
metadata:
  upstream-hyperframes-version: "v0.9.41"
---

# HyperFrames slideshow with motion

This skill is a layer on the official HyperFrames `slideshow` skill. It does not carry a copy of HeyGen's guidance: it finds the official skills, reads them, then applies the changes below. Where this skill and the stock `slideshow` skill disagree, this skill wins.

## Step 0 - Resolve the official skills (before any other work)

Read `references/resolve-upstream.md` and complete it first. It identifies your client, finds `slideshow` and `hyperframes` (skill list, plugin root, standalone stores), and installs them with the person's approval when missing (`references/install-upstream.md`). Do not start the deck until `slideshow` and `hyperframes` are readable, and read the stock `slideshow` skill in full before applying the changes below.

Carry the mode found in Step 0 through the session. In plugin mode every `npx hyperframes` below becomes `node "<PLUGIN_ROOT>/skills/hyperframes/scripts/plugin-cli.mjs"` and `hyperframes skills update`, `skills check` and `npx skills add` are never run; in standalone mode `npx hyperframes` is used.

## Step 1 - Detect the stage (before writing any file)

Read `references/project-workflow.md`. It decides whether this is a brainstorm, a review of a given content file, a rebuild or a new deck, asks the intake questions (languages, talk duration, speakers, audience), and fixes where files go: content in `content/<topic>/<variant>.md`, the deck in `slide/<topic>/<variant>/`, one toolchain at the repository root, `.gitignore` and a README listing every deck. Without it a second content file on the same topic overwrites or collides with the first deck.

## Where to read more

Paths are inside the official skill folders found in Step 0.

| Need | Read |
|---|---|
| Composition contract, data attributes, fonts, timing | `hyperframes` `SKILL.md`, `references/format.md`; `npx hyperframes docs compositions`, `npx hyperframes docs data-attributes` |
| GSAP rules and the seek protocol | `hyperframes` `references/runtimes.md`; `npx hyperframes docs gsap` |
| Eases, transitions, common motion faults | `hyperframes` `references/motion.md` |
| `check`, `lint`, `snapshot`, what each reports | `hyperframes-cli` `SKILL.md`, `references/lint-validate-inspect.md` |
| Chrome or `doctor` failures | `hyperframes-cli` `references/doctor-browser.md`; `npx hyperframes docs troubleshooting` |
| Searching and installing a ready-made visual | `hyperframes-registry` `SKILL.md`, `references/search.md`, `references/wiring-blocks.md`, `references/wiring-components.md` |
| Sound effects for a standalone deck | `media-use` `references/resolve.md` |
| Inside a HyperFrames plugin | `hyperframes` `references/plugin-installation.md` |
| Motion that plays in the presented deck | `references/live-motion.md` (this skill) |
| Stage, intake, content file, folder layout, toolchain, `.gitignore`, README | `references/project-workflow.md` (this skill) |
| A deck opened without `present` | `slideshow` `references/standalone-harness.md`. Its script paths into the HyperFrames monorepo (`packages/player/dist/...`) do not exist for an npm user: use `node_modules/hyperframes/dist/hyperframes-player.global.js` and `node_modules/hyperframes/dist/hyperframes-slideshow.global.js`, copied from the installed package `dist` folder when the project has no `node_modules` |
| Finding the official skills | `references/resolve-upstream.md` (this skill) |
| Installing the official skills | `references/install-upstream.md` (this skill) |

The official skills describe video work too (render, captions, film types). A deck uses only the contract, the CLI loop and the registry; skip the rest.

## What changes from a video project

- **Each slide is a top-level scene** in the composition file: `data-composition-id`, `data-start`, `data-duration`, `data-label`, `data-width`, `data-height`. Slides are siblings; no root composition wraps them.
- **One empty root clock comes first**, before every slide: an empty element with `data-composition-id`, `data-root="true"`, `data-start="0"` and `data-duration` equal to the whole deck, plus a registered paused GSAP timeline of that length (`tl.to({}, { duration: <deck length> })`). The runtime takes the first composition as the root and its length as the deck length; without the clock only the first slide plays and every other slide is blank.
- **A single-file deck loads the runtime itself.** The player injects the runtime only for decks with sub-composition files; without it the slideshow reports no main-line slides. Copy `dist/hyperframe.runtime.iife.js` from the installed `hyperframes` package (same version as the CLI) to `assets/vendor/hyperframe.runtime.min.js` and load it with a `<script>` after the scene scripts. Keep the `.min.js` name: lint skips it, under any other name it reports the runtime's own internals as errors.
- **The runtime freezes CSS transitions and animations** so that seeks stay deterministic. Animate slide content with GSAP in the registered timelines; content revealed by a CSS transition stays at its start state, for example stuck at `opacity: 0`.
- **One island per composition**, near the top of `<body>`, written in the HTML (never generated by script; `present` reads the file statically):

```html
<script type="application/hyperframes-slideshow+json">
  {
    "slides": [
      { "sceneId": "hook", "notes": "Pause on the number." },
      {
        "sceneId": "problem",
        "fragments": [11.0, 15.0],
        "hotspots": [
          {
            "id": "h1",
            "label": "Where does $40B come from?",
            "target": "market-detail",
            "region": { "x": 55, "y": 60, "w": 40, "h": 20 }
          }
        ]
      }
    ],
    "slideSequences": [
      { "id": "market-detail", "label": "Market sizing", "slides": [{ "sceneId": "mkt-math" }] }
    ]
  }
</script>
```

- `sceneId` equals a scene's `data-composition-id` (or give `startTime`/`endTime`). `notes` are presenter-only. `ttsScript`, `ttsAudioUrl` and `ttsDurationMs` are reserved and not wired yet.
- **Fragments are absolute timeline times** (the same clock as `data-start`, not offsets inside the slide) within the slide's `[start, end]`. Navigation seeks, it never plays: each hold state must look right when the timeline is seeked straight to that time. A slide without fragments enters at a rest frame inside it (its mid-point).
- **Seek-only navigation makes every slide appear as a finished still.** For entrances that play and ambient loops in the presented deck, while stills, checks and renders stay seek-only, follow `references/live-motion.md`.
- **Every slide is on the main line.** Put every slide in the main `slides` array and never place content behind a hotspot or a call-to-action button: a presenter who forgets to click moves on and the audience never sees it. Build a side explanation as its own main-line slide next to the slide it explains. Use hotspots and `slideSequences` only when the person explicitly asks for an optional branch; then branch slides are ordinary scenes listed only in `slideSequences`, a hotspot's `target` is a sequence `id`, `region` is a percentage box (omit it for a full-slide button), and Back returns to the slide that held the hotspot.
- **SVG `<defs>` ids are unique per slide** in a single-file deck. A `<pattern>` or gradient defined inside one slide does not paint in another slide that references the same id while the defining slide is hidden, so hatching and fills vanish. Define the defs in the slide that uses them, with the slide id in the defs id.
- Text the audience must read is at least 40 px at 1920×1080. Before hand-building any named visual, search `npx hyperframes catalog --query "<the visual, in English>" --json`: it ranks the whole registry with nothing installed (`hyperframes-registry` `references/search.md`).

## Porting an existing page

- Keep the source's look, motion, interactions and media behaviour; port its widgets, players and visualizers rather than approximating them.
- Movement the page drove by scroll, wheel or a camera layer becomes a camera move from one focal point to the next on slide navigation, never a page visibly scrolling. Keep each move direct, without reversals the source doesn't make.
- Screenshots, posts, charts, code and any image with readable text are evidence: keep their aspect (`object-fit: contain`) and check all four edges for crops.
- Every copied `<video>`/`<audio>` needs `data-start` and `data-duration` (`data-has-audio="true"` when its sound plays), and no `preload="none"`. Custom media chrome reads the native element's events and `currentTime`, never its own timer.
- Hidden stacked slides need `opacity: 0`, `visibility: hidden` and `pointer-events: none` together, or an invisible layer swallows clicks.

## Present and hand off

- **Never render a deck to MP4**: `render` keeps only the first scene and truncates silently. For stills, `snapshot --at` each slide.
- Run `npx hyperframes check --json` until it is clean. The slideshow rule checks that every `sceneId` resolves, every hotspot `target` exists, fragments sit inside their slide, and main-line slides don't overlap. Video-oriented craft warnings (`first_frame_empty`, `dead_stretch`, `film_silent`) do not apply to a deck.
- Serve it with `npx hyperframes present <project-dir>` and hand over the URL it prints: "Click Present, or press P, to open the audience tab."
- With `present`, the project's root `index.html` is the raw composition holding the island: `present` reads the island from it, builds the slideshow page itself and serves the composition as `/composition/index.html`. Do not put a wrapper page there. Only a deck opened without `present` needs its own `<hyperframes-slideshow>` around `<hyperframes-player src="…">` page, with the raw composition in a subfolder (`slideshow` `references/standalone-harness.md`, see the reading table). Run `npx hyperframes` from the parent folder of the project: inside a project whose `package.json` is named `hyperframes`, the bare command resolves to that local package and fails.
- The component owns Present (P), Prev/Next, the counter, global mute, fullscreen, swipe, hotspots, presenter notes (editable, kept per deck) and stopping media on slide exit. Don't build your own versions of any of these.
- Screen sharing: in Google Meet share the audience **tab**, which keeps rendering in the background. In Zoom drag the audience tab into its own window and share that; a fully covered window freezes.
- Do not run the upstream usage beacon (`npx hyperframes events --skill=...`): it would report the official skill's name for this skill's work.
