# ts-template

A [copier](https://copier.readthedocs.io) template for a Node TypeScript project that starts on [`@ianflanagan1/ts-baseline`](https://github.com/ianflanagan1/ts-baseline) and passes its own `devbox run -- task check` from the first commit.

```sh
copier copy --trust gh:ianflanagan1/ts-template my-project
```

`--trust` lets copier run the template's one task, `pnpm install` inside the new project's devbox, which writes the lockfile that `devbox run -- task setup` installs from.

## What a project gets

- devbox pinning Node, pnpm and go-task, and a `Taskfile.yml` with `setup`, `check`, `format` and `lint-file` tasks, the last three running the baseline's own through an include (`lint-file` is what the [static-checks](https://github.com/ianflanagan1/static-checks) hooks run on each edited file)
- ESLint, tsconfig and Prettier from the baseline, with `ts-baseline verify` in `check` so the project can't drift from it
- dependency-cruiser, extending the baseline's rules that keep `src/core/` free of I/O, knip for unused code and dependencies, Vitest
- a `Result` type in the core, a `main()` top-level handler, a GitHub Actions workflow that runs `devbox run -- task check`
- a `CLAUDE.md` to fill in
- `.config/ianf-repo-tools.toml` with the integration mode you choose (`local`, `pr-rebase` or `pr-merge`), which [repo-list and repo-fix](https://github.com/ianflanagan1/repo-tools) read; there's no default

Settings that belong to every project live in the baseline package, so they reach existing projects as a version bump. That includes the dependency rules and the commands behind `check`, `format` and `lint-file`. The template only holds what can't be a package: devbox, the Taskfile's few lines, CI and starting files.

## Keeping a project current

```sh
copier update --trust
```

merges what changed in the template since the project was made (it reads `.copier-answers.yml`), leaving conflicts to resolve as with a git merge.

## Development

```sh
devbox run -- task check   # generate a project and run its check
```

`devbox run -- task check BASELINE=file:/path/to/package.tgz` tries a baseline that isn't on npm yet.
