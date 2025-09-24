
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building, MapPin, Calendar, Users } from "lucide-react";

export default function LoteInfo() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Mi Lote - Información General</h1>
        <p className="text-muted-foreground">Detalles completos de su propiedad en Bahía de los Moros</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Información del Lote
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Número de Lote</p>
                <p className="text-lg font-semibold">#87</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Sector</p>
                <Badge variant="outline">Del Campo</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Superficie</p>
                <p className="text-lg">1,250 m²</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Coordenadas</p>
                <p className="text-sm">-38.1234, -57.5678</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Calle de Acceso</p>
                <p className="text-sm">Camino Principal Norte</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Estado</p>
                <Badge variant="default" className="bg-green-500">Escriturado</Badge>
              </div>
            </div>
            
            <div className="flex gap-4 pt-4 border-t">
              <Button variant="outline" className="flex-1">
                Ver Historial
              </Button>
              <Button variant="outline" className="flex-1">
                Ver Documentación
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
