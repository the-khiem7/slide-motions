---
baseline_schema: "3.0"
pack: "slide-motions"
document: "hallucination"
status: "active"
updated: "2026-11-15"
code_ref: "uncommitted"
---

# slide-motions - Decisions and Open Questions

## Entry index

| ID | About | Status | Related |
|---|---|---|---|
| SLM-D1 | Wrapper over the official HyperFrames skills, no copy of their files | decided | SLM-D4 |
| SLM-D2 | Plain single-skill repo, not a skill-foundry repo | decided | - |
| SLM-D3 | Apache-2.0 for own work, upstream pairing recorded in `AGENTS.md` and the `SKILL.md` frontmatter | decided | SLM-Q2 |
| SLM-D4 | Missing official skills: identify client, ask consent and scope, then install | decided | SLM-D1 |
| SLM-D5 | HyperFrames logo kept in `assets/source/brand/` for a "powered by" badge | decided | SLM-D1, SLM-Q2 |
| SLM-D6 | README install route is `npx skills add`, not the junction tool | decided | SLM-D7 |
| SLM-D7 | README visual identity: borrowed HyperFrames palette and fonts, acetate overlay, two GIFs | decided, typeface amended by SLM-D8 | SLM-D5, SLM-D8 |
| SLM-D8 | SlideMotions brand: name, play-triangle lockup, HyperFrames type system | decided, amended by SLM-D9 | SLM-D7, SLM-D5, SLM-D9 |
| SLM-D9 | Brand signature: Fraunces italic "move", one bright green on both themes | decided | SLM-D8 |
| SLM-D10 | GitHub social card reuses the banner with a stacked brand name | decided | SLM-D8, SLM-D9 |
| SLM-D11 | Plugin source blocked by enterprise policy: ask, then install through `npx skills add` | decided | SLM-D4 |
| SLM-D12 | Every slide on the main line, no content behind a hotspot or button | decided | - |
| SLM-D13 | Deck project workflow in a reference file plus Step 1, not a separate skill | decided | SLM-D14, SLM-D16 |
| SLM-D14 | Folder layout `content/<topic>/<variant>.md` and `slide/<topic>/<variant>/`, rebuild placement | decided | SLM-D13 |
| SLM-D15 | `.gitignore` entries and the skill-folder question | decided | SLM-D13 |
| SLM-D16 | One root toolchain, split per deck before another slide engine is installed | decided | SLM-D13 |
| SLM-D17 | `composition_file_too_large` accepted for a single-file deck | decided | - |
| SLM-D18 | SVG `<defs>` ids unique per slide | decided | - |
| SLM-D19 | Live verification wait condition and puppeteer source | decided | - |
| SLM-D20 | Generator script with notes read from the content file | decided | SLM-D13 |
| SLM-D21 | Intake questions and content file sections | decided | SLM-D13 |
| SLM-D22 | Stop the session's own `present` server before moving a deck | decided | SLM-D14 |
| SLM-D23 | Deck site hosted on GitHub Pages through a custom Actions workflow | decided | SLM-D24, SLM-D27 |
| SLM-D24 | Static shell captured from a running `present`, paths made relative | decided | SLM-D23 |
| SLM-D25 | Homepage card: thumbnail, "Open deck" and "Audience" buttons | decided | SLM-D12, SLM-D26 |
| SLM-D26 | Deck thumbnail captured locally into `thumbnail/cover.webp` | decided | SLM-D25, SLM-D27 |
| SLM-D27 | CI gates: rebuild drift check and `lint`, no browser | decided | SLM-D17, SLM-D23 |
| SLM-D28 | Speaker notes public on the deployed site | decided | SLM-D25 |
| SLM-D29 | Workflow trigger, permissions and action pinning | decided | SLM-D23 |
| SLM-D30 | Repository state "no commit, no remote" was stale | lesson | SLM-Q2 |
| SLM-Q1 | Drop the usage beacon | open | - |
| SLM-Q2 | Licence status of a skill derived from the official `slideshow` | open | SLM-D3 |

## Closed decisions

### SLM-D1: Wrapper over the official HyperFrames skills, no copy of their files

