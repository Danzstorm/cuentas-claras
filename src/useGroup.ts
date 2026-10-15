import { useMemo, useState } from "react";
import { computeBalances, suggestTransfers } from "./domain/balances";
import { addExpense, addParticipant, removeExpense } from "./domain/group";
import { emptyGroup, type Expense, type Group, type Id, type Result } from "./domain/types";

const newId = () => crypto.randomUUID();

/** Une la interfaz con el dominio. Cada acción devuelve un error o null. */
export function useGroup() {
  const [group, setGroup] = useState<Group>(emptyGroup);

  const apply = (result: Result<Group>): string | null => {
    if (!result.ok) return result.error;
    setGroup(result.value);
    return null;
  };

  const derived = useMemo(
    () => ({
      balances: computeBalances(group),
      transfers: suggestTransfers(group),
      order: group.participants.map((p) => p.id),
      nameOf: (id: Id) => group.participants.find((p) => p.id === id)?.name ?? "?",
    }),
    [group],
  );

  return {
    group,
    ...derived,
    addParticipant: (name: string) => apply(addParticipant(group, newId(), name)),
    addExpense: (draft: Omit<Expense, "id">) => apply(addExpense(group, { ...draft, id: newId() })),
    removeExpense: (id: Id) => setGroup(removeExpense(group, id)),
  };
}

export type GroupApi = ReturnType<typeof useGroup>;
