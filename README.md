# slide-motions

A single agent skill, `slide-motions`: build a HyperFrames slideshow that presents live, with motion that plays in the presented deck. It is a wrapper over the official HyperFrames skills from https://github.com/heygen-com/hyperframes (rules verified at tag v0.9.41): it finds the installed `slideshow`, `hyperframes`, `hyperframes-cli`, `hyperframes-registry` and `media-use` skills, offers to install them when missing, and layers the live-motion rules on top. It carries no copy of HeyGen's guidance.

## Layout

| Path | Content |
|---|---|
| `slide-motions/SKILL.md` | The skill: Step 0 (resolve the official skills), then rules for slides, root clock, runtime include, fragments, hotspots, hand-off |
| `slide-motions/references/live-motion.md` | Entrances that play at real speed and ambient loops in the presented deck, with code |
| `slide-motions/references/resolve-upstream.md` | Step 0 in full: identify client, find the official skills, mode |
| `slide-motions/references/install-upstream.md` | How to install the official skills per client and scope, asked before running |
| `AGENTS.md` | Rules for an agent that improves this skill: where each kind of change goes, checks, upstream pairing and update procedure, pack records |
| `docs/baseline/slide-motions/` | Baseline pack: decisions with reasons, roadmap, source layout |

## Install

This repository sits under `C:\.repos\Skills`, so the junction tool links it: from `C:\.repos\Skills\.Junction` run `scripts\Junction.ps1 -Mode Scan`, read the output, then `-Mode Apply`. Do not use `npx skills add` for it. `/slide-motions` needs the official HyperFrames skills (plugin or standalone); when they are missing it asks before installing, and asks whether to install project-scoped or global-scoped.

## Licence

Apache-2.0 for this repository's own work (`LICENSE`). The repository holds no copy of an official file; `slide-motions/SKILL.md` is derived from the official `slideshow` skill and the official skills are read from where the person installed them, see `AGENTS.md`.
