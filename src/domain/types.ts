/** Monto en céntimos enteros: S/ 12.50 → 1250. */
export type Cents = number;
export type Id = string;

export interface Participant {
  id: Id;
  name: string;
}

export interface Expense {
  id: Id;
  description: string;
  amount: Cents;
  paidBy: Id;
  among: Id[]; // entre quiénes se divide en partes iguales
}

export interface Group {
  participants: Participant[];
  expenses: Expense[];
}

/** Pago sugerido: `from` le paga `amount` a `to`. */
export interface Transfer {
  from: Id;
  to: Id;
  amount: Cents;
}

export type Result<T> = { ok: true; value: T } | { ok: false; error: string };

export const ok = <T>(value: T): Result<T> => ({ ok: true, value });
export const fail = <T = never>(error: string): Result<T> => ({ ok: false, error });

export const emptyGroup = (): Group => ({ participants: [], expenses: [] });
