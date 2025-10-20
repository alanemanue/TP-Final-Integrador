import React from "react";
import ExpensesByCategory from "../components/Charts/ExpensesByCategory.jsx";
import MonthlyEvolution from "../components/Charts/MonthlyEvolution.jsx";
import { useMovements } from "../context/MovementsContext";

export default function Summary() {
  const { movements } = useMovements();
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Resumen</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="bg-white border rounded-xl p-4 shadow-sm dark:bg-slate-800 dark:border-slate-700">
          <h2 className="text-sm font-medium text-slate-600 mb-2">Gastos por categoría</h2>
          <ExpensesByCategory movements={movements} />
        </div>
        <div className="bg-white border rounded-xl p-4 shadow-sm dark:bg-slate-800 dark:border-slate-700">
          <h2 className="text-sm font-medium text-slate-600 mb-2">Evolución mensual</h2>
          <MonthlyEvolution movements={movements} monthsBack={6} />
        </div>
      </div>
    </div>
  );
}


