import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DateFilter } from "@/components/DateFilter";
import { 
  BarChart3, 
  Fuel, 
  Truck, 
  TrendingUp, 
  TrendingDown,
  Clock,
  Zap
} from "lucide-react";
import { useState } from "react";

// Mock data for efficiency analysis
const machineryEfficiency = [
  {
    name: "RETRO CAT",
    hoursWorked: 284,
    fuelConsumed: 3420,
    destinations: ["Cantera Norte", "Acceso Principal"],
    operators: ["Juan Pérez", "Carlos Martinez"]
  },
  {
    name: "PALA XCMG",
    hoursWorked: 196,
    fuelConsumed: 2380,
    destinations: ["Zona Residencial", "Sector Del Mar"],
    operators: ["Miguel Rodriguez"]
  },
  {
    name: "EXCAVADORA VOLVO",
    hoursWorked: 312,
    fuelConsumed: 4680,
    destinations: ["Cantera Sur", "Drenaje Principal"],
    operators: ["Ana García", "Pedro Gonzalez"]
  },
  {
    name: "PALA CAT",
    hoursWorked: 168,
    fuelConsumed: 2240,
    destinations: ["Movimiento Tierra Lote 45"],
    operators: ["Luis Fernandez"]
  },
  {
    name: "EXCAVADORA JOHN DEERE",
    hoursWorked: 245,
    fuelConsumed: 2940,
    destinations: ["Nivelación Acceso Norte", "Cantera Este"],
    operators: ["Roberto Silva", "Carmen López"]
  },
  {
    name: "MOTONIVELADORA",
    hoursWorked: 156,
    fuelConsumed: 1872,
    destinations: ["Acceso Principal", "Vías Internas"],
    operators: ["Daniel Morales"]
  },
  {
    name: "TRACTOR MASSEY",
    hoursWorked: 89,
    fuelConsumed: 1068,
    destinations: ["Zona Verde", "Mantenimiento General"],
    operators: ["José Martinez"]
  },
  {
    name: "BELARUS",
    hoursWorked: 124,
    fuelConsumed: 1488,
    destinations: ["Limpieza Terrenos", "Transporte Menor"],
    operators: ["Fernando Castro"]
  },
  {
    name: "CAMION VOLVO 1 -MWI",
    hoursWorked: 298,
    fuelConsumed: 4470,
    destinations: ["Transporte Arena", "Transporte Tosca", "Cantera Norte"],
    operators: ["Ricardo Vega", "Andrés Ruiz"]
  },
  {
    name: "CAMION VOLVO 2 -AF",
    hoursWorked: 276,
    fuelConsumed: 4140,
    destinations: ["Transporte Materiales", "Cantera Sur"],
    operators: ["Mario Diaz", "Pablo Herrera"]
  }
];

export default function AdminEficiencia() {
  const [selectedDateRange, setSelectedDateRange] = useState("last-month");

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
                <p className="text-muted-foreground text-sm">Horas Trabajadas</p>
                <p className="text-2xl font-bold">2,148</p>
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
                <p className="text-muted-foreground text-sm">Total Expendios Combustible (Terrestre)</p>
                <p className="text-2xl font-bold">28,698 L</p>
                <div className="flex items-center gap-1 text-sm text-orange-600 mt-1">
                  <Fuel className="h-3 w-3" />
                  <span>13.4 L/hora promedio</span>
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
                <p className="text-muted-foreground text-sm">Proyectos Activos</p>
                <p className="text-2xl font-bold">6</p>
                <div className="flex items-center gap-1 text-sm text-emerald-600 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>+2 vs mes anterior</span>
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
                <p className="text-muted-foreground text-sm">Eficiencia Combustible</p>
                <p className="text-2xl font-bold">12.9 L/h</p>
                <div className="flex items-center gap-1 text-sm text-emerald-600 mt-1">
                  <TrendingDown className="h-3 w-3" />
                  <span>-0.5 vs objetivo</span>
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
                {machineryEfficiency.map((machine, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-muted/50">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-foreground">{machine.name}</h4>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div className="text-center p-3 bg-muted/30 rounded">
                        <div className="text-lg font-bold">{machine.hoursWorked}h</div>
                        <div className="text-xs text-muted-foreground">Horas Trabajadas</div>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded">
                        <div className="text-lg font-bold">{machine.fuelConsumed}L</div>
                        <div className="text-xs text-muted-foreground">Combustible</div>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded">
                        <div className="text-lg font-bold">{(machine.fuelConsumed / machine.hoursWorked).toFixed(1)}</div>
                        <div className="text-xs text-muted-foreground">L/hora</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground mb-1">Destinos reportados:</p>
                        <div className="flex flex-wrap gap-1">
                          {machine.destinations.map((destination, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {destination}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Personal que ha utilizado la máquina:</p>
                        <div className="flex flex-wrap gap-1">
                          {machine.operators.map((operator, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {operator}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}