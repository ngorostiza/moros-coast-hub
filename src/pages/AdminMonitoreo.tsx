import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function AdminMonitoreo() {
  const services = [
    { name: "Accesos", status: "Operativo", uptime: 99.98, latency: 120 },
    { name: "Cámaras", status: "Operativo", uptime: 99.2, latency: 180 },
    { name: "Alarmas", status: "Mantenimiento", uptime: 97.5, latency: 250 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader><CardTitle>Uptime General</CardTitle></CardHeader>
          <CardContent>
            <Progress value={98.7} className="h-3" />
            <div className="mt-2 text-sm text-muted-foreground">Últimas 24h</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Latencia Promedio</CardTitle></CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">154 ms</div>
            <div className="text-sm text-muted-foreground">Servicios internos</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Cámaras Online</CardTitle></CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">23/24</div>
            <div className="text-sm text-muted-foreground">1 en revisión</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Servicios</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {services.map((s) => (
              <div key={s.name} className="flex items-center justify-between p-3 rounded bg-muted/30">
                <div className="font-medium">{s.name}</div>
                <Badge variant="outline" className={s.status === "Operativo" ? "bg-emerald-50 text-emerald-700" : "bg-yellow-50 text-yellow-700"}>{s.status}</Badge>
                <div className="text-sm w-32">Uptime {s.uptime}%</div>
                <div className="text-sm w-24">{s.latency} ms</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
