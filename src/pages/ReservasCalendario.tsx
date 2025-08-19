import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { 
  Calendar as CalendarIcon,
  Clock,
  Users,
  MapPin,
  UtensilsCrossed,
  Waves,
  Dumbbell,
  Plus
} from "lucide-react";

const reservations = [
  {
    id: "RES-001",
    type: "restaurant",
    service: "El Club - Restaurante",
    date: new Date(2024, 1, 17),
    time: "20:00",
    guests: 4,
    status: "confirmed",
    icon: UtensilsCrossed,
    location: "Playa Mía",
    color: "bg-blue-500"
  },
  {
    id: "RES-002", 
    type: "surf",
    service: "Clase de Surf",
    date: new Date(2024, 1, 20),
    time: "10:00",
    guests: 1,
    status: "confirmed",
    icon: Waves,
    location: "Playa Principal",
    color: "bg-teal-500"
  },
  {
    id: "RES-003",
    type: "equipment",
    service: "Alquiler Tabla",
    date: new Date(2024, 1, 22),
    time: "09:00",
    guests: 1,
    status: "pending",
    icon: Waves,
    location: "Centro Deportes",
    color: "bg-orange-500"
  },
  {
    id: "RES-004",
    type: "amenity",
    service: "Cancha de Tenis",
    date: new Date(2024, 1, 25),
    time: "16:00",
    guests: 2,
    status: "confirmed",
    icon: Dumbbell,
    location: "Complejo Deportivo",
    color: "bg-green-500"
  }
];

export default function ReservasCalendario() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'restaurant': return UtensilsCrossed;
      case 'surf': return Waves;
      case 'equipment': return Waves;
      case 'amenity': return Dumbbell;
      default: return CalendarIcon;
    }
  };

  const getReservationsForDate = (date: Date) => {
    return reservations.filter(reservation => 
      reservation.date.toDateString() === date.toDateString()
    );
  };

  const hasReservationsOnDate = (date: Date) => {
    return reservations.some(reservation => 
      reservation.date.toDateString() === date.toDateString()
    );
  };

  const selectedDateReservations = selectedDate ? getReservationsForDate(selectedDate) : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Calendario de Reservas
            </CardTitle>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nueva Reserva
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="w-full"
                modifiers={{
                  hasReservation: (date) => hasReservationsOnDate(date),
                }}
                modifiersStyles={{
                  hasReservation: { 
                    backgroundColor: 'hsl(var(--ocean))', 
                    color: 'white',
                    fontWeight: 'bold'
                  },
                }}
              />
              
              {/* Legend */}
              <div className="mt-6 pt-4 border-t">
                <h4 className="font-medium mb-3">Leyenda</h4>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-ocean rounded-full"></div>
                    <span>Días con reservas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UtensilsCrossed className="w-4 h-4 text-blue-500" />
                    <span>Restaurante</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Waves className="w-4 h-4 text-teal-500" />
                    <span>Surf</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Dumbbell className="w-4 h-4 text-green-500" />
                    <span>Deportes</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Selected Date Details */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {selectedDate ? (
                  selectedDate.toLocaleDateString('es-AR', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })
                ) : (
                  'Selecciona una fecha'
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDateReservations.length === 0 ? (
                <div className="text-center py-8">
                  <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No hay reservas para esta fecha</p>
                  <Button variant="outline" className="mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Crear Reserva
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedDateReservations.map((reservation) => {
                    const ServiceIcon = getServiceIcon(reservation.type);
                    return (
                      <div key={reservation.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-start gap-3">
                          <div className={cn("p-2 rounded-lg", reservation.color.replace('bg-', 'bg-') + '/10')}>
                            <ServiceIcon className={cn("h-4 w-4", reservation.color.replace('bg-', 'text-'))} />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium truncate">{reservation.service}</h4>
                            <div className="space-y-1 mt-2">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                <span>{reservation.time}</span>
                              </div>
                              {reservation.guests > 1 && (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Users className="h-3 w-3" />
                                  <span>{reservation.guests} personas</span>
                                </div>
                              )}
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="h-3 w-3" />
                                <span>{reservation.location}</span>
                              </div>
                            </div>
                            
                            <div className="mt-2">
                              <Badge 
                                variant={reservation.status === 'confirmed' ? 'default' : 'secondary'}
                                className={reservation.status === 'confirmed' ? 'bg-emerald-600' : 'bg-orange-500'}
                              >
                                {reservation.status === 'confirmed' ? 'Confirmada' : 'Pendiente'}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Resumen del Mes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total de reservas</span>
                  <span className="font-semibold">{reservations.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Confirmadas</span>
                  <span className="font-semibold text-emerald-600">
                    {reservations.filter(r => r.status === 'confirmed').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Pendientes</span>
                  <span className="font-semibold text-orange-600">
                    {reservations.filter(r => r.status === 'pending').length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}