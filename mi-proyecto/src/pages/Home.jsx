import React, { useMemo, useState } from "react";
import MovementList from "../components/MovementList/MovementList.jsx";
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
  const { movements } = useMovements();
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

  function handleChange(e) {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPage(1);
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Listado</h1>
      <section className="bg-white/80 backdrop-blur border rounded-xl p-4 mb-4 grid gap-3 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 shadow-sm dark:bg-slate-800/70 dark:border-slate-700">
        <input className="border rounded px-3 py-2" name="q" placeholder="Buscar descripción" value={filters.q} onChange={handleChange} />
        <select className="border rounded px-3 py-2" name="type" value={filters.type} onChange={handleChange}>
          <option value="">Todos</option>
          <option value="ingreso">Ingreso</option>
          <option value="gasto">Gasto</option>
        </select>
        <select className="border rounded px-3 py-2" name="category" value={filters.category} onChange={handleChange}>
          <option value="">Todas las categorías</option>
          <option value="alimentacion">Alimentación</option>
          <option value="transporte">Transporte</option>
          <option value="ocio">Ocio</option>
          <option value="salud">Salud</option>
          <option value="salario">Salario</option>
        </select>
        <input className="border rounded px-3 py-2" type="date" name="dateFrom" value={filters.dateFrom} onChange={handleChange} />
        <input className="border rounded px-3 py-2" type="date" name="dateTo" value={filters.dateTo} onChange={handleChange} />
        <input className="border rounded px-3 py-2" type="number" name="minAmount" placeholder="Min" value={filters.minAmount} onChange={handleChange} />
        <input className="border rounded px-3 py-2" type="number" name="maxAmount" placeholder="Max" value={filters.maxAmount} onChange={handleChange} />
        <select className="border rounded px-3 py-2" name="sortBy" value={filters.sortBy} onChange={handleChange}>
          <option value="date_desc">Fecha ↓</option>
          <option value="date_asc">Fecha ↑</option>
          <option value="amount_desc">Monto ↓</option>
          <option value="amount_asc">Monto ↑</option>
        </select>
        <select className="border rounded px-3 py-2" value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </section>
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


