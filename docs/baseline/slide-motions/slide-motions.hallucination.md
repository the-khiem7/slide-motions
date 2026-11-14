---
baseline_schema: "3.0"
pack: "slide-motions"
document: "hallucination"
status: "active"
updated: "2026-11-14"
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

## Open questions

### SLM-Q1: Drop the usage beacon

- Question: should `SKILL.md` omit the upstream line that runs `npx hyperframes events --skill=slideshow`? Applied as an agent default; the user has not ruled on it.
- Recommendation: keep it dropped. The beacon sends the skill name with CLI telemetry, so it would report this skill as the upstream one, and the official `hyperframes-cli` guidance says not to run `events` by hand.
- Alternative: keep it renamed to `--skill=slide-motions`. It sends a name HeyGen does not know.

### SLM-Q2: Licence status of a skill derived from the official `slideshow`

- Question: `slide-motions/SKILL.md` is derived from the official `slideshow` `SKILL.md`. The upstream repository is Apache-2.0, but its skill folders carry no licence statement of their own and the CLI package declares Apache-2.0. Is the attribution in `AGENTS.md` ("Upstream pairing") enough for the derived text?
- Recommendation: confirm with whoever handles licensing before the repo is published or shared; until then keep it private. This is not a legal conclusion.
