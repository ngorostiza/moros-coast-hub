import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  Wind, 
  Thermometer, 
  Eye, 
  Droplets,
  Compass,
  Activity,
  Calendar
} from "lucide-react";

const currentWeather = {
  temp: 18,
  condition: "Parcialmente nublado",
  wind: "SE 12 G18 kt",
  windDir: 110,
  visibility: 8,
  humidity: 75,
  pressure: 1015,
  lastUpdate: "14:23 UTC"
};

const forecast = [
  {
    date: "Hoy",
    day: "Lunes",
    high: 22,
    low: 15,
    condition: "Parcialmente nublado",
    icon: Cloud,
    wind: "SE 12-18 kt",
    rain: 10,
    hours: [
      { time: "15:00", temp: 20, condition: "Nublado", wind: "SE 15", rain: 5 },
      { time: "18:00", temp: 18, condition: "Parcialmente nublado", wind: "SE 12", rain: 0 },
      { time: "21:00", temp: 16, condition: "Despejado", wind: "SE 10", rain: 0 },
      { time: "00:00", temp: 15, condition: "Despejado", wind: "SE 8", rain: 0 }
    ]
  },
  {
    date: "Mañana",
    day: "Martes", 
    high: 24,
    low: 16,
    condition: "Soleado",
    icon: Sun,
    wind: "E 8-12 kt",
    rain: 0,
    hours: [
      { time: "06:00", temp: 16, condition: "Despejado", wind: "E 8", rain: 0 },
      { time: "09:00", temp: 20, condition: "Soleado", wind: "E 10", rain: 0 },
      { time: "12:00", temp: 24, condition: "Soleado", wind: "E 12", rain: 0 },
      { time: "15:00", temp: 23, condition: "Soleado", wind: "E 10", rain: 0 }
    ]
  },
  {
    date: "Miércoles",
    day: "Miércoles",
    high: 19,
    low: 14,
    condition: "Lluvioso",
    icon: CloudRain,
    wind: "S 15-22 kt",
    rain: 80,
    hours: [
      { time: "06:00", temp: 15, condition: "Nublado", wind: "S 12", rain: 20 },
      { time: "09:00", temp: 17, condition: "Lluvia ligera", wind: "S 18", rain: 60 },
      { time: "12:00", temp: 19, condition: "Lluvia", wind: "S 22", rain: 90 },
      { time: "15:00", temp: 18, condition: "Lluvia", wind: "S 20", rain: 85 }
    ]
  },
  {
    date: "Jueves",
    day: "Jueves",
    high: 21,
    low: 13,
    condition: "Parcialmente nublado",
    icon: Cloud,
    wind: "SW 10-15 kt",
    rain: 20,
    hours: []
  },
  {
    date: "Viernes", 
    day: "Viernes",
    high: 23,
    low: 15,
    condition: "Soleado",
    icon: Sun,
    wind: "W 8-12 kt",
    rain: 5,
    hours: []
  }
];

const metarData = {
  station: "SAZM",
  airport: "Bahía de los Moros",
  raw: "METAR SAZM 191300Z 11012G18KT 0800 R13/0175 -DZ FG OVC001 11/11 Q1016 RMK AO2 SLP175 T01110111 53007=",
  decoded: {
    time: "19 13:00 UTC",
    wind: "110° at 12 kt, gusts 18 kt",
    vis: "800m",
    runway: "RWY 13, 175m visual range",
    weather: "Light Drizzle, Fog",
    clouds: "Overcast at 100 ft",
    temp: "11°C",
    dewpoint: "11°C", 
    altimeter: "1016 hPa"
  }
};

