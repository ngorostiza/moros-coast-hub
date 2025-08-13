import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function AdminConfigSeguridad() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configuración de Seguridad</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <label className="flex items-center gap-2"><Switch /> Botón de Pánico habilitado</label>
          <label className="flex items-center gap-2"><Switch /> Doble factor para Administradores</label>
          <div>
            <div className="text-sm mb-1">Retención de grabaciones</div>
            <Select defaultValue="30">
              <SelectTrigger><SelectValue placeholder="Días" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 días</SelectItem>
                <SelectItem value="30">30 días</SelectItem>
                <SelectItem value="90">90 días</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button>Guardar</Button>
        </CardContent>
      </Card>
    </div>
  );
}
