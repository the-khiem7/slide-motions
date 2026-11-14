---
baseline_schema: "3.0"
pack: "slide-motions"
document: "roadmap"
status: "active"
updated: "2026-11-14"
code_ref: "uncommitted"
---

# slide-motions - Roadmap

## Status

| Phase | Subject | Depends on | Status |
|---|---|---|---|
| SLM-P1 | Build the wrapper | - | complete |
| SLM-P2 | Install through the junction tool | SLM-P1 | blocked |
| SLM-P3 | First commit | SLM-P1 | planned |
| SLM-P4 | Trial in a fresh session, three install scenarios | SLM-P1, SLM-P2 | planned |
| SLM-P5 | README front page with illustrations | SLM-P1 | complete |

## Next action

Phase 2 (SLM-P2, install through the junction tool), in `slide-motions.roadmap.md`:

- Ask the user to approve running `powershell -NoProfile -File C:\.repos\Skills\.Junction\scripts\Junction.ps1 -Mode Apply`. The Scan of 2026-11-14 listed only `slide-motions` as MISSING, for the `agents` and `claude` targets, and no other action.
- Run Apply only after that approval of the exact Scan output.
- After Apply, check that `slide-motions` under both targets has link type `Junction` and points at `C:\.repos\Skills\slide-motions\slide-motions`.
- Never use `npx skills add` or `update` for this skill.

## SLM-P1: Phase 1 - Build the wrapper

- Deliver: `slide-motions/SKILL.md`, `references/live-motion.md`, `references/resolve-upstream.md`, `references/install-upstream.md`, `AGENTS.md`, `README.md`, `LICENSE`.
- Status: complete.
- Evidence: no `../` in `SKILL.md`; every file in `references/` is named in `SKILL.md` and exists; the 15 official paths named in its reading table exist at tag `v0.9.41` (checked with `gh api ... ?ref=v0.9.41`); no en or em dash in own files; description 612 characters. Search paths of Step 0 checked on this machine 2026-11-14: Claude store `$CLAUDE_CONFIG_DIR/skills` (set here to an Orca profile, not `~/.claude`), `~/.agents/skills`, `~/.gemini/config/skills`; plugin root is `installPath` in `installed_plugins.json`. `~/.bob/skills` and `~/.cursor/plugins/local` are absent here and rest on the upstream docs. FireHydra vendor copies of `slideshow` equal the committed `v0.9.41`.
- Acceptance: the checks above pass.
- Decisions: SLM-D1 to SLM-D4.

## SLM-P2: Phase 2 - Install through the junction tool

- Deliver: two junctions, `slide-motions` under the `agents` and `claude` skill targets.
- Status: blocked on the user's approval of Apply.
- Acceptance: `(Get-Item <target>\slide-motions).LinkType` is `Junction` for both; a second Scan shows `slide-motions` as OK.

## SLM-P3: Phase 3 - First commit

- Deliver: one commit of the repo, message by `commit-composer-max`.
- Status: planned. Needs the user's authorization to commit; no push, no remote.
- Acceptance: `git log` shows the commit and the working tree is clean.
- Open before any publishing: SLM-Q2 (licence status).

## SLM-P4: Phase 4 - Trial in a fresh session

- Deliver: evidence that `/slide-motions` is listed in a new session and that a deck request follows Step 0 of `SKILL.md`, in three scenarios: official skills installed as a plugin, installed standalone, and not installed (the agent names its client, asks consent and scope, proposes the right command).
- Status: planned.
- Acceptance: the skill appears in the skill list; in each scenario Step 0 reaches `slideshow/SKILL.md` or the install prompt; one deck passes `check --json` and `present`, and reads `references/live-motion.md` when motion is asked for. The scenario with nothing installed can be tried on this machine: no `hyperframes` or `slideshow` skill is in `~/.claude/skills`, `~/.agents/skills`, `~/.gemini/config/skills` or the plugin list.
- Verification gap: nothing so far was observed running; Phase 1 evidence is static file checks.

## SLM-P5: Phase 5 - README front page with illustrations

- Deliver: `README.md` rewritten as a pitch page; `assets/` with the banner and the "What it does" figure as GIF plus WebP, the "How it works" figure, five section icons and four navigation buttons, each in light and dark; `assets/banner-social.png` and `-dark.png` for the GitHub social preview; sources in `assets/source/` (`readme.html`, `shared.css`, `shared.js`, `brand/hyperframes-logo.svg`). Built with `frontdoor-readme` and `frontdoor-illustrate`; directions board in `.frontdoor/readme/` (git-ignored), round 1, directions 1 and 2 mixed.
- Status: complete.
- Evidence: after the SlideMotions rebrand (SLM-D8, SLM-D9), `render.py` 2026-11-14 wrote 26 images, the only WARN being the accepted social-card text-block warning (SLM-D10); fonts loaded Outfit, Inter, Fraunces, IBM Plex Mono; largest WebP 87 KB, social PNG 79 KB. `animate.py` wrote `banner.gif` 0.40 MB and `fig-motion.gif` 0.22 MB per theme, 90 frames at 10/s, 256 colours; frames checked by eye. Logo choice on the board, round 2. Every image path and anchor in `README.md` resolves; no en or em dash.
- Not observed: the README on github.com in light and dark, on a phone, and a `<picture>` inside a heading; `npx skills add the-khiem7/slide-motions` was not run (no remote). The social preview is uploaded by hand in the repository Settings.
- Decisions: SLM-D5 to SLM-D10.
