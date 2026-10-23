// @ts-check
// Dependency direction: the core is plain values and functions, so it imports nothing outside itself.

/** @type {import('dependency-cruiser').IConfiguration} */
export default {
  forbidden: [
    {
      name: 'core-is-pure',
      comment: 'The core does no I/O: no Node built-ins, no libraries, nothing else of ours.',
      severity: 'error',
      from: { path: '^src/core/' },
      to: { pathNot: '^src/core/' },
    },
    {
      name: 'no-circular',
      severity: 'error',
      from: {},
      to: { circular: true },
    },
  ],
  options: {
    doNotFollow: { path: 'node_modules' },
    exclude: { path: ['node_modules', '\\.devbox'] },
    tsPreCompilationDeps: true,
    enhancedResolveOptions: { exportsFields: ['exports'], conditionNames: ['import', 'default'], extensions: ['.ts', '.js'] },
  },
};
