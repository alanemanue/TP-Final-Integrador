import React, { useMemo, useState } from "react";
import MovementList from "../components/MovementList/MovementList.jsx";
import Filters from "../components/Filters/index.jsx";
import { useMovements } from "../context/MovementsContext";

function applyFilters(list, { q, type, category, dateFrom, dateTo, minAmount, maxAmount, sortBy }) {
  return list
    .filter((item) => {
      if (q && !item.description.toLowerCase().includes(q.toLowerCase())) return false;
      if (type && item.type !== type) return false;
      if (category && item.category !== category) return false;
      const date = new Date(item.date);
      if (dateFrom && date < new Date(dateFrom)) return false;
      if (dateTo && date > new Date(dateTo)) return false;
      if (minAmount && Number(item.amount) < Number(minAmount)) return false;
      if (maxAmount && Number(item.amount) > Number(maxAmount)) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "date_desc") return new Date(b.date) - new Date(a.date);
      if (sortBy === "date_asc") return new Date(a.date) - new Date(b.date);
      if (sortBy === "amount_desc") return Number(b.amount) - Number(a.amount);
      if (sortBy === "amount_asc") return Number(a.amount) - Number(b.amount);
      return 0;
    });
}

export default function Home() {
  const { movements, categories } = useMovements();
  const [filters, setFilters] = useState({
    q: "",
    type: "",
    category: "",
    dateFrom: "",
    dateTo: "",
    minAmount: "",
    maxAmount: "",
    sortBy: "date_desc",
  });

  const filtered = useMemo(() => applyFilters(movements, filters), [movements, filters]);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const paginated = filtered.slice(start, end);

  function handleFiltersChange(updater) {
    setFilters((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      return next;
    });
    setPage(1);
  }

  const hasActiveFilters = useMemo(() => {
    const { q, type, category, dateFrom, dateTo, minAmount, maxAmount } = filters;
    return Boolean(q || type || category || dateFrom || dateTo || minAmount || maxAmount || filters.sortBy !== "date_desc");
  }, [filters]);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Listado</h1>
      <Filters
        filters={filters}
        onChange={handleFiltersChange}
        pageSize={pageSize}
        onChangePageSize={(size) => { setPageSize(size); setPage(1); }}
        categories={categories}
      />
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-slate-600 dark:text-slate-300">Resultados: {filtered.length}</p>
        {hasActiveFilters && (
          <button
            className="text-sm px-3 py-1.5 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600"
            onClick={() => setFilters({ q: "", type: "", category: "", dateFrom: "", dateTo: "", minAmount: "", maxAmount: "", sortBy: "date_desc" })}
          >
            Limpiar filtros
          </button>
        )}
      </div>
      <MovementList items={paginated} />
      <div className="mt-4 flex items-center gap-3">
        <button className="px-3 py-2 rounded bg-slate-200 hover:bg-slate-300 disabled:opacity-50" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>
          Anterior
        </button>
        <span className="text-sm text-gray-600">
          Página {currentPage} de {totalPages}
        </span>
        <button className="px-3 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
          Siguiente
        </button>
      </div>
    </div>
  );
}


