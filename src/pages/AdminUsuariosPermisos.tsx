import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export default function AdminUsuariosPermisos() {
  const { toast } = useToast();
  const [role, setRole] = useState("admin");
  const modules = [
    { id: "dashboard", label: "Dashboard" },
    { id: "gis", label: "Mapa GIS" },
    { id: "reservas", label: "Reservas" },
    { id: "expensas", label: "Expensas" },
    { id: "seguridad", label: "Seguridad" },
  ];
  const [perms, setPerms] = useState<Record<string, boolean>>({ dashboard: true, gis: true, reservas: true, expensas: false, seguridad: true });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Permisos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="max-w-xs">
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger><SelectValue placeholder="Rol" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Administrador</SelectItem>
                <SelectItem value="seguridad">Seguridad</SelectItem>
                <SelectItem value="propietario">Propietario</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {modules.map(m => (
              <label key={m.id} className="flex items-center gap-2 p-3 rounded bg-muted/30">
                <Checkbox checked={!!perms[m.id]} onCheckedChange={(v) => setPerms({ ...perms, [m.id]: !!v })} />
                <span>{m.label}</span>
              </label>
            ))}
          </div>
          <Button onClick={() => toast({ title: "Permisos guardados", description: `Rol: ${role}` })}>Guardar</Button>
        </CardContent>
      </Card>
    </div>
  );
}
