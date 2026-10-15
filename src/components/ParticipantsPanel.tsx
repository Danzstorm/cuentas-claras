import { useState, type FormEvent } from "react";
import type { GroupApi } from "../useGroup";
import { Avatar, Card, ErrorText, buttonClass, inputClass } from "./ui";

export function ParticipantsPanel({ api }: { api: GroupApi }) {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const err = api.addParticipant(name);
    setError(err);
    if (!err) setName("");
  };

  return (
    <Card step="01" title="¿Quiénes salieron?">
      <form onSubmit={submit} className="flex gap-2">
        <input className={inputClass} placeholder="Nombre (ej. Ana)" value={name} maxLength={40}
          onChange={(e) => setName(e.target.value)} aria-label="Nombre del participante" />
        <button className={buttonClass} type="submit">Agregar</button>
      </form>
      <ErrorText>{error}</ErrorText>
      {api.group.participants.length === 0 ? (
        <p className="mt-4 text-sm text-muted">Agrega al menos dos personas para empezar.</p>
      ) : (
        <ul className="mt-4 flex flex-wrap gap-2">
          {api.group.participants.map((p, i) => (
            <li key={p.id} className="pop flex items-center gap-2 rounded-full border-[1.5px] border-ink bg-white py-1 pl-1 pr-3">
              <Avatar name={p.name} index={i} size="sm" />
              <span className="text-sm font-semibold">{p.name}</span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
