import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import CollapsibleGISMap from "@/components/CollapsibleGISMap";
import MachineryHoursWidget from "@/components/MachineryHoursWidget";
import ExpandableWidget from "@/components/ExpandableWidget";
import { AIChatWidget } from "@/components/AIChatWidget";
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
    pendingPayments: 6,
    staffBdlM: 28
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
    { facility: "Tennis Vivero (x1)", bookings: 12, status: "Disponible" },
    { facility: "Tennis Bosque (x4)", bookings: 28, status: "En Uso" },
    { facility: "Paddle Campo (x2)", bookings: 16, status: "En Mantenimiento" },
    { facility: "Peludo (tipo SUM)", bookings: 6, status: "Disponible" }
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      <div className="container mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 space-y-4 min-w-0">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-3xl font-bold text-foreground">Dashboard Administrativo</h1>
            <p className="text-muted-foreground">Vista en tiempo real - Bahía de los Moros</p>
          </div>
          <div className="flex items-end gap-3 flex-shrink-0">
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

        {/* Recent Activity - Full Width */}
        <ExpandableWidget expandUrl="/admin/monitoreo" expandText="ver más">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Actividad Reciente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.slice(0, 2).map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg animate-fade-in">
                    <div className={`p-2 rounded-full ${
                      activity.type === 'security' ? 'bg-emerald-50 text-emerald-600' :
                      activity.type === 'payment' ? 'bg-blue-50 text-blue-600' :
                      'bg-orange-50 text-orange-600'
                    }`}>
                      <activity.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{activity.title}</p>
                      <p className="text-sm text-muted-foreground truncate">{activity.description}</p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {activity.time}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </ExpandableWidget>

        {/* Live Stats - Real Time - 5 Widgets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        <Card className="bg-gradient-ocean text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold">{liveStats.peopleInside}</p>
                <p className="text-white/80 text-sm">Personas Adentro</p>
              </div>
              <Users className="h-8 w-8 text-white/80" />
            </div>
            <div className="mt-2 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              <span className="text-xs text-white/80">+12 en la última hora</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-bahia-blue-medium to-bahia-blue-light text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold">{liveStats.staffBdlM}</p>
                <p className="text-white/80 text-sm">STAFF BdlM</p>
              </div>
              <Users className="h-8 w-8 text-white/80" />
            </div>
            <div className="mt-2 flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              <span className="text-xs text-white/80">Personal activo</span>
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
              <Eye className="h-8 w-8 text-bahia-blue-light" />
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
              <Calendar className="h-8 w-8 text-bahia-gold" />
            </div>
            <div className="mt-2 flex items-center gap-1">
              <CheckCircle className="h-3 w-3 text-emerald-600" />
              <span className="text-xs text-muted-foreground">6 completadas</span>
            </div>
          </CardContent>
        </Card>
        </div>

        {/* Tank Levels - Full Width - Expandable */}
        <ExpandableWidget expandUrl="/admin/fuel" expandText="ver más">
          <Card className="w-full">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-lg font-semibold">Niveles de Tanques de Combustible</h3>
                <span className="text-sm text-muted-foreground">(Capacidad máxima: 5,000L)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">VIAL GAS OIL 1</span>
                    <span className={`text-lg font-bold ${26.63 >= 41 ? 'text-green-700' : 26.63 >= 20 ? 'text-yellow-700' : 'text-red-700'}`}>1,331L</span>
                  </div>
                  <div className="relative">
                    <Progress value={26.63} className="h-3" />
                    <div className="absolute inset-0 h-3 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all ${26.63 >= 41 ? 'bg-green-500' : 26.63 >= 20 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: '26.63%' }}
                      />
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">26.63% - Nivel Bajo</div>
                  <div className="text-sm text-foreground font-bold">Stock PUMA: 60,892.00 L GAS OIL</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">VIAL ION 1</span>
                    <span className={`text-lg font-bold ${54.72 >= 41 ? 'text-green-700' : 54.72 >= 20 ? 'text-yellow-700' : 'text-red-700'}`}>2,736L</span>
                  </div>
                  <div className="relative">
                    <Progress value={54.72} className="h-3" />
                    <div className="absolute inset-0 h-3 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all ${54.72 >= 41 ? 'bg-green-500' : 54.72 >= 20 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: '54.72%' }}
                      />
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">54.72% - Nivel Normal</div>
                  <div className="text-sm text-foreground font-bold">Stock PUMA: 33,067.54 L PrOvSTOCK</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">HANGAR JP1 1</span>
                    <span className={`text-lg font-bold ${35.02 >= 41 ? 'text-green-700' : 35.02 >= 20 ? 'text-yellow-700' : 'text-red-700'}`}>1,751L</span>
                  </div>
                  <div className="relative">
                    <Progress value={35.02} className="h-3" />
                    <div className="absolute inset-0 h-3 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all ${35.02 >= 41 ? 'bg-green-500' : 35.02 >= 20 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: '35.02%' }}
                      />
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">35.02% - Nivel Bajo</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">HANGAR 100LL 1</span>
                    <span className={`text-lg font-bold ${84.89 >= 41 ? 'text-green-700' : 84.89 >= 20 ? 'text-yellow-700' : 'text-red-700'}`}>4,245L</span>
                  </div>
                  <div className="relative">
                    <Progress value={84.89} className="h-3" />
                    <div className="absolute inset-0 h-3 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all ${84.89 >= 41 ? 'bg-green-500' : 84.89 >= 20 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: '84.89%' }}
                      />
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">84.89% - Nivel Alto</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </ExpandableWidget>

        {/* AI Chat Widget */}
        <div className="w-full">
          <AIChatWidget />
        </div>

        {/* GIS Map - Collapsible */}
        <div className="w-full">
          <CollapsibleGISMap />
        </div>

        {/* Machinery Hours Widget - Full Width */}
        <ExpandableWidget expandUrl="/admin/machinery" expandText="ver más">
          <MachineryHoursWidget />
        </ExpandableWidget>

        {/* Main Dashboard Grid - Financial Overview */}
        <div className="space-y-6">
          {/* Monthly Collection Summary */}
          <ExpandableWidget expandUrl="/admin/reportes" expandText="ver más">
            <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Resumen Financiero - Septiembre 2025
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
          </ExpandableWidget>
        </div>

        {/* Reservations Performance - Full Width */}
        <ExpandableWidget expandUrl="/admin/espacios-comunes" expandText="ver más">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Rendimiento de Espacios Comunes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reservationStats.map((facility, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div>
                      <p className="font-medium">{facility.facility}</p>
                      <p className="text-sm text-muted-foreground">{facility.bookings} reservas este mes</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className={
                        facility.status === "En Uso" ? "bg-orange-50 text-orange-700 border-orange-200" :
                        facility.status === "En Mantenimiento" ? "bg-red-50 text-red-700 border-red-200" :
                        "bg-green-50 text-green-700 border-green-200"
                      }>
                        {facility.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </ExpandableWidget>
      </div>
    </div>
  );
}