- Decision: `slide-motions` is a skill of its own that carries no copy of HeyGen's neighbour guidance; `SKILL.md` Step 0 resolves the official skills (plugin, standalone global, standalone project) and the layer applies on top of the stock `slideshow` skill, the layer winning on conflict. Decided by the user, 2026-11-14.
- Why: a copy goes stale from the next tag, a link keeps the official guidance current while the layer stays [user]; edits made inside the vendor copy of `slideshow` are overwritten by `npx hyperframes skills update` and break the rule that a skill is changed in its own source repository [agent].
- What breaks if ignored: the live-motion method and the root-clock, runtime-include and frozen-CSS rules are lost on the next skill update, or a copied guidance tree drifts from upstream with no signal; a wrapper without Step 0 fails silently where the official skills are absent. The layer rules are behaviour of the paired tag `v0.9.41`, named in the `SKILL.md` frontmatter for notice only; the skill takes no action when the installed version differs (SLM-D3).

### SLM-D2: Plain single-skill repo, not a skill-foundry repo

- Decision: lay the repo out like `awsketch`, a plain single-skill repo. Decided by the user, 2026-11-14.
- Why: one skill needs no shared version stamp [agent].
- What breaks if ignored: not applicable. Consequence accepted: no generated test suite, so link, dash and `../` checks run by hand.

### SLM-D3: Apache-2.0 for own work, upstream pairing recorded in `AGENTS.md` and the `SKILL.md` frontmatter

- Decision: license the repo Apache-2.0; the upstream source, the commit and the procedure for moving to a newer tag are recorded in `AGENTS.md`, and the `SKILL.md` frontmatter field `metadata.upstream-hyperframes-version` names the paired tag, for notice only (no check, no action on a mismatch). Decided by the user, 2026-11-14.
- Why: the upstream repository is Apache-2.0 with `Copyright 2026 HeyGen, Inc.` and no `NOTICE` at `v0.9.41` [agent]; the pairing lives in the frontmatter and in `AGENTS.md`, not in a separate file [user].
- What breaks if ignored: the paired tag is unrecorded, so a later tag update has no baseline to compare against.

### SLM-D4: Missing official skills - identify client, ask consent and scope, then install

- Decision: when `slideshow` or `hyperframes` cannot be found, the agent identifies its own client first, picks that client's install route from `references/install-upstream.md`, asks the person for consent and for the scope (project-scoped or global-scoped), and runs the command only after the answer. Decided by the user, 2026-11-14.
- Why: an install writes outside the repository [agent]; the scope is the person's choice and not every user runs Claude Code [user].
- What breaks if ignored: a silent write into the person's profile or project; Claude-only commands handed to Codex, Gemini, Cursor or Copilot users; `skills update` run inside a plugin install, which the plugin guide forbids.

### SLM-D5: HyperFrames logo kept in `assets/source/brand/` for a "powered by" badge

- Decision: keep the HyperFrames logo as `assets/source/brand/hyperframes-logo.svg`, the one exception to the `AGENTS.md` rule "No copy of an official file", used only to draw the "powered by" badge in the README illustrations; the badge reads "powered by", not "built on". Decided by the user, 2026-11-14.
- Why: the README credits the project the skill builds on with its own mark [user]; the file stays outside `slide-motions/`, so the junction tool never links it into agent skill stores [agent]. The source pages inline it at render time and swap `fill="black"` for the theme ink, so one file serves both themes [agent].
- What breaks if ignored: removing the file under the no-copy rule breaks the render of `assets/source/readme.html`; moving it into `slide-motions/` ships HeyGen's trademark inside the skill. Publishing still waits for SLM-Q2, and the trademark use belongs to the same check with whoever handles licensing [agent].
- Rejected: inline the logo paths into `shared.js` and delete the file - the user chose to keep the file [user]. Badge text "built on" - the user chose "powered by" [user]. No logo, the name in plain text - loses the visual tie to HyperFrames [agent].

### SLM-D6: README install route is `npx skills add`, not the junction tool

- Decision: the README documents the install as `npx skills add the-khiem7/slide-motions`; the junction tool in `C:\.repos\Skills\.Junction` stays the owner's local install and never appears in the README. The same rule is in the owner's global agent instructions for every published skill repository. Decided by the user, 2026-11-14.
- Why: the junction approach is personal and must not be handed to readers of a publishing skill [user].
- What breaks if ignored: readers get a Windows path to a tool they do not have. Running `npx skills add` on the owner's machine still overwrites the junction with a copy, so the `AGENTS.md` install rule is unchanged [agent]. The command resolves only once the repository is pushed to GitHub as `the-khiem7/slide-motions`; it has no remote yet [agent].
- Rejected: junction-only install as in the earlier README [user]. A generic "copy the folder into your skill store" line - no source in the repo backs it [agent].

