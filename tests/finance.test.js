import test from 'node:test';
import assert from 'node:assert/strict';
import { plans } from '../assets/data/plans.js';
import { simulate } from '../assets/js/finance.js';
test('reproduz o exemplo financeiro aprovado em 12 meses', () => {
  const r = simulate(plans[0], 12);
  for (const [key, expected] of Object.entries({ corrected:106000, embedded:31800, available:74200, sale:22260, paid:4740, profit:17520 })) assert.ok(Math.abs(r[key]-expected)<0.000001, key);
  assert.equal(r.roi.toFixed(2), '369.62');
});
test('usa mensalidade cadastrada e permite resultado negativo', () => {
  const r = simulate(plans[1], 240);
  assert.equal(r.paid, 850 * 240);
  assert.ok(r.profit < 0);
});
test('rejeita meses fora do prazo ou fracionários', () => {
  for (const m of [0, 241, 1.5, NaN]) assert.throws(() => simulate(plans[0], m), RangeError);
});
