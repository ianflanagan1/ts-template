#!/bin/sh
# Generates a project from the template and runs that project's own check, so the template is known to produce a
# project that passes it, ts-baseline verify included. The project must also declare the integration mode it was given,
# which repo-list and repo-fix read.
#
# BASELINE, when set, replaces the @ianflanagan1/ts-baseline version range, e.g. file:/path/to/package.tgz to try a
# baseline that isn't on npm yet.

set -eu

root=$(cd "$(dirname "$0")/.." && pwd)
out=$(mktemp -d)
trap 'rm -rf "$out"' EXIT

copier copy --trust --defaults --quiet \
    --data project_name=sample --data description='A sample project' --data integration=pr-rebase \
    ${BASELINE:+--data "baseline_version=$BASELINE"} \
    "$root" "$out/sample"

cd "$out/sample"
grep -qx 'integration = "pr-rebase"' .config/ianf-repo-tools.toml || {
    echo 'The project has no .config/ianf-repo-tools.toml with integration = "pr-rebase".' >&2
    exit 1
}
git init -q
devbox run check
