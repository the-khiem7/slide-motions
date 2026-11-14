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

## Open questions

### SLM-Q1: Drop the usage beacon

- Question: should `SKILL.md` omit the upstream line that runs `npx hyperframes events --skill=slideshow`? Applied as an agent default; the user has not ruled on it.
- Recommendation: keep it dropped. The beacon sends the skill name with CLI telemetry, so it would report this skill as the upstream one, and the official `hyperframes-cli` guidance says not to run `events` by hand.
- Alternative: keep it renamed to `--skill=slide-motions`. It sends a name HeyGen does not know.

### SLM-Q2: Licence status of a skill derived from the official `slideshow`

- Question: `slide-motions/SKILL.md` is derived from the official `slideshow` `SKILL.md`. The upstream repository is Apache-2.0, but its skill folders carry no licence statement of their own and the CLI package declares Apache-2.0. Is the attribution in `AGENTS.md` ("Upstream pairing") enough for the derived text?
- Recommendation: confirm with whoever handles licensing before the repo is published or shared; until then keep it private. This is not a legal conclusion.
