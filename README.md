# ts-template

A [copier](https://copier.readthedocs.io) template for a Node TypeScript project that starts on [`@ianflanagan1/ts-baseline`](https://github.com/ianflanagan1/ts-baseline) and passes its own `devbox run check` from the first commit.

```sh
copier copy --trust gh:ianflanagan1/ts-template my-project
```

`--trust` lets copier run the template's one task, `pnpm install` inside the new project's devbox, which writes the lockfile that `devbox run setup` installs from.

## What a project gets

- devbox pinning Node and pnpm, with `setup`, `check`, `format` and `lint-file` scripts (`lint-file` is what the [static-checks](https://github.com/ianflanagan1/static-checks) hooks run on each edited file)
- ESLint, tsconfig and Prettier from the baseline, with `ts-baseline verify` in `check` so the project can't drift from it
- dependency-cruiser keeping `src/core/` free of I/O, knip for unused code and dependencies, Vitest
- a `Result` type in the core, a `main()` top-level handler, a GitHub Actions workflow that runs `devbox run check`
- a `CLAUDE.md` to fill in

Settings that belong to every project live in the baseline package, so they reach existing projects as a version bump. The template only holds what can't be a package: devbox, scripts, CI and starting files.

## Keeping a project current

```sh
copier update --trust
```

merges what changed in the template since the project was made (it reads `.copier-answers.yml`), leaving conflicts to resolve as with a git merge.

## Development

```sh
devbox run check   # shellcheck, then generate a project and run its check
```

`BASELINE=file:/path/to/package.tgz devbox run check` tries a baseline that isn't on npm yet.
