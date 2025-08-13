import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function AdminConfigNotificaciones() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notificaciones</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <label className="flex items-center gap-2"><Switch /> Email</label>
          <label className="flex items-center gap-2"><Switch /> SMS</label>
          <div>
            <div className="text-sm mb-1">Plantilla: Alerta de Seguridad</div>
            <Textarea rows={4} placeholder="Asunto y cuerpo del mensaje..." />
          </div>
          <Button>Guardar</Button>
        </CardContent>
      </Card>
    </div>
  );
}
