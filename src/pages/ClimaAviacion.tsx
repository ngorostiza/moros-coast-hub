import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ClimaAviacion() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Información Aeronáutica</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input placeholder="ICAO (ej. SAZM)" className="max-w-xs" />
            <Button variant="outline">Obtener METAR/TAF</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm mb-1">METAR</div>
              <Textarea rows={6} placeholder="METAR decodificado" />
            </div>
            <div>
              <div className="text-sm mb-1">TAF</div>
              <Textarea rows={6} placeholder="TAF decodificado" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
