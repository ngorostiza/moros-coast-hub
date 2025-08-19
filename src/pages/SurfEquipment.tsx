import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Waves, 
  Calendar as CalendarIcon, 
  Clock, 
  Package,
  CheckCircle,
  AlertTriangle,
  User,
  Shield,
  Shirt
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useState } from "react";

const equipment = {
  tablas: [
    { id: "soft-9", name: "Softboard 9'0\"", type: "Principiante", available: 8, total: 12, condition: "Excelente" },
    { id: "soft-8", name: "Softboard 8'6\"", type: "Principiante", available: 6, total: 10, condition: "Muy Buena" },
    { id: "perf-7", name: "Performance 7'2\"", type: "Intermedio", available: 4, total: 8, condition: "Buena" },
    { id: "perf-6", name: "Performance 6'8\"", type: "Avanzado", available: 2, total: 6, condition: "Excelente" },
    { id: "long-9", name: "Longboard 9'6\"", type: "Longboard", available: 3, total: 4, condition: "Muy Buena" }
  ],
  trajes: [
    { id: "wet-3-s", name: "Neopreno 3/2mm", size: "S", available: 6, total: 8, condition: "Excelente" },
    { id: "wet-3-m", name: "Neopreno 3/2mm", size: "M", available: 4, total: 10, condition: "Muy Buena" },
    { id: "wet-3-l", name: "Neopreno 3/2mm", size: "L", available: 5, total: 8, condition: "Buena" },
    { id: "wet-3-xl", name: "Neopreno 3/2mm", size: "XL", available: 3, total: 6, condition: "Excelente" },
    { id: "wet-4-s", name: "Neopreno 4/3mm", size: "S", available: 4, total: 6, condition: "Muy Buena" },
    { id: "wet-4-m", name: "Neopreno 4/3mm", size: "M", available: 2, total: 8, condition: "Buena" },
    { id: "wet-4-l", name: "Neopreno 4/3mm", size: "L", available: 3, total: 6, condition: "Excelente" },
    { id: "wet-4-xl", name: "Neopreno 4/3mm", size: "XL", available: 1, total: 4, condition: "Muy Buena" }
  ],
  accesorios: [
    { id: "leash-6", name: "Pita de Surf 6'", type: "Regular", available: 15, total: 20, condition: "Excelente" },
    { id: "leash-8", name: "Pita de Surf 8'", type: "Longboard", available: 8, total: 12, condition: "Muy Buena" },
    { id: "wax-cold", name: "Cera Agua Fría", type: "Consumible", available: 25, total: 30, condition: "Nuevo" },
    { id: "wax-warm", name: "Cera Agua Templada", type: "Consumible", available: 18, total: 25, condition: "Nuevo" }
  ]
};

const activeRentals = [
  {
    id: "RENT-001",
    user: "Carlos Mendez - Lote 45",
    items: ["Performance 7'2\"", "Neopreno 3/2mm (M)", "Pita 6'"],
    startDate: "2024-02-20",
    endDate: "2024-02-20",
    status: "active",
    returnCondition: null
  },
  {
    id: "RENT-002", 
    user: "Sofia Rodriguez - Lote 78",
    items: ["Longboard 9'6\"", "Neopreno 4/3mm (S)"],
    startDate: "2024-02-19",
    endDate: "2024-02-21",
    status: "overdue",
    returnCondition: null
  }
];

