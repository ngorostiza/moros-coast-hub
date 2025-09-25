import { Routes, Route } from "react-router-dom";
import AdminDashboard from "@/pages/AdminDashboard";
import FuelAnalysis from "@/pages/FuelAnalysis";
import MachineryAnalysis from "@/pages/MachineryAnalysis";
import CommonSpacesAnalysis from "@/pages/CommonSpacesAnalysis";
import ActivityLog from "@/pages/ActivityLog";

import AdminUsuariosPermisos from "@/pages/AdminUsuariosPermisos";
import AdminReportes from "@/pages/AdminReportes";
import AdminEficiencia from "@/pages/AdminEficiencia";
import AdminMonitoreo from "@/pages/AdminMonitoreo";
import AdminConfigSistema from "@/pages/AdminConfigSistema";

// New pages
import EspaciosComunesABM from "@/pages/EspaciosComunesABM";
import LotesABM from "@/pages/LotesABM";
import UsuariosAutorizados from "@/pages/UsuariosAutorizados";
import UsuariosStaff from "@/pages/UsuariosStaff";
import AdminConfigAPIs from "@/pages/AdminConfigAPIs";

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
      <Route path="/admin/espacios-comunes/abm" element={<EspaciosComunesABM />} />
      <Route path="/admin/eficiencia" element={<AdminEficiencia />} />
      <Route path="/admin/reportes" element={<AdminReportes />} />
      <Route path="/admin/monitoreo" element={<AdminMonitoreo />} />
      
      {/* Lotes */}
      <Route path="/admin/lotes" element={<LotesABM />} />
      <Route path="/admin/lotes/abm" element={<LotesABM />} />
      
      {/* User Management */}
      <Route path="/admin/usuarios/autorizados" element={<UsuariosAutorizados />} />
        <Route path="/admin/usuarios/staff" element={<UsuariosStaff />} />
      <Route path="/admin/usuarios/permisos" element={<AdminUsuariosPermisos />} />
      
      {/* Configuration */}
      <Route path="/admin/config/sistema" element={<AdminConfigSistema />} />
      <Route path="/admin/config/apis" element={<AdminConfigAPIs />} />

      {/* Activity Log */}
      <Route path="/activity-log" element={<ActivityLog />} />
    </Routes>
  );
}