import { describe, expect, it } from "vitest";
import { computeBalances } from "./balances";
import { addExpense, addParticipant, removeExpense } from "./group";
import { emptyGroup, type Expense, type Group } from "./types";

const unwrap = <T>(r: { ok: true; value: T } | { ok: false; error: string }): T => {
  if (!r.ok) throw new Error(r.error);
  return r.value;
};
const withPeople = (...names: string[]): Group =>
  names.reduce((g, n) => unwrap(addParticipant(g, n.toLowerCase(), n)), emptyGroup());
const pizza = (o: Partial<Expense> = {}): Expense => ({
  id: "e1", description: "Pizza", amount: 3000, paidBy: "ana", among: ["ana", "luis"], ...o,
});

describe("participantes", () => {
  it("[RF-1] agrega un participante con el nombre recortado", () => {
    expect(unwrap(addParticipant(emptyGroup(), "p1", "  Ana  ")).participants).toEqual([{ id: "p1", name: "Ana" }]);
  });

  it("[RF-1] rechaza nombres vacíos, largos o duplicados (sin distinguir mayúsculas)", () => {
    expect(addParticipant(emptyGroup(), "p1", "  ").ok).toBe(false);
    expect(addParticipant(emptyGroup(), "p1", "a".repeat(31)).ok).toBe(false);
    expect(addParticipant(withPeople("Ana"), "p2", "ANA")).toEqual({ ok: false, error: "Ya existe un participante con ese nombre." });
  });
});

describe("gastos", () => {
  it("[RF-2] registra un gasto y los saldos se recalculan", () => {
    const g = unwrap(addExpense(withPeople("Ana", "Luis"), pizza()));
    expect(computeBalances(g)).toEqual({ ana: 1500, luis: -1500 });
  });

  it("[RF-2] eliminar un gasto devuelve los saldos a cero", () => {
    const g = removeExpense(unwrap(addExpense(withPeople("Ana", "Luis"), pizza())), "e1");
    expect(computeBalances(g)).toEqual({ ana: 0, luis: 0 });
  });

  it("[RF-3] rechaza descripción vacía, monto no positivo o división vacía", () => {
    const g = withPeople("Ana", "Luis");
    expect(addExpense(g, pizza({ description: " " })).ok).toBe(false);
    expect(addExpense(g, pizza({ amount: 0 })).ok).toBe(false);
    expect(addExpense(g, pizza({ among: [] })).ok).toBe(false);
  });
});
