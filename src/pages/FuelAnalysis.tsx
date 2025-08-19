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
  { name: "JP1", current: 4100, capacity: 5000, percentage: 82, status: "Alto", puma: null },
  { name: "100LL", current: 1900, capacity: 5000, percentage: 38, status: "Requiere Reabastecimiento", puma: null }
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

        {/* Tank Levels Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Fuel className="h-5 w-5" />
              Niveles Actuales de Tanques
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tankLevels.map((tank, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{tank.name}</span>
                    <Badge variant="outline" className={
                      tank.percentage >= 70 ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                      tank.percentage >= 40 ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                      "bg-red-50 text-red-700 border-red-200"
                    }>
                      {tank.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Actual</span>
                      <span className="text-lg font-bold">{tank.current.toLocaleString()}L</span>
                    </div>
                    <Progress value={tank.percentage} className="h-3" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{tank.percentage.toFixed(1)}%</span>
                      <span>{tank.capacity.toLocaleString()}L máx</span>
                    </div>
                    {tank.puma && (
                      <div className="mt-2 p-2 bg-muted/50 rounded">
                        <div className="text-sm font-medium">Stock PUMA</div>
                        <div className="text-lg font-bold text-primary">{tank.puma.toLocaleString()}L</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Analysis Tabs */}
        <Tabs defaultValue="movements" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="movements">Movimientos</TabsTrigger>
            <TabsTrigger value="vehicles">Vehículos</TabsTrigger>
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

          <TabsContent value="vehicles" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Vehículos y Maquinaria
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID Vehículo/Máquina</TableHead>
                      <TableHead>Combustible</TableHead>
                      <TableHead className="text-right">Consumo Total (L)</TableHead>
                      <TableHead className="text-right">Odómetro</TableHead>
                      <TableHead className="text-right">Próximo Service</TableHead>
                      <TableHead className="text-right">Km Restantes</TableHead>
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
                        <TableCell className="text-right">
                          {vehicle.nextService ? `${vehicle.nextService.toLocaleString()} km` : 'N/A'}
                        </TableCell>
                        <TableCell className="text-right">
                          {vehicle.kmLeft ? (
                            <span className={vehicle.kmLeft < 10000 ? 'text-red-600 font-medium' : 'text-muted-foreground'}>
                              {vehicle.kmLeft.toLocaleString()} km
                            </span>
                          ) : 'N/A'}
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
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingDown className="h-5 w-5" />
                    Gastos por Tipo de Combustible
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <div>
                        <p className="font-medium">ION</p>
                        <p className="text-sm text-muted-foreground">Consumo total</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-red-600">{fuelExpenditure.ion.total.toFixed(2)}L</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <div>
                        <p className="font-medium">GAS OIL</p>
                        <p className="text-sm text-muted-foreground">Consumo total</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-red-600">{fuelExpenditure.gasOil.total.toFixed(2)}L</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border-2 border-gray-200">
                      <div>
                        <p className="font-medium">TOTAL TERRESTRE</p>
                        <p className="text-sm text-muted-foreground">Consumo combinado</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-gray-700">{fuelExpenditure.terrestrial.toFixed(2)}L</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Alertas y Recomendaciones
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                    <p className="font-medium text-red-800">100LL - Nivel Crítico</p>
                    <p className="text-sm text-red-700">38% - Se requiere reabastecimiento inmediato</p>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                    <p className="font-medium text-yellow-800">Vehículos con Service Próximo</p>
                    <p className="text-sm text-yellow-700">2 vehículos requieren mantenimiento en &lt;10,000 km</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <p className="font-medium text-green-800">Stock PUMA Disponible</p>
                    <p className="text-sm text-green-700">Reservas suficientes para operación continua</p>
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