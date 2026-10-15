import { formatCents } from "../domain/money";
import type { GroupApi } from "../useGroup";
import { Avatar, Card } from "./ui";

export function BalancesPanel({ api }: { api: GroupApi }) {
  const people = api.group.participants;
  const max = Math.max(1, ...people.map((p) => Math.abs(api.balances[p.id] ?? 0)));

  return (
    <Card step="03" title="¿Quién le debe a quién?">
      {api.group.expenses.length === 0 ? (
        <p className="text-sm text-muted">Cuando registres gastos, aquí verás los saldos.</p>
      ) : (
        <>
          <ul className="space-y-2.5">
            {people.map((p, i) => {
              const b = api.balances[p.id] ?? 0;
              return (
                <li key={p.id} className="grid grid-cols-[6.5rem_1fr_6.5rem] items-center gap-2 text-sm">
                  <span className="flex min-w-0 items-center gap-2 font-semibold">
                    <Avatar name={p.name} index={i} size="sm" />
                    <span className="truncate">{p.name}</span>
                  </span>
                  <span className="relative h-3 rounded-full bg-paper">
                    <span className="absolute inset-y-0 left-1/2 w-px bg-line" />
                    {b !== 0 && (
                      <span className={`absolute inset-y-0 rounded-full transition-all duration-500 ${b > 0 ? "left-1/2 bg-get" : "right-1/2 bg-owe"}`}
                        style={{ width: `${(Math.abs(b) / max) * 50}%` }} />
                    )}
                  </span>
                  <span className={`text-right font-mono font-bold ${b > 0 ? "text-get" : b < 0 ? "text-owe" : "text-muted"}`}>
                    {b > 0 ? "+" : ""}{formatCents(b)}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="dashed my-5" />

          {api.transfers.length === 0 ? (
            <p className="stamp mx-auto w-fit rounded-lg border-[3px] border-get px-5 py-3 text-center font-display text-xl font-extrabold uppercase text-get">
              ¡Cuentas claras!
            </p>
          ) : (
            <>
              <h3 className="mb-3 font-display text-sm font-bold uppercase tracking-wider text-muted">Pagos sugeridos · {api.transfers.length}</h3>
              <ul className="space-y-2">
                {api.transfers.map((t) => (
                  <li key={`${t.from}-${t.to}`} className="pop flex items-center gap-3 rounded-lg border-[1.5px] border-ink bg-white px-3 py-2.5">
                    <span className="flex-1 text-sm"><b>{api.nameOf(t.from)}</b> le paga a <b>{api.nameOf(t.to)}</b></span>
                    <span className="font-mono font-bold">{formatCents(t.amount)}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </Card>
  );
}