### SLM-D7: README visual identity - borrowed HyperFrames palette and fonts, acetate overlay, two GIFs

- Decision: the README illustrations use the HyperFrames cyan-to-green gradient (`#06E3FA` to `#4FDB5E`) and Space Grotesk, Inter and Fraunces; the metaphor is an overhead-projector acetate laid over a grey HyperFrames slide, with the onion-skin triangle entrance as its motion; GIFs only on the banner and the "What it does" figure, icons and buttons still; no text form of the diagrams; marketing tone. The signature note and render commands sit in the header of `assets/source/readme.html`. Decided by the user, 2026-11-14.
- Why: a wrapper should read as part of the HyperFrames family [user]; motion is used where it carries the product's point and not on every image [user].
- What breaks if ignored: a new image with other fonts or a new palette breaks the family look; GIFs on icons or every figure add megabytes and distraction; a re-added Step 0 flow or Mermaid diagram undoes the pitch-only page.
- Rejected: a palette and typeface derived only from the subject - the user chose the HyperFrames brand [user]. Direction 2 alone (onion-skin strip) - does not show the wrapper role [agent]. Direction 3 (two triangles holding a slide) - reads as a bow tie and looks like an official HeyGen asset [agent]. Still banner only, or GIFs everywhere - the user chose a balance [user]. A numbered Step 0 flow under `<details>` - removed for the pitching tone [user]. Gradient strokes on horizontal lines - an `objectBoundingBox` gradient on a zero-height line paints nothing, so trails use the solid `--trail` token [agent].
- Amended: the typeface part (Space Grotesk, Inter, Fraunces) is superseded by SLM-D8.

### SLM-D8: SlideMotions brand - name, play-triangle lockup, HyperFrames type system

- Decision: the brand name is SlideMotions; the logo is the gradient play triangle beside the wordmark SlideMotions in Outfit 800 (tracking -0.035em), set at the HyperFrames logo cap height wherever both appear; where the brand is named inside a figure, the lockup replaces plain text and its wordmark takes the brand-green gradient (`--magic-a` to `--magic-b`: `#0b9b78` to `#179a42` on light, at least 3.3:1; `#3ee6a8` to `#7bf08a` on dark); in the banner the wordmark is sized to the width of the tagline, which is Inter 500, so neither block outweighs the other; every other word in the images is Inter, skill and command names IBM Plex Mono; Space Grotesk, Fraunces and JetBrains Mono are dropped. The technical name stays `slide-motions` (skill folder, `/slide-motions`, `npx skills add the-khiem7/slide-motions`). Decided by the user, 2026-11-14.
- Why: the play-triangle mark plus a wordmark in the HyperFrames wordmark style makes SlideMotions read as a subsidiary of HyperFrames [user]. Outfit 800 is the closest free face to the HyperFrames wordmark, found by setting "HyperFrames" in eight free fonts under the real logo [agent].
- What breaks if ignored: a wordmark in another face, or the mark drawn smaller or larger than the HyperFrames logo beside it, loses the parent and subsidiary reading; renaming the technical identifier breaks the skill trigger, the junction and the install path.
- Disproven: SLM-D7 recorded Space Grotesk, Inter and Fraunces as the HyperFrames fonts. HyperFrames `DESIGN.md` at `v0.9.41` names ABC Solar Display (display and logo, 600), Inter (body) and IBM Plex Mono (code); only Inter was right [agent].
- Rejected: Urbanist 800 - looks lighter than the HyperFrames wordmark beside it [agent]. A licence for ABC Solar Display - commercial Dinamo face, and the exact HeyGen brand face would make SlideMotions look like an official HeyGen product [agent]. Keeping Space Grotesk and Fraunces, or Fraunces for the word "move" only - the user chose the HyperFrames system [user]. Renaming the technical identifier to match the brand - the user kept `slide-motions` [user].
- Amended: the dropped Fraunces and the darker light-theme green are reversed by SLM-D9.

### SLM-D9: Brand signature - Fraunces italic "move", one bright green on both themes

