import React from "react";

export default function Filters({ filters, onChange, pageSize, onChangePageSize, categories = [] }) {
  function handleInputChange(e) {
    const { name, value } = e.target;
    onChange((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <section className="bg-white/80 backdrop-blur border rounded-xl p-4 mb-4 grid gap-3 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 shadow-sm dark:bg-slate-800/70 dark:border-slate-700">
      <input
        className="border rounded px-3 py-2 dark:bg-slate-900/40 dark:border-slate-700"
        name="q"
        placeholder="Buscar descripción"
        value={filters.q}
        onChange={handleInputChange}
      />
      <select
        className="border rounded px-3 py-2 dark:bg-slate-900/40 dark:border-slate-700"
        name="type"
        value={filters.type}
        onChange={handleInputChange}
      >
        <option value="">Todos</option>
        <option value="ingreso">Ingreso</option>
        <option value="gasto">Gasto</option>
      </select>
      <select
        className="border rounded px-3 py-2 dark:bg-slate-900/40 dark:border-slate-700"
        name="category"
        value={filters.category}
        onChange={handleInputChange}
      >
        <option value="">Todas las categorías</option>
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <input
        className="border rounded px-3 py-2 dark:bg-slate-900/40 dark:border-slate-700"
        type="date"
        name="dateFrom"
        value={filters.dateFrom}
        onChange={handleInputChange}
      />
      <input
        className="border rounded px-3 py-2 dark:bg-slate-900/40 dark:border-slate-700"
        type="date"
        name="dateTo"
        value={filters.dateTo}
        onChange={handleInputChange}
      />
      <input
        className="border rounded px-3 py-2 dark:bg-slate-900/40 dark:border-slate-700"
        type="number"
        name="minAmount"
        placeholder="Min"
        value={filters.minAmount}
        onChange={handleInputChange}
      />
      <input
        className="border rounded px-3 py-2 dark:bg-slate-900/40 dark:border-slate-700"
        type="number"
        name="maxAmount"
        placeholder="Max"
        value={filters.maxAmount}
        onChange={handleInputChange}
      />
      <select
        className="border rounded px-3 py-2 dark:bg-slate-900/40 dark:border-slate-700"
        name="sortBy"
        value={filters.sortBy}
        onChange={handleInputChange}
      >
        <option value="date_desc">Fecha ↓</option>
        <option value="date_asc">Fecha ↑</option>
        <option value="amount_desc">Monto ↓</option>
        <option value="amount_asc">Monto ↑</option>
      </select>
      <select
        className="border rounded px-3 py-2 dark:bg-slate-900/40 dark:border-slate-700"
        value={pageSize}
        onChange={(e) => onChangePageSize(Number(e.target.value))}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
    </section>
  );
}


