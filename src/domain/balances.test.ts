import { describe, expect, it } from "vitest";
import { computeBalances, suggestTransfers } from "./balances";
import { demoGroup } from "./fixtures";
import type { Group } from "./types";

describe("saldos", () => {
  it("[RF-5] calcula el almuerzo de demo del plan", () => {
    expect(computeBalances(demoGroup)).toEqual({ ana: 6366, luis: -3133, sofia: -3833, diego: 600 });
  });

  it("[RF-5] la suma de los saldos es siempre cero", () => {
    expect(Object.values(computeBalances(demoGroup)).reduce((a, b) => a + b, 0)).toBe(0);
  });
});

describe("pagos sugeridos", () => {
  it("[RF-6] sugiere los 3 pagos del plan, de mayor a menor", () => {
    expect(suggestTransfers(demoGroup)).toEqual([
      { from: "sofia", to: "ana", amount: 3833 },
      { from: "luis", to: "ana", amount: 2533 },
      { from: "luis", to: "diego", amount: 600 },
    ]);
  });

  it("[RF-6] nunca usa más de N−1 pagos", () => {
    const people = Array.from({ length: 8 }, (_, i) => ({ id: `p${i}`, name: `P${i}` }));
    const g: Group = {
      participants: people,
      expenses: people.map((p, i) => ({
        id: `e${i}`, description: "x", amount: (i + 1) * 1037, paidBy: p.id,
        among: people.filter((_, j) => j !== i).map((q) => q.id),
      })),
    };
    const nonZero = Object.values(computeBalances(g)).filter((b) => b !== 0).length;
    expect(suggestTransfers(g).length).toBeLessThanOrEqual(nonZero - 1);
  });
});
