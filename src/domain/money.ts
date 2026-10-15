import { fail, ok, type Cents, type Result } from "./types";

const AMOUNT_PATTERN = /^\d+(?:[.,]\d{1,2})?$/;

/**
 * Convierte el texto que escribe el usuario en céntimos.
 * Acepta coma o punto decimal y como máximo 2 decimales. RF-3.
 */
export function parseAmount(input: string): Result<Cents> {
  const text = input.trim();
  if (text === "") return fail("Escribe un monto.");
  if (!AMOUNT_PATTERN.test(text)) {
    return fail("El monto debe ser un número positivo con como máximo 2 decimales.");
  }
  const [soles = "0", decimals = ""] = text.replace(",", ".").split(".");
  const cents = Number(soles) * 100 + Number(decimals.padEnd(2, "0"));
  if (cents <= 0) return fail("El monto debe ser mayor a cero.");
  if (!Number.isSafeInteger(cents)) return fail("El monto es demasiado grande.");
  return ok(cents);
}

/** Formatea céntimos como "S/ 1,234.50". RF-5. */
export function formatCents(cents: Cents): string {
  const sign = cents < 0 ? "-" : "";
  const abs = Math.abs(cents);
  const soles = Math.floor(abs / 100)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const decimals = (abs % 100).toString().padStart(2, "0");
  return `${sign}S/ ${soles}.${decimals}`;
}
