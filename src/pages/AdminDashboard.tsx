import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import GISMap from "@/components/GISMap";
import ExpandableWidget from "@/components/ExpandableWidget";
import { 
  Users, 
  DollarSign, 
  Calendar, 
  Car,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Building,
  Waves,
  MapPin,
  RefreshCw
} from "lucide-react";
import { useState } from "react";

const recentActivity = [
  {
    time: "10:45",
    type: "security",
    icon: CheckCircle,
    title: "Entrada autorizada",
    description: "Propietario Lote 87 - Juan Pérez"
  },
  {
    time: "10:30", 
    type: "payment",
    icon: DollarSign,
    title: "Pago recibido",
    description: "Expensa Febrero - Lote 92 - $89,500"
  },
  {
    time: "09:15",
    type: "reservation",
    icon: Calendar,
    title: "Nueva reserva",
    description: "Cancha de tenis - 15:00 - Lote 34"
  }
];

export default function AdminDashboard() {
  const liveStats = {
    peopleInside: 127,
    vehiclesInside: 45,
    authorizedToday: 23,
    reservationsToday: 8,
    collectionRate: 92.5,
    pendingPayments: 6
  };

  const monthlyData = {
    totalExpenses: 5475000,
    collected: 5067250,
    pending: 407750,
    collectionRate: 92.5
  };

  const [lastUpdated, setLastUpdated] = useState(new Date());
  const handleRefresh = () => setLastUpdated(new Date());

  const reservationStats = [
    { facility: "Tennis Vivero (x1)", bookings: 12, usage: "Media" },
    { facility: "Tennis Bosque (x4)", bookings: 28, usage: "Muy Alta" },
    { facility: "Paddle Campo (x2)", bookings: 16, usage: "Alta" },
    { facility: "Peludo (tipo SUM)", bookings: 6, usage: "Media" },
    { facility: "El Club (restaurante)", bookings: 18, usage: "Alta" }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard Administrativo</h1>
          <p className="text-muted-foreground">Vista en tiempo real - Bahía de los Moros</p>
        </div>
        <div className="flex items-end gap-3">
          <div className="flex flex-col items-start">
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse" />
              En vivo
            </Badge>
            <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{lastUpdated.toLocaleTimeString()}</span>
              <Button variant="ghost" size="sm" className="h-6 px-2" onClick={handleRefresh}>
                <RefreshCw className="h-3 w-3 mr-1" /> Refrescar
              </Button>
            </div>
          </div>
          <Badge variant="outline">Admin</Badge>
        </div>
      </div>

      {/* Live Stats - Real Time */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-ocean text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Personas Adentro</p>
                <p className="text-3xl font-bold">{liveStats.peopleInside}</p>
              </div>
              <Users className="h-8 w-8 text-white/80" />
            </div>
            <div className="mt-2 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              <span className="text-xs text-white/80">+12 en la última hora</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-sunset text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Vehículos</p>
                <p className="text-3xl font-bold">{liveStats.vehiclesInside}</p>
              </div>
              <Car className="h-8 w-8 text-white/80" />
            </div>
            <div className="mt-2 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              <span className="text-xs text-white/80">+3 últimos 30min</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Autorizados Hoy</p>
                <p className="text-3xl font-bold text-foreground">{liveStats.authorizedToday}</p>
              </div>
              <Eye className="h-8 w-8 text-accent" />
            </div>
            <div className="mt-2 flex items-center gap-1">
              <Clock className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Últimos 5min: 2</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Reservas Hoy</p>
                <p className="text-3xl font-bold text-foreground">{liveStats.reservationsToday}</p>
              </div>
              <Calendar className="h-8 w-8 text-coral" />
            </div>
            <div className="mt-2 flex items-center gap-1">
              <CheckCircle className="h-3 w-3 text-emerald-600" />
              <span className="text-xs text-muted-foreground">6 completadas</span>
            </div>
          </CardContent>
        </Card>
      </div>

        {/* GIS Map - Central Feature */}
        <div className="lg:col-span-3">
          <GISMap />
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Financial Overview - Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Monthly Collection Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Resumen Financiero - Febrero 2024
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Facturado</p>
                  <p className="text-2xl font-bold text-blue-700">${monthlyData.totalExpenses.toLocaleString()}</p>
                </div>
                <div className="text-center p-4 bg-emerald-50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Cobrado</p>
                  <p className="text-2xl font-bold text-emerald-700">${monthlyData.collected.toLocaleString()}</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Pendiente</p>
                  <p className="text-2xl font-bold text-orange-700">${monthlyData.pending.toLocaleString()}</p>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Tasa de Cobranza</span>
                  <span className="text-sm text-muted-foreground">{monthlyData.collectionRate}%</span>
                </div>
                <Progress value={monthlyData.collectionRate} className="h-3" />
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>Meta: 95%</span>
                  <span>{liveStats.pendingPayments} propietarios pendientes</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reservations Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Rendimiento de Espacios Comunes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reservationStats.map((facility, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div>
                      <p className="font-medium">{facility.facility}</p>
                      <p className="text-sm text-muted-foreground">{facility.bookings} reservas este mes</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className={
                        facility.usage === "Muy Alta" ? "bg-red-50 text-red-700 border-red-200" :
                        facility.usage === "Alta" ? "bg-orange-50 text-orange-700 border-orange-200" :
                        facility.usage === "Media" ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                        "bg-gray-50 text-gray-700 border-gray-200"
                      }>
                        {facility.usage}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Live Monitoring */}
        <div className="space-y-6">
          {/* Community Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Estado de la Comunidad
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Ocupación</span>
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700">Alta</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Seguridad</span>
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700">Normal</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Servicios</span>
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700">Operativo</Badge>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-2">Distribución por Sector</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Del Campo</span>
                    <span>41 personas</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>El Club</span>
                    <span>28 personas</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Playa Mía</span>
                    <span>34 personas</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Espacio Verde</span>
                    <span>24 personas</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <ExpandableWidget expandUrl="/activity-log">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Actividad Reciente
                </CardTitle>
              </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className={`p-1 rounded-full ${
                      activity.type === 'security' ? 'bg-red-100' :
                      activity.type === 'payment' ? 'bg-green-100' :
                      'bg-blue-100'
                    }`}>
                      <activity.icon className={`h-4 w-4 ${
                        activity.type === 'security' ? 'text-red-600' :
                        activity.type === 'payment' ? 'text-green-600' :
                        'text-blue-600'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.description}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                ))}

                <div className="pt-3 mt-2 border-t">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-medium">Alertas del Sistema</span>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-yellow-800">Mantenimiento programado</p>
                        <p className="text-yellow-700">Sistema de acceso - Mañana 10:00</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded">
                      <Waves className="h-4 w-4 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-blue-800">Marea alta</p>
                        <p className="text-blue-700">15:30 - Nivel máximo esperado</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            </Card>
          </ExpandableWidget>

        </div>
      </div>
    </div>
  );
}
