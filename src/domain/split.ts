import type { Cents, Id } from "./types";

/**
 * Divide un total en partes iguales, en céntimos enteros. Los céntimos que
 * sobran se reparten de uno en uno siguiendo el orden de alta en el grupo. RF-4.
 */
export function splitEqual(total: Cents, among: Id[], order: Id[]): Record<Id, Cents> {
  if (among.length === 0) return {};
  const position = new Map(order.map((id, i) => [id, i]));
  const sorted = [...among].sort((a, b) => (position.get(a) ?? Infinity) - (position.get(b) ?? Infinity));
  const base = Math.floor(total / among.length);
  const remainder = total - base * among.length;
  const shares: Record<Id, Cents> = {};
  sorted.forEach((id, i) => {
    shares[id] = base + (i < remainder ? 1 : 0);
  });
  return shares;
}
