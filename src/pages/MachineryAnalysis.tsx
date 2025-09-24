import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Truck, 
  Clock,
  TrendingUp,
  ArrowLeft,
  RefreshCw,
  Mountain,
  MapPin
} from "lucide-react";
import { Link } from "react-router-dom";
import { DateFilter } from "@/components/DateFilter";

const machineryData = [
  { 
    name: "EXCAVADORA VOLVO", 
    hours: 213, 
    arenaTrips: 0, 
    toscaTrips: 0, 
    utilization: 100, 
    revenue: 213000,
    operatingCost: 8520,
    laborCost: 63900,
    fuelCost: 12780,
    netProfit: 127800,
    status: "Operativa"
  },
  { 
    name: "PALA XCMG", 
    hours: 131, 
    arenaTrips: 0, 
    toscaTrips: 0, 
    utilization: 66, 
    revenue: 131000,
    operatingCost: 5240,
    laborCost: 39300,
    fuelCost: 7860,
    netProfit: 78600,
    status: "Operativa"
  },
  { 
    name: "EXCAVADORA JOHN DEERE", 
    hours: 117, 
    arenaTrips: 0, 
    toscaTrips: 0, 
    utilization: 59, 
    revenue: 117000,
    operatingCost: 4680,
    laborCost: 35100,
    fuelCost: 7020,
    netProfit: 70200,
    status: "Operativa"
  },
  { 
    name: "PALA CAT UNA", 
    hours: 62, 
    arenaTrips: 0, 
    toscaTrips: 0, 
    utilization: 31, 
    revenue: 62000,
    operatingCost: 2480,
    laborCost: 18600,
    fuelCost: 3720,
    netProfit: 37200,
    status: "Operativa"
  },
  { 
    name: "RETRO CAT", 
    hours: 54, 
    arenaTrips: 0, 
    toscaTrips: 0, 
    utilization: 27, 
    revenue: 52700,
    operatingCost: 2160,
    laborCost: 16200,
    fuelCost: 3240,
    netProfit: 31100,
    status: "Mantenimiento"
  },
  { 
    name: "CAMION VOLVO 1 -MWI", 
    hours: 1, 
    arenaTrips: 583, 
    toscaTrips: 175.5, 
    utilization: 80, 
    revenue: 295000,
    operatingCost: 11800,
    laborCost: 88500,
    fuelCost: 17700,
    netProfit: 177000,
    status: "Operativa"
  }
];

const totalStats = {
  hours: machineryData.reduce((sum, m) => sum + m.hours, 0),
  revenue: machineryData.reduce((sum, m) => sum + m.revenue, 0),
  operatingCost: machineryData.reduce((sum, m) => sum + m.operatingCost, 0),
  laborCost: machineryData.reduce((sum, m) => sum + m.laborCost, 0),
  fuelCost: machineryData.reduce((sum, m) => sum + m.fuelCost, 0),
  netProfit: machineryData.reduce((sum, m) => sum + m.netProfit, 0),
  arenaTrips: machineryData.reduce((sum, m) => sum + m.arenaTrips, 0),
  toscaTrips: machineryData.reduce((sum, m) => sum + m.toscaTrips, 0)
};

const utilizationStats = [
  { range: "90-100%", count: 1, color: "bg-green-500" },
  { range: "70-89%", count: 1, color: "bg-blue-500" },
  { range: "50-69%", count: 2, color: "bg-yellow-500" },
  { range: "0-49%", count: 2, color: "bg-red-500" }
];

