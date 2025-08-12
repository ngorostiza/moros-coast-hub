import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft,
  Shield, 
  DollarSign, 
  Calendar, 
  Users, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Camera,
  Car
} from "lucide-react";
import { Link } from "react-router-dom";

const activityData = [
  {
    id: 1,
    time: "10:45",
    date: "2024-02-14",
    type: "security",
    icon: Shield,
    title: "Entrada autorizada",
    description: "Propietario Lote 87 - Juan Pérez",
    status: "success"
  },
  {
    id: 2,
    time: "10:30",
    date: "2024-02-14", 
    type: "payment",
    icon: DollarSign,
    title: "Pago recibido",
    description: "Expensa Febrero - Lote 92 - $89,500",
    status: "success"
  },
  {
    id: 3,
    time: "09:15",
    date: "2024-02-14",
    type: "reservation",
    icon: Calendar,
    title: "Nueva reserva",
    description: "Cancha de tenis - 15:00 - Lote 34",
    status: "info"
  },
  {
    id: 4,
    time: "08:45",
    date: "2024-02-14",
    type: "security",
    icon: Camera,
    title: "Cámara offline",
    description: "Cámara Costa Este desconectada",
    status: "warning"
  },
  {
    id: 5,
    time: "22:30",
    date: "2024-02-13",
    type: "security",
    icon: Car,
    title: "Vehículo no autorizado",
    description: "Patrulla activada - Sector Del Campo",
    status: "error"
  }
];

// Generate more entries for a realistic log
const generateMoreEntries = () => {
  const baseEntries = [...activityData];
  for (let i = 0; i < 50; i++) {
    const randomEntry = baseEntries[Math.floor(Math.random() * baseEntries.length)];
    const randomHour = Math.floor(Math.random() * 24);
    const randomMinute = Math.floor(Math.random() * 60);
    const randomDay = Math.floor(Math.random() * 7) + 7; // Last 7 days
    
    baseEntries.push({
      ...randomEntry,
      id: baseEntries.length + i + 1,
      time: `${randomHour.toString().padStart(2, '0')}:${randomMinute.toString().padStart(2, '0')}`,
      date: `2024-02-${randomDay.toString().padStart(2, '0')}`
    });
  }
  return baseEntries;
};

export default function ActivityLog() {
  const allActivities = generateMoreEntries();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success": return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "warning": return "bg-orange-100 text-orange-700 border-orange-200";
      case "error": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-blue-100 text-blue-700 border-blue-200";
    }
  };

  const getIconColor = (status: string) => {
    switch (status) {
      case "success": return "text-emerald-600";
      case "warning": return "text-orange-600";
      case "error": return "text-red-600";
      default: return "text-blue-600";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/admin">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al Dashboard
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Registro de Actividad</h1>
          <p className="text-muted-foreground">Log completo del sistema en tiempo real</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Actividad del Sistema
            </div>
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
              {allActivities.length} registros
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {allActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50">
                <div className={`p-2 rounded-lg ${getStatusColor(activity.status)}`}>
                  <activity.icon className={`h-4 w-4 ${getIconColor(activity.status)}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{activity.title}</h4>
                    <Badge variant="outline" className={getStatusColor(activity.status)}>
                      {activity.status === "success" ? "Completado" : 
                       activity.status === "warning" ? "Advertencia" :
                       activity.status === "error" ? "Error" : "Info"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                </div>
                
                <div className="text-right text-sm text-muted-foreground">
                  <div>{activity.time}</div>
                  <div>{activity.date}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}