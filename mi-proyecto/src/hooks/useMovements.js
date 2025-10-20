import { useCallback, useMemo, useState } from "react";
import { sampleMovements } from "../utils/sampleData.js";

export default function useMovements(initial = sampleMovements) {
  const [movements, setMovements] = useState(initial);

  const createMovement = useCallback((movement) => {
    setMovements((prev) => [...prev, { ...movement, id: crypto.randomUUID() }]);
  }, []);

  const updateMovement = useCallback((id, updates) => {
    setMovements((prev) => prev.map((m) => (m.id === id ? { ...m, ...updates } : m)));
  }, []);

  const deleteMovement = useCallback((id) => {
    setMovements((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const totals = useMemo(() => {
    const income = movements.filter((m) => m.type === "income").reduce((s, m) => s + m.amount, 0);
    const expense = movements.filter((m) => m.type === "expense").reduce((s, m) => s + m.amount, 0);
    return { income, expense, balance: income - expense };
  }, [movements]);

  return { movements, createMovement, updateMovement, deleteMovement, totals };
}


