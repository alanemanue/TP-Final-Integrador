import React from "react";
import { useNavigate } from "react-router-dom";
import { useMovements } from "../../context/MovementsContext";
import { formatCurrency, formatDate } from "../../utils/format";

export default function MovementItem({ item }) {
  const navigate = useNavigate();
  const { deleteMovement } = useMovements();

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm(`¿Estás seguro de eliminar "${item.description}"?`)) {
      deleteMovement(item.id);
    }
  };

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <span className="text-xs uppercase tracking-wide px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 shrink-0">
          {formatDate(item.date)}
        </span>
        <span className="font-medium truncate">{item.description}</span>
        <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${item.type === "gasto" ? "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300" : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"}`}>
          {item.type}
        </span>
        <span className="text-xs text-slate-500 dark:text-slate-400 shrink-0">
          {item.category}
        </span>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span className={`font-semibold ${item.type === "gasto" ? "text-rose-600 dark:text-rose-400" : "text-emerald-600 dark:text-emerald-400"}`}>
          {item.type === "gasto" ? "-" : "+"}{formatCurrency(item.amount)}
        </span>
        <button 
          className="px-3 py-1.5 rounded-md text-sm bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-sm" 
          onClick={() => navigate(`/editar/${item.id}`)}
        >
          ✏️ Editar
        </button>
        <button 
          className="px-3 py-1.5 rounded-md text-sm bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50 transition-colors shadow-sm" 
          onClick={handleDelete}
        >
          🗑️ Eliminar
        </button>
      </div>
    </div>
  );
}