- Decision: the word "move" in the banner tagline is set in Fraunces italic 600 with the cyan-to-green gradient, at a larger size than the rest of the tagline; the brand-green wordmark gradient is `#3ee6a8` to `#7bf08a` on both the light and the dark ground. Decided by the user, 2026-11-14.
- Why: the handwritten "move" is the signature of the brand [user]; the light figure should carry the same HyperFrames-style green as the dark one [user].
- What breaks if ignored: a "move" set in Inter loses the one mark that makes the tagline recognisable; a darker green on light makes the two themes read as two brands. Accepted cost: the bright green on the light ground measures about 1.7:1, below the 3:1 large-text guide, so the wordmark is legible by size and weight, not by contrast [agent].
- Rejected: Inter 700 for "move", as SLM-D8 set it - loses the signature [user]. Darker light-theme stops `#0b9b78` to `#179a42` (3.3:1 and up) - the user wanted the dark-theme green [user].

### SLM-D10: GitHub social card reuses the banner with a stacked brand name

- Decision: `banner-social` is the banner recomposed at 2:1 - the name stacked as "Slide" with the play triangle on its right, then "Motions"; the tagline with the Fraunces "move"; "powered by" with the HyperFrames logo; the acetate art scaled to half on the right. Text is enlarged and heavier than in the banner (name Outfit 800 at 62 px, tagline Inter 600 at 25 px, "powered by" 17 px) so it reads as a chat-app thumbnail. Decided by the user, 2026-11-14.
- Why: one recognisable picture for the README and the shared link [user]; the stacked name doubles its size inside the 2:1 safe area [user].
- What breaks if ignored: a name-only card looks like a different brand from the README banner. `render.py` warns on every render that the card holds more than one text block; the warning is expected and accepted [agent].
- Rejected: the frontdoor default of brand name and mark only, no tagline - the user wanted the banner reused [user]. The one-line lockup at 44 px - too small for a thumbnail [user].

### SLM-D11: Plugin source blocked by enterprise policy - ask, then install through `npx skills add`

- Decision: when the client refuses the HyperFrames plugin marketplace because an organisation policy blocks the source, the agent stops the plugin route, tells the person the source is blocked and which sources the policy allows, and asks as labelled questions whether to install through the standalone `npx skills add` route at the scope they chose; it runs that route only on yes. Recorded in `references/install-upstream.md`, section "Plugin source blocked by policy". Decided by the user, 2026-11-14.
- Why: the user wants the agent to offer the `npx skills` route when this happens [user]; the policy, not the command, failed, so retrying the plugin route cannot succeed [agent].
- What breaks if ignored: the agent loops on a plugin install that the policy refuses, or stalls with no route, and the deck is never built; or it switches route without asking and writes skills from a source the organisation blocked as a plugin, without the person deciding. Observed in Claude Code 2026-11-14: `claude plugin marketplace add heygen-com/hyperframes --scope project` failed with "blocked by enterprise policy", `claude plugin install hyperframes@hyperframes --scope project` then failed with "not found in marketplace", nothing was written; `npx -y skills add heygen-com/hyperframes --skill hyperframes --skill slideshow --skill hyperframes-cli --skill hyperframes-registry --agent claude-code -y` from the project root copied the four skills into `.claude/skills`, which also settles that `--skill` repeats in one command [agent].
- Rejected: stop and wait for an administrator to allow the source as the only path - blocks the work for days, the user chose to be offered the `npx skills` route [user]. Switch to `npx skills add` silently - breaks the consent and scope rule of SLM-D4 and hides the policy block from the person [agent]. Retry the plugin route under another marketplace name - the policy matches the source, not the name [agent].

### SLM-D12: Every slide on the main line, no content behind a hotspot or button

- Decision: every slide goes in the main `slides` array; a side explanation is its own main-line slide next to the slide it explains; hotspots and `slideSequences` are used only when the person explicitly asks for an optional branch. Recorded in `SKILL.md`, "What changes from a video project". Decided by the user, 2026-11-15.
- Why: a slide hidden behind a call-to-action is skipped when the presenter forgets to click and moves to the next slide [user].
- What breaks if ignored: the audience misses content and nothing on the main line shows it. Observed in the vLLM deck (Personal S4 repository, 2026-11-15): slide 7b "1,6 GB lớn cỡ nào?" sat behind a dashed CTA hotspot on slide 7; the user rejected it, and it was moved onto the main line, `check` ok and snapshots of both slides reviewed [agent].
- Rejected: a CTA hotspot opening a branch for a side explanation, as the stock `slideshow` skill teaches - easy to miss [user].

### SLM-D13: Deck project workflow in a reference file plus Step 1, not a separate skill

