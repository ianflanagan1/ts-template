import { describe, expect, it } from 'vitest';
import { err, ok, type Result } from './Result.ts';

describe('Result', () => {
  it('carries a value on success', () => {
    const result: Result<number, string> = ok(1);
    expect(result).toEqual({ ok: true, value: 1 });
  });

  it('carries an error on failure', () => {
    const result: Result<number, string> = err('bad');
    expect(result).toEqual({ ok: false, error: 'bad' });
  });
});
