import { Routes, Route } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import LoteInfo from "@/pages/LoteInfo";
import LotePlanos from "@/pages/LotePlanosDocumentos";
import LoteHistorial from "@/pages/LoteHistorialCompleto";
import CanonEstado from "@/pages/CanonEstado";
import ReservasEspacios from "@/pages/ReservasEspacios";
import ReservasMisReservas from "@/pages/ReservasMisReservas";
import AutorizacionesNueva from "@/pages/AutorizacionesNueva";
import AutorizacionesLista from "@/pages/AutorizacionesLista";

export default function OwnerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      
      {/* Mi Lote */}
      <Route path="/lote/info" element={<LoteInfo />} />
      <Route path="/lote/planos" element={<LotePlanos />} />
      <Route path="/lote/historial" element={<LoteHistorial />} />

      {/* Pagos (formerly Canon) */}
      <Route path="/pagos/estado" element={<CanonEstado />} />
      <Route path="/canon/estado" element={<CanonEstado />} /> {/* Redirect compatibility */}

      {/* Reservas */}
      <Route path="/reservas/espacios" element={<ReservasEspacios />} />
      <Route path="/reservas/mis-reservas" element={<ReservasMisReservas />} />

      {/* Autorizaciones */}
      <Route path="/autorizaciones/nueva" element={<AutorizacionesNueva />} />
      <Route path="/autorizaciones/lista" element={<AutorizacionesLista />} />
    </Routes>
  );
}