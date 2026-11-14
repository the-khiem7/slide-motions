# AGENTS.md

Rules for an agent that improves the `slide-motions` skill in this repository. Read this file in full before changing anything. The repository root is `C:\.repos\Skills\slide-motions`; the skill is the folder `slide-motions/`.

## What this skill is

A wrapper over the official HyperFrames skills. It carries no copy of an official file; `SKILL.md` is derived from the official `slideshow` `SKILL.md`. `slide-motions/SKILL.md` is a thin layer on the official `slideshow` skill: Step 0 finds or installs the official skills, then a short list of rules changes how a deck is built. Everything else belongs to HeyGen and is read from where the person installed it. An improvement that restates official guidance breaks this model: the copy goes stale at the next tag.

## Where an improvement goes

| The improvement is | Put it in | Not in |
|---|---|---|
| A rule that changes how a deck is built and that the stock `slideshow` skill lacks or gets wrong (a runtime behaviour, a seek or freeze fault) | `slide-motions/SKILL.md`, section "What changes from a video project" (or "Porting an existing page", "Present and hand off") | a reference file, if every deck needs it |
| A method with code that only some decks need (live playthrough, ambient loops, a new motion technique) | a file in `slide-motions/references/`, plus one row in the "Where to read more" table of `SKILL.md` | `SKILL.md` body |
| How to find the official skills, a new search location, a new client | `slide-motions/references/resolve-upstream.md` | `SKILL.md`, which keeps only the stub |
| A new install route, a changed install command, a new client's route | `slide-motions/references/install-upstream.md` | `resolve-upstream.md` |
| The upstream version the skill is paired with | `metadata.upstream-hyperframes-version` in the `SKILL.md` frontmatter, and the commit in "Upstream pairing" below | any other file |
| Why something was decided, a rejected option, an open question, status | the pack `docs/baseline/slide-motions/` | `README.md`, code comments in the skill |
| A fault that belongs to HyperFrames itself | report it to the person to raise upstream | any file here, unless it needs a workaround, then it is a rule in `SKILL.md` with the fault named |

Every improvement lands in a reference file, one of two ways:

1. **Add to an existing reference file** when one already owns the topic: `live-motion.md` for live motion, `resolve-upstream.md` for finding the official skills, `install-upstream.md` for install routes. Extend that file, in its own section if the point is distinct, rather than starting a parallel file on the same topic.
2. **Create a new reference file** in `slide-motions/references/` when no existing file owns the topic. Name it for the topic (kebab-case, `.md`), start it with a one-line statement of when to read it, and write it in the same style as the existing ones. Content that only some decks need always goes here, never into the `SKILL.md` body.

Then make `SKILL.md` reach it, because an agent never opens a file `SKILL.md` does not name:

- A new file needs a row in the "Where to read more" table: the need in the left column, the path in the right.
- Add or change a section of `SKILL.md` only when the improvement is a rule every deck needs (it then goes under "What changes from a video project", "Porting an existing page" or "Present and hand off", stated in one or two lines with its cause) or when the router needs a new step. If the point is long, keep one line in `SKILL.md` and the detail in the reference file.
- A new section in `SKILL.md` stays short; if it grows past a few lines, move the body into a reference file and leave a pointer.

`SKILL.md` stays a router plus the layer rules: do not let it grow by pasting a method into it.

## Before adding a rule

1. Check the rule against the official skill at the paired version and, when the installed version differs, against the installed one. Read the official `slideshow` `SKILL.md` in full. If upstream already says it, do not add it.
2. Reproduce the fault or the gain, or have evidence from a real deck: `check --json` output, a `snapshot`, or an observation of the presented deck. A rule written from memory or from a guess is not added. A static check is not evidence that motion works live.
3. State the rule with its cause in the same sentence: what happens without it and why (for example, "without the root clock only the first slide plays"). A rule without its cause is the one a later agent deletes as noise.
4. When upstream later absorbs a rule, remove it from `SKILL.md` as part of the next tag update (procedure in "Upstream pairing" below).

## Constraints that every edit keeps

