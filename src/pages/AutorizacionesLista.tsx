import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export default function AutorizacionesLista() {
  const { toast } = useToast();
  const [selectedLote, setSelectedLote] = useState("087");
  
  const lotesDisponibles = [
    { numero: "087", sector: "Del Campo" },
    { numero: "124", sector: "Costa Norte" },
    { numero: "156", sector: "Reserva" }
  ];
  
  const autorizaciones = [
    { id: 1, nombre: "Carlos Mendoza", dni: "12345678", fecha: "15/09/2025", estado: "Activa", tipo: "Familiar", lote: "087" },
    { id: 2, nombre: "Ana García", dni: "23456789", fecha: "10/09/2025", estado: "Activa", tipo: "Invitadx", lote: "124" },
    { id: 3, nombre: "Luis Fernández", dni: "34567890", fecha: "05/08/2025", estado: "Vencida", tipo: "Empleadx", lote: "087" },
    { id: 4, nombre: "María López", dni: "45678901", fecha: "20/09/2025", estado: "Activa", tipo: "Caserx", lote: "156" },
    { id: 5, nombre: "Pedro Ruiz", dni: "56789012", fecha: "12/07/2025", estado: "Vencida", tipo: "Invitadx", lote: "087" },
    { id: 6, nombre: "Sofia Martinez", dni: "67890123", fecha: "18/09/2025", estado: "Activa", tipo: "Familiar", lote: "124" },
    { id: 7, nombre: "Diego Herrera", dni: "78901234", fecha: "22/09/2025", estado: "Activa", tipo: "Empleadx", lote: "156" }
  ];
  
  const autorizacionesFiltradas = autorizaciones.filter(auth => auth.lote === selectedLote);

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
      <div className="mb-4">
        <label className="text-sm font-medium text-muted-foreground">Mostrar autorizaciones para:</label>
        <Select value={selectedLote} onValueChange={setSelectedLote}>
          <SelectTrigger className="mt-1 w-64">
            <SelectValue>
              Lote L-{selectedLote}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {lotesDisponibles.map((lote) => (
              <SelectItem key={lote.numero} value={lote.numero}>
                L-{lote.numero} - {lote.sector}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Mis Autorizaciones - Lote L-{selectedLote}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {autorizacionesFiltradas.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No hay autorizaciones para el lote seleccionado</p>
              </div>
            ) : (
              autorizacionesFiltradas.map(a => (
                <div key={a.id} className="grid grid-cols-2 md:grid-cols-6 gap-2 items-center p-3 rounded bg-muted/30">
                  <div className="font-medium">{a.nombre}</div>
                  <div className="text-sm text-muted-foreground">DNI {a.dni}</div>
                  <div className="text-sm">{a.fecha}</div>
                  <div className="text-sm"><Badge variant="outline" className={color(a.estado)}>{a.estado}</Badge></div>
                  <div className="text-sm">{a.tipo}</div>
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
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
