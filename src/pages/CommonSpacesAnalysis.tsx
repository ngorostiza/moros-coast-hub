import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Calendar, 
  TrendingUp,
  TrendingDown,
  Users,
  ArrowLeft,
  RefreshCw,
  Clock,
  DollarSign,
  MapPin,
  Star
} from "lucide-react";
import { Link } from "react-router-dom";
import { DateFilter } from "@/components/DateFilter";

const facilityData = [
  { 
    name: "Tennis Vivero (x1)",
    bookings: 12,
    usage: "Media",
    capacity: 30,
    utilizationRate: 40,
    revenue: 24000,
    avgSessionTime: 90,
    peakHours: "18:00-21:00",
    maintenance: "Bueno",
    userRating: 4.2
  },
  { 
    name: "Tennis Bosque (x4)",
    bookings: 28,
    usage: "Muy Alta",
    capacity: 120,
    utilizationRate: 93,
    revenue: 84000,
    avgSessionTime: 85,
    peakHours: "17:00-22:00",
    maintenance: "Excelente",
    userRating: 4.8
  },
  { 
    name: "Paddle Campo (x2)",
    bookings: 16,
    usage: "Alta",
    capacity: 60,
    utilizationRate: 72,
    revenue: 48000,
    avgSessionTime: 95,
    peakHours: "19:00-22:00",
    maintenance: "Bueno",
    userRating: 4.5
  },
  { 
    name: "Peludo (tipo SUM)",
    bookings: 6,
    usage: "Media",
    capacity: 20,
    utilizationRate: 30,
    revenue: 12000,
    avgSessionTime: 180,
    peakHours: "20:00-23:00",
    maintenance: "Regular",
    userRating: 4.0
  },
];

const monthlyTrends = [
  { month: "Ene", bookings: 45, revenue: 135000 },
  { month: "Feb", bookings: 52, revenue: 156000 },
  { month: "Mar", bookings: 80, revenue: 240000 },
  { month: "Abr", bookings: 78, revenue: 234000 },
  { month: "May", bookings: 85, revenue: 255000 },
  { month: "Jun", bookings: 92, revenue: 276000 }
];

const timeSlotAnalysis = [
  { time: "06:00-09:00", bookings: 8, rate: 10 },
  { time: "09:00-12:00", bookings: 15, rate: 19 },
  { time: "12:00-15:00", bookings: 18, rate: 23 },
  { time: "15:00-18:00", bookings: 25, rate: 31 },
  { time: "18:00-21:00", bookings: 35, rate: 44 },
  { time: "21:00-24:00", bookings: 19, rate: 24 }
];

const totalStats = {
  bookings: facilityData.reduce((sum, f) => sum + f.bookings, 0),
  revenue: facilityData.reduce((sum, f) => sum + f.revenue, 0),
  capacity: facilityData.reduce((sum, f) => sum + f.capacity, 0),
  avgUtilization: facilityData.reduce((sum, f) => sum + f.utilizationRate, 0) / facilityData.length,
  avgRating: facilityData.reduce((sum, f) => sum + f.userRating, 0) / facilityData.length
};

export default function CommonSpacesAnalysis() {
  const [dateFilter, setDateFilter] = useState("todos");

  const handleDateFilterChange = (filter: string, startDate?: Date, endDate?: Date) => {
    setDateFilter(filter);
    // Here you would filter the data based on the selected dates
    console.log('Date filter changed:', filter, startDate, endDate);
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Análisis de Espacios Comunes</h1>
              <p className="text-muted-foreground">Rendimiento y utilización de instalaciones recreativas</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DateFilter onFilterChange={handleDateFilterChange} />
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Actualizar
            </Button>
          </div>
        </div>

        {/* Summary Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Reservas Totales</p>
                  <p className="text-3xl font-bold text-foreground">{totalStats.bookings}</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Espacios Activos</p>
                  <p className="text-3xl font-bold text-foreground">{facilityData.length}</p>
                </div>
                <MapPin className="h-8 w-8 text-purple-600" />
              </div>
              <div className="mt-2 flex items-center gap-1">
                <span className="text-xs text-muted-foreground">
                  Instalaciones disponibles
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analysis Tabs */}
        <Tabs defaultValue="facilities" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="facilities">Instalaciones</TabsTrigger>
            <TabsTrigger value="utilization">Utilización</TabsTrigger>
            <TabsTrigger value="trends">Tendencias</TabsTrigger>
          </TabsList>

          <TabsContent value="facilities" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Rendimiento por Instalación
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Instalación</TableHead>
                      <TableHead className="text-right">Reservas</TableHead>
                      <TableHead className="text-right">Utilización</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {facilityData.map((facility, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{facility.name}</TableCell>
                        <TableCell className="text-right">{facility.bookings}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-3">
                            <Progress value={facility.utilizationRate} className="h-2 w-16" />
                            <span className="text-sm w-8 text-right">{facility.utilizationRate}%</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="utilization" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Distribución por Horario</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {timeSlotAnalysis.map((slot, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{slot.time}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <Progress value={slot.rate} className="h-2 w-20" />
                          <div className="text-right">
                            <p className="text-sm font-medium">{slot.bookings} reservas</p>
                            <p className="text-xs text-muted-foreground">{slot.rate}%</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Espacios Más Populares</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {facilityData
                      .sort((a, b) => b.bookings - a.bookings)
                      .slice(0, 4)
                      .map((facility, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <div>
                            <p className="font-medium">{facility.name}</p>
                            <p className="text-sm text-muted-foreground">Horario pico: {facility.peakHours}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-blue-600">{facility.bookings}</p>
                            <p className="text-xs text-muted-foreground">reservas</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>


          <TabsContent value="trends" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Evolución de Reservas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {monthlyTrends.map((trend, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                      <span className="text-sm font-medium">{trend.month}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={(trend.bookings/100)*100} className="h-2 w-16" />
                        <span className="text-sm">{trend.bookings}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}