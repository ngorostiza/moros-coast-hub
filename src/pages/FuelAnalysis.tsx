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
  Settings,
  Plane,
  User
} from "lucide-react";
import { Link } from "react-router-dom";
import { DateFilter } from "@/components/DateFilter";

const tankLevels = [
  { name: "VIAL GAS OIL 1", current: 1331.45, capacity: 5000, percentage: 26.63, status: "Normal", puma: 60892.00 },
  { name: "VIAL ION 1", current: 2736.15, capacity: 5000, percentage: 54.72, status: "Normal", puma: 33067.54 },
  { name: "HANGAR JP1 1", current: 1751.00, capacity: 5000, percentage: 35.02, status: "Nivel Normal", puma: null },
  { name: "HANGAR 100LL 1", current: 4244.50, capacity: 5000, percentage: 84.89, status: "Normal", puma: null }
];

const fuelMovements = [
  { date: "6-Mar-2025", type: "CARGA", origin: "PUMA", person: "Oli", destination: "VIAL GAS OIL 1", fuel: "GAS OIL", quantity: 984.00 },
  { date: "6-Mar-2025", type: "CARGA", origin: "PUMA", person: "Oli", destination: "VIAL ION 1", fuel: "ION", quantity: 2199.00 },
  { date: "7-Mar-2025", type: "CARGA", origin: "PUMA", person: "Oli", destination: "HANGAR 100LL 1", fuel: "100LL", quantity: 1500.00 },
  { date: "8-Mar-2025", type: "CARGA", origin: "PUMA", person: "Oli", destination: "HANGAR JP1 1", fuel: "JP1", quantity: 800.00 },
  { date: "9-Mar-2025", type: "CARGA", origin: "PUMA", person: "Oli", destination: "VIAL GAS OIL 1", fuel: "GAS OIL", quantity: 1200.00 },
  { date: "10-Mar-2025", type: "CARGA", origin: "PUMA", person: "Oli", destination: "VIAL ION 1", fuel: "ION", quantity: 950.00 }
];

const expenditureMovements = [
  { date: "7-Mar-2025", type: "EXPENDIO_TERRESTRE", origin: "VIAL GAS OIL", person: "Alfredo", destination: "MOVIL GAS OIL", fuel: "GAS OIL", quantity: -500.00 },
  { date: "10-Mar-2025", type: "EXPENDIO_TERRESTRE", origin: "VIAL ION 1", person: "Alfredo", destination: "HILUX -AE 697", fuel: "ION", quantity: -50.00 },
  { date: "11-Mar-2025", type: "EXPENDIO_TERRESTRE", origin: "VIAL ION 1", person: "Juancho", destination: "HILUX JUANCHO AF 509", fuel: "ION", quantity: -67.81 },
  { date: "12-Mar-2025", type: "EXPENDIO_TERRESTRE", origin: "MOVIL GAS OIL", person: "Alfredo", destination: "QUEMA", fuel: "GAS OIL", quantity: -20.00 },
  { date: "13-Mar-2025", type: "EXPENDIO_TERRESTRE", origin: "VIAL ION 1", person: "Baio", destination: "RETRO CAT", fuel: "ION", quantity: -100.24 },
  { date: "14-Mar-2025", type: "EXPENDIO_AEREO", origin: "HANGAR 100LL 1", person: "Piloto Martinez", destination: "LV-IVW", fuel: "100LL", quantity: -120.50 },
  { date: "15-Mar-2025", type: "EXPENDIO_AEREO", origin: "HANGAR JP1 1", person: "Piloto Rodriguez", destination: "LV-HQG", fuel: "JP1", quantity: -200.00 }
];

