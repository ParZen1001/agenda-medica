import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Citas } from "./pages/Citas";
import { Medicamentos } from "./pages/Medicamentos";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="citas" element={<Citas />} />
          <Route path="medicamentos" element={<Medicamentos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
