import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ExpensesByCategory({ movements = [] }) {
  const gastos = movements.filter((m) => m.type === "gasto");
  const totals = gastos.reduce((acc, cur) => {
    acc[cur.category] = (acc[cur.category] || 0) + Number(cur.amount);
    return acc;
  }, {});
  const labels = Object.keys(totals);
  const data = {
    labels,
    datasets: [
      {
        data: Object.values(totals),
        backgroundColor: [
          "#ef4444",
          "#f97316",
          "#eab308",
          "#22c55e",
          "#06b6d4",
          "#3b82f6",
          "#8b5cf6",
          "#ec4899",
          "#14b8a6",
        ],
        borderWidth: 1,
      },
    ],
  };
  if (!labels.length) {
    return <p className="text-sm text-slate-500 dark:text-slate-400">No hay gastos para mostrar.</p>;
  }
  const options = {
    plugins: {
      legend: { position: "bottom" },
      tooltip: { callbacks: { label: (ctx) => `${ctx.label}: $${ctx.formattedValue}` } },
    },
    maintainAspectRatio: false,
  };
  return (
    <div style={{ height: 320 }}>
      <Doughnut data={data} options={options} />
    </div>
  );
}


