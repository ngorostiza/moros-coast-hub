import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function AutorizacionesLista() {
  const { toast } = useToast();
  
  const autorizaciones = [
    { id: 1, nombre: "Ana López", dni: "28.456.789", fecha: "2025-08-12", estado: "Activa" },
    { id: 2, nombre: "Carlos Ruiz", dni: "31.789.123", fecha: "2025-08-10", estado: "Vencida" },
    { id: 3, nombre: "María Pérez", dni: "25.321.654", fecha: "2025-08-13", estado: "Pendiente" },
  ];

  const color = (estado: string) => estado === "Activa" ? "bg-emerald-50 text-emerald-700" : estado === "Pendiente" ? "bg-yellow-50 text-yellow-700" : "bg-red-50 text-red-700";
  
  const handleExtend = (id: number, nombre: string) => {
    toast({
      title: "Autorización extendida",
      description: `La autorización de ${nombre} ha sido extendida exitosamente`
    });
  };
  
  const handleCancel = (id: number, nombre: string) => {
    toast({
      title: "Autorización cancelada", 
      description: `La autorización de ${nombre} ha sido cancelada`,
      variant: "destructive"
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Mis Autorizaciones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {autorizaciones.map(a => (
              <div key={a.id} className="grid grid-cols-2 md:grid-cols-6 gap-2 items-center p-3 rounded bg-muted/30">
                <div className="font-medium">{a.nombre}</div>
                <div className="text-sm text-muted-foreground">DNI {a.dni}</div>
                <div className="text-sm">{a.fecha}</div>
                <div className="text-sm"><Badge variant="outline" className={color(a.estado)}>{a.estado}</Badge></div>
                <div className="text-sm">#{a.id}</div>
                <div className="flex gap-1 justify-end">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => handleExtend(a.id, a.nombre)}
                    disabled={a.estado === "Vencida"}
                    className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => handleCancel(a.id, a.nombre)}
                    disabled={a.estado === "Vencida"}
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
