# Deck site and thumbnails

Read when a deck is built and the person wants its cover in the README, a homepage listing every deck, or the decks online on GitHub Pages. It assumes the layout of `references/project-workflow.md`.

## What ships

The engine is four files in the `scripts/` folder next to this skill's `SKILL.md`. Each starts with the header `slide-motions site v1`.

| File | Becomes | Does |
|---|---|---|
| `decks.mjs` | `scripts/decks.mjs` | Finds every deck (a `slide/<topic>/<variant>/index.html` with a slideshow island) and every content file with no deck yet |
| `thumbs.mjs` | `scripts/thumbs.mjs` | `npm run thumbs`: captures slide 1 into `slide/<topic>/<variant>/thumbnail/cover.webp` |
| `build-site.mjs` | `scripts/build-site.mjs` | `npm run site`: writes `_site/`, the homepage plus one presenter page per deck |
| `pages.yml` | `.github/workflows/pages.yml` | Builds `_site/` and deploys it to GitHub Pages |

- Copy the files unchanged. Everything specific to the repository goes in `slide/site.json`, so a later engine version replaces the files without losing the repository's look. When the repository already holds the files, compare the header and offer the newer version; never overwrite silently.
- The workflow is not run from the skill folder: the CI runner has no skill.

## Install into a deck repository

Ask first, as labelled questions: it writes a workflow and a dependency into the person's repository.

1. Copy the four files as in the table.
2. `npm pkg set scripts.thumbs="node scripts/thumbs.mjs" scripts.site="node scripts/build-site.mjs"`.
3. `npm install -D sharp@<range>`, taking the range from `npm ls sharp`: `hyperframes` already depends on `sharp`, and declaring the same range keeps one copy in the tree.
4. Add `_site/` to `.gitignore`.
5. Write `slide/site.json` (below).
6. Run `npm run thumbs`, then `npm run site`, and verify (below).
7. Update the README: a gallery of the covers linking to the deployed decks, the site URL, a section on `thumbs`, `site` and the workflow. The URL is `https://<owner>.github.io/<repo>/`.
8. Tell the person to switch Settings > Pages > Source to "GitHub Actions" themselves. Never enable Pages through the API, and never commit or push without being asked.

## `slide/site.json`

Every field is optional. Without the file the homepage uses the repository name, English labels, the system font and a neutral dark theme.

| Field | Holds |
|---|---|
| `title`, `titleHighlight` | Homepage title; the words of it drawn in `theme.titleGradient`, or the whole title when omitted |
| `lang`, `intro`, `strings` | `vi` or `en` labels; a replacement intro paragraph (HTML); per-key label overrides |
| `topics` | Display name per topic folder, for example `{ "vllm": "vLLM" }` |
| `theme` | `bg`, `panel`, `line`, `ink`, `muted`, `accent`, `accentEnd`, `titleGradient` |
| `font` | `family`, `package` (an `@fontsource` package), `subsets`, `weights`; the package must be installed |

Fill `theme` once, at setup, from the `:root` tokens of the deck's `src/deck.css` or its `<style>`: `--bg`, `--panel`, `--line`, `--ink`, `--muted` map to the same keys; take `accent` and `accentEnd` from the deck's two main accent colours; take `font` from the family the deck loads. Show the person the result before building. The repository URL needs no field: it is read from `GITHUB_REPOSITORY` in CI and from the `origin` remote locally.

## Thumbnails

- After every build or rebuild of a deck run `npm run thumbs -- <topic>/<variant>` (no argument: every deck) and commit `thumbnail/cover.webp` with the deck. A deck changed without a new capture shows a stale cover.
- The capture snapshots slide 1 half a second before it ends, when every element has entered. The first frame of a deck is empty, so a capture at 0 s is blank.
- It runs on the person's machine with the Chrome that HyperFrames manages. It never runs in CI: GitHub renders only committed images in a README, and a browser-free workflow stays fast and cheap.
- Output is WebP, 960 by 540, about 15 to 30 KB per deck.

## Site build

