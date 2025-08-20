import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Fuel, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  Calendar,
  MapPin,
  ArrowLeft,
  RefreshCw,
  Truck,
  Gauge,
  Settings
} from "lucide-react";
import { Link } from "react-router-dom";

const tankLevels = [
  { name: "GAS OIL", current: 3198.77, capacity: 5000, percentage: 63.98, status: "Normal", puma: 28292.00 },
  { name: "ION", current: 3676.66, capacity: 5000, percentage: 77.53, status: "Normal", puma: 15067.54 },
  { name: "JP1", current: 151, capacity: 5000, percentage: 3.02, status: "Requiere Reabastecimiento", puma: null },
  { name: "100LL", current: 4394.50, capacity: 5000, percentage: 87.89, status: "Normal", puma: null }
];

const fuelMovements = [
  { date: "6-Mar-2025", type: "CARGA", origin: "PUMA", person: "Oil", destination: "VIAL GAS OIL 1", fuel: "GAS OIL", quantity: 984.00, status: "CONFIRMADO" },
  { date: "6-Mar-2025", type: "CARGA", origin: "PUMA", person: "Oil", destination: "VIAL ION 1", fuel: "ION", quantity: 2199.00, status: "CONFIRMADO" },
  { date: "7-Mar-2025", type: "EXPENDIO_TERRESTRE", origin: "VIAL GAS OIL", person: "Alfredo", destination: "MOVIL GAS OIL", fuel: "GAS OIL", quantity: -500.00, status: "CONFIRMADO" },
  { date: "10-Mar-2025", type: "EXPENDIO_TERRESTRE", origin: "VIAL ION 1", person: "Alfredo", destination: "HILUX -AE 697", fuel: "ION", quantity: -50.00, status: "CONFIRMADO" },
  { date: "11-Mar-2025", type: "EXPENDIO_TERRESTRE", origin: "VIAL ION 1", person: "Juancho", destination: "HILUX JUANCHO AF 509", fuel: "ION", quantity: -67.81, status: "CONFIRMADO" },
  { date: "12-Mar-2025", type: "EXPENDIO_TERRESTRE", origin: "MOVIL GAS OIL", person: "Alfredo", destination: "QUEMA", fuel: "GAS OIL", quantity: -20.00, status: "CONFIRMADO" },
  { date: "13-Mar-2025", type: "EXPENDIO_TERRESTRE", origin: "VIAL ION 1", person: "Baio", destination: "RETRO CAT", fuel: "ION", quantity: -100.24, status: "INVERSION" }
];

const vehicleData = [
  { id: "HILUX-AE 697", type: "ION", consumption: -1392.16, odometer: 14405.00, nextService: 80162.00, kmLeft: 65757 },
  { id: "HILUX JUANCHO AF 509", type: "ION", consumption: -1176.33, odometer: 14663.00, nextService: 80162.00, kmLeft: 65499 },
  { id: "JEEP VERDE -BXK 487", type: "GAS OIL", consumption: -336.56, odometer: 14250.00, nextService: 85000.00, kmLeft: 70750 },
  { id: "JEEP BLANCO FER -BMF 092", type: "GAS OIL", consumption: 0.00, odometer: null, nextService: null, kmLeft: null },
  { id: "EXCAVADORA VOLVO", type: "ION", consumption: -2889.84, odometer: null, nextService: null, kmLeft: null },
  { id: "PALA CAT", type: "GAS OIL", consumption: -324.12, odometer: null, nextService: null, kmLeft: null }
];

const fuelExpenditure = {
  ion: { total: -8732.58, vehicles: -16164.64, difference: 7432.06 },
  gasOil: { total: -16164.64, vehicles: -1605.50, difference: -14559.14 },
  terrestrial: -24897.22
};

