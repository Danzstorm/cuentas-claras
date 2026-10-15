import { useState, type FormEvent } from "react";
import { formatCents, parseAmount } from "../domain/money";
import { splitEqual } from "../domain/split";
import type { Id } from "../domain/types";
import type { GroupApi } from "../useGroup";
import { Avatar, Card, ErrorText, buttonClass, inputClass } from "./ui";

export function ExpenseForm({ api }: { api: GroupApi }) {
  const people = api.group.participants;
  const [description, setDescription] = useState("");
  const [amountText, setAmountText] = useState("");
  const [paidBy, setPaidBy] = useState<Id>("");
  const [excluded, setExcluded] = useState<Set<Id>>(new Set());
  const [error, setError] = useState<string | null>(null);

  const payer = people.some((p) => p.id === paidBy) ? paidBy : (people[0]?.id ?? "");
  const among = people.filter((p) => !excluded.has(p.id)).map((p) => p.id);
  const amount = parseAmount(amountText);
  const preview = amount.ok ? splitEqual(amount.value, among, api.order) : {};

  const toggle = (id: Id) =>
    setExcluded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!amount.ok) return setError(amount.error);
    const err = api.addExpense({ description, amount: amount.value, paidBy: payer, among });
    setError(err);
    if (!err) {
      setDescription("");
      setAmountText("");
      setExcluded(new Set());
    }
  };

  if (people.length < 2) {
    return (
      <Card step="02" title="Registrar un gasto">
        <p className="text-sm text-muted">Primero agrega al menos dos personas.</p>
      </Card>
    );
  }

  return (
    <Card step="02" title="Registrar un gasto">
      <form onSubmit={submit} className="space-y-4">
        <div className="grid grid-cols-[1fr_8.5rem] gap-2">
          <input className={inputClass} placeholder="¿Qué se pagó? (ej. Taxi)" value={description}
            onChange={(e) => setDescription(e.target.value)} aria-label="Descripción" />
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-mono text-sm text-muted">S/</span>
            <input className={`${inputClass} pl-9 text-right font-mono`} placeholder="0.00" inputMode="decimal"
              value={amountText} onChange={(e) => setAmountText(e.target.value)} aria-label="Monto" />
          </div>
        </div>

        <label className="flex items-center gap-3 text-sm">
          <span className="shrink-0 font-semibold">Pagó</span>
          <select className={inputClass} value={payer} onChange={(e) => setPaidBy(e.target.value)} aria-label="Quién pagó">
            {people.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </label>

        <div>
          <p className="mb-2 text-sm font-semibold">Se divide en partes iguales entre:</p>
          <ul className="space-y-1.5">
            {people.map((p, i) => (
              <li key={p.id} className="flex items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-paper">
                <Avatar name={p.name} index={i} size="sm" />
                <label className="flex flex-1 cursor-pointer items-center gap-2 text-sm font-medium">
                  <input type="checkbox" className="h-4 w-4 accent-ink" checked={!excluded.has(p.id)} onChange={() => toggle(p.id)} />
                  {p.name}
                </label>
                <span className="font-mono text-sm text-muted">{preview[p.id] !== undefined ? formatCents(preview[p.id]!) : "—"}</span>
              </li>
            ))}
          </ul>
        </div>

        <button className={`${buttonClass} w-full`} type="submit">Agregar gasto</button>
        <ErrorText>{error}</ErrorText>
      </form>
    </Card>
  );
}
