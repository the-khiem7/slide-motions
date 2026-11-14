# Installing the official HyperFrames skills

Read this when Step 0 in `SKILL.md` found no `slideshow` or no `hyperframes` skill. Source of every route below: the HyperFrames repository guides `docs/guides/skills.mdx` and `docs/guides/plugins.mdx` at tag `v0.9.41`.

## Rules

- Installing writes outside this repository, into the person's profile or the project. Never install silently: show the exact command, say where it writes, ask, then run.
- Ask two things as labelled questions, the person answers by label: (A) install now, yes or no; (B) scope, project-scoped or global-scoped. Never pick the scope for them.
- A plugin is managed by the client's plugin manager, so its scope is the client's. Ask B only when the client offers a choice.
- `slideshow` is not in the core set. A standalone install always needs it added by name. A plugin already contains it.
- Needs Node.js 22+ and npm for the CLI. FFmpeg is only for rendering, which a deck does not use.
- Never run `npx skills add` or `update` on this skill (`slide-motions`): it overwrites a junction with a copy.
- Offline, no write permission, or the person declines: stop and say so. Do not write the official guidance from memory.

## Which route for which client

Use the route of the client you identified in Step 0.

| Client | Preferred route | Alternative |
|---|---|---|
| Claude Code | Plugin: `claude plugin marketplace add heygen-com/hyperframes`, then `claude plugin install hyperframes@hyperframes`, then `/reload-plugins` or a new session. Check `claude plugin details hyperframes`. Scope flag: `--scope user|project|local` on both `marketplace add` and `install` | Standalone at the person's scope; when the marketplace is blocked by policy, see "Plugin source blocked by policy" |
| GitHub Copilot CLI | Plugin: `copilot plugin marketplace add heygen-com/hyperframes`, `copilot plugin install hyperframes@hyperframes`; `/skills list` to confirm | Standalone global, then `/skills reload` |
| VS Code / Copilot | Plugin through Extensions, search `@agentPlugins`, add `heygen-com/hyperframes`. The person does this in the UI; give the steps, do not run them | Standalone |
| Cursor | Plugin from a team marketplace, or a local copy at `~/.cursor/plugins/local/hyperframes` holding `plugin.json` and `skills/`; the person reloads Cursor | Standalone |
| Gemini CLI | `gemini extensions install https://github.com/heygen-com/hyperframes`; add `--ref <release-tag>` to pin a release, `--auto-update` to follow; restart Gemini CLI | Standalone project into `~/.gemini/config/skills` |
| Codex | The HyperFrames Codex plugin the person already has. If missing, tell the person; plugin directory updates are published separately | Standalone |
| OpenCode | Standalone (no plugin) | - |
| IBM Bob | Standalone global, then restart Bob Shell; skills link under `~/.bob/skills` | - |
| Google Antigravity | Standalone project from the project root: `npx skills add heygen-com/hyperframes`, pick Core Skills and Antigravity (writes `.agents/skills`). Global store is `~/.gemini/config/skills` | - |
| Other | Standalone | - |

## Plugin source blocked by policy

An organisation can restrict which plugin marketplaces the client may add. In Claude Code the add fails with `Marketplace source 'github:heygen-com/hyperframes' (github.com) is blocked by enterprise policy. Allowed sources: ...`, and the following `claude plugin install hyperframes@hyperframes` fails with `not found in marketplace`. Nothing is written by either.

- Do not retry the plugin route, and do not try another marketplace name or source for it: the policy, not the command, is what failed.
- Tell the person the plugin source is blocked by their organisation's policy, quote the allowed sources the message lists, and ask as labelled questions: (A) install through the standalone `npx skills add` route instead, yes or no; (B) scope, project-scoped or global-scoped, keeping the scope they already chose for the plugin as the default. Say that the policy blocks this source as a plugin, so they may want to confirm with IT before the standalone route; the decision is theirs.
- On yes, run the standalone command for the chosen scope from the table below. On no, stop: the person can ask an administrator to allow `heygen-com/hyperframes` and retry the plugin route.

## Standalone routes by scope

| Scope | Commands | Writes to |
|---|---|---|
| Global | `npx hyperframes skills update` (core set), then `npx hyperframes skills update slideshow` | Claude global store (`$CLAUDE_CONFIG_DIR/skills`, default `~/.claude/skills`), linked into other installed agents |
| Project | From the video project directory: `npx skills add heygen-com/hyperframes --skill <name>` for each of `hyperframes`, `hyperframes-cli`, `hyperframes-registry`, `media-use`, `slideshow` (bare name, no leading slash), or `--all` for the complete set. `--skill` repeats in one command; add `--agent claude-code -y` (or the person's client) to skip the agent and confirmation prompts, which a non-interactive shell cannot answer: `npx -y skills add heygen-com/hyperframes --skill hyperframes --skill slideshow --skill hyperframes-cli --skill hyperframes-registry --agent claude-code -y` (observed with `skills` CLI, 2026-11-14: copied the four skills into `.claude/skills`) | `.agents/skills`, `.claude/skills` of the project |

Notes that change what to run:
- `skills update` installs from the release tag matching the CLI version, so skills match the CLI. `skills add` resolves a registry copy that can lag `main` by hours. Prefer `skills update` when the person has no preference.
- From a HyperFrames source checkout, use the global route only. A project-local install can overwrite uncommitted edits to the tracked `skills/` folder.
- `npx hyperframes init` installs the core set only when missing and never touches an existing skill, so after `init` still add `slideshow`.
- `skills update` checks the Claude global store only. A skill present only in another agent's folder does not count as installed there; name it explicitly to add it.

## After installing

1. Run Step 0 again. Read `slideshow/SKILL.md` and `hyperframes/SKILL.md` by path; the client's skill list updates only after a reload or a new session.
2. Both a plugin and a standalone copy now exist: tell the person, ask which to keep, never delete either yourself. The HyperFrames guide says to remove only the old HyperFrames skills, never a whole `.agents` or `.claude` folder.
3. Plugin mode from here on: no `hyperframes skills update`, `skills check` or `npx skills add`; the CLI runs through `plugin-cli.mjs`.
