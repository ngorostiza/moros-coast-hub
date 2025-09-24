import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar,
  Clock,
  Users,
  MapPin,
  CheckCircle,
  XCircle,
  AlertCircle,
  Edit,
  Trash2,
  UtensilsCrossed,
  Waves,
  Dumbbell
} from "lucide-react";

const reservations = [
  {
    id: "RES-004",
    type: "amenity",
    service: "Cancha de Tenis",
    date: "2024-02-25",
    time: "16:00", 
    duration: "1 hora",
    guests: 2,
    status: "confirmed",
    notes: "Partido amistoso",
    icon: Dumbbell,
    location: "Complejo Deportivo",
    details: {
      court: "Cancha 1 - Polvo de Ladrillo",
      equipment: "Raquetas disponibles en recepción"
    }
  },
  {
    id: "RES-005",
    type: "amenity",
    service: "Cancha de Paddle",
    date: "2024-02-28",
    time: "18:00", 
    duration: "1 hora",
    guests: 4,
    status: "cancelled",
    notes: "Partido dobles",
    icon: Dumbbell,
    location: "Complejo Deportivo",
    details: {
      court: "Cancha 2 - Césped sintético",
      equipment: "Paletas disponibles"
    }
  }
];

export default function ReservasMisReservas() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200"><CheckCircle className="h-3 w-3 mr-1" />Confirmada</Badge>;
      case 'pending':
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200"><AlertCircle className="h-3 w-3 mr-1" />Pendiente</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800 border-red-200"><XCircle className="h-3 w-3 mr-1" />Cancelada</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'restaurant': return UtensilsCrossed;
      case 'surf': return Waves;
      case 'equipment': return Waves;
      case 'amenity': return Dumbbell;
      default: return Calendar;
    }
  };

  const upcomingReservations = reservations.filter(r => new Date(r.date) >= new Date());
  const pastReservations = reservations.filter(r => new Date(r.date) < new Date());

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Reservas</p>
                <p className="text-2xl font-bold text-foreground">{reservations.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Próximas</p>
                <p className="text-2xl font-bold text-emerald-600">{upcomingReservations.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Confirmadas</p>
                <p className="text-2xl font-bold text-foreground">{reservations.filter(r => r.status === 'confirmed').length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Canceladas</p>
                <p className="text-2xl font-bold text-red-600">{reservations.filter(r => r.status === 'cancelled').length}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reservations */}
      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">Próximas ({upcomingReservations.length})</TabsTrigger>
          <TabsTrigger value="past">Historial ({pastReservations.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingReservations.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">No tienes reservas próximas</h3>
                <p className="text-muted-foreground mb-4">¡Reserva algún servicio o espacio común!</p>
                <Button>Nueva Reserva</Button>
              </CardContent>
            </Card>
          ) : (
            upcomingReservations.map((reservation) => {
              const ServiceIcon = getServiceIcon(reservation.type);
              return (
                <Card key={reservation.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-ocean/10 rounded-lg">
                          <ServiceIcon className="h-6 w-6 text-ocean" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">{reservation.service}</h3>
                            {getStatusBadge(reservation.status)}
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span>{new Date(reservation.date).toLocaleDateString('es-AR', { 
                                  weekday: 'long', 
                                  year: 'numeric', 
                                  month: 'long', 
                                  day: 'numeric' 
                                })}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span>{reservation.time} - {reservation.duration}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span>{reservation.location}</span>
                              </div>
                              {reservation.guests > 1 && (
                                <div className="flex items-center gap-2 text-sm">
                                  <Users className="h-4 w-4 text-muted-foreground" />
                                  <span>{reservation.guests} personas</span>
                                </div>
                              )}
                            </div>
                            
                            <div className="space-y-2">
                              {Object.entries(reservation.details).map(([key, value]) => (
                                <div key={key} className="text-sm">
                                  <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}: </span>
                                  <span className="font-medium">{value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {reservation.notes && (
                            <div className="bg-muted/30 p-3 rounded-lg mb-4">
                              <p className="text-sm">{reservation.notes}</p>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Editar
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4 mr-1" />
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastReservations.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Sin historial de reservas</h3>
                <p className="text-muted-foreground">Aquí aparecerán tus reservas anteriores</p>
              </CardContent>
            </Card>
          ) : (
            pastReservations.map((reservation) => {
              const ServiceIcon = getServiceIcon(reservation.type);
              return (
                <Card key={reservation.id} className="opacity-75">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-muted rounded-lg">
                        <ServiceIcon className="h-6 w-6 text-muted-foreground" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{reservation.service}</h3>
                          {getStatusBadge(reservation.status)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(reservation.date).toLocaleDateString('es-AR')} a las {reservation.time}
                        </div>
                      </div>
                      
                      <Button variant="ghost" size="sm">
                        Reservar de nuevo
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}