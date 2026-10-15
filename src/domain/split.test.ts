import { describe, expect, it } from "vitest";
import { splitEqual } from "./split";

const order = ["ana", "luis", "sofia", "diego"];

describe("splitEqual", () => {
  it("[RF-4] divide en partes iguales cuando es exacto", () => {
    expect(splitEqual(12000, order, order)).toEqual({ ana: 3000, luis: 3000, sofia: 3000, diego: 3000 });
  });

  it("[RF-4] S/ 10.00 entre 3: el céntimo sobrante va al primero en orden de alta", () => {
    expect(splitEqual(1000, ["sofia", "ana", "luis"], order)).toEqual({ ana: 334, luis: 333, sofia: 333 });
  });

  it("[RF-4] la suma de las partes es siempre el total", () => {
    for (const total of [1, 7, 999, 2500, 12345]) {
      const shares = splitEqual(total, order, order);
      expect(Object.values(shares).reduce((a, b) => a + b, 0)).toBe(total);
    }
  });
});
