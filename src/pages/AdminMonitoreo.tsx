import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, User, Shield, MapPin, AlertTriangle } from "lucide-react";

export default function AdminMonitoreo() {
  const services = [
    { name: "Accesos", status: "Operativo", uptime: 99.98, latency: 120 },
    { name: "Cámaras", status: "Operativo", uptime: 99.2, latency: 180 },
    { name: "Alarmas", status: "Mantenimiento", uptime: 97.5, latency: 250 },
  ];

  const recentActivity = [
    { 
      time: "14:32", 
      type: "access", 
      description: "Ingreso vehicular - Lote 45", 
      user: "Sistema Automático",
      status: "success"
    },
    { 
      time: "14:15", 
      type: "security", 
      description: "Patrulla de seguridad - Sector Norte", 
      user: "Guardia Martinez",
      status: "info"
    },
    { 
      time: "13:58", 
      type: "alert", 
      description: "Cámara 12 sin señal por 2 minutos", 
      user: "Sistema",
      status: "warning"
    },
    { 
      time: "13:45", 
      type: "access", 
      description: "Acceso peatonal - Club House", 
      user: "Propietario Lote 23",
      status: "success"
    },
    { 
      time: "13:30", 
      type: "maintenance", 
      description: "Mantenimiento programado - Barrera Principal", 
      user: "Técnico Rodríguez",
      status: "info"
    },
    { 
      time: "13:12", 
      type: "security", 
      description: "Ronda de seguridad completada - Zona Residencial", 
      user: "Guardia López",
      status: "success"
    }
  ];

  const communityStatus = {
    totalLots: 120,
    occupiedLots: 87,
    activeReservations: 12,
    pendingMaintenance: 3
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'access': return <MapPin className="h-4 w-4" />;
      case 'security': return <Shield className="h-4 w-4" />;
      case 'alert': return <AlertTriangle className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'info': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Uptime General</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.7%</div>
            <Progress value={98.7} className="h-2 mt-2" />
            <div className="mt-1 text-xs text-muted-foreground">Últimas 24h</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Estado Accesos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Operativo</div>
            <Progress value={99.98} className="h-2 mt-2" />
            <div className="text-xs text-muted-foreground mt-1">99.98% uptime</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Estado Cámaras</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Operativo</div>
            <Progress value={99.2} className="h-2 mt-2" />
            <div className="text-xs text-muted-foreground mt-1">99.2% uptime</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Cámaras Online</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23/24</div>
            <div className="text-xs text-muted-foreground mt-1">1 en revisión</div>
          </CardContent>
        </Card>
      </div>

       {/* Recent Activity - Full Width */}
       <Card>
         <CardHeader>
           <CardTitle className="flex items-center gap-2">
             <Clock className="h-5 w-5" />
             Actividad Reciente
           </CardTitle>
         </CardHeader>
         <CardContent>
           <div className="space-y-3 max-h-80 overflow-y-auto">
             {recentActivity.map((activity, index) => (
               <div 
                 key={index} 
                 className={`flex items-start gap-3 p-3 rounded-lg border ${getStatusColor(activity.status)}`}
               >
                 <div className="mt-0.5">
                   {getActivityIcon(activity.type)}
                 </div>
                 <div className="flex-1 min-w-0">
                   <div className="flex items-center justify-between">
                     <p className="text-sm font-medium truncate">
                       {activity.description}
                     </p>
                     <span className="text-xs font-mono">
                       {activity.time}
                     </span>
                   </div>
                   <p className="text-xs text-muted-foreground mt-1">
                     {activity.user}
                   </p>
                 </div>
               </div>
             ))}
           </div>
         </CardContent>
       </Card>
     </div>
   );
 }
