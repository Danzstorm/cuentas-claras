# Plan y tareas — Spec 001

## Diseño
- `src/domain/` es **puro**: recibe datos y devuelve datos. Ahí viven los tests.
- `src/useGroup.ts` une el dominio con la interfaz.
- `src/components/` solo muestra y captura eventos.

## Caso de prueba: el almuerzo
| Gasto | Monto | Pagó | Entre |
|---|---|---|---|
| Almuerzo en el chifa | S/ 120.00 | Ana | Ana, Luis, Sofía, Diego |
| Taxi | S/ 25.00 | Luis | Ana, Luis, Sofía |
| Chelas | S/ 54.00 | Diego | Ana, Luis, Diego |

**Resultado esperado:** Ana +63.66 · Luis −31.33 · Sofía −38.33 · Diego +6.00
**Pagos:** Sofía → Ana 38.33 · Luis → Ana 25.33 · Luis → Diego 6.00

## Tareas
- [ ] **T1 · Dinero y división** (RF-3, RF-4, RF-5) — `money.ts`, `split.ts`
  Hecho cuando: `"12,5"` → 1250 y S/ 10 entre 3 → 3.34 / 3.33 / 3.33.
- [ ] **T2 · Participantes y gastos** (RF-1, RF-2, RF-3) — `group.ts`
  Hecho cuando: rechaza "ana" si ya existe "Ana" y un gasto sin monto.
- [ ] **T3 · Saldos y pagos** (RF-5, RF-6) — `balances.ts`
  Hecho cuando: el almuerzo da exactamente el resultado esperado.
- [ ] **T4 · Interfaz** — `useGroup.ts`, `components/`
  Hecho cuando: se registra el almuerzo desde el navegador y se ven los 3 pagos.