export default function FuelAnalysis() {
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
              <h1 className="text-3xl font-bold text-foreground">Análisis de Combustible</h1>
              <p className="text-muted-foreground">Sistema completo de monitoreo y gestión de combustible</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualizar
          </Button>
        </div>

        {/* Fuel Operations Chart - Using Tank Levels Design */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Fuel className="h-5 w-5 text-muted-foreground" />
              <h3 className="text-lg font-semibold">Niveles Actuales de Tanques</h3>
              <span className="text-sm text-muted-foreground">(Capacidad máxima: 5,000L)</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">GAS OIL</span>
                  <span className={`text-lg font-bold text-green-700`}>3,199L</span>
                </div>
                <div className="relative">
                  <Progress value={64} className="h-3" />
                  <div className="absolute inset-0 h-3 rounded-full overflow-hidden">
                    <div 
                      className="h-full transition-all bg-green-500"
                      style={{ width: `64%` }}
                    />
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">64% - Nivel Normal</div>
                <div className="text-sm text-foreground font-bold">Stock PUMA: 28,292.00 L</div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">ION</span>
                  <span className={`text-lg font-bold text-green-700`}>3,677L</span>
                </div>
                <div className="relative">
                  <Progress value={74} className="h-3" />
                  <div className="absolute inset-0 h-3 rounded-full overflow-hidden">
                    <div 
                      className="h-full transition-all bg-green-500"
                      style={{ width: `74%` }}
                    />
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">74% - Nivel Normal</div>
                <div className="text-sm text-foreground font-bold">Stock PUMA: 15,067.54 L</div>
              </div>
               <div className="space-y-2">
                 <div className="flex justify-between items-center">
                   <span className="font-medium">JP1</span>
                   <span className={`text-lg font-bold text-red-700`}>151L</span>
                 </div>
                 <div className="relative">
                   <Progress value={3} className="h-3" />
                   <div className="absolute inset-0 h-3 rounded-full overflow-hidden">
                     <div 
                       className="h-full transition-all bg-red-500"
                       style={{ width: `3%` }}
                     />
                   </div>
                 </div>
                 <div className="text-xs text-muted-foreground">3% - Requiere Reabastecimiento</div>
               </div>
               <div className="space-y-2">
                 <div className="flex justify-between items-center">
                   <span className="font-medium">100LL</span>
                   <span className={`text-lg font-bold text-green-700`}>4,395L</span>
                 </div>
                 <div className="relative">
                   <Progress value={88} className="h-3" />
                   <div className="absolute inset-0 h-3 rounded-full overflow-hidden">
                     <div 
                       className="h-full transition-all bg-green-500"
                       style={{ width: `88%` }}
                     />
                   </div>
                 </div>
                 <div className="text-xs text-muted-foreground">88% - Nivel Normal</div>
               </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="movements" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="movements">Movimientos</TabsTrigger>
            <TabsTrigger value="destinos">Destinos</TabsTrigger>
            <TabsTrigger value="analysis">Análisis</TabsTrigger>
            <TabsTrigger value="maintenance">Mantenimiento</TabsTrigger>
          </TabsList>

          <TabsContent value="movements" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Historial de Movimientos de Combustible
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Origen</TableHead>
                      <TableHead>Persona</TableHead>
                      <TableHead>Destino</TableHead>
                      <TableHead>Combustible</TableHead>
                      <TableHead className="text-right">Cantidad</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fuelMovements.map((movement, index) => (
                      <TableRow key={index}>
                        <TableCell>{movement.date}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={
                            movement.type === "CARGA" ? "bg-green-50 text-green-700" : "bg-blue-50 text-blue-700"
                          }>
                            {movement.type.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>{movement.origin}</TableCell>
                        <TableCell>{movement.person}</TableCell>
                        <TableCell>{movement.destination}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{movement.fuel}</Badge>
                        </TableCell>
                        <TableCell className={`text-right font-mono ${movement.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {movement.quantity > 0 ? '+' : ''}{movement.quantity.toFixed(2)}L
                        </TableCell>
                        <TableCell>
                          <Badge className={
                            movement.status === "CONFIRMADO" ? "bg-green-100 text-green-800" : 
                            movement.status === "INVERSION" ? "bg-yellow-100 text-yellow-800" : 
                            "bg-gray-100 text-gray-800"
                          }>
                            {movement.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="destinos" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Destinos: Vehículos, Maquinaria y Aeronaves
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID Vehículo/Máquina/Aeronave</TableHead>
                      <TableHead>Combustible</TableHead>
                      <TableHead className="text-right">Consumo Total (L)</TableHead>
                      <TableHead className="text-right">Horas de Vuelo</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vehicleData.map((vehicle, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{vehicle.id}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{vehicle.type}</Badge>
                        </TableCell>
                        <TableCell className="text-right font-mono text-red-600">
                          {vehicle.consumption.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
                          {vehicle.odometer ? `${vehicle.odometer.toLocaleString()} km` : 'N/A'}
                        </TableCell>
                        <TableCell>
                          {vehicle.kmLeft && vehicle.kmLeft < 10000 ? (
                            <Badge variant="destructive">Service Pronto</Badge>
                          ) : vehicle.kmLeft && vehicle.kmLeft < 20000 ? (
                            <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                              Monitorear
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-green-50 text-green-700">
                              Normal
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                    {/* Aircraft Entries */}
                    <TableRow>
                      <TableCell className="font-medium">AERONAVE CESSNA 172</TableCell>
                      <TableCell>
                        <Badge variant="secondary">100LL</Badge>
                      </TableCell>
                      <TableCell className="text-right font-mono text-red-600">
                        -850.50
                      </TableCell>
                      <TableCell className="text-right">
                        245.2 hrs
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          Operativa
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">AERONAVE PIPER CHEROKEE</TableCell>
                      <TableCell>
                        <Badge variant="secondary">100LL</Badge>
                      </TableCell>
                      <TableCell className="text-right font-mono text-red-600">
                        -755.00
                      </TableCell>
                      <TableCell className="text-right">
                        198.5 hrs
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                          Mantenimiento Próximo
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">HELICÓPTERO R44</TableCell>
                      <TableCell>
                        <Badge variant="secondary">JP1</Badge>
                      </TableCell>
                      <TableCell className="text-right font-mono text-red-600">
                        -1199.00
                      </TableCell>
                      <TableCell className="text-right">
                        89.3 hrs
                      </TableCell>
                      <TableCell>
                        <Badge variant="destructive">Service Urgente</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Fuel Type Analysis with Aircraft fuels included */}
              <Card>
                <CardHeader>
                  <CardTitle>Análisis por Tipo de Combustible</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="terrestre" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="terrestre">Terrestre</TabsTrigger>
                      <TabsTrigger value="aereo">Aéreo</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="terrestre" className="mt-4">
                      <div className="space-y-3">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">GAS OIL</span>
                            <span className="text-lg font-bold text-blue-700">{fuelExpenditure.gasOil.total.toFixed(2)}L</span>
                          </div>
                          <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: "64%" }}></div>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">64% - Nivel Normal</div>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">ION</span>
                            <span className="text-lg font-bold text-green-700">{fuelExpenditure.ion.total.toFixed(2)}L</span>
                          </div>
                          <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                            <div className="bg-green-600 h-2 rounded-full" style={{ width: "74%" }}></div>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">74% - Nivel Normal</div>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg border-2 border-gray-200">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">TOTAL TERRESTRE</span>
                            <span className="text-lg font-bold text-gray-700">{fuelExpenditure.terrestrial.toFixed(2)}L</span>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="aereo">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                          <div className="p-4 bg-red-50 rounded-lg border">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium">TOTAL EXP JP1</span>
                              <span className="text-lg font-bold text-red-700">-1,199.00 L</span>
                            </div>
                            <div className="text-sm text-muted-foreground">Consumo total aeronaves JP1</div>
                          </div>
                          <div className="p-4 bg-orange-50 rounded-lg border">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium">TOTAL EXP 100LL</span>
                              <span className="text-lg font-bold text-orange-700">-1,605.50 L</span>
                            </div>
                            <div className="text-sm text-muted-foreground">Consumo total aeronaves 100LL</div>
                          </div>
                          <div className="p-4 bg-blue-50 rounded-lg border">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium">TOTAL EXP AERONAVES</span>
                              <span className="text-lg font-bold text-blue-700">-2,804.50 L</span>
                            </div>
                            <div className="text-sm text-muted-foreground">Consumo total de todas las aeronaves</div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Alerts and Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Alertas y Recomendaciones
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                    <p className="font-medium text-red-800">JP1 - Nivel Crítico</p>
                    <p className="text-sm text-red-700">3% - Se requiere reabastecimiento inmediato</p>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                    <p className="font-medium text-yellow-800">Vehículos con Service Próximo</p>
                    <p className="text-sm text-yellow-700">2 vehículos requieren mantenimiento en &lt;10,000 km</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <p className="font-medium text-green-800">Stock PUMA Disponible</p>
                    <p className="text-sm text-green-700">Reservas suficientes para operación continua (GAS OIL e ION)</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                    <p className="font-medium text-blue-800">100LL - Nivel Óptimo</p>
                    <p className="text-sm text-blue-700">88% - Reservas suficientes para operaciones aéreas</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="maintenance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Programación de Mantenimiento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">JEEP VERDE -BXK 487</h4>
                      <Badge variant="outline" className="bg-red-50 text-red-700">Urgente</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Próximo service en 5,750 km</p>
                    <div className="flex items-center gap-2">
                      <Gauge className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Odómetro actual: 14,250 km</span>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">HILUX JUANCHO AF 509</h4>
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700">Próximo</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Próximo service en 65,499 km</p>
                    <div className="flex items-center gap-2">
                      <Gauge className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Odómetro actual: 14,663 km</span>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">HILUX-AE 697</h4>
                      <Badge variant="outline" className="bg-green-50 text-green-700">Normal</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Próximo service en 65,757 km</p>
                    <div className="flex items-center gap-2">
                      <Gauge className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Odómetro actual: 14,405 km</span>
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