const terrestrialVehicleData = [
  { id: "HILUX -AE 697", type: "ION", consumption: -1392.16, odometer: 106756.00, nextService: 112925.00, kmLeft: 6169 },
  { id: "HILUX JUANCHO AF 509", type: "ION", consumption: -1176.33, odometer: 77119.00, nextService: 80162.00, kmLeft: 3043 },
  { id: "BAIO -RFS 159", type: "GAS OIL", consumption: -336.56, odometer: null, nextService: null, kmLeft: null },
  { id: "JEEP VERDE -BKK 487", type: "GAS OIL", consumption: 0.00, odometer: 4256.00, nextService: 5000.00, kmLeft: 744 },
  { id: "JEEP BLANCO FER -BHF 052", type: "ION", consumption: -2889.84, odometer: null, nextService: null, kmLeft: null },
  { id: "HILUX FER -AE 553 IQ", type: "GAS OIL", consumption: -324.12, odometer: 31777.00, nextService: 38784.00, kmLeft: 7007 }
];

const aircraftData = [
  { id: "FER -LV-IVW", type: "100LL", consumption: -850.50 },
  { id: "FER -LV-HWB", type: "100LL", consumption: -755.00 },
  { id: "JIMMY -LV-HQG", type: "JP1", consumption: -1199.00 },
  { id: "JIMMY -HELI", type: "JP1", consumption: -645.75 },
  { id: "GM -LV-KMC", type: "100LL", consumption: -425.25 },
  { id: "SEBA P -LV-HAN", type: "100LL", consumption: -380.50 },
  { id: "SEBA B -LV-IYC", type: "100LL", consumption: -520.75 }
];

const authorizedPersonnel = [
  { name: "Fer", ion: 0.00, gasOil: 0.00, avgas: -815.50, jp1: 0.00 },
  { name: "Oli", ion: -64.11, gasOil: -269.65, avgas: -30.00, jp1: -294.00 },
  { name: "Juancho", ion: -1037.11, gasOil: -134.10, avgas: 0.00, jp1: 0.00 },
  { name: "Baio", ion: -492.00, gasOil: -1408.78, avgas: 0.00, jp1: 0.00 },
  { name: "Gaby", ion: -678.29, gasOil: -4.59, avgas: -690.00, jp1: -740.00 },
  { name: "Alfredo", ion: -2140.50, gasOil: -1846.44, avgas: 0.00, jp1: 0.00 },
  { name: "Cordobes", ion: -1619.03, gasOil: -10987.00, avgas: 0.00, jp1: 0.00 },
  { name: "David", ion: -4136.32, gasOil: -5408.48, avgas: 0.00, jp1: 0.00 },
  { name: "Otros", ion: -778.75, gasOil: -1022.92, avgas: -220.00, jp1: -565.00 },
  { name: "TOTAL EXPENDIOS", ion: -10946.11, gasOil: -21081.96, avgas: -1755.50, jp1: -1599.00 }
];

const fuelExpenditure = {
  ion: { total: -8732.58, vehicles: -16164.64, difference: 7432.06 },
  gasOil: { total: -16164.64, vehicles: -1605.50, difference: -14559.14 },
  terrestrial: -24897.22
};

const fuelTotals = {
  ion: 33067.54,
  gasOil: 60892.00,
  total: 93959.54
};

