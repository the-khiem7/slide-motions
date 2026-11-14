---
baseline_schema: "3.0"
pack: "slide-motions"
document: "roadmap"
status: "active"
updated: "2026-11-15"
code_ref: "uncommitted"
---

# slide-motions - Roadmap

## Status

| Phase | Subject | Depends on | Status |
|---|---|---|---|
| SLM-P1 | Build the wrapper | - | complete |
| SLM-P2 | Install through the junction tool | SLM-P1 | complete |
| SLM-P3 | First commit | SLM-P1 | complete |
| SLM-P4 | Trial in a fresh session, three install scenarios | SLM-P1, SLM-P2 | in progress |
| SLM-P5 | README front page with illustrations | SLM-P1 | complete |
| SLM-P6 | Deck project workflow and lessons from the vLLM deck | SLM-P1 | complete |
| SLM-P7 | GitHub Pages deploy pilot in S4 | SLM-P6 | in progress |
| SLM-P8 | Carry deploy and thumbnail into the skill | SLM-P7 | planned |

## Next action

Phase 7 (SLM-P7, GitHub Pages deploy pilot), in `C:\.repos\Personal\S4`:

- Build steps 1 to 6 of SLM-P7 in S4; no commit and no push until the user asks.
- Step 7 waits for the user: they switch Pages to "GitHub Actions" by hand (SLM-D23), then authorize the push.
- The SLM-P6 changes in this repository stay uncommitted until the user asks.
- Never use `npx skills add` or `update` for this skill.

## SLM-P1: Phase 1 - Build the wrapper

- Deliver: `slide-motions/SKILL.md`, `references/live-motion.md`, `references/resolve-upstream.md`, `references/install-upstream.md`, `AGENTS.md`, `README.md`, `LICENSE`.
- Status: complete.
- Evidence: no `../` in `SKILL.md`; every file in `references/` is named in `SKILL.md` and exists; the 15 official paths named in its reading table exist at tag `v0.9.41` (checked with `gh api ... ?ref=v0.9.41`); no en or em dash in own files; description 612 characters. Search paths of Step 0 checked on this machine 2026-11-14: Claude store `$CLAUDE_CONFIG_DIR/skills` (set here to an Orca profile, not `~/.claude`), `~/.agents/skills`, `~/.gemini/config/skills`; plugin root is `installPath` in `installed_plugins.json`. `~/.bob/skills` and `~/.cursor/plugins/local` are absent here and rest on the upstream docs. FireHydra vendor copies of `slideshow` equal the committed `v0.9.41`.
- Acceptance: the checks above pass.
- Decisions: SLM-D1 to SLM-D4.

## SLM-P2: Phase 2 - Install through the junction tool

- Deliver: two junctions, `slide-motions` under the `agents` and `claude` skill targets.
- Status: complete.
- Acceptance: `(Get-Item <target>\slide-motions).LinkType` is `Junction` for both; a second Scan shows `slide-motions` as OK.
- Evidence: 2026-11-15, `~/.claude/skills/slide-motions`, `~/.agents/skills/slide-motions` and the Orca profile store `skills/slide-motions` are all `Junction` to `C:\.repos\Skills\slide-motions\slide-motions`. Who ran Apply and the second Scan were not observed.

## SLM-P3: Phase 3 - First commit

- Deliver: one commit of the repo, message by `commit-composer-max`.
- Status: complete, observed 2026-11-15 (SLM-D30): nine commits `bbca5f3` to `b597984` dated 2026-11-14, pushed to the public `origin` `the-khiem7/slide-motions`. Who committed and pushed was not observed.
- Acceptance: `git log` shows the commit and the working tree is clean.
- Open: SLM-Q2 (licence status), now that the repository is public.

## SLM-P4: Phase 4 - Trial in a fresh session

- Deliver: evidence that `/slide-motions` is listed in a new session and that a deck request follows Step 0 of `SKILL.md`, in three scenarios: official skills installed as a plugin, installed standalone, and not installed (the agent names its client, asks consent and scope, proposes the right command).
- Status: in progress.
- Acceptance: the skill appears in the skill list; in each scenario Step 0 reaches `slideshow/SKILL.md` or the install prompt; one deck passes `check --json` and `present`, and reads `references/live-motion.md` when motion is asked for. The scenario with nothing installed can be tried on this machine: no `hyperframes` or `slideshow` skill is in `~/.claude/skills`, `~/.agents/skills`, `~/.gemini/config/skills` or the plugin list.
- Evidence: 2026-11-14 and 2026-11-15 in Claude Code, repository `C:\.repos\Personal\S4`: `/slide-motions` was listed and invoked with nothing installed; the plugin route was refused by policy (SLM-D11), the standalone project route installed the skills, and the 23-slide vLLM deck passed `check --json` (ok, warnings per SLM-D17), `snapshot` of every hold, `present`, and a live playthrough and ambient check (SLM-D19).
- Not run: the plugin scenario and the standalone global scenario.

