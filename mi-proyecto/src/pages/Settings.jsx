import React from "react";
import { useUI } from "../context/UIContext";
import { useMovements } from "../context/MovementsContext";

export default function Settings() {
  const { theme, toggleTheme } = useUI();
  const { resetMovements } = useMovements();

  const handleClear = () => {
    if (window.confirm("¿Seguro que quieres limpiar todos los datos? Esta acción no se puede deshacer.")) {
      resetMovements();
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Ajustes</h1>

      <section className="bg-white border rounded-xl p-4 shadow-sm dark:bg-slate-800 dark:border-slate-700">
        <h2 className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">Apariencia</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Tema</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Selecciona entre claro u oscuro</p>
          </div>
          <button onClick={toggleTheme} className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">
            {theme === "dark" ? "Cambiar a claro" : "Cambiar a oscuro"}
          </button>
        </div>
      </section>

      <section className="bg-white border rounded-xl p-4 shadow-sm dark:bg-slate-800 dark:border-slate-700">
        <h2 className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">Datos</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Limpiar datos</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Elimina todos los movimientos guardados</p>
          </div>
          <button onClick={handleClear} className="px-4 py-2 rounded-md bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50">
            Limpiar
          </button>
        </div>
      </section>
    </div>
  );
}


