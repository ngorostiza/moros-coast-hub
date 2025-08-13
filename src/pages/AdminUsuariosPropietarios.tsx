import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function AdminUsuariosPropietarios() {
  const propietarios = [
    { lote: 20, nombre: "Juan Pérez", email: "juan@example.com", estado: "Al día" },
    { lote: 34, nombre: "Ana López", email: "ana@example.com", estado: "Pendiente" },
    { lote: 57, nombre: "María García", email: "maria@example.com", estado: "Al día" },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Propietarios</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Buscar por nombre, email o lote" />
          <div className="space-y-2">
            {propietarios.map(p => (
              <div key={p.lote} className="grid grid-cols-2 md:grid-cols-4 gap-2 items-center p-3 rounded bg-muted/30">
                <div className="font-medium">Lote {p.lote}</div>
                <div className="text-sm">{p.nombre}</div>
                <div className="text-sm text-muted-foreground">{p.email}</div>
                <div className="text-sm"><Badge variant="outline" className={p.estado === 'Al día' ? 'bg-emerald-50 text-emerald-700' : 'bg-orange-50 text-orange-700'}>{p.estado}</Badge></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
