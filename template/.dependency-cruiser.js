// @ts-check
// The baseline keeps src/core/ free of I/O and forbids cycles. Add the project's own rules here; one with a
// baseline rule's name changes only the fields it sets.

/** @type {import('dependency-cruiser').IConfiguration} */
export default {
  extends: '@ianflanagan1/ts-baseline/dependency-cruiser',
};
