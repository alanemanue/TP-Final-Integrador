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
      },
    ],
  };
  return <Doughnut data={data} />;
}


