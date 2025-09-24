
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DollarSign, Calendar, AlertTriangle, CheckCircle } from "lucide-react";

export default function CanonEstado() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Estado de Cuenta</h1>
        <p className="text-muted-foreground">Resumen financiero de su lote</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Saldo Actual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">$89,500</div>
            <p className="text-sm text-muted-foreground">Canon septiembre pendiente</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Próximo Vencimiento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15 Oct 2025</div>
            <p className="text-sm text-muted-foreground">Canon mensual</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Estado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="default" className="bg-red-500">Pendiente</Badge>
            <p className="text-sm text-muted-foreground mt-2">Canon septiembre por pagar</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historial de Pagos Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { fecha: "15 Sep 2025", concepto: "Canon Lote 87 Mes Septiembre 2025", monto: 89500, estado: "Pendiente" },
              { fecha: "15 Ago 2025", concepto: "Plan de pagos ARBA 6/6", monto: 42300, estado: "Pagado" },
              { fecha: "15 Jul 2025", concepto: "Canon Lote 87 Mes Agosto 2025", monto: 85200, estado: "Pagado" },
            ].map((pago, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{pago.concepto}</p>
                  <p className="text-sm text-muted-foreground">{pago.fecha}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${pago.monto.toLocaleString()}</p>
                  <Badge variant="default" className={pago.estado === "Pagado" ? "bg-green-500" : "bg-red-500"}>{pago.estado}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