export default function SurfEquipment() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [userName, setUserName] = useState("");
  const [userLot, setUserLot] = useState("");
  const [notes, setNotes] = useState("");

  const getConditionBadge = (condition: string) => {
    const variants = {
      "Excelente": "bg-emerald-100 text-emerald-800 border-emerald-200",
      "Muy Buena": "bg-blue-100 text-blue-800 border-blue-200", 
      "Buena": "bg-yellow-100 text-yellow-800 border-yellow-200",
      "Nuevo": "bg-purple-100 text-purple-800 border-purple-200"
    };
    return variants[condition as keyof typeof variants] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getAvailabilityColor = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    if (percentage > 50) return "text-emerald-600";
    if (percentage > 20) return "text-yellow-600";
    return "text-red-600";
  };

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSubmitRental = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle rental submission logic
    console.log("New rental:", { selectedItems, userName, userLot, selectedDate, notes });
  };

  const EquipmentCard = ({ item, category }: { item: any, category: string }) => (
    <Card 
      key={item.id} 
      className={`cursor-pointer transition-all ${
        selectedItems.includes(item.id) ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-md'
      } ${item.available === 0 ? 'opacity-50' : ''}`}
      onClick={() => item.available > 0 && toggleItemSelection(item.id)}
    >
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-medium">{item.name}</h4>
              {item.type && <p className="text-sm text-muted-foreground">{item.type}</p>}
              {item.size && <p className="text-sm text-muted-foreground">Talla: {item.size}</p>}
            </div>
            {selectedItems.includes(item.id) && (
              <CheckCircle className="h-5 w-5 text-blue-600" />
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <Badge className={getConditionBadge(item.condition)}>
              {item.condition}
            </Badge>
            <div className={`text-sm font-medium ${getAvailabilityColor(item.available, item.total)}`}>
              {item.available}/{item.total} disponibles
            </div>
          </div>
          
          {item.available === 0 && (
            <div className="flex items-center gap-1 text-red-600 text-sm">
              <AlertTriangle className="h-4 w-4" />
              <span>No disponible</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Package className="h-8 w-8" />
          Equipamiento de Surf
        </h1>
        <p className="text-muted-foreground">Gestión de equipos y alquileres - Escuela de Surf BdlM</p>
      </div>

      <Tabs defaultValue="rent" className="space-y-6">
        <TabsList>
          <TabsTrigger value="rent">Nuevo Alquiler</TabsTrigger>
          <TabsTrigger value="active">Alquileres Activos</TabsTrigger>
          <TabsTrigger value="history">Historial</TabsTrigger>
        </TabsList>

        <TabsContent value="rent" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Equipment Selection */}
            <div className="lg:col-span-2 space-y-6">
              {/* Surfboards */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Waves className="h-5 w-5" />
                    Tablas de Surf
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {equipment.tablas.map(item => (
                      <EquipmentCard key={item.id} item={item} category="tabla" />
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Wetsuits */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shirt className="h-5 w-5" />
                    Trajes de Neopreno
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {equipment.trajes.map(item => (
                      <EquipmentCard key={item.id} item={item} category="traje" />
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Accessories */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Accesorios
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {equipment.accesorios.map(item => (
                      <EquipmentCard key={item.id} item={item} category="accesorio" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Rental Form */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Datos del Alquiler
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitRental} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="userName">Nombre completo</Label>
                      <Input
                        id="userName"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Juan Pérez"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="userLot">Lote</Label>
                      <Input
                        id="userLot"
                        value={userLot}
                        onChange={(e) => setUserLot(e.target.value)}
                        placeholder="45"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Fecha de retiro</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedDate ? format(selectedDate, "PPP", { locale: es }) : "Seleccionar fecha"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Notas adicionales</Label>
                      <Textarea
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Observaciones sobre el equipamiento..."
                        rows={3}
                      />
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-2">Equipos seleccionados:</h4>
                      {selectedItems.length === 0 ? (
                        <p className="text-sm text-muted-foreground">Ningún equipo seleccionado</p>
                      ) : (
                        <div className="space-y-1">
                          {selectedItems.map(itemId => {
                            const allItems = [...equipment.tablas, ...equipment.trajes, ...equipment.accesorios];
                            const item = allItems.find(i => i.id === itemId);
                            return (
                              <div key={itemId} className="text-sm p-2 bg-blue-50 rounded">
                                {item?.name} {'size' in item && item.size ? `(${item.size})` : ''}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={selectedItems.length === 0 || !userName || !userLot || !selectedDate}
                    >
                      Registrar Alquiler
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-6">
          <div className="space-y-4">
            {activeRentals.map((rental) => (
              <Card key={rental.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{rental.user}</h3>
                        <Badge variant={rental.status === 'overdue' ? 'destructive' : 'secondary'}>
                          {rental.status === 'overdue' ? 'Vencido' : 'Activo'}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>Desde: {format(new Date(rental.startDate), "dd/MM/yyyy")}</p>
                        <p>Hasta: {format(new Date(rental.endDate), "dd/MM/yyyy")}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Equipos:</p>
                        {rental.items.map((item, idx) => (
                          <Badge key={idx} variant="outline" className="mr-1">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Contactar
                      </Button>
                      <Button size="sm">
                        Procesar Devolución
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Alquileres</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Funcionalidad en desarrollo...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}