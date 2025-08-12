import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ActivityLog from "./pages/ActivityLog";
import NotFound from "./pages/NotFound";
import LoteInfo from "./pages/LoteInfo";
import LotePlanos from "./pages/LotePlanos";
import LoteHistorial from "./pages/LoteHistorial";
import ExpensasEstado from "./pages/ExpensasEstado";
import ExpensasPagos from "./pages/ExpensasPagos";
import ExpensasFacturas from "./pages/ExpensasFacturas";
import ReservasEspacios from "./pages/ReservasEspacios";
import ReservasMisReservas from "./pages/ReservasMisReservas";
import ReservasCalendario from "./pages/ReservasCalendario";
import AutorizacionesNueva from "./pages/AutorizacionesNueva";
import AutorizacionesLista from "./pages/AutorizacionesLista";
import AutorizacionesHistorial from "./pages/AutorizacionesHistorial";
import ClimaActual from "./pages/ClimaActual";
import ClimaPronostico from "./pages/ClimaPronostico";
import ClimaAviacion from "./pages/ClimaAviacion";
import AdminReportes from "./pages/AdminReportes";
import AdminMonitoreo from "./pages/AdminMonitoreo";
import AdminUsuariosPropietarios from "./pages/AdminUsuariosPropietarios";
import AdminUsuariosPersonal from "./pages/AdminUsuariosPersonal";
import AdminUsuariosPermisos from "./pages/AdminUsuariosPermisos";
import AdminConfigSistema from "./pages/AdminConfigSistema";
import AdminConfigSeguridad from "./pages/AdminConfigSeguridad";
import AdminConfigNotificaciones from "./pages/AdminConfigNotificaciones";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<Layout />}>
            {/* Propietario */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/lote/info" element={<LoteInfo />} />
            <Route path="/lote/planos" element={<LotePlanos />} />
            <Route path="/lote/historial" element={<LoteHistorial />} />

            <Route path="/expensas/estado" element={<ExpensasEstado />} />
            <Route path="/expensas/pagos" element={<ExpensasPagos />} />
            <Route path="/expensas/facturas" element={<ExpensasFacturas />} />

            <Route path="/reservas/espacios" element={<ReservasEspacios />} />
            <Route path="/reservas/mis-reservas" element={<ReservasMisReservas />} />
            <Route path="/reservas/calendario" element={<ReservasCalendario />} />

            <Route path="/autorizaciones/nueva" element={<AutorizacionesNueva />} />
            <Route path="/autorizaciones/lista" element={<AutorizacionesLista />} />
            <Route path="/autorizaciones/historial" element={<AutorizacionesHistorial />} />

            <Route path="/clima/actual" element={<ClimaActual />} />
            <Route path="/clima/pronostico" element={<ClimaPronostico />} />
            <Route path="/clima/aviacion" element={<ClimaAviacion />} />

            {/* Administración */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/reportes" element={<AdminReportes />} />
            <Route path="/admin/monitoreo" element={<AdminMonitoreo />} />
            <Route path="/admin/usuarios/propietarios" element={<AdminUsuariosPropietarios />} />
            <Route path="/admin/usuarios/personal" element={<AdminUsuariosPersonal />} />
            <Route path="/admin/usuarios/permisos" element={<AdminUsuariosPermisos />} />
            <Route path="/admin/config/sistema" element={<AdminConfigSistema />} />
            <Route path="/admin/config/seguridad" element={<AdminConfigSeguridad />} />
            <Route path="/admin/config/notificaciones" element={<AdminConfigNotificaciones />} />

            <Route path="/activity-log" element={<ActivityLog />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
