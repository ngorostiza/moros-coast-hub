import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  UtensilsCrossed, 
  Clock, 
  Users, 
  Calendar,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const availableSlots = [
  { time: "19:00", available: true, maxGuests: 8 },
  { time: "19:30", available: false, maxGuests: 8 },
  { time: "20:00", available: true, maxGuests: 8 },
  { time: "20:30", available: true, maxGuests: 6 },
  { time: "21:00", available: false, maxGuests: 8 },
  { time: "21:30", available: true, maxGuests: 4 }
];

const upcomingReservations = [
  {
    id: 1,
    date: "2024-02-17", 
    time: "20:00",
    guests: 4,
    status: "confirmed",
    notes: "Mesa con vista al mar"
  },
  {
    id: 2,
    date: "2024-02-24",
    time: "19:30", 
    guests: 6,
    status: "pending",
    notes: "Celebración familiar"
  }
];

export default function RestaurantReservation() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UtensilsCrossed className="h-5 w-5" />
          Restaurant Playa Mía
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quick Reservation for Today */}
        <div>
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Disponibilidad Hoy
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {availableSlots.map((slot) => (
              <Button
                key={slot.time}
                variant={slot.available ? "outline" : "secondary"}
                disabled={!slot.available}
                size="sm"
                className={slot.available ? "hover:bg-ocean/10" : ""}
              >
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3" />
                  {slot.time}
                  <span className="text-xs">({slot.maxGuests})</span>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Upcoming Reservations */}
        <div>
          <h4 className="font-medium mb-3">Próximas Reservas</h4>
          <div className="space-y-3">
            {upcomingReservations.map((reservation) => (
              <div key={reservation.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <div className="font-medium text-sm">{reservation.date}</div>
                    <div className="text-xs text-muted-foreground">{reservation.time}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{reservation.guests} personas</span>
                    </div>
                    {reservation.notes && (
                      <div className="text-xs text-muted-foreground mt-1">{reservation.notes}</div>
                    )}
                  </div>
                </div>
                <Badge 
                  variant={reservation.status === "confirmed" ? "default" : "secondary"}
                  className={reservation.status === "confirmed" ? "bg-emerald-600" : "bg-orange-500"}
                >
                  {reservation.status === "confirmed" ? (
                    <>
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Confirmada
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Pendiente
                    </>
                  )}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button className="flex-1">
            Nueva Reserva
          </Button>
          <Button variant="outline">
            Ver Menu
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}