import React from "react";
import MovementItem from "./MovementItem.jsx";

export default function MovementList({ items = [] }) {
  if (!items.length) return <p className="text-gray-500 dark:text-gray-400">No hay movimientos.</p>;
  return (
    <ul className="bg-white border rounded-lg divide-y shadow-sm dark:bg-slate-800 dark:border-slate-700 dark:divide-slate-700">
      {items.map((item) => (
        <li key={item.id} className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-700/60">
          <MovementItem item={item} />
        </li>
      ))}
    </ul>
  );
}


