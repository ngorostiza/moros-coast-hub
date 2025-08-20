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
  DollarSign,
  ArrowLeft,
  RefreshCw,
  Fuel,
  Wrench,
  BarChart3
} from "lucide-react";
import { Link } from "react-router-dom";

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
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualizar
          </Button>
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
                  <p className="text-muted-foreground text-sm">Facturación Total</p>
                  <p className="text-3xl font-bold text-foreground">${(totalStats.revenue/1000).toFixed(0)}K</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
              <div className="mt-2 flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="text-xs text-muted-foreground">+8% vs mes anterior</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Ganancia Neta</p>
                  <p className="text-3xl font-bold text-foreground">${(totalStats.netProfit/1000).toFixed(0)}K</p>
                </div>
                <BarChart3 className="h-8 w-8 text-emerald-600" />
              </div>
              <div className="mt-2 flex items-center gap-1">
                <span className="text-xs text-muted-foreground">
                  {((totalStats.netProfit/totalStats.revenue)*100).toFixed(1)}% margen
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Vista General</TabsTrigger>
            <TabsTrigger value="performance">Rendimiento</TabsTrigger>
            <TabsTrigger value="costs">Costos</TabsTrigger>
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
                      <TableHead className="text-right">Utilización</TableHead>
                      <TableHead className="text-right">Facturación</TableHead>
                      <TableHead className="text-right">Ganancia</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {machineryData.map((machine, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{machine.name}</TableCell>
                        <TableCell className="text-right">{machine.hours}h</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-3">
                            <Progress value={machine.utilization} className="h-2 w-16" />
                            <span className="text-sm w-8 text-right">{machine.utilization}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-mono text-green-600">
                          ${machine.revenue.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right font-mono text-emerald-600">
                          ${machine.netProfit.toLocaleString()}
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
                  <CardTitle>Distribución de Utilización</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {utilizationStats.map((stat, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded ${stat.color}`}></div>
                          <span className="text-sm font-medium">{stat.range}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{stat.count} máquinas</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {machineryData
                      .sort((a, b) => b.netProfit - a.netProfit)
                      .slice(0, 4)
                      .map((machine, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <div>
                            <p className="font-medium">{machine.name}</p>
                            <p className="text-sm text-muted-foreground">{machine.hours}h trabajadas</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-green-600">${(machine.netProfit/1000).toFixed(0)}K</p>
                            <p className="text-xs text-muted-foreground">{machine.utilization}% uso</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="costs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Análisis Detallado de Costos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Máquina</TableHead>
                      <TableHead className="text-right">Costo Operativo</TableHead>
                      <TableHead className="text-right">Costo Laboral</TableHead>
                      <TableHead className="text-right">Costo Combustible</TableHead>
                      <TableHead className="text-right">Total Costos</TableHead>
                      <TableHead className="text-right">Margen</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {machineryData.map((machine, index) => {
                      const totalCosts = machine.operatingCost + machine.laborCost + machine.fuelCost;
                      const margin = ((machine.netProfit / machine.revenue) * 100);
                      return (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{machine.name}</TableCell>
                          <TableCell className="text-right text-red-600">
                            ${machine.operatingCost.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right text-red-600">
                            ${machine.laborCost.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right text-red-600">
                            ${machine.fuelCost.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right font-mono text-red-700">
                            ${totalCosts.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <span className={margin > 50 ? 'text-green-600 font-medium' : margin > 30 ? 'text-yellow-600' : 'text-red-600'}>
                              {margin.toFixed(1)}%
                            </span>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transport" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Transporte de Materiales</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-amber-50 rounded-lg border">
                        <Truck className="h-8 w-8 mx-auto mb-2 text-amber-600" />
                        <p className="text-2xl font-bold text-amber-700">{totalStats.arenaTrips}</p>
                        <p className="text-sm text-amber-600">Viajes Arena 28m³</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {(totalStats.arenaTrips * 28).toLocaleString()}m³ total
                        </p>
                      </div>
                      <div className="text-center p-4 bg-stone-100 rounded-lg border">
                        <Truck className="h-8 w-8 mx-auto mb-2 text-stone-600" />
                        <p className="text-2xl font-bold text-stone-700">{totalStats.toscaTrips}</p>
                        <p className="text-sm text-stone-600">Viajes Tosca 28m³</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {(totalStats.toscaTrips * 28).toLocaleString()}m³ total
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Eficiencia de Transporte</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Volumen Total Transportado</span>
                        <span className="text-lg font-bold text-green-700">
                          {((totalStats.arenaTrips + totalStats.toscaTrips) * 28).toLocaleString()}m³
                        </span>
                      </div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Ingresos por Transporte</span>
                        <span className="text-lg font-bold text-blue-700">
                          ${machineryData.find(m => m.name.includes("CAMION"))?.revenue.toLocaleString() || "0"}
                        </span>
                      </div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Costo por m³</span>
                        <span className="text-lg font-bold text-purple-700">
                          ${(machineryData.find(m => m.name.includes("CAMION"))?.revenue || 0 / ((totalStats.arenaTrips + totalStats.toscaTrips) * 28)).toFixed(0)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}