- Decision: stage detection, intake, content file, folder layout, toolchain, `.gitignore` and README rules live in `references/project-workflow.md`, reached from a short "Step 1 - Detect the stage" in `SKILL.md`. Decided by the user, 2026-11-15.
- Why: the person invokes `/slide-motions` for the whole flow, from idea to served deck [agent]; `AGENTS.md` keeps `SKILL.md` a router plus layer rules [agent].
- What breaks if ignored: without a stage rule the agent invents a layout per session; in the vLLM project it wrote `content/vllm-brainstorm.md` and `deck/`, which collided when a second content file arrived and had to be migrated [agent].
- Rejected: a separate `presentation-brainstorm` skill - the person would call two skills for one deck [agent]. The rules in the `SKILL.md` body - grows the router past what every deck needs [agent].

### SLM-D14: Folder layout `content/<topic>/<variant>.md` and `slide/<topic>/<variant>/`, rebuild placement

- Decision: each deck's content file is `content/<topic>/<variant>.md` and its deck `slide/<topic>/<variant>/`; a new content file always gets a new variant folder; a rebuild from the same content asks first, defaulting to `<variant>-r2` when the existing deck is uncommitted. Decided by the user, 2026-11-15.
- Why: earlier results must survive a later turn [user]; one topic can carry several content files, as vLLM did with a restaurant and a hotel version [agent].
- What breaks if ignored: a second deck overwrites or mixes with the first; an uncommitted deck overwritten by a rebuild is lost.
- Rejected: flat `content/<topic>.md` to `slide/<topic>/` - collides at the second content file of a topic [agent]. Always overwrite on rebuild - loses uncommitted work [agent]. Always a new folder on rebuild - leaves stale copies when the old deck is already safe in git [agent].

### SLM-D15: `.gitignore` entries and the skill-folder question

- Decision: the root `.gitignore` carries `node_modules/`, `.hyperframes/` and `skills-lock.json`; whether to commit the client's skill folder (`.claude/`, `.agents/`) is asked at the time, defaulting to commit `.claude/skills/` and ignore `.claude/settings.local.json`. Decided by the user, 2026-11-15.
- Why: the user chose to ignore `skills-lock.json` [user]; the skill folder is a per-repository choice, not a fixed rule [user].
- What breaks if ignored: installed packages and `present` artifacts land in commits; a fixed rule on `.claude/` either drops skills a clone needs or commits personal settings.
- Rejected: commit `skills-lock.json` as a lockfile that records skill versions - the user chose to ignore it [user]. Ignore the whole `.claude/` folder - also drops the installed skills a clone needs [agent].

### SLM-D16: One root toolchain, split per deck before another slide engine is installed

- Decision: while the repository holds only HyperFrames decks, one root `package.json` serves every deck and commands run from the root; when another slide engine (Slidev, reveal.js, Marp or any other) is about to be installed, the agent first distributes the root manifest into each existing deck folder, installs per deck, and installs the other engine inside its own deck folder. Decided by the user, 2026-11-15.
- Why: keeps the repository flexible for several slide engines while splitting the dependency surface between them [user]; one install while one engine is in use, instead of a `hyperframes` and `puppeteer-core` copy per deck [agent].
- What breaks if ignored: two engines share one dependency tree and an upgrade of one breaks the other's decks; or every deck installs its own copy from the start.
- Rejected: a `package.json` per deck from the start - duplicates the install for every deck [agent]. One root manifest for every engine indefinitely - couples the engines [user].
- Not run: the split itself and the post-split commands (`npx hyperframes present .` from the deck folder) have not been tried; the central layout was observed working in S4 on 2026-11-15 (`hyperframes` 0.9.46 resolved from the root, `check` ok) [agent].

### SLM-D17: `composition_file_too_large` accepted for a single-file deck

- Decision: `check` counts as clean with `composition_file_too_large` present, beside the video-only warnings; the deck is not split to silence it. Recorded in `SKILL.md`, "Present and hand off". Decided by the user, 2026-11-15.
- Why: a single-file deck holds every slide, the root clock and the runtime include in one file, so the warning fires on any deck of normal size (the 23-slide vLLM deck has 940 lines) [agent].
- What breaks if ignored: the rule "check until clean" can never be met, and the agent restructures a working deck to clear a readability hint.
- Rejected: split into sub-composition files - a different deck shape with its own runtime injection, for no behavioural gain [agent].

### SLM-D18: SVG `<defs>` ids unique per slide

