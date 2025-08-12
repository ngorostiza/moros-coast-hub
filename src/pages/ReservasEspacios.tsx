
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, MapPin } from "lucide-react";

export default function ReservasEspacios() {
  const espacios = [
    {
      nombre: "Cancha de Tenis",
      disponibilidad: "Alta",
      horarios: "06:00 - 22:00",
      capacidad: "4 personas",
      precio: "$2,500/hora"
    },
    {
      nombre: "Quincho Norte",
      disponibilidad: "Media",
      horarios: "10:00 - 24:00",
      capacidad: "20 personas",
      precio: "$8,000/día"
    },
    {
      nombre: "Pileta Comunitaria",
      disponibilidad: "Baja",
      horarios: "09:00 - 20:00",
      capacidad: "Sin límite",
      precio: "Incluido"
    },
    {
      nombre: "Sala de Eventos",
      disponibilidad: "Alta",
      horarios: "08:00 - 02:00",
      capacidad: "50 personas",
      precio: "$15,000/día"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Espacios Comunes</h1>
        <p className="text-muted-foreground">Reserve los espacios comunes de la comunidad</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {espacios.map((espacio, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{espacio.nombre}</span>
                <Badge variant={
                  espacio.disponibilidad === "Alta" ? "default" :
                  espacio.disponibilidad === "Media" ? "secondary" : "destructive"
                }>
                  {espacio.disponibilidad}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{espacio.horarios}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{espacio.capacidad}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">{espacio.precio}</span>
                <Button size="sm">Reservar</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
