import { formatCents } from "../domain/money";
import type { GroupApi } from "../useGroup";
import { Card } from "./ui";

export function ExpenseList({ api }: { api: GroupApi }) {
  const { expenses } = api.group;
  const total = expenses.reduce((acc, e) => acc + e.amount, 0);
  return (
    <Card step="04" title="Gastos" aside={<span className="font-mono text-sm font-bold">{expenses.length > 0 ? formatCents(total) : ""}</span>}>
      {expenses.length === 0 ? (
        <p className="text-sm text-muted">Todavía no hay gastos.</p>
      ) : (
        <ul>
          {expenses.map((e) => (
            <li key={e.id} className="pop dashed flex items-center gap-3 py-3 first:border-t-0 first:pt-0">
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{e.description}</p>
                <p className="text-xs text-muted">Pagó {api.nameOf(e.paidBy)} · entre {e.among.length}</p>
              </div>
              <span className="font-mono text-sm font-bold">{formatCents(e.amount)}</span>
              <button type="button" className="rounded-md px-2 py-1 text-muted transition hover:bg-owe-soft hover:text-owe"
                aria-label={`Eliminar ${e.description}`} onClick={() => api.removeExpense(e.id)}>×</button>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