## SLM-P5: Phase 5 - README front page with illustrations

- Deliver: `README.md` rewritten as a pitch page; `assets/` with the banner and the "What it does" figure as GIF plus WebP, the "How it works" figure, five section icons and four navigation buttons, each in light and dark; `assets/banner-social.png` and `-dark.png` for the GitHub social preview; sources in `assets/source/` (`readme.html`, `shared.css`, `shared.js`, `brand/hyperframes-logo.svg`). Built with `frontdoor-readme` and `frontdoor-illustrate`; directions board in `.frontdoor/readme/` (git-ignored), round 1, directions 1 and 2 mixed.
- Status: complete.
- Evidence: after the SlideMotions rebrand (SLM-D8, SLM-D9), `render.py` 2026-11-14 wrote 26 images, the only WARN being the accepted social-card text-block warning (SLM-D10); fonts loaded Outfit, Inter, Fraunces, IBM Plex Mono; largest WebP 87 KB, social PNG 79 KB. `animate.py` wrote `banner.gif` 0.40 MB and `fig-motion.gif` 0.22 MB per theme, 90 frames at 10/s, 256 colours; frames checked by eye. Logo choice on the board, round 2. Every image path and anchor in `README.md` resolves; no en or em dash.
- Not observed: the README on github.com in light and dark, on a phone, and a `<picture>` inside a heading; `npx skills add the-khiem7/slide-motions` was not run (no remote). The social preview is uploaded by hand in the repository Settings.
- Decisions: SLM-D5 to SLM-D10.

## SLM-P6: Phase 6 - Deck project workflow and lessons from the vLLM deck

- Deliver: `references/project-workflow.md` (stage, intake, content file, layout, generator, toolchain, `.gitignore`, README); `SKILL.md` Step 1, a reading-table row, the main-line rule, the SVG defs rule and the `composition_file_too_large` note; the Verify wait condition in `references/live-motion.md`; README feature list and layout table.
- Status: complete.
- Evidence: the rules come from the vLLM deck built in `C:\.repos\Personal\S4` on 2026-11-14 and 2026-11-15: main-line slide 7b, per-slide defs ids, `domcontentloaded` verification, the `deck/` to `slide/vllm/restaurant/` migration with a root `package.json` (`check` ok from the root, snapshots of slides 7 and 7b reviewed). The `AGENTS.md` checks were run after the edit.
- Not run: the toolchain split before another slide engine (SLM-D16), a rebuild into `<variant>-r2`, and a fresh session reading Step 1.
- Decisions: SLM-D12 to SLM-D22.

## SLM-P7: Phase 7 - GitHub Pages deploy pilot in S4

- Scope: repository `C:\.repos\Personal\S4` (`the-khiem7/vllm-highlevel-understanding`, public, Pages not enabled on 2026-11-15); site URL `https://the-khiem7.github.io/vllm-highlevel-understanding/`.
- Deliver, in order:
  1. `scripts/thumbs.mjs` and `npm run thumbs`: slide 1 at its end minus 0.5 s to `slide/<topic>/<variant>/thumbnail/cover.webp`, `sharp` as devDependency (SLM-D26).
  2. `scripts/build-site.mjs` and `npm run site`: shell captured from `present --no-open`, paths made relative, `_site/<topic>/<variant>/` with `composition/` and the thumbnail, `_site/_hf/`, `.nojekyll`; `_site/` in `.gitignore` (SLM-D24).
  3. Homepage `_site/index.html` with cards by topic (SLM-D25).
  4. `.github/workflows/pages.yml` (SLM-D27, SLM-D29).
  5. README: thumbnail column linking to the live decks, site URL, a Deploy section.
  6. Local test: `_site` served under `/vllm-highlevel-understanding/`; puppeteer opens a deck and its Audience tab, checks the audience follows navigation, fonts load.
  7. The user enables Pages; push on the user's authorization; check the live site.
- Status: in progress; steps 1 to 7 not started.
- Acceptance: the live homepage lists both decks with thumbnails; "Open deck" presents with Present and notes; "Audience" follows the deck tab in the same browser; the workflow passes on `main`.
- Decisions: SLM-D23 to SLM-D29.

## SLM-P8: Phase 8 - Carry deploy and thumbnail into the skill

- Deliver: a reference for the site build and the workflow (shell capture, pathname rule, same-browser sync limit, workflow template); `references/project-workflow.md` gains the thumbnail step after each build and a Deploy stage; README feature list; `AGENTS.md` layout rule checked before any new template folder.
- Status: planned; starts once SLM-P7 passes its acceptance.
