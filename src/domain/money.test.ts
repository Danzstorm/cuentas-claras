import { describe, expect, it } from "vitest";
import { formatCents, parseAmount } from "./money";

describe("parseAmount", () => {
  it("[RF-3] convierte montos válidos a céntimos, con punto o coma", () => {
    expect(parseAmount("12")).toEqual({ ok: true, value: 1200 });
    expect(parseAmount("12.5")).toEqual({ ok: true, value: 1250 });
    expect(parseAmount("12,50")).toEqual({ ok: true, value: 1250 });
    expect(parseAmount(" 0.01 ")).toEqual({ ok: true, value: 1 });
  });

  it("[RF-3] rechaza montos vacíos, cero, negativos o con más de 2 decimales", () => {
    for (const bad of ["", "0", "0.00", "-3", "1.234", "abc", "1.2.3", "1e3"]) {
      expect(parseAmount(bad).ok, `"${bad}" debería ser inválido`).toBe(false);
    }
  });

  it("[RF-3] explica el error en lenguaje humano", () => {
    expect(parseAmount("0")).toEqual({ ok: false, error: "El monto debe ser mayor a cero." });
  });
});

describe("formatCents", () => {
  it("[RF-5] muestra soles con separador de miles y 2 decimales", () => {
    expect(formatCents(123450)).toBe("S/ 1,234.50");
    expect(formatCents(5)).toBe("S/ 0.05");
    expect(formatCents(100000000)).toBe("S/ 1,000,000.00");
    expect(formatCents(-3533)).toBe("-S/ 35.33");
  });
});
