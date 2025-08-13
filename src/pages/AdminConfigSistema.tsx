import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function AdminConfigSistema() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configuración del Sistema</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Nombre del Barrio (ej. Bahía de los Moros)" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm mb-1">Zona Horaria</div>
              <Select defaultValue="-3">
                <SelectTrigger><SelectValue placeholder="TZ" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="-3">GMT-3 (Argentina)</SelectItem>
                  <SelectItem value="-4">GMT-4</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <div className="text-sm mb-1">Idioma</div>
              <Select defaultValue="es">
                <SelectTrigger><SelectValue placeholder="Idioma" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="en">Inglés</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button>Guardar</Button>
        </CardContent>
      </Card>
    </div>
  );
}