export default function MachineryAnalysis() {
  const handleDateFilter = (filter: string, startDate?: Date, endDate?: Date) => {
    console.log("Filtro aplicado:", filter, startDate, endDate);
    // Aquí implementar la lógica de filtrado
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
              <h1 className="text-3xl font-bold text-foreground">Análisis de Maquinaria</h1>
              <p className="text-muted-foreground">Sistema completo de seguimiento y análisis de horas máquina</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DateFilter onFilterChange={handleDateFilter} />
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Actualizar
            </Button>
          </div>
        </div>

        {/* Summary Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Horas</p>
                  <p className="text-3xl font-bold text-foreground">{totalStats.hours}</p>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <div className="mt-2 flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="text-xs text-muted-foreground">+15% vs mes anterior</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Viajes Arena</p>
                  <p className="text-3xl font-bold text-foreground">{totalStats.arenaTrips}</p>
                </div>
                <Mountain className="h-8 w-8 text-amber-600" />
              </div>
              <div className="mt-2 flex items-center gap-1">
                <span className="text-xs text-muted-foreground">
                  {(totalStats.arenaTrips * 28).toLocaleString()}m³ total
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Viajes Tosca</p>
                  <p className="text-3xl font-bold text-foreground">{totalStats.toscaTrips}</p>
                </div>
                <MapPin className="h-8 w-8 text-stone-600" />
              </div>
              <div className="mt-2 flex items-center gap-1">
                <span className="text-xs text-muted-foreground">
                  {(totalStats.toscaTrips * 28).toLocaleString()}m³ total
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Máquinas Activas</p>
                  <p className="text-3xl font-bold text-foreground">{machineryData.filter(m => m.status === "Operativa").length}</p>
                </div>
                <Truck className="h-8 w-8 text-orange-600" />
              </div>
              <div className="mt-2 flex items-center gap-1">
                <span className="text-xs text-muted-foreground">
                  de {machineryData.length} total
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analysis Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Vista General</TabsTrigger>
            <TabsTrigger value="performance">Rendimiento</TabsTrigger>
            <TabsTrigger value="transport">Transporte</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Resumen de Maquinaria
                </CardTitle>
              </CardHeader>
              <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Máquina</TableHead>
                        <TableHead className="text-right">Horas</TableHead>
                        <TableHead className="text-right">Viajes de Material</TableHead>
                        <TableHead>Estado</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {machineryData.map((machine, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{machine.name}</TableCell>
                          <TableCell className="text-right">{machine.hours}h</TableCell>
                          <TableCell className="text-right">
                            {machine.arenaTrips + machine.toscaTrips > 0 ? (
                              <div className="text-sm">
                                <div>Arena: {machine.arenaTrips}</div>
                                <div>Tosca: {machine.toscaTrips}</div>
                              </div>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge className={
                              machine.status === "Operativa" ? "bg-green-100 text-green-800" : 
                              machine.status === "Mantenimiento" ? "bg-yellow-100 text-yellow-800" : 
                              "bg-red-100 text-red-800"
                            }>
                              {machine.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top 3 Máquinas Más Utilizadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {machineryData
                      .sort((a, b) => b.hours - a.hours)
                      .slice(0, 3)
                      .map((machine, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                          <div>
                            <p className="font-medium">{machine.name}</p>
                            <p className="text-sm text-muted-foreground">{machine.status}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-green-700">{machine.hours}h</p>
                            <p className="text-xs text-muted-foreground">#{index + 1} puesto</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top 3 Máquinas Menos Utilizadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {machineryData
                      .sort((a, b) => a.hours - b.hours)
                      .slice(0, 3)
                      .map((machine, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                          <div>
                            <p className="font-medium">{machine.name}</p>
                            <p className="text-sm text-muted-foreground">{machine.status}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-orange-700">{machine.hours}h</p>
                            <p className="text-xs text-muted-foreground">Oportunidad de mejora</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>


          <TabsContent value="transport" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Eficiencia de Transporte
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold">Volumen Total Transportado</span>
                      <span className="text-2xl font-bold text-green-700">
                        {((totalStats.arenaTrips + totalStats.toscaTrips) * 28).toLocaleString()}m³
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="p-3 bg-amber-50 rounded-lg border">
                        <div className="flex items-center gap-3 mb-2">
                          <Mountain className="h-6 w-6 text-amber-600" />
                          <span className="font-medium text-amber-800">Arena</span>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-amber-700">{totalStats.arenaTrips} viajes</p>
                          <p className="text-sm text-amber-600">
                            {(totalStats.arenaTrips * 28).toLocaleString()}m³ transportados
                          </p>
                          <p className="text-xs text-muted-foreground">28m³ por viaje</p>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-stone-100 rounded-lg border">
                        <div className="flex items-center gap-3 mb-2">
                          <MapPin className="h-6 w-6 text-stone-600" />
                          <span className="font-medium text-stone-800">Tosca</span>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-stone-700">{totalStats.toscaTrips} viajes</p>
                          <p className="text-sm text-stone-600">
                            {(totalStats.toscaTrips * 28).toLocaleString()}m³ transportados
                          </p>
                          <p className="text-xs text-muted-foreground">28m³ por viaje</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Total Viajes</p>
                        <p className="text-2xl font-bold text-blue-700">
                          {totalStats.arenaTrips + totalStats.toscaTrips}
                        </p>
                      </div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Promedio Diario</p>
                        <p className="text-2xl font-bold text-purple-700">
                          {((totalStats.arenaTrips + totalStats.toscaTrips) / 30).toFixed(1)}
                        </p>
                      </div>
                    </div>
                    <div className="p-3 bg-indigo-50 rounded-lg">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Eficiencia</p>
                        <p className="text-2xl font-bold text-indigo-700">98.5%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}