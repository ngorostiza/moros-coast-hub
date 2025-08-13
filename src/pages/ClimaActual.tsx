import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ClimaActual() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Condiciones Actuales</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input placeholder="Ubicación (ej. Bahía de los Moros)" />
            <Button variant="outline">Actualizar</Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded bg-muted/30"><div className="text-sm text-muted-foreground">Temperatura</div><div className="text-2xl font-bold">24°C</div></div>
            <div className="p-4 rounded bg-muted/30"><div className="text-sm text-muted-foreground">Humedad</div><div className="text-2xl font-bold">68%</div></div>
            <div className="p-4 rounded bg-muted/30"><div className="text-sm text-muted-foreground">Viento</div><div className="text-2xl font-bold">12 km/h</div></div>
            <div className="p-4 rounded bg-muted/30"><div className="text-sm text-muted-foreground">Presión</div><div className="text-2xl font-bold">1013 hPa</div></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
