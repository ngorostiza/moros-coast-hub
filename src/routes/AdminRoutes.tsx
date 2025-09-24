import { Routes, Route } from "react-router-dom";
import AdminDashboard from "@/pages/AdminDashboard";
import FuelAnalysis from "@/pages/FuelAnalysis";
import MachineryAnalysis from "@/pages/MachineryAnalysis";
import CommonSpacesAnalysis from "@/pages/CommonSpacesAnalysis";
import ActivityLog from "@/pages/ActivityLog";
import AdminUsuariosPilotos from "@/pages/AdminUsuariosPilotos";
import AdminUsuariosPropietarios from "@/pages/AdminUsuariosPropietarios";
import AdminUsuariosPersonal from "@/pages/AdminUsuariosPersonal";
import AdminUsuariosPermisos from "@/pages/AdminUsuariosPermisos";
import AdminReportes from "@/pages/AdminReportes";
import AdminEficiencia from "@/pages/AdminEficiencia";
import AdminMonitoreo from "@/pages/AdminMonitoreo";
import AdminConfigSistema from "@/pages/AdminConfigSistema";
import AdminConfigSeguridad from "@/pages/AdminConfigSeguridad";
import AdminConfigNotificaciones from "@/pages/AdminConfigNotificaciones";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      
      {/* Analysis & Reports */}
      <Route path="/admin/fuel" element={<FuelAnalysis />} />
      <Route path="/admin/machinery" element={<MachineryAnalysis />} />
      <Route path="/admin/espacios-comunes" element={<CommonSpacesAnalysis />} />
      <Route path="/admin/eficiencia" element={<AdminEficiencia />} />
      <Route path="/admin/reportes" element={<AdminReportes />} />
      <Route path="/admin/monitoreo" element={<AdminMonitoreo />} />
      
      {/* User Management */}
      <Route path="/admin/usuarios/propietarios" element={<AdminUsuariosPropietarios />} />
      <Route path="/admin/usuarios/personal" element={<AdminUsuariosPersonal />} />
      <Route path="/admin/usuarios/pilotos" element={<AdminUsuariosPilotos />} />
      <Route path="/admin/usuarios/permisos" element={<AdminUsuariosPermisos />} />
      
      {/* Configuration */}
      <Route path="/admin/config/sistema" element={<AdminConfigSistema />} />
      <Route path="/admin/config/seguridad" element={<AdminConfigSeguridad />} />
      <Route path="/admin/config/notificaciones" element={<AdminConfigNotificaciones />} />

      {/* Activity Log */}
      <Route path="/activity-log" element={<ActivityLog />} />
    </Routes>
  );
}