
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, MapPin, Calendar, Users } from "lucide-react";

export default function LoteInfo() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Mi Lote - Información General</h1>
        <p className="text-muted-foreground">Detalles completos de su propiedad en Bahía de los Moros</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Información del Lote
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
              <p className="text-sm text-muted-foreground">Estado</p>
              <Badge variant="default" className="bg-green-500">Escriturado</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Ubicación
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Coordenadas</p>
              <p className="text-lg">-38.1234, -57.5678</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Vista</p>
              <p className="text-lg">Frente al mar</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Acceso</p>
              <p className="text-lg">Camino Principal Norte</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
