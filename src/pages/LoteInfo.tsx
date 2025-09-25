import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building, MapPin, Calendar, Users, History, FileText } from "lucide-react";

export default function LoteInfo() {
  const lotesDelPropietario = [
    { 
      id: 1, 
      numero: "087", 
      sector: "Del Campo", 
      superficie: "1,250 m²", 
      estado: "Escriturado",
      calle: "Camino Principal Norte",
      coordenadas: "-38.1234, -57.5678"
    },
    { 
      id: 2, 
      numero: "124", 
      sector: "Costa Norte", 
      superficie: "980 m²", 
      estado: "En Construcción",
      calle: "Av. Costanera",
      coordenadas: "-38.1156, -57.5432"
    },
    { 
      id: 3, 
      numero: "156", 
      sector: "Reserva", 
      superficie: "2,100 m²", 
      estado: "Proyecto Aprobado",
      calle: "Sendero del Bosque",
      coordenadas: "-38.1289, -57.5789"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Mi Lote - Información General</h1>
        <p className="text-muted-foreground">Detalles completos de sus propiedades en Bahía de los Moros</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lotesDelPropietario.map((lote) => (
          <Card key={lote.id} className="hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Lote {lote.numero}
              </CardTitle>
              <Badge variant="outline">{lote.sector}</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Superficie</p>
                  <p className="text-lg font-semibold">{lote.superficie}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Coordenadas</p>
                  <p className="text-sm">{lote.coordenadas}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Calle de Acceso</p>
                  <p className="text-sm">{lote.calle}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Estado</p>
                  <Badge variant={
                    lote.estado === "Escriturado" ? "default" : 
                    lote.estado === "En Construcción" ? "secondary" : 
                    "outline"
                  }>
                    {lote.estado}
                  </Badge>
                </div>
              </div>
              
              <div className="flex flex-col gap-2 pt-4 border-t">
                <Button variant="outline" className="w-full">
                  <History className="h-4 w-4 mr-2" />
                  Ver Historial
                </Button>
                <Button variant="outline" className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Ver Documentación
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}