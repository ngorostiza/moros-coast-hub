
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, MapPin } from "lucide-react";

export default function ReservasEspacios() {
  const espacios = [
    {
      nombre: "Tennis Vivero (x1)",
      disponibilidad: "Media",
      horarios: "06:00 - 22:00",
      capacidad: "4 personas",
      precio: "$3,000/hora"
    },
    {
      nombre: "Tennis Bosque (x4)",
      disponibilidad: "Muy Alta",
      horarios: "06:00 - 22:00",
      capacidad: "4 personas",
      precio: "$3,000/hora"
    },
    {
      nombre: "Paddle Campo (x2)",
      disponibilidad: "Alta",
      horarios: "07:00 - 23:00",
      capacidad: "4 personas",
      precio: "$2,500/hora"
    },
    {
      nombre: "Peludo (tipo SUM)",
      disponibilidad: "Media",
      horarios: "10:00 - 02:00",
      capacidad: "40 personas",
      precio: "$20,000/día"
    },
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
