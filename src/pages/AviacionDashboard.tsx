import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plane, 
  Wind, 
  Thermometer,
  Eye,
  Cloud,
  Camera,
  Phone,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity
} from "lucide-react";

export default function AviacionDashboard() {
  const weatherData = {
    wind: "SE 12 G18",
    temp: 18,
    qnh: 1015,
    humidity: 75,
    rain: 0,
    visibility: 8,
    ceiling: 2500,
    lastUpdate: "14:23 UTC"
  };

  const runwayStatus = {
    status: "green", // green, yellow, red
    condition: "Operativa",
    note: "Condiciones normales, pista seca",
    lastUpdate: "14:20 UTC"
  };

  const fieldInfo = {
    runway: "08/26",
    length: "1000m",
    surface: "Césped/Tierra",
    elevation: "15m AMSL",
    pattern: "Izquierda RWY 08, Derecha RWY 26",
    frequency: "122.5 MHz",
    emergency: "+54 2281 xxx-xxx"
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "green": return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "yellow": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "red": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "green": return <CheckCircle className="h-4 w-4" />;
      case "yellow": return <AlertTriangle className="h-4 w-4" />;
      case "red": return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard Aviación</h1>
          <p className="text-muted-foreground">Bahía de los Moros - SAAR</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Activity className="w-3 h-3 mr-1" />
            En vivo
          </Badge>
          <Badge variant="outline">Actualizado: {weatherData.lastUpdate}</Badge>
        </div>
      </div>

      {/* Weather & Runway Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Viento</p>
                <p className="text-xl font-bold text-foreground">{weatherData.wind}</p>
              </div>
              <Wind className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Temperatura</p>
                <p className="text-xl font-bold text-foreground">{weatherData.temp}°C</p>
              </div>
              <Thermometer className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">QNH</p>
                <p className="text-xl font-bold text-foreground">{weatherData.qnh} hPa</p>
              </div>
              <Cloud className="h-8 w-8 text-gray-500" />
            </div>
          </CardContent>
        </Card>

        <Card className={`border-2 ${runwayStatus.status === 'green' ? 'border-emerald-200' : runwayStatus.status === 'yellow' ? 'border-yellow-200' : 'border-red-200'}`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Estado Pista</p>
                <div className="flex items-center gap-2">
                  {getStatusIcon(runwayStatus.status)}
                  <span className="font-bold">{runwayStatus.condition}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {runwayStatus.note} • Act: {runwayStatus.lastUpdate}
                </p>
              </div>
              <Plane className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Runway Status Banner */}
      <Card className={`${runwayStatus.status === 'green' ? 'bg-emerald-50 border-emerald-200' : runwayStatus.status === 'yellow' ? 'bg-yellow-50 border-yellow-200' : 'bg-red-50 border-red-200'}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {getStatusIcon(runwayStatus.status)}
                <span className={`font-bold ${runwayStatus.status === 'green' ? 'text-emerald-700' : runwayStatus.status === 'yellow' ? 'text-yellow-700' : 'text-red-700'}`}>
                  PISTA {fieldInfo.runway}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                {fieldInfo.length} • {fieldInfo.surface}
              </div>
            </div>
            <Badge className={getStatusColor(runwayStatus.status)}>
              {runwayStatus.condition}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
        {/* METAR Data */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                METAR AR-0726 - Bahía de los Moros
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 p-3 rounded-lg font-mono text-sm mb-4">
                METAR SAZM 191300Z 11012G18KT 0800 R13/0175 -DZ FG OVC001 11/11 Q1016
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Viento</p>
                  <p className="font-semibold">110° 12G18 kt</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Visibilidad RVR</p>
                  <p className="font-semibold">175m (RWY 13)</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Fenómenos</p>
                  <p className="font-semibold">Llovizna, Niebla</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Nubes</p>
                  <p className="font-semibold">OVC 100 ft</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">QNH</p>
                  <p className="font-semibold">1016 hPa</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Weather */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cloud className="h-5 w-5" />
                Condiciones Actuales Detalladas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Visibilidad</p>
                  <p className="font-semibold">{weatherData.visibility} km</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Techo</p>
                  <p className="font-semibold">{weatherData.ceiling} ft</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Humedad</p>
                  <p className="font-semibold">{weatherData.humidity}%</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Precipitación</p>
                  <p className="font-semibold">{weatherData.rain} mm/h</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Última Act.</p>
                  <p className="font-semibold">{weatherData.lastUpdate}</p>
                </div>
              </div>
            </CardContent>
          </Card>


          {/* Cameras */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Cámaras del Campo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <Camera className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-sm font-medium">Aproximación RWY 08</p>
                  <Button variant="outline" size="sm" className="w-full">Ver en vivo</Button>
                </div>
                <div className="space-y-2">
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <Camera className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-sm font-medium">Torre de Control</p>
                  <Button variant="outline" size="sm" className="w-full">Ver en vivo</Button>
                </div>
                <div className="space-y-2">
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <Camera className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-sm font-medium">Plataforma</p>
                  <Button variant="outline" size="sm" className="w-full">Ver en vivo</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Field Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plane className="h-5 w-5" />
                Información del Campo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pista</span>
                  <span className="font-medium">{fieldInfo.runway}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Longitud</span>
                  <span className="font-medium">{fieldInfo.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Superficie</span>
                  <span className="font-medium">{fieldInfo.surface}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Elevación</span>
                  <span className="font-medium">{fieldInfo.elevation}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-muted-foreground">Circuito</span>
                  <p className="text-xs">{fieldInfo.pattern}</p>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Frecuencia</span>
                  <span className="font-medium">{fieldInfo.frequency}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700">
                <AlertTriangle className="h-5 w-5" />
                Contacto de Emergencia
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <Button variant="destructive" size="sm" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Llamar
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  WhatsApp
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Personal de tierra disponible 24/7</p>
              <p className="text-sm font-mono">{fieldInfo.emergency}</p>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Ver Histórico Meteorológico
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Phone className="h-4 w-4 mr-2" />
                Contactar Torre
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Plane className="h-4 w-4 mr-2" />
                Descargar Field Card
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}