import type { Group } from "./types";

/** Caso "almuerzo de demo" del plan (specs/001-mvp/plan.md). */
export const demoGroup: Group = {
  participants: [
    { id: "ana", name: "Ana" },
    { id: "luis", name: "Luis" },
    { id: "sofia", name: "Sofía" },
    { id: "diego", name: "Diego" },
  ],
  expenses: [
    { id: "e1", description: "Almuerzo en el chifa", amount: 12000, paidBy: "ana", among: ["ana", "luis", "sofia", "diego"] },
    { id: "e2", description: "Taxi", amount: 2500, paidBy: "luis", among: ["ana", "luis", "sofia"] },
    { id: "e3", description: "Chelas", amount: 5400, paidBy: "diego", among: ["ana", "luis", "diego"] },
  ],
};