- Decision: in a single-file deck each slide defines the SVG patterns and gradients it uses, with the slide id in the defs id. Recorded in `SKILL.md`, "What changes from a video project". Decided by the user, 2026-11-15.
- Why: a `<pattern>` defined inside a hidden slide does not paint in another slide that references its id [agent].
- What breaks if ignored: hatching and fills vanish on the referencing slide with no error. Observed on slide 19 of the vLLM deck: the shared `waste` and `idle` patterns lived in slides 8 and 13, the before-and-after slide lost its hatching, and per-slide ids restored it in the snapshot [agent].
- Rejected: one shared defs block inside the first slide that needs it - disappears when that slide is hidden [agent].

### SLM-D19: Live verification wait condition and puppeteer source

- Decision: the live check loads the presented deck with `waitUntil: "domcontentloaded"` and a wait of about 6 s, using the `puppeteer-core` that the `hyperframes` package already depends on. Recorded in `references/live-motion.md`, "Verify". Decided by the user, 2026-11-15.
- Why: `networkidle2` never resolves against `present`, which keeps a connection open [agent].
- What breaks if ignored: the verification run times out and live motion goes unverified. Observed 2026-11-14 on the vLLM deck: `networkidle2` timed out; `domcontentloaded` plus 6 s read the slide 2 caption opacity 0 then 1 and a changing gear transform on slide 17 [agent].
- Rejected: `networkidle0` or `networkidle2` - never settle [agent]. Installing `puppeteer` separately - `puppeteer-core` is already in the `hyperframes` dependencies [agent].

### SLM-D20: Generator script with notes read from the content file

- Decision: a deck of more than about ten slides is generated by `slide/<topic>/<variant>/src/build.mjs`, which computes the timing and the island and reads each slide's notes from the content file's `### Slide <N> - ` sections; edits go to `src/` and the content file, never to the generated `index.html`. Recorded in `references/project-workflow.md`, "Generator". Decided by the user, 2026-11-15.
- Why: one script source for the talk and the notes; hand edits to a 900-line composition drift [agent].
- What breaks if ignored: speaker notes diverge from the approved script, and a hand edit to `index.html` is lost at the next build.
- Rejected: hand-writing the single-file composition - error-prone past ten slides [agent].

### SLM-D21: Intake questions and content file sections

- Decision: before writing content the agent asks slide language, script language, talk duration, number of speakers and audience level; the content file holds a header table, key messages, audience rules, a metaphor table, the TOC, the build guideline, the script by slide and verified figures with text-fragment sources; a figure marked unverified is built as a labelled placeholder. Recorded in `references/project-workflow.md`. Decided by the user, 2026-11-15.
- Why: the language picks the font subset (Vietnamese needs `vietnamese`); talk duration is not timeline length (25 minutes against 208 s in the vLLM deck); speakers only change the notes prefix [agent].
- What breaks if ignored: diacritics fall back to another face; the slide count is set from the timeline; unverified numbers reach the audience as fact.
- Rejected: building straight from a table of contents - the agent then invents the script and the figures [agent].

### SLM-D22: Stop the session's own `present` server before moving a deck

- Decision: before moving, renaming or deleting a deck folder the agent stops every `hyperframes present` it started, and notes the port and process id when starting one. Recorded in `references/project-workflow.md`, "Layout". Decided by the user, 2026-11-15.
- Why: on Windows a running server holds the folder [agent].
- What breaks if ignored: the move fails with "Permission denied". Observed 2026-11-15 in S4: a server started before a context compaction, reported stopped by the summary, still held `deck/`; stopping it let the move to `slide/vllm/restaurant/` succeed [agent].
- Rejected: retrying the move - the handle stays until the process ends [agent].

### SLM-D23: Deck site hosted on GitHub Pages through a custom Actions workflow

- Decision: a deck repository publishes its decks as one static site on GitHub Pages, built and deployed by a custom workflow (`actions/upload-pages-artifact` plus `actions/deploy-pages`); the person switches Settings > Pages > Source to "GitHub Actions" by hand. Piloted in `C:\.repos\Personal\S4` before it enters the skill. Decided by the user, 2026-11-15.
- Why: free for a public repository, with OIDC deploy and no stored secret [agent]; the default workflow token cannot enable Pages, and the person keeps that switch [user].
- What breaks if ignored: decks are viewable only through a local `present`; an agent enabling Pages through the API makes an outward-facing change the person did not make.
- Limits checked 2026-11-15 on docs.github.com: standard runners are free in public repositories; on GitHub Free without a payment method, private-repository usage is blocked at the $12 included amount, not charged; the 10 builds per hour soft limit does not apply to a custom workflow; site at most 1 GB, bandwidth soft limit 100 GB per month, deploy timeout 10 minutes [agent].
- Rejected: Cloudflare Pages - needs an API token stored as a repository secret [agent]. A `gh-pages` branch - commits build output into history [agent]. The agent enabling Pages with `gh api -X POST repos/<owner>/<repo>/pages -f build_type=workflow` - the user toggles it [user].

