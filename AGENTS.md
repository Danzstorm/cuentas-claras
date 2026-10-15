# AGENTS.md — Cuentas Claras

Web para dividir gastos entre amigos. Proyecto demo de **Spec-Driven Development**.

## Reglas (no se negocian)
1. **La spec manda.** No implementes nada que no esté en `specs/001-mvp/spec.md`. Si ves un hueco, pregunta.
2. **Dinero en céntimos enteros.** `S/ 12.50` se guarda como `1250`. Nunca decimales.
3. **Tests primero.** Cada test empieza con el requisito que cubre: `it("[RF-4] ...")`.
4. **Una tarea a la vez.** Al terminar, marca su casilla en `plan.md`.

## Stack
Vite + React + TypeScript + Tailwind + Vitest. Sin backend.

## Dónde va cada cosa
- `src/domain/` — lógica pura (dinero, división, saldos). Sin React.
- `src/components/` — interfaz.
- `specs/001-mvp/` — spec y plan con tareas.

## Comandos
- `npm run dev` — levantar la app
- `npm test` — tests
- `npm run spec:check` — ¿cada requisito tiene su test?
