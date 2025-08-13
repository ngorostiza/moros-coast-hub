import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function AutorizacionesHistorial() {
  const registros = [
    { id: 101, persona: "Invitado", lote: 34, fecha: "2025-08-01", estado: "Ingresó" },
    { id: 102, persona: "Proveedor", lote: 12, fecha: "2025-08-02", estado: "Rechazado" },
    { id: 103, persona: "Obra", lote: 76, fecha: "2025-08-05", estado: "Ingresó" },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Historial de Autorizaciones</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <Input placeholder="Buscar por nombre/DNI" />
            <Input type="date" />
            <Input type="date" />
          </div>
          <div className="space-y-2">
            {registros.map(r => (
              <div key={r.id} className="grid grid-cols-2 md:grid-cols-5 gap-2 items-center p-3 rounded bg-muted/30">
                <div className="font-medium">{r.persona}</div>
                <div className="text-sm">Lote {r.lote}</div>
                <div className="text-sm">{r.fecha}</div>
                <div className="text-sm"><Badge variant="outline">{r.estado}</Badge></div>
                <div className="text-xs text-muted-foreground">#{r.id}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
