import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DateFilter } from "@/components/DateFilter";
import { 
  BarChart3, 
  Fuel, 
  Truck, 
  TrendingUp, 
  TrendingDown,
  Clock,
  Zap,
  Activity,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { useState } from "react";

// Mock data for efficiency analysis
const machineryEfficiency = [
  {
    id: "CAT-350",
    name: "Excavadora CAT 350",
    hoursWorked: 284,
    fuelConsumed: 3420,
    efficiency: 92.5,
    trend: "up",
    projects: ["Movimiento Tierra Lote 45", "Nivelación Acceso Norte"],
    status: "optimal"
  },
  {
    id: "VOL-EC380",
    name: "Excavadora Volvo EC380",
    hoursWorked: 196,
    fuelConsumed: 2380,
    efficiency: 88.1,
    trend: "down",
    projects: ["Drenaje Sector Del Mar"],
    status: "attention"
  },
  {
    id: "SCANIA-R500",
    name: "Camión Scania R500",
    hoursWorked: 312,
    fuelConsumed: 4680,
    efficiency: 95.2,
    trend: "up",
    projects: ["Transporte Arena", "Transporte Tosca"],
    status: "optimal"
  },
  {
    id: "CAT-966",
    name: "Cargadora CAT 966",
    hoursWorked: 168,
    fuelConsumed: 2240,
    efficiency: 84.3,
    trend: "stable",
    projects: ["Carga Material Cantera"],
    status: "attention"
  }
];

const fuelAnalysis = [
  {
    month: "Enero 2024",
    totalFuel: 12450,
    totalHours: 960,
    avgConsumption: 12.97,
    cost: 3486500,
    efficiency: 89.2
  },
  {
    month: "Febrero 2024", 
    totalFuel: 13820,
    totalHours: 1024,
    avgConsumption: 13.50,
    cost: 3872400,
    efficiency: 91.1
  },
  {
    month: "Marzo 2024",
    totalFuel: 14200,
    totalHours: 1156,
    avgConsumption: 12.28,
    cost: 3976000,
    efficiency: 94.3
  }
];

const crossReports = [
  {
    period: "Q1 2024",
    totalMachineHours: 3140,
    totalFuelLiters: 40470,
    avgEfficiency: 91.5,
    costPerHour: 3550,
    projects: 8,
    alerts: 3
  }
];

export default function AdminEficiencia() {
  const [selectedDateRange, setSelectedDateRange] = useState("last-month");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'attention': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-emerald-600" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-600" />;
      default: return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Análisis de Eficiencia Operativa
              </CardTitle>
              <p className="text-muted-foreground mt-1">
                Seguimiento cruzado de maquinaria y consumo de combustible
              </p>
            </div>
            <DateFilter onFilterChange={() => {}} />
          </div>
        </CardHeader>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Eficiencia Promedio</p>
                <p className="text-2xl font-bold text-emerald-600">91.5%</p>
                <div className="flex items-center gap-1 text-sm text-emerald-600 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>+2.3% vs mes anterior</span>
                </div>
              </div>
              <Zap className="h-8 w-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Horas Trabajadas</p>
                <p className="text-2xl font-bold">3,140</p>
                <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                  <Clock className="h-3 w-3" />
                  <span>Este trimestre</span>
                </div>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Combustible Total</p>
                <p className="text-2xl font-bold">40,470 L</p>
                <div className="flex items-center gap-1 text-sm text-orange-600 mt-1">
                  <Fuel className="h-3 w-3" />
                  <span>12.9 L/hora promedio</span>
                </div>
              </div>
              <Fuel className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Costo Operativo</p>
                <p className="text-2xl font-bold">{formatCurrency(11334900)}</p>
                <div className="flex items-center gap-1 text-sm text-purple-600 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>{formatCurrency(3550)}/hora</span>
                </div>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analysis */}
      <Tabs defaultValue="machinery">
        <TabsList>
          <TabsTrigger value="machinery">Por Maquinaria</TabsTrigger>
          <TabsTrigger value="fuel-correlation">Correlación Combustible</TabsTrigger>
          <TabsTrigger value="cross-analysis">Análisis Cruzado</TabsTrigger>
          <TabsTrigger value="alerts">Alertas y Optimización</TabsTrigger>
        </TabsList>

        <TabsContent value="machinery" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Rendimiento por Equipo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {machineryEfficiency.map((machine) => (
                  <div key={machine.id} className="p-4 border rounded-lg hover:bg-muted/50">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-foreground">{machine.name}</h4>
                        <p className="text-sm text-muted-foreground">ID: {machine.id}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(machine.status)}>
                          {machine.status === 'optimal' ? (
                            <>
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Óptimo
                            </>
                          ) : (
                            <>
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Atención
                            </>
                          )}
                        </Badge>
                        {getTrendIcon(machine.trend)}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                      <div className="text-center p-3 bg-muted/30 rounded">
                        <div className="text-lg font-bold">{machine.hoursWorked}h</div>
                        <div className="text-xs text-muted-foreground">Horas Trabajadas</div>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded">
                        <div className="text-lg font-bold">{machine.fuelConsumed}L</div>
                        <div className="text-xs text-muted-foreground">Combustible</div>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded">
                        <div className="text-lg font-bold">{machine.efficiency}%</div>
                        <div className="text-xs text-muted-foreground">Eficiencia</div>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded">
                        <div className="text-lg font-bold">{(machine.fuelConsumed / machine.hoursWorked).toFixed(1)}</div>
                        <div className="text-xs text-muted-foreground">L/hora</div>
                      </div>
                    </div>

                    <div className="text-sm">
                      <p className="text-muted-foreground mb-1">Proyectos activos:</p>
                      <div className="flex flex-wrap gap-1">
                        {machine.projects.map((project, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {project}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fuel-correlation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Fuel className="h-5 w-5" />
                Análisis de Consumo vs Rendimiento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {fuelAnalysis.map((period, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{period.month}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Combustible Total:</span>
                        <span className="font-semibold">{period.totalFuel}L</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Horas Trabajadas:</span>
                        <span className="font-semibold">{period.totalHours}h</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Consumo Promedio:</span>
                        <span className="font-semibold">{period.avgConsumption} L/h</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Costo Total:</span>
                        <span className="font-semibold">{formatCurrency(period.cost)}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t">
                        <span className="text-muted-foreground">Eficiencia:</span>
                        <Badge className={period.efficiency >= 90 ? "bg-emerald-500" : "bg-orange-500"}>
                          {period.efficiency}%
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cross-analysis" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Reporte Cruzado Integral
              </CardTitle>
            </CardHeader>
            <CardContent>
              {crossReports.map((report, index) => (
                <div key={index} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Resumen Operativo</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Total Horas Máquina:</span>
                          <span className="font-medium">{report.totalMachineHours}h</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Proyectos Activos:</span>
                          <span className="font-medium">{report.projects}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Eficiencia Promedio:</span>
                          <span className="font-medium">{report.avgEfficiency}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Análisis Financiero</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Combustible Total:</span>
                          <span className="font-medium">{report.totalFuelLiters}L</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Costo por Hora:</span>
                          <span className="font-medium">{formatCurrency(report.costPerHour)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Inversión Total:</span>
                          <span className="font-medium">{formatCurrency(report.totalMachineHours * report.costPerHour)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Indicadores Clave</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Alertas Activas:</span>
                          <Badge variant={report.alerts > 5 ? "destructive" : "secondary"}>
                            {report.alerts}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Rendimiento vs Objetivo:</span>
                          <Badge className="bg-emerald-500">+2.1%</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Ahorro Potencial:</span>
                          <span className="font-medium text-emerald-600">{formatCurrency(245000)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Alertas y Oportunidades de Optimización
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border-l-4 border-l-orange-500 bg-orange-50 rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                    <h4 className="font-semibold text-orange-800">Consumo Elevado Detectado</h4>
                  </div>
                  <p className="text-sm text-orange-700">
                    La Excavadora Volvo EC380 muestra un consumo 15% superior al promedio. 
                    Se recomienda revisión de mantenimiento.
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Programar Mantenimiento
                  </Button>
                </div>

                <div className="p-4 border-l-4 border-l-emerald-500 bg-emerald-50 rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <h4 className="font-semibold text-emerald-800">Eficiencia Óptima</h4>
                  </div>
                  <p className="text-sm text-emerald-700">
                    El Camión Scania R500 mantiene un rendimiento excelente con 95.2% de eficiencia. 
                    Considerar como referencia para optimización de otros equipos.
                  </p>
                </div>

                <div className="p-4 border-l-4 border-l-blue-500 bg-blue-50 rounded">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-4 w-4 text-blue-600" />
                    <h4 className="font-semibold text-blue-800">Oportunidad de Ahorro</h4>
                  </div>
                  <p className="text-sm text-blue-700">
                    Implementando horarios de trabajo optimizados, se estima un ahorro mensual 
                    de {formatCurrency(245000)} en combustible.
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Ver Recomendaciones
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}