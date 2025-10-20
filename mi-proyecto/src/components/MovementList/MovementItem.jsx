import React from "react";
import { useNavigate } from "react-router-dom";
import { useMovements } from "../../context/MovementsContext";
import { formatCurrency, formatDate } from "../../utils/format";

export default function MovementItem({ item }) {
  const navigate = useNavigate();
  const { deleteMovement } = useMovements();
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <span className="text-xs uppercase tracking-wide px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
          {formatDate(item.date)}
        </span>
        <span className="font-medium">{item.description}</span>
        <span className={`text-xs px-2 py-0.5 rounded-full ${item.type === "gasto" ? "bg-rose-100 text-rose-700" : "bg-emerald-100 text-emerald-700"}`}>
          {item.type}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <span className={item.type === "gasto" ? "text-rose-600 font-semibold" : "text-emerald-600 font-semibold"}>
          {item.type === "gasto" ? "-" : "+"}{formatCurrency(item.amount)}
        </span>
        <button className="px-2 py-1 rounded text-sm bg-indigo-600 text-white hover:bg-indigo-700" onClick={() => navigate(`/editar/${item.id}`)}>Editar</button>
        <button className="px-2 py-1 rounded text-sm bg-slate-200 hover:bg-slate-300" onClick={() => deleteMovement(item.id)}>Eliminar</button>
      </div>
    </div>
  );
}


