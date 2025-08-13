import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AdminUsuariosPersonal() {
  const personal = [
    { nombre: "Pedro Gómez", rol: "Seguridad", turno: "Noche", estado: "Activo" },
    { nombre: "Lucía Díaz", rol: "Mantenimiento", turno: "Mañana", estado: "Activo" },
    { nombre: "Carla Suárez", rol: "Limpieza", turno: "Tarde", estado: "Franco" },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {personal.map(p => (
              <div key={p.nombre} className="grid grid-cols-2 md:grid-cols-5 gap-2 items-center p-3 rounded bg-muted/30">
                <div className="font-medium">{p.nombre}</div>
                <div className="text-sm">{p.rol}</div>
                <div className="text-sm">{p.turno}</div>
                <div className="text-sm"><Badge variant="outline" className={p.estado === 'Activo' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-50 text-gray-700'}>{p.estado}</Badge></div>
                <div className="text-xs text-muted-foreground">ID #{Math.floor(Math.random()*900+100)}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
