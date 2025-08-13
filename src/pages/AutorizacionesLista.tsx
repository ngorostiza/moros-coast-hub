import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AutorizacionesLista() {
  const autorizaciones = [
    { id: 1, nombre: "Ana López", dni: "28.456.789", fecha: "2025-08-12", estado: "Activa" },
    { id: 2, nombre: "Carlos Ruiz", dni: "31.789.123", fecha: "2025-08-10", estado: "Vencida" },
    { id: 3, nombre: "María Pérez", dni: "25.321.654", fecha: "2025-08-13", estado: "Pendiente" },
  ];

  const color = (estado: string) => estado === "Activa" ? "bg-emerald-50 text-emerald-700" : estado === "Pendiente" ? "bg-yellow-50 text-yellow-700" : "bg-red-50 text-red-700";

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Mis Autorizaciones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {autorizaciones.map(a => (
              <div key={a.id} className="grid grid-cols-2 md:grid-cols-5 gap-2 items-center p-3 rounded bg-muted/30">
                <div className="font-medium">{a.nombre}</div>
                <div className="text-sm text-muted-foreground">DNI {a.dni}</div>
                <div className="text-sm">{a.fecha}</div>
                <div className="text-sm"><Badge variant="outline" className={color(a.estado)}>{a.estado}</Badge></div>
                <div className="text-sm text-right md:text-left">#{a.id}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