export default function ClimaPronostico() {
  const getWeatherIcon = (condition: string) => {
    if (condition.includes("Soleado")) return Sun;
    if (condition.includes("Lluv")) return CloudRain;
    if (condition.includes("Nublado")) return Cloud;
    return Cloud;
  };

  const getRainColor = (percentage: number) => {
    if (percentage >= 70) return "text-blue-600";
    if (percentage >= 40) return "text-blue-400";
    if (percentage >= 20) return "text-blue-300";
    return "text-gray-400";
  };

  return (
    <div className="space-y-6">
      {/* Current Weather */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Cloud className="h-5 w-5" />
              Condiciones Actuales
            </CardTitle>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              <Activity className="w-3 h-3 mr-1" />
              Actualizado: {currentWeather.lastUpdate}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <Thermometer className="h-8 w-8 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">{currentWeather.temp}°C</p>
                <p className="text-sm text-muted-foreground">{currentWeather.condition}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Wind className="h-8 w-8 text-blue-500" />
              <div>
                <p className="font-semibold">{currentWeather.wind}</p>
                <p className="text-sm text-muted-foreground">Viento</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Eye className="h-8 w-8 text-gray-500" />
              <div>
                <p className="font-semibold">{currentWeather.visibility} km</p>
                <p className="text-sm text-muted-foreground">Visibilidad</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Droplets className="h-8 w-8 text-teal-500" />
              <div>
                <p className="font-semibold">{currentWeather.humidity}%</p>
                <p className="text-sm text-muted-foreground">Humedad</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Forecast Tabs */}
      <Tabs defaultValue="daily">
        <TabsList>
          <TabsTrigger value="daily">Pronóstico 5 Días</TabsTrigger>
          <TabsTrigger value="hourly">Por Horas</TabsTrigger>
          <TabsTrigger value="metar">METAR/TAF</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {forecast.map((day, index) => {
              const WeatherIcon = day.icon;
              return (
                <Card key={index} className={index === 0 ? "border-blue-200 bg-blue-50" : ""}>
                  <CardContent className="p-4">
                    <div className="text-center space-y-3">
                      <div>
                        <p className="font-semibold">{day.date}</p>
                        <p className="text-sm text-muted-foreground">{day.day}</p>
                      </div>
                      
                      <WeatherIcon className="h-12 w-12 mx-auto text-blue-600" />
                      
                      <div>
                        <p className="text-lg font-bold">{day.high}°</p>
                        <p className="text-sm text-muted-foreground">{day.low}°</p>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-xs font-medium">{day.condition}</p>
                        <div className="flex items-center justify-center gap-1 text-xs">
                          <Wind className="h-3 w-3" />
                          <span>{day.wind}</span>
                        </div>
                        <div className={`flex items-center justify-center gap-1 text-xs ${getRainColor(day.rain)}`}>
                          <Droplets className="h-3 w-3" />
                          <span>{day.rain}%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="hourly" className="space-y-4">
          {forecast.slice(0, 3).map((day, dayIndex) => (
            day.hours.length > 0 && (
              <Card key={dayIndex}>
                <CardHeader>
                  <CardTitle className="text-lg">{day.date} - {day.day}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {day.hours.map((hour, hourIndex) => (
                      <div key={hourIndex} className="text-center p-3 border rounded-lg">
                        <p className="font-semibold text-sm">{hour.time}</p>
                        <p className="text-lg font-bold my-2">{hour.temp}°</p>
                        <p className="text-xs text-muted-foreground mb-2">{hour.condition}</p>
                        <div className="space-y-1">
                          <div className="flex items-center justify-center gap-1 text-xs">
                            <Wind className="h-3 w-3" />
                            <span>{hour.wind}</span>
                          </div>
                          <div className={`flex items-center justify-center gap-1 text-xs ${getRainColor(hour.rain)}`}>
                            <Droplets className="h-3 w-3" />
                            <span>{hour.rain}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          ))}
        </TabsContent>

        <TabsContent value="metar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                METAR - {metarData.airport} ({metarData.station})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Raw METAR */}
              <div>
                <h4 className="font-semibold mb-2">METAR Crudo</h4>
                <div className="bg-gray-100 p-3 rounded-lg font-mono text-sm">
                  {metarData.raw}
                </div>
              </div>

              {/* Decoded */}
              <div>
                <h4 className="font-semibold mb-4">Decodificado</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Observación:</span>
                      <span className="font-medium">{metarData.decoded.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Viento:</span>
                      <span className="font-medium">{metarData.decoded.wind}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Visibilidad:</span>
                      <span className="font-medium">{metarData.decoded.vis}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Pista:</span>
                      <span className="font-medium">{metarData.decoded.runway}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tiempo:</span>
                      <span className="font-medium">{metarData.decoded.weather}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Nubes:</span>
                      <span className="font-medium">{metarData.decoded.clouds}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Temperatura:</span>
                      <span className="font-medium">{metarData.decoded.temp}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Altímetro:</span>
                      <span className="font-medium">{metarData.decoded.altimeter}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t">
                <Button variant="outline">
                  <Activity className="h-4 w-4 mr-2" />
                  Actualizar METAR
                </Button>
                <Button variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Ver TAF
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}