import { fail, ok, type Expense, type Group, type Id, type Result } from "./types";

const MAX_NAME = 30;
const exists = (group: Group, id: Id) => group.participants.some((p) => p.id === id);

/** Agrega un participante con nombre único. RF-1. */
export function addParticipant(group: Group, id: Id, rawName: string): Result<Group> {
  const name = rawName.trim();
  if (name.length === 0) return fail("Escribe un nombre.");
  if (name.length > MAX_NAME) return fail(`El nombre puede tener como máximo ${MAX_NAME} caracteres.`);
  const taken = group.participants.some((p) => p.name.toLocaleLowerCase("es") === name.toLocaleLowerCase("es"));
  if (taken) return fail("Ya existe un participante con ese nombre.");
  return ok({ ...group, participants: [...group.participants, { id, name }] });
}

/** Valida y registra un gasto. RF-2, RF-3. */
export function addExpense(group: Group, expense: Expense): Result<Group> {
  const description = expense.description.trim();
  if (description.length === 0) return fail("Escribe una descripción para el gasto.");
  if (!Number.isInteger(expense.amount) || expense.amount <= 0) return fail("El monto debe ser mayor a cero.");
  if (!exists(group, expense.paidBy)) return fail("Elige quién pagó.");
  if (expense.among.length === 0) return fail("Elige al menos una persona para dividir el gasto.");
  if (!expense.among.every((id) => exists(group, id))) return fail("Hay personas en la división que no están en el grupo.");
  return ok({ ...group, expenses: [...group.expenses, { ...expense, description }] });
}

/** Elimina un gasto. RF-2. */
export function removeExpense(group: Group, id: Id): Group {
  return { ...group, expenses: group.expenses.filter((e) => e.id !== id) };
}
