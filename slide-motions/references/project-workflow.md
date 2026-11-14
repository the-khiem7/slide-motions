# Deck project workflow

Read before writing any content or deck file: it decides the stage, the intake questions, the content file, the folder layout, the toolchain, `.gitignore` and the README of the repository the decks live in. Covers, the homepage and the deploy are in `references/deck-site.md`.

## Detect the stage

| The person brings | Stage | Do |
|---|---|---|
| An idea or a table of contents only | Brainstorm | Ask the intake questions, write the content file, get it approved, then build |
| A content file or a presentation guideline | Review | Check it against the content file sections below, ask for what is missing as labelled questions, then build |
| The same approved content, deck asked again | Rebuild | Ask where the new build goes (see Layout) |
| A new content file on a topic that already has a deck | New deck | Build into a new variant folder; never touch the other decks |
| Changes to a built deck | Deck edit | Edit `src/` and the content file, then rebuild |
| A built deck the person wants in the README, on a homepage or online | Publish | Capture the thumbnail and set up the site, see `references/deck-site.md` |

## Intake

Ask as labelled questions before writing the content file, each with a recommended default.

| Ask | Why it matters |
|---|---|
| Slide language and script language | They may differ. The slide language picks the font: Vietnamese needs a family that ships the `vietnamese` subset (Be Vietnam Pro, faces split by `unicode-range`), or the diacritics fall back to another face |
| Talk duration | Sets the slide count and the script length. It is not the timeline length: a 25-minute talk ran on a 208 s composition, because `data-duration` is the length of a slide's entrance and hold, not speaking time |
| Number of speakers | Prefix each slide's notes with `[Speaker N]`; nothing else changes |
| Audience level | Sets the vocabulary rules: how many terms need an everyday name, which words stay out of the talk |

## Content file

One file per deck, `content/<topic>/<variant>.md`, written in the script language.

| Section | Holds |
|---|---|
| Header table | Audience, talk duration, slide count |
| Key messages | One sentence, then the three or so points the audience keeps |
| Audience rules | Each technical term with its everyday name, words left out |
| Metaphor table | One metaphor carried through the talk, concept to image |
| Content TOC | Slide, part, title, duration, visual and motion idea |
| Build guideline | Style, colours with a meaning, figures reused across slides, motion |
| Script | One `### Slide <N> - <title>` section per slide; the build reads these into the island `notes` |
| Verified figures | Each number, its result, and a source link with a text fragment that lands on the passage |

- Verify every number before the build and cite its source small at the slide foot. A figure the content marks unverified is built as a visibly labelled placeholder, never an invented value.
- A side explanation is its own main-line slide next to the slide it explains (`SKILL.md`, every slide on the main line).

## Layout

| Path | Holds |
|---|---|
| `content/<topic>/<variant>.md` | The content file of one deck |
| `slide/<topic>/<variant>/` | The deck built from it: `index.html`, `src/`, `assets/` |
| `slide/<topic>/<variant>/thumbnail/cover.webp` | The cover of the deck, captured after each build and committed (`references/deck-site.md`). `present` ignores it |
| `slide/site.json` | The homepage settings of the repository, when a site is set up |

- The variant names the content, for example `content/vllm/restaurant.md` and `slide/vllm/restaurant/`. A flat `content/<topic>.md` to `slide/<topic>/` mapping breaks as soon as one topic has a second content file.
- A new content file always gets a new variant folder. Never write into another variant's folder.
- A rebuild from the same content asks first. Default: build into `<variant>-r2` (then `-r3`) when the existing deck is uncommitted, because overwriting an uncommitted deck loses it.
- Before moving, renaming or deleting a deck folder, stop every `hyperframes present` the session started: on Windows a running server holds the folder and the move fails with "Permission denied". Note the port and process id when starting a server, so a later summary cannot report it stopped while it still runs.

## Generator

For more than about ten slides, generate `index.html` from `slide/<topic>/<variant>/src/build.mjs` and its stylesheet instead of editing the composition by hand.

- The script holds the slide list (id, script key, duration, fragments in local seconds, HTML, timeline code), computes each `data-start` and the absolute fragment times, writes the island, and reads each slide's notes from the content file's `### Slide <N> - ` section.
- Why: a single-file deck of twenty slides passes 900 lines; hand edits drift from the script, and notes pasted by hand go stale when the script changes.
- Edits go to `src/` and the content file, never to `index.html`, which the next build overwrites.

## Toolchain

| Repository state | Layout |
|---|---|
| Only HyperFrames decks | One `package.json` at the repository root holds `hyperframes`, `gsap` and the font packages; `npm install` runs once; every command runs from the root as `npx hyperframes <command> slide/<topic>/<variant>`. The root package is never named `hyperframes` |
| Another slide engine is about to be installed (Slidev, reveal.js, Marp, Spectacle or any other) | Before installing it, distribute the root `package.json`: give each existing deck folder its own `package.json` with the dependencies that deck uses, run `npm install` in each, then remove those dependencies from the root manifest. Install the other engine inside its own deck folder, and update the README commands |

- Watch for the trigger: the person names another engine, a deck folder gains `slides.md` or another engine's config, or a non-HyperFrames presentation dependency is about to land in the root `package.json`.
- Why: one install serves every deck while one engine is in use; once two engines share the repository, each deck carries its own dependency surface, so upgrading one engine cannot break the other's decks.
- `slide-motions` never edits another engine's decks or dependencies.
- After the split, `npx` at the root no longer finds a deck's local `hyperframes`; run the commands from the deck folder instead (`npx hyperframes present .`). Try the command once before handing it over.

## `.gitignore`

Create or extend the root `.gitignore`:

| Entry | Why |
|---|---|
| `node_modules/` | Restored by `npm install` |
| `.hyperframes/` | `check`, `snapshot` and `present` artifacts |
| `skills-lock.json` | The local install record that `npx skills add` writes |
| `_site/` | The built deck site, when one is set up; the workflow rebuilds it |

- Ask about the client's skill folder (`.claude/`, `.agents/`) at the time, as a labelled question. Default: commit `.claude/skills/`, so a clone builds decks at once, and ignore `.claude/settings.local.json`, which is personal.
- Commit the generated `index.html`, `assets/vendor/` and `assets/fonts/`: `present` reads `index.html` as it is, and the deck must run offline. Commit `thumbnail/cover.webp` too: a README shows only committed images.

## README

The repository root `README.md` lists every deck. Update it in the same turn a deck is added, moved or rebuilt into a new folder, or the toolchain is split.

| Part | Holds |
|---|---|
| Setup | Node.js version and where `npm install` runs |
| Deck table | Topic, deck folder, engine, link to the content file, slide count and talk duration, status |
| Cover gallery | The `thumbnail/cover.webp` of each deck, linking to the deployed deck, once a site is set up (`references/deck-site.md`) |
| One block per deck | The build, `check` and `present` commands, each `present` with its own `--port` so several decks can be served at once |
| Editing note | Edit `src/` and the content file, never the generated `index.html` |
| Presenting | Click Present or press P; share the audience tab in Google Meet; in Zoom drag the audience tab into its own window |
