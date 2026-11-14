---
baseline_schema: "3.0"
pack: "slide-motions"
document: "sourcecode"
status: "active"
updated: "2026-11-14"
code_ref: "uncommitted"
---

# slide-motions - Source Layout

## Repository topology

| Path | Role |
|---|---|
| `slide-motions/` (skill folder) | The unit the junction tool links into `agents` and `claude` skill targets |
| `slide-motions/SKILL.md` | Entry: Step 0 (resolve official skills), slide rules, reading table into the official skill folders, hand-off. Frontmatter holds `name` and `description` only |
| `slide-motions/references/live-motion.md` | Own work: stand-in clock playthrough and ambient loops |
| `slide-motions/references/resolve-upstream.md` | Own work: Step 0 in full (client, search locations, mode) |
| `slide-motions/references/install-upstream.md` | Own work: install routes per client and scope, asked before running |
| `AGENTS.md` | Rules for an agent improving the skill: where a change goes, constraints, checks, upstream pairing and update procedure, pack records, approval |
| `README.md`, `LICENSE` | Repo front page, Apache-2.0 text for own work |
| `assets/` | README images: WebP and GIF pairs (light, dark), `banner-social.png` for the GitHub social preview |
| `assets/source/` | HTML sources of those images (`readme.html` with the signature note and render commands, `shared.css`, `shared.js`) and `brand/hyperframes-logo.svg` (SLM-D5); outside the skill folder, so never linked into agent skill stores |
| `docs/baseline/slide-motions/` | This pack |

## Reading flow

The agent loads `SKILL.md`, which sends it first to `references/resolve-upstream.md` (Step 0): identify its client, find `slideshow` and `hyperframes` (skill list, plugin root, standalone stores), and read `references/install-upstream.md` only when they are missing. It then reads the stock `slideshow` skill and applies the layer in `SKILL.md`. The reading table sends it to one file per need inside the official skill folders found in Step 0. `live-motion.md` is read only when the deck should animate while presented; the official `slideshow` skill's `references/standalone-harness.md` only for a deck opened without `present`, with the npm script paths given in the reading table.
