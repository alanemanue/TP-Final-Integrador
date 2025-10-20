import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import NewMovement from "./pages/NewMovement";
import EditMovement from "./pages/EditMovement";
import Summary from "./pages/Summary";
import Settings from "./pages/Settings";
import { MovementsProvider } from "./context/MovementsContext";

function App() {
  return (
    <MovementsProvider>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nuevo" element={<NewMovement />} />
            <Route path="/editar/:id" element={<EditMovement />} />
            <Route path="/resumen" element={<Summary />} />
            <Route path="/ajustes" element={<Settings />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </MovementsProvider>
  )
}

export default App