### SLM-D24: Static shell captured from a running `present`, paths made relative

- Decision: the site build starts `hyperframes present <deck> --no-open --port <free>` for each deck, fetches `/`, `/player.js` and `/slideshow.js`, rewrites the absolute paths `/player.js`, `/slideshow.js` and `/composition/` to relative ones, fails when the rewrite count differs from the expected one, and stops the server. The deck's `index.html` and `assets/` go under `composition/`; `src/` is not published. Decided by the user, 2026-11-15.
- Why: `present` (0.9.46, `dist/present-*.js`) builds the presenter page in memory - `<hyperframes-slideshow>` around `<hyperframes-player src="/composition/index.html">`, the island copied in, the audience-tab retitle and the sfx script - and serves only `/`, `/player.js`, `/slideshow.js` and `/composition/*`; Pages serves files only, so each deck needs that page as a file [agent]. Captured, the page follows a hyperframes upgrade, and a changed path fails the build instead of shipping a broken site [agent]. The project site lives under `/<repo>/`, where absolute paths resolve to the wrong place [agent].
- What breaks if ignored: a hand copy of the page drifts from the installed hyperframes and the web deck behaves unlike the local one; absolute paths 404 under the repository subpath.
- Condition met: the user accepted capture only if it caused no Actions charge. `present` is a Node HTTP server (`hono`, `@hono/node-server`) that opens a browser only with `--open`, and `npm ci` downloads no browser (`puppeteer-core` only; the one install script is `esbuild`), so the workflow runs no Chrome [agent].
- Rejected: a hand-written template of the 0.9.46 page - freezes upstream internals in the repository [agent].

### SLM-D25: Homepage card - thumbnail, "Open deck" and "Audience" buttons

- Decision: the site homepage lists decks by topic; each card shows the deck thumbnail, title, slide count and language, and two buttons: "Open deck" (`<topic>/<variant>/`) and "Audience" (`<topic>/<variant>/?mode=audience`). Presenter mode is entered with the slideshow's own Present control or the P key. A content file without a deck shows a card marked not built, with no button. Decided by the user, 2026-11-15.
- Why: the homepage only takes the viewer into a deck; presenting stays in the slideshow's own control [user]. Any tab of a deck without `mode=audience` posts its position on `BroadcastChannel("hf-slideshow:" + location.pathname)` on every change, and a `?mode=audience` tab follows it, so the Audience link alone reopens an audience window [agent].
- What breaks if ignored: the two links must share one pathname form (trailing slash, never `index.html`), or the channels differ and the audience tab stays on slide 1. Sync works only between tabs of one browser; an audience opened on another device does not follow [agent].
- Rejected: a one-click overlay calling the component's `present()` - the user rejected extra presenting controls on the site [user]. One button only - the user wanted the Audience link once it needs only the URL parameter [user]. Script and copy-command buttons - outside "go into the deck" [user].

### SLM-D26: Deck thumbnail captured locally into `thumbnail/cover.webp`

- Decision: after each deck build `/slide-motions` captures slide 1 at its end minus 0.5 s with `hyperframes snapshot --at <t> --no-end`, converts it to WebP 960x540 with `sharp` (a root devDependency) and writes `slide/<topic>/<variant>/thumbnail/cover.webp`, which is committed. The README deck table and the site homepage both use that file. Decided by the user, 2026-11-15.
- Why: a better repository front page, and one image for README and homepage [user]; GitHub renders only committed images in a README, so the capture cannot live in CI, and CI stays browser-free [agent]; the first frame of a deck is empty (`first_frame_empty`), while the end of slide 1 shows it fully revealed [agent]; a folder leaves room for more sizes [user].
- What breaks if ignored: a thumbnail at t=0 is blank; a PNG at 1920x1080 weighs 450-700 KB per deck; a deck changed without a new capture shows a stale cover.
- Observed 2026-11-15 in S4: `snapshot` took about 10 s per deck (restaurant at 7.5 s, llmhotel48 at 9.5 s, both correct); `hyperframes lint` gave the same result before and after a thumbnail file was added to a copy of the deck, since `present` serves only what the page requests [agent].
- Rejected: an overview page of every slide rendered in CI - replaced by the thumbnail approach [user]. `thumbnail.webp` at the deck root, or `docs/thumbnails/<topic>-<variant>.webp` - the user chose the folder [user]. Keeping the PNG - too heavy [agent]. Re-encoding with the `puppeteer-core` that hyperframes pulls in - depends on a transitive dependency [agent].

