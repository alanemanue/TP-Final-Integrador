import React, { createContext, useContext, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { v4 as uuidv4 } from "uuid";
import sampleData from "../utils/sampleData";

const MovementsContext = createContext();

export function MovementsProvider({ children }) {
  const [movements, setMovements] = useLocalStorage("movements", sampleData);

  const addMovement = (m) => {
    const newM = { ...m, id: uuidv4() };
    setMovements((prev) => [newM, ...prev]);
  };

  const updateMovement = (id, updated) => {
    setMovements((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
  };

  const deleteMovement = (id) => {
    setMovements((prev) => prev.filter((p) => p.id !== id));
  };

  const resetMovements = () => {
    setMovements([]);
  };

  const value = useMemo(() => ({
    movements,
    addMovement,
    updateMovement,
    deleteMovement,
    resetMovements
  }), [movements]);

  return <MovementsContext.Provider value={value}>{children}</MovementsContext.Provider>;
}

export const useMovements = () => useContext(MovementsContext);