- No copy of an official file in this repository: no official `SKILL.md`, reference, script or licence file. Point to the official skill by name and path inside it. One exception: the HyperFrames logo at `assets/source/brand/hyperframes-logo.svg`, kept only to draw the "powered by" attribution in the README illustrations; it never enters the skill folder `slide-motions/`, which the junction tool links into agent skill stores.
- `slide-motions/SKILL.md` carries no `../` and no hardcoded path into another skill's folder. Search locations listed in `resolve-upstream.md` are places to look, not dependencies.
- Plugin mode: never run `hyperframes skills update`, `skills check` or `npx skills add`. Never run `npx skills add` or `update` for `slide-motions` itself: it overwrites the junction with a copy. Install through `C:\.repos\Skills\.Junction\scripts\Junction.ps1`.
- Installing the official skills writes outside the repository. The skill asks the person for consent and for scope (project or global) before running; do not weaken that when editing `install-upstream.md`.
- Keep the `description` in the `SKILL.md` frontmatter accurate and under 1024 characters; it is what makes the skill trigger.
- ASCII hyphen only; no en or em dash in any file. No hard-wrapped paragraph: one paragraph is one line.
- No `Co-Authored-By` or other AI attribution trailer in commits.

## Check after every change

Run from the repository root and report the result as observed, never as assumed:

- `grep -n '\.\./' slide-motions/SKILL.md` finds nothing.
- Every `references/<file>.md` named in `SKILL.md` exists, and every file in `slide-motions/references/` is named in `SKILL.md` (a file nothing names is never read).
- Every official path named in the "Where to read more" table exists at the paired version: `gh api "repos/heygen-com/hyperframes/contents/<path>?ref=<tag>"`, with `<tag>` from the frontmatter.
- No en or em dash: `LC_ALL=C grep -n $'\xe2\x80\x93\|\xe2\x80\x94'` over the changed files finds nothing.
- Description length: `sed -n '3p' slide-motions/SKILL.md | wc -c` stays below 1024.
- A change to how a deck behaves is tried on a real deck: `npx hyperframes check --json` clean, `snapshot --at` each affected slide, `present` opened. If it was not run, say "not run" in the pack and in the reply.

## Upstream pairing

- Source: the official HyperFrames skills (https://github.com/heygen-com/hyperframes: `skills/slideshow`, `skills/hyperframes`, `skills/hyperframes-cli`, `skills/hyperframes-registry`, `skills/media-use`).
- Paired version: the `SKILL.md` frontmatter field `metadata.upstream-hyperframes-version` names the tag the rules were verified against, `v0.9.41` (commit `20084cb`, 2026-11-13). It is informational: the skill runs no check on it and takes no action when the installed version differs.
- Licence: the upstream repository is Apache-2.0, `Copyright 2026 HeyGen, Inc.`, with no `NOTICE` at that tag. `slide-motions/SKILL.md` is derived from the official `slideshow` `SKILL.md`; `LICENSE` in this repository covers its own work. Whether this attribution is enough is open (SLM-Q2 in the pack).
- Updating to a newer tag:
  1. Read the new tag's `skills/slideshow/SKILL.md`.
  2. For each rule under "What changes from a video project" in `SKILL.md`, check with `check --json` and a `snapshot` whether upstream now covers it; remove a rule upstream absorbed, keep the rest.
  3. Check that the paths in the "Where to read more" table exist in the new tag, and whether `skills/slideshow/references/standalone-harness.md` still uses monorepo script paths (the table gives the npm paths that replace them).
  4. Update the frontmatter version and the commit in this section.

## Recording the change in the pack

The pack in `docs/baseline/slide-motions/` is the decision log and status record. Before creating or editing any pack file, read the pack contract in the `baseline-core` skill (`references/pack-contract.md`) in full, every time.

- A new rule that changes behaviour, or a rejected alternative: add an entry to `slide-motions.hallucination.md` with Decision, Why, What breaks if ignored, Rejected, and its row in the Entry index. Allocate the next `SLM-D<N>` by scanning every pack document, never from memory.
- The user closes a decision. A choice between alternatives the user has not ruled on is an open question with your Recommendation, tagged `[agent]`, never a decision. Tag a reason `[user]` only when the user stated or confirmed it.
- Work that finishes or starts goes in `slide-motions.roadmap.md` as a phase with its final evidence; a layout change goes in `slide-motions.sourcecode.md`; a change of current truth goes in `slide-motions.introduction.md`.
- Do not delete a decision or a claim that was disproven: relocate it as a closed entry that records what was believed and what disproved it.
- The `baselinedocs-save` and `baselinedocs-sync-decisions` skills do this work; use them when available.

## Approval and commits

- Improvements found while the skill is in use are proposed to the person first: say what to change, why, and the expected effect. Apply only the items they approve.
- Edit this repository, never the vendor copies under another project's `.agents/skills` or `.claude/skills`. An edit made there is overwritten by the next skills update.
- Do not commit or push without the person's explicit authorization. This repository has no remote.
- Do not publish or share the repository before the licence question SLM-Q2 in the pack is answered.