### SLM-D27: CI gates - rebuild drift check and `lint`, no browser

- Decision: the workflow re-runs each deck's `src/build.mjs`, fails on `git diff --exit-code slide/`, and runs `hyperframes lint` per deck; `hyperframes check` is not run in CI. Decided by the user, 2026-11-15.
- Why: catches a committed `index.html` that no longer matches its sources, without a browser [agent].
- What breaks if ignored: a hand-edited or stale `index.html` ships; with `check` in CI each run needs Chrome.
- Rejected: full `hyperframes check` in CI - needs headless Chrome, about 1-2 minutes per deck and less stable [agent].

### SLM-D28: Speaker notes public on the deployed site

- Decision: the deployed decks keep their speaker notes. Decided by the user, 2026-11-15.
- Why: notes live in the island JSON of each page, readable in the source; the S4 repository is already public, so nothing new is exposed [agent].
- What breaks if ignored: not applicable for a public repository; a private deck repository exposes its notes once deployed, since a Pages site is public.
- Rejected: stripping notes from the deployed build - the presenter loses them on the web [agent]. A private repository - Pages there needs a paid plan and the site stays public [agent].

### SLM-D29: Workflow trigger, permissions and action pinning

- Decision: `.github/workflows/pages.yml` runs on push to `main` touching `slide/`, `content/`, `scripts/`, `package*.json` or the workflow, and on `workflow_dispatch`; permissions `contents: read`, `pages: write`, `id-token: write`; `concurrency: pages`; Node 22; actions pinned by commit SHA with the tag in a comment (`checkout` v7.0.1, `setup-node` v7.1.0, `configure-pages` v6.0.0, `upload-pages-artifact` v5.0.0, `deploy-pages` v5.0.1, latest on 2026-11-15). Decided by the user, 2026-11-15, by approving the plan.
- Why: S4 is a working repository, so the semver release-branch convention for production repositories does not apply and `main` carries the decks [agent]; a SHA cannot be moved by a compromised tag [agent].
- What breaks if ignored: broader token permissions than the deploy needs; a retagged action runs unreviewed code with Pages write access.
- Rejected: pinning by tag - mutable [agent].

### SLM-D30: Repository state "no commit, no remote" was stale

- Believed: `introduction` stated "no commit, no remote" and `roadmap` held Phase 3 (SLM-P3, first commit) as planned, awaiting authorization.
- Disproven 2026-11-15 by `git log` and `git remote -v`: nine commits from `bbca5f3` (2026-11-14) to `b597984`, `origin` is `https://github.com/the-khiem7/slide-motions.git`, `main` is level with `origin/main`, and the GitHub repository is public. Who committed and pushed was not observed in this thread [agent].
- Lesson: re-run `git log -1` and `git remote -v` before restating repository state from a pack or a summary; a commit made outside the session is invisible otherwise [agent].
- Consequence: SLM-Q2 recommended keeping the repository private until the licence question is answered; it is now public [agent].

## Open questions

### SLM-Q1: Drop the usage beacon

- Question: should `SKILL.md` omit the upstream line that runs `npx hyperframes events --skill=slideshow`? Applied as an agent default; the user has not ruled on it.
- Recommendation: keep it dropped. The beacon sends the skill name with CLI telemetry, so it would report this skill as the upstream one, and the official `hyperframes-cli` guidance says not to run `events` by hand.
- Alternative: keep it renamed to `--skill=slide-motions`. It sends a name HeyGen does not know.

### SLM-Q2: Licence status of a skill derived from the official `slideshow`

- Question: `slide-motions/SKILL.md` is derived from the official `slideshow` `SKILL.md`. The upstream repository is Apache-2.0, but its skill folders carry no licence statement of their own and the CLI package declares Apache-2.0. Is the attribution in `AGENTS.md` ("Upstream pairing") enough for the derived text?
- Recommendation: confirm with whoever handles licensing before the repo is published or shared; until then keep it private. This is not a legal conclusion.
