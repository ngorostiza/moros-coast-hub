import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  UtensilsCrossed, 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  MapPin,
  ChefHat,
  Utensils,
  Wine
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useState } from "react";

const timeSlots = [
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00",
  "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30"
];

const tableTypes = [
  { id: "terraza", name: "Terraza Vista al Mar", capacity: "2-6 personas", price: "+$2,000" },
  { id: "interior", name: "Interior Climatizado", capacity: "2-8 personas", price: "Sin cargo" },
  { id: "quincho", name: "Quincho Parrilla", capacity: "6-12 personas", price: "+$5,000" },
  { id: "privado", name: "Salón Privado", capacity: "8-20 personas", price: "+$10,000" }
];

const dietaryRestrictions = [
  "Sin restricciones",
  "Vegetariano",
  "Vegano", 
  "Sin gluten",
  "Sin lactosa",
  "Kosher",
  "Halal"
];

export default function RestaurantReservation() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [guests, setGuests] = useState("2");
  const [tableType, setTableType] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dietaryNotes, setDietaryNotes] = useState<string[]>([]);
  const [specialRequests, setSpecialRequests] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDietaryChange = (dietary: string, checked: boolean) => {
    if (checked) {
      setDietaryNotes([...dietaryNotes, dietary]);
    } else {
      setDietaryNotes(dietaryNotes.filter(d => d !== dietary));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Success logic here
    setIsSubmitting(false);
  };

  const getAvailableSlots = () => {
    if (!selectedDate) return timeSlots;
    
    // Simulate availability logic - some slots are taken
    const takenSlots = ["13:00", "20:00", "21:00"];
    return timeSlots.filter(slot => !takenSlots.includes(slot));
  };

  const maxCapacityForTable = (type: string) => {
    const table = tableTypes.find(t => t.id === type);
    if (!table) return 12;
    
    if (type === "terraza") return 6;
    if (type === "interior") return 8;
    if (type === "quincho") return 12;
    if (type === "privado") return 20;
    return 8;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <UtensilsCrossed className="h-8 w-8" />
          Reserva en El Club
        </h1>
        <p className="text-muted-foreground">Restaurant con vista al mar - Bahía de los Moros</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Date & Time Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Fecha y Horario
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Fecha de la reserva</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP", { locale: es }) : "Seleccionar fecha"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date() || date.getDay() === 1} // No Mondays
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>Horario</Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar horario" />
                    </SelectTrigger>
                    <SelectContent>
                      {getAvailableSlots().map((time) => (
                        <SelectItem key={time} value={time}>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {time}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Cantidad de personas</Label>
                <Select value={guests} onValueChange={setGuests}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({length: maxCapacityForTable(tableType) || 20}, (_, i) => i + 1).map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          {num} {num === 1 ? 'persona' : 'personas'}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Table Type Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Tipo de Mesa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={tableType} onValueChange={setTableType} className="space-y-4">
                {tableTypes.map((table) => (
                  <div key={table.id} className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50">
                    <RadioGroupItem value={table.id} id={table.id} />
                    <label htmlFor={table.id} className="flex-1 cursor-pointer">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{table.name}</p>
                          <p className="text-sm text-muted-foreground">{table.capacity}</p>
                        </div>
                        <Badge variant={table.price === "Sin cargo" ? "secondary" : "outline"}>
                          {table.price}
                        </Badge>
                      </div>
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Información de Contacto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Juan Pérez"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+54 9 11 1234-5678"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="juan@ejemplo.com"
                  required
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Additional Options */}
        <div className="space-y-6">
          {/* Dietary Restrictions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChefHat className="h-5 w-5" />
                Restricciones Alimentarias
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {dietaryRestrictions.map((dietary) => (
                <div key={dietary} className="flex items-center space-x-2">
                  <Checkbox
                    id={dietary}
                    checked={dietaryNotes.includes(dietary)}
                    onCheckedChange={(checked) => handleDietaryChange(dietary, checked === true)}
                  />
                  <label htmlFor={dietary} className="text-sm cursor-pointer">
                    {dietary}
                  </label>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Special Requests */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wine className="h-5 w-5" />
                Solicitudes Especiales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="Ej: Celebración de cumpleaños, mesa junto a la ventana, etc."
                rows={4}
              />
            </CardContent>
          </Card>

          {/* Reservation Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Resumen de Reserva</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Fecha:</span>
                  <span className="font-medium">
                    {selectedDate ? format(selectedDate, "dd/MM/yyyy") : "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Horario:</span>
                  <span className="font-medium">{selectedTime || "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Personas:</span>
                  <span className="font-medium">{guests}</span>
                </div>
                <div className="flex justify-between">
                  <span>Mesa:</span>
                  <span className="font-medium">
                    {tableType ? tableTypes.find(t => t.id === tableType)?.name : "-"}
                  </span>
                </div>
                {tableType && tableTypes.find(t => t.id === tableType)?.price !== "Sin cargo" && (
                  <div className="flex justify-between font-medium text-orange-600">
                    <span>Cargo adicional:</span>
                    <span>{tableTypes.find(t => t.id === tableType)?.price}</span>
                  </div>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full mt-4" 
                disabled={!selectedDate || !selectedTime || !tableType || !name || !phone || isSubmitting}
              >
                {isSubmitting ? "Procesando..." : "Confirmar Reserva"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}