- `present` builds its page in memory and serves only `/`, `/player.js`, `/slideshow.js` and `/composition/*`, so a static host needs that page as a file. `build-site.mjs` starts `hyperframes present <deck> --no-open`, saves the page, makes its three absolute paths relative and stops the server. A page captured this way follows the installed HyperFrames.
- The rewrite counts (1 for `/player.js`, 1 for `/slideshow.js`, 5 for `/composition/`) were read on HyperFrames 0.9.46. When another version serves a different page the build stops and names the count it found; read the page that version serves, adjust `rewrites` in `build-site.mjs`, and raise the engine version in the header of every file.
- The build fails on any root-absolute path left in the page, which would 404 under `/<repo>/`.
- `_site/<topic>/<variant>/` holds the presenter page, `composition/` (the deck's `index.html` and `assets/`) and `thumbnail/`; `_site/hf/` holds the shared player, the slideshow and the homepage fonts. `src/` is never published.

## Homepage

- Each card shows the cover, title, slide count, language and exactly two buttons: "Open deck" (`<topic>/<variant>/`) and "Audience" (`<topic>/<variant>/?mode=audience`). Presenting stays with the slideshow's own Present control or the P key. Do not add a present button, an overlay or other controls to the homepage.
- A content file without a deck appears as a card marked not built, with no button.
- Link every deck with its trailing slash and never to `index.html`. The audience tab follows the presenter tab through a `BroadcastChannel` named after `location.pathname`, so two spellings of one deck are two channels and the audience stays on slide 1.
- The audience follows only inside one browser on one machine. Say so on the page and in the README; another device does not follow.
- Speaker notes are part of each deck page, so they are public once deployed. State this to the person before the first deploy. Making the repository private is not a fix as far as known: a Pages site is public on a standard plan (not verified).

## Workflow

- Runs on a push to `main` that touches `slide/`, `content/`, `scripts/`, the package files or the workflow, and on `workflow_dispatch`. Steps: `npm ci`; rebuild each deck's `src/build.mjs` and fail on `git diff --exit-code -- slide/` (a committed `index.html` that no longer matches its sources); `hyperframes lint` per deck; `npm run site`; upload and deploy. No browser runs in CI.
- Permissions: `contents: read` for the build; `pages: write` and `id-token: write` only on the deploy job. Actions are pinned by commit SHA with the tag in a comment. To refresh a pin, resolve the tag with `gh api repos/<owner>/<action>/git/ref/tags/<tag>`; an annotated tag needs one more `git/tags/<sha>` call for the commit.
- A repository with a deck that has no `src/build.mjs` (a hand-written deck of ten slides or fewer) is handled: the loop skips a missing generator. An unmatched glob would otherwise pass its own pattern to `node` and fail the job.
- Cost, checked 2026-11-15: standard runners are free in public repositories; the 10 builds per hour Pages limit does not apply to a custom workflow; a site is at most 1 GB with a soft bandwidth limit of 100 GB per month. Sources: [free in public repositories](https://docs.github.com/en/billing/concepts/product-billing/github-actions#:~:text=Standard%20GitHub%2Dhosted%20runners%20in%20public%20repositories), [no build limit for a custom workflow](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits#:~:text=This%20limit%20does%20not%20apply%20if%20you%20build%20and%20publish%20your%20site%20with%20a%20custom%20GitHub%20Actions%20workflow). A private repository draws on the plan's included amount and is blocked, not charged, when that runs out and no payment method is on file.

## Limits

- The engine finds `hyperframes` and the font package in the root `node_modules`. After the toolchain split of `references/project-workflow.md` (a `package.json` per deck) it does not find them; do not run it unchanged after a split.
- Windows: stop every `hyperframes present` the session started before moving a deck folder, as in `project-workflow.md`. `build-site.mjs` stops its own servers.

## Verify before handing over

Serve `_site/` under `/<repo>/`, as GitHub Pages does, and drive it with `puppeteer-core` (already a dependency of `hyperframes`; the Chrome path comes from `npx hyperframes browser path`). Load with `waitUntil: "domcontentloaded"` and wait about 6 s, as in `references/live-motion.md`.

- The homepage lists every deck, the covers load, and a 390 px viewport has no horizontal scroll. Cover images use `loading="lazy"`: right after `load` they read `complete` false and a width of 0, so wait a second before asserting.
- A deck tab and a `?mode=audience` tab open in the same browser: three ArrowRight presses on the deck tab move both to the same slide.
- P on the deck tab opens one more audience tab and turns the deck tab into the presenter view with notes.
- No page or console error. The only 404s are the four optional `composition/sfx/*.mp3` clips that the page requests; `present` answers the same.
- After the deploy, repeat the checks against the live URL. Not run until then.
