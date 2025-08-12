import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Building, 
  DollarSign, 
  Calendar, 
  Users, 
  Cloud, 
  Wind, 
  Thermometer,
  Eye,
  Plane,
  AlertTriangle,
  CheckCircle,
  Clock,
  Car
} from "lucide-react";

export default function Dashboard() {
  const weatherData = {
    current: {
      temp: 18,
      condition: "Parcialmente nublado",
      humidity: 75,
      wind: 12,
      visibility: 8,
      pressure: 1015
    },
    aviation: {
      ceiling: 2500,
      visibility: 8,
      windDirection: "SE",
      windSpeed: 12,
      gusts: 18,
      altimeter: 30.15
    }
  };

  const expenseData = {
    current: {
      amount: 89500,
      dueDate: "2024-02-15",
      status: "pending"
    },
    history: [
      { month: "Enero 2024", amount: 85200, status: "paid" },
      { month: "Diciembre 2023", amount: 82100, status: "paid" },
      { month: "Noviembre 2023", amount: 78900, status: "paid" }
    ]
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard Propietario</h1>
          <p className="text-muted-foreground">Lugar 87 - Sector Del Campo</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Al día
          </Badge>
          <Badge variant="outline">Propietario</Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-ocean text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Expensa Actual</p>
                <p className="text-2xl font-bold">${expenseData.current.amount.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-white/80" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Reservas Activas</p>
                <p className="text-2xl font-bold text-foreground">3</p>
              </div>
              <Calendar className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Autorizados</p>
                <p className="text-2xl font-bold text-foreground">8</p>
              </div>
              <Users className="h-8 w-8 text-coral" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Temp. Actual</p>
                <p className="text-2xl font-bold text-foreground">{weatherData.current.temp}°C</p>
              </div>
              <Thermometer className="h-8 w-8 text-seafoam" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Property Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Información del Lote
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Número de Lugar</p>
                  <p className="font-semibold">87</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sector</p>
                  <p className="font-semibold">Del Campo</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Superficie</p>
                  <p className="font-semibold">1,847 m²</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tipo</p>
                  <p className="font-semibold">Lugar Residencial</p>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Progreso de Construcción</p>
                  <p className="text-sm font-medium">85%</p>
                </div>
                <Progress value={85} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Recent Expenses */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Historial de Expensas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Current */}
                <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="font-medium">Febrero 2024</p>
                      <p className="text-sm text-muted-foreground">Vence: {expenseData.current.dueDate}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${expenseData.current.amount.toLocaleString()}</p>
                    <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-200">
                      Pendiente
                    </Badge>
                  </div>
                </div>

                {/* History */}
                {expenseData.history.map((expense, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-emerald-600" />
                      <div>
                        <p className="font-medium">{expense.month}</p>
                        <p className="text-sm text-muted-foreground">Pagado</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${expense.amount.toLocaleString()}</p>
                      <Badge variant="outline" className="bg-emerald-100 text-emerald-700 border-emerald-200">
                        Pagado
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button className="w-full mt-4" variant="ocean">
                Pagar Expensa Actual
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Weather Widget */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cloud className="h-5 w-5" />
                Clima Actual
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-3xl font-bold">{weatherData.current.temp}°C</p>
                <p className="text-muted-foreground">{weatherData.current.condition}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Wind className="h-4 w-4 text-muted-foreground" />
                  <span>{weatherData.current.wind} km/h</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                  <span>{weatherData.current.visibility} km</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Aviation Weather */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plane className="h-5 w-5" />
                Condiciones de Vuelo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-700">Condiciones VFR</span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Techo</span>
                  <span>{weatherData.aviation.ceiling} ft</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Viento</span>
                  <span>{weatherData.aviation.windDirection} {weatherData.aviation.windSpeed} G{weatherData.aviation.gusts}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Altímetro</span>
                  <span>{weatherData.aviation.altimeter} inHg</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Nueva Reserva
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Autorizar Visita
              </Button>
              <Button variant="destructive" className="w-full justify-start">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Pánico / Emergencia
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}