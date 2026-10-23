#!/bin/sh
# Generates a project from the template and runs that project's own check, so the template is known to produce a
# project that passes it, ts-baseline verify included.
#
# BASELINE, when set, replaces the @ianflanagan1/ts-baseline version range, e.g. file:/path/to/package.tgz to try a
# baseline that isn't on npm yet.

set -eu

root=$(cd "$(dirname "$0")/.." && pwd)
out=$(mktemp -d)
trap 'rm -rf "$out"' EXIT

copier copy --trust --defaults --quiet \
    --data project_name=sample --data description='A sample project' \
    ${BASELINE:+--data "baseline_version=$BASELINE"} \
    "$root" "$out/sample"

cd "$out/sample"
git init -q
devbox run check
