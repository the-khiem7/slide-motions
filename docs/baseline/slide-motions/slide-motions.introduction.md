---
baseline_schema: "3.0"
pack: "slide-motions"
document: "introduction"
status: "active"
updated: "2026-11-15"
code_ref: "uncommitted"
---

# slide-motions - Introduction

## Scope

One agent skill, `slide-motions`: build a HyperFrames slideshow that presents live, with motion that plays in the presented deck. It is a wrapper over the official HyperFrames skills from https://github.com/heygen-com/hyperframes (rules verified at tag `v0.9.41`): Step 0 finds the installed `slideshow`, `hyperframes`, `hyperframes-cli`, `hyperframes-registry` and `media-use` skills, installs them with the person's approval when missing, and layers the live-motion rules on top. It also runs the project around a deck: brainstormed content and script, one folder per content file, a shared toolchain, `.gitignore` and a README listing every deck. Out of scope: video rendering guidance, upstream authoring guidance, and the FireHydra deck itself.

## Current truth

| Claim | State |
|---|---|
| Repo `C:\.repos\Skills\slide-motions` on `main`, commits `bbca5f3` to `b597984`, pushed to the public `origin` `the-khiem7/slide-motions`; SLM-P6 edits uncommitted | observed 2026-11-15 (SLM-D30) |
| Deck site on GitHub Pages: captured `present` shell, homepage with thumbnails, Actions deploy (SLM-D23 to SLM-D29) | planned, piloted in S4 under SLM-P7 |
| `slide-motions/SKILL.md` is a wrapper: Step 0 (identify client, resolve plugin or standalone official skills) plus the layer over `slideshow` - root clock, single-file runtime include, frozen CSS transitions, mid-point rest frame, `present` serving the raw root `index.html`, run from the parent folder - and a reading table into the official skill folders | implemented, static checks 2026-11-14 |
| `references/resolve-upstream.md` holds Step 0 in full: client, search locations, mode | implemented, static checks 2026-11-14 |
| `references/install-upstream.md` holds the install routes per client and scope, asked before running, and the fallback when a plugin source is blocked by policy (SLM-D11) | implemented; in Claude Code 2026-11-14 the plugin route failed on an enterprise policy block and the standalone project route `npx skills add ... --agent claude-code -y` installed the four skills; other routes not run |
| `references/live-motion.md` holds the playthrough and ambient-loop method built for the FireHydra deck | implemented |
| The repository holds no copy of an official file; `slide-motions/SKILL.md` is derived from the official `slideshow` `SKILL.md`; the paired upstream version is the frontmatter field `metadata.upstream-hyperframes-version` and `AGENTS.md` records the source and update procedure | implemented |
| Neither `hyperframes` nor `slideshow` is installed on this machine (Claude, agents and Gemini skill stores, plugin list) | observed 2026-11-14 |
| The FireHydra vendor copies `.agents/skills/slideshow` and `.claude/skills/slideshow` equal the committed v0.9.41 | implemented |
| `references/project-workflow.md` and `SKILL.md` Step 1 hold the deck project workflow; `SKILL.md` keeps every slide on the main line (SLM-D12), unique SVG defs ids per slide (SLM-D18) and accepts `composition_file_too_large` (SLM-D17) | implemented 2026-11-15; rules observed on the vLLM deck in `C:\.repos\Personal\S4`; the toolchain split (SLM-D16) not run |
| Junctions `slide-motions` exist under the `agents` and `claude` skill targets | implemented, observed 2026-11-15 |
| `/slide-motions` is listed in a session and drives a deck build | observed 2026-11-14 in Claude Code, standalone project install after a policy block; plugin and standalone global scenarios unverified |
| `README.md` is a pitch page for the brand SlideMotions (SLM-D8) with illustrations from `assets/source/readme.html`; it documents the install as `npx skills add the-khiem7/slide-motions` (SLM-D6) | implemented 2026-11-14, not viewed on github.com; the repo is pushed under that path, the command not run |
| The attribution in `AGENTS.md` is enough for the text derived from the official `slideshow` skill | unverified, see SLM-Q2 in `hallucination` |

## Target

A user types `/slide-motions` in any supported agent client and gets a deck workflow: the skill finds the official HyperFrames skills, or asks to install them (consent and project or global scope first), then applies the live-motion method on top of them.

## Constraints

- On the owner's machine, install by the junction tool in `C:\.repos\Skills\.Junction`, never `npx skills add` or `update`, which overwrite a junction with a copy. Readers of the README install with `npx skills add` (SLM-D6).
- The skill carries no copy of the official neighbour guidance; its reading table names paths inside the official skill folders found in Step 0.
- Installing the official skills asks the person for consent and scope first, and follows the route of the client the agent runs in; a plugin install is never touched by `skills update`.
- `SKILL.md` carries no `../` path and no hardcoded path into another skill's folder; Step 0 lists search locations, not dependencies.
- ASCII hyphen only and no hard-wrapped paragraph in own files.
- Apache-2.0 for own work; `AGENTS.md` names the upstream source and the frontmatter names the paired tag (SLM-D3).
- No commit and no push without the user's authorization.
