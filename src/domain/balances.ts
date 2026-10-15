import { splitEqual } from "./split";
import type { Cents, Group, Id, Transfer } from "./types";

/** Saldo de cada participante: lo que pagó menos lo que consumió. RF-5. */
export function computeBalances(group: Group): Record<Id, Cents> {
  const order = group.participants.map((p) => p.id);
  const balance: Record<Id, Cents> = Object.fromEntries(order.map((id) => [id, 0]));
  for (const e of group.expenses) {
    balance[e.paidBy] = (balance[e.paidBy] ?? 0) + e.amount;
    for (const [id, share] of Object.entries(splitEqual(e.amount, e.among, order))) {
      balance[id] = (balance[id] ?? 0) - share;
    }
  }
  return balance;
}

/**
 * Pagos que saldan todas las deudas: el mayor deudor le paga al mayor
 * acreedor hasta que alguien queda en cero. Como máximo N−1 pagos. RF-6.
 */
export function suggestTransfers(group: Group): Transfer[] {
  const order = group.participants.map((p) => p.id);
  const rank = new Map(order.map((id, i) => [id, i]));
  const balances = computeBalances(group);

  type Entry = { id: Id; amount: Cents };
  const biggestFirst = (a: Entry, b: Entry) => b.amount - a.amount || rank.get(a.id)! - rank.get(b.id)!;
  const creditors: Entry[] = order.filter((id) => balances[id]! > 0).map((id) => ({ id, amount: balances[id]! }));
  const debtors: Entry[] = order.filter((id) => balances[id]! < 0).map((id) => ({ id, amount: -balances[id]! }));

  const transfers: Transfer[] = [];
  while (creditors.length > 0 && debtors.length > 0) {
    creditors.sort(biggestFirst);
    debtors.sort(biggestFirst);
    const creditor = creditors[0]!;
    const debtor = debtors[0]!;
    const amount = Math.min(creditor.amount, debtor.amount);
    transfers.push({ from: debtor.id, to: creditor.id, amount });
    creditor.amount -= amount;
    debtor.amount -= amount;
    if (creditor.amount === 0) creditors.shift();
    if (debtor.amount === 0) debtors.shift();
  }
  return transfers.sort((a, b) => b.amount - a.amount || rank.get(a.from)! - rank.get(b.from)!);
}