export default function FuelAnalysis() {
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
              <h1 className="text-3xl font-bold text-foreground">Análisis de Combustible</h1>
              <p className="text-muted-foreground">Sistema completo de monitoreo y gestión de combustible</p>
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

        {/* Fuel Operations Chart - Using Tank Levels Design */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Fuel className="h-5 w-5" />
              Niveles Actuales de Tanques
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">VIAL GAS OIL 1</span>
                  <span className={`text-lg font-bold text-green-700`}>1,331L</span>
                </div>
                <div className="relative">
                  <Progress value={26.63} className="h-3" />
                  <div className="absolute inset-0 h-3 rounded-full overflow-hidden">
                    <div 
                      className="h-full transition-all bg-green-500"
                      style={{ width: `26.63%` }}
                    />
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">26.63% - Nivel Normal</div>
                <div className="text-sm text-foreground font-bold">Stock PUMA: 60,892.00 L</div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">VIAL ION 1</span>
                  <span className={`text-lg font-bold text-green-700`}>2,736L</span>
                </div>
                <div className="relative">
                  <Progress value={54.72} className="h-3" />
                  <div className="absolute inset-0 h-3 rounded-full overflow-hidden">
                    <div 
                      className="h-full transition-all bg-green-500"
                      style={{ width: `54.72%` }}
                    />
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">54.72% - Nivel Normal</div>
                <div className="text-sm text-foreground font-bold">Stock PUMA: 33,067.54 L</div>
              </div>
               <div className="space-y-2">
                 <div className="flex justify-between items-center">
                   <span className="font-medium">HANGAR 100LL 1</span>
                   <span className={`text-lg font-bold text-green-700`}>4,245L</span>
                 </div>
                 <div className="relative">
                   <Progress value={84.89} className="h-3" />
                   <div className="absolute inset-0 h-3 rounded-full overflow-hidden">
                     <div 
                       className="h-full transition-all bg-green-500"
                       style={{ width: `84.89%` }}
                     />
                   </div>
                 </div>
                 <div className="text-xs text-muted-foreground">84.89% - Nivel Normal</div>
               </div>
               <div className="space-y-2">
                 <div className="flex justify-between items-center">
                   <span className="font-medium">HANGAR JP1 1</span>
                   <span className={`text-lg font-bold text-green-700`}>1,751L</span>
                 </div>
                 <div className="relative">
                   <Progress value={35.02} className="h-3" />
                   <div className="absolute inset-0 h-3 rounded-full overflow-hidden">
                     <div 
                       className="h-full transition-all bg-green-500"
                       style={{ width: `35.02%` }}
                     />
                   </div>
                 </div>
                 <div className="text-xs text-muted-foreground">35.02% - Nivel Normal</div>
               </div>
            </div>
          </CardContent>
        </Card>

        {/* Analysis Section */}
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
                      <span className="font-medium">TOTAL EXPENDIOS GAS OIL</span>
                      <span className="text-lg font-bold text-blue-700">-21,081.96 L</span>
                    </div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">TOTAL EXPENDIOS ION</span>
                      <span className="text-lg font-bold text-green-700">-10,946.11 L</span>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border-2 border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">TOTAL EXPENDIOS TERRESTRES</span>
                      <span className="text-lg font-bold text-gray-700">-32,028.07 L</span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="aereo">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="p-4 bg-red-50 rounded-lg border">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">TOTAL EXP JP1</span>
                        <span className="text-lg font-bold text-red-700">-1,599.00 L</span>
                      </div>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg border">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">TOTAL EXP 100LL</span>
                        <span className="text-lg font-bold text-orange-700">-1,755.50 L</span>
                      </div>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">TOTAL EXP AERONAVES</span>
                        <span className="text-lg font-bold text-blue-700">-3,354.50 L</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Tabs defaultValue="cargas" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="cargas">CARGAS</TabsTrigger>
            <TabsTrigger value="expendios">EXPENDIOS</TabsTrigger>
            <TabsTrigger value="vehiculos">VEHÍCULOS</TabsTrigger>
            <TabsTrigger value="aeronaves">AERONAVES</TabsTrigger>
            <TabsTrigger value="personas">PERSONAS</TabsTrigger>
          </TabsList>

          <TabsContent value="cargas" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Historial de Cargas de Combustible
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
                     </TableRow>
                   </TableHeader>
                   <TableBody>
                     {fuelMovements.map((movement, index) => (
                       <TableRow key={index}>
                         <TableCell>{movement.date}</TableCell>
                         <TableCell>
                           <Badge variant="outline" className="bg-green-50 text-green-700">
                             {movement.type.replace('_', ' ')}
                           </Badge>
                         </TableCell>
                         <TableCell>{movement.origin}</TableCell>
                         <TableCell>{movement.person}</TableCell>
                         <TableCell>{movement.destination}</TableCell>
                         <TableCell>
                           <Badge variant="secondary">{movement.fuel}</Badge>
                         </TableCell>
                         <TableCell className="text-right font-mono text-green-600">
                           +{movement.quantity.toFixed(2)}L
                         </TableCell>
                       </TableRow>
                     ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="expendios" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Fuel className="h-5 w-5" />
                  Historial de Expendios de Combustible
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
                     </TableRow>
                   </TableHeader>
                   <TableBody>
                     {expenditureMovements.map((movement, index) => (
                       <TableRow key={index}>
                         <TableCell>{movement.date}</TableCell>
                         <TableCell>
                           <Badge variant="outline" className="bg-red-50 text-red-700">
                             {movement.type.replace('_', ' ')}
                           </Badge>
                         </TableCell>
                         <TableCell>{movement.origin}</TableCell>
                         <TableCell>{movement.person}</TableCell>
                         <TableCell>{movement.destination}</TableCell>
                         <TableCell>
                           <Badge variant="secondary">{movement.fuel}</Badge>
                         </TableCell>
                         <TableCell className="text-right font-mono text-red-600">
                           {movement.quantity.toFixed(2)}L
                         </TableCell>
                       </TableRow>
                     ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vehiculos" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Vehículos y Maquinaria Terrestre
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID Vehículo/Máquina</TableHead>
                      <TableHead>Combustible</TableHead>
                      <TableHead className="text-right">Consumo Total (L)</TableHead>
                      <TableHead className="text-right">Kilometraje</TableHead>
                      <TableHead>Next Service</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {terrestrialVehicleData.map((vehicle, index) => (
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
                          {vehicle.kmLeft ? (
                            <div className="flex flex-col">
                              <span className={`text-sm font-medium ${
                                vehicle.kmLeft < 10000 ? 'text-red-600' : 
                                vehicle.kmLeft < 20000 ? 'text-yellow-600' : 'text-green-600'
                              }`}>
                                Faltan {vehicle.kmLeft.toLocaleString()} km
                              </span>
                              <span className="text-xs text-muted-foreground">
                                para service
                              </span>
                            </div>
                          ) : (
                            <span className="text-sm text-muted-foreground">N/A</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="aeronaves" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plane className="h-5 w-5" />
                  Aeronaves
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID Aeronave</TableHead>
                      <TableHead>Combustible</TableHead>
                      <TableHead className="text-right">Consumo Total (L)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {aircraftData.map((aircraft, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{aircraft.id}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{aircraft.type}</Badge>
                        </TableCell>
                        <TableCell className="text-right font-mono text-red-600">
                          {aircraft.consumption.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="personas" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Autorizado
                </CardTitle>
              </CardHeader>
              <CardContent>
                 <Table>
                   <TableHeader>
                     <TableRow>
                       <TableHead>Persona</TableHead>
                       <TableHead className="text-right">ION (L)</TableHead>
                       <TableHead className="text-right">GAS OIL (L)</TableHead>
                       <TableHead className="text-right">100LL (L)</TableHead>
                       <TableHead className="text-right">JP1 (L)</TableHead>
                       <TableHead className="text-right">Total (L)</TableHead>
                     </TableRow>
                   </TableHeader>
                   <TableBody>
                     {authorizedPersonnel.map((person, index) => (
                       <TableRow key={index} className={person.name === "TOTAL EXPENDIOS" ? "border-t-2 border-gray-300 bg-gray-50 font-bold" : ""}>
                         <TableCell className="font-medium">{person.name}</TableCell>
                         <TableCell className="text-right font-mono text-red-600">
                           {person.ion.toFixed(2)}
                         </TableCell>
                         <TableCell className="text-right font-mono text-red-600">
                           {person.gasOil.toFixed(2)}
                         </TableCell>
                         <TableCell className="text-right font-mono text-red-600">
                           {person.avgas.toFixed(2)}
                         </TableCell>
                         <TableCell className="text-right font-mono text-red-600">
                           {person.jp1.toFixed(2)}
                         </TableCell>
                         <TableCell className="text-right font-mono text-red-600 font-bold">
                           {(person.ion + person.gasOil + person.avgas + person.jp1).toFixed(2)}
                         </TableCell>
                       </TableRow>
                     ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

      </div>
    </div>
  );
}