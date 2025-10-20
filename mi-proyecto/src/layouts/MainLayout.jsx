import React from "react";
import { NavLink } from "react-router-dom";
import { UIProvider, useUI } from "../context/UIContext";

function InnerLayout({ children }) {
  const { theme, toggleTheme } = useUI();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 text-slate-900 dark:from-slate-900 dark:to-slate-800 dark:text-slate-100">
      <header className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow dark:from-slate-800 dark:to-slate-700">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold tracking-tight">Mi Presupuesto</h1>
          <nav className="flex gap-2 text-sm">
            <NavLink to="/" className={({ isActive }) =>
              `px-3 py-1.5 rounded-md transition ${isActive ? "bg-white/20" : "hover:bg-white/10"}`
            }>Listado</NavLink>
            <NavLink to="/nuevo" className={({ isActive }) =>
              `px-3 py-1.5 rounded-md transition ${isActive ? "bg-white/20" : "hover:bg-white/10"}`
            }>Nuevo</NavLink>
            <NavLink to="/resumen" className={({ isActive }) =>
              `px-3 py-1.5 rounded-md transition ${isActive ? "bg-white/20" : "hover:bg-white/10"}`
            }>Resumen</NavLink>
            <NavLink to="/ajustes" className={({ isActive }) =>
              `px-3 py-1.5 rounded-md transition ${isActive ? "bg-white/20" : "hover:bg-white/10"}`
            }>Ajustes</NavLink>
            <button onClick={toggleTheme} className="ml-2 px-3 py-1.5 rounded-md bg-white/20 hover:bg-white/30 text-white">
              {theme === "dark" ? "Claro" : "Oscuro"}
            </button>
          </nav>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
}

export default function MainLayout({ children }) {
  return (
    <UIProvider>
      <InnerLayout>{children}</InnerLayout>
    </UIProvider>
  );
}


