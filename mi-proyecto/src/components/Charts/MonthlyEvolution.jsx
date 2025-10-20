import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend);

function getMonthKey(dateStr) {
  const d = new Date(dateStr);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

export default function MonthlyEvolution({ movements = [], monthsBack = 6 }) {
  const { labels, ingresosData, gastosData } = useMemo(() => {
    const now = new Date();
    const keys = [];
    for (let i = monthsBack - 1; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      keys.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`);
    }

    const incomeMap = Object.fromEntries(keys.map((k) => [k, 0]));
    const expenseMap = Object.fromEntries(keys.map((k) => [k, 0]));

    for (const m of movements) {
      const key = getMonthKey(m.date);
      if (!(key in incomeMap)) continue;
      if (m.type === "ingreso") incomeMap[key] += Number(m.amount);
      if (m.type === "gasto") expenseMap[key] += Number(m.amount);
    }

    return {
      labels: keys,
      ingresosData: keys.map((k) => incomeMap[k]),
      gastosData: keys.map((k) => expenseMap[k]),
    };
  }, [movements, monthsBack]);

  const data = {
    labels,
    datasets: [
      { label: "Ingresos", data: ingresosData, backgroundColor: "#22c55e" },
      { label: "Gastos", data: gastosData, backgroundColor: "#ef4444" },
    ],
  };

  return <Bar data={data} />;
}


