import { BalancesPanel } from "./components/BalancesPanel";
import { ExpenseForm } from "./components/ExpenseForm";
import { ExpenseList } from "./components/ExpenseList";
import { ParticipantsPanel } from "./components/ParticipantsPanel";
import { useGroup } from "./useGroup";

export default function App() {
  const api = useGroup();
  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6">
      <header className="mb-8">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-muted">Spec 001 · MVP</p>
        <h1 className="font-display text-5xl font-extrabold leading-none tracking-tight sm:text-6xl">
          Cuentas <span className="relative inline-block">Claras
            <span className="absolute -bottom-1 left-0 -z-10 h-4 w-full -rotate-1 bg-accent" />
          </span>
        </h1>
        <p className="mt-3 max-w-md text-muted">Registra quién pagó qué y te decimos quién le debe a quién, con el menor número de pagos.</p>
      </header>
      <main className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-8">
          <ParticipantsPanel api={api} />
          <ExpenseForm api={api} />
        </div>
        <div className="space-y-8">
          <BalancesPanel api={api} />
          <ExpenseList api={api} />
        </div>
      </main>
      <footer className="mt-12 text-center font-mono text-xs text-muted">Construido con Spec-Driven Development · @danielsantos.ai</footer>
    </div>
  );
}
