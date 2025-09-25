import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Link, Share, Calendar } from "lucide-react";

export default function AutorizacionesNueva() {
  const { toast } = useToast();
  const [form, setForm] = useState({ 
    nombre: "", 
    apellido: "", 
    tipo: "", 
    fechaCaducidad: "",
    loteSeleccionado: ""
  });
  
  const lotesDisponibles = [
    { numero: "087", sector: "Del Campo" },
    { numero: "124", sector: "Costa Norte" },
    { numero: "156", sector: "Reserva" }
  ];
  
  const [invitationLink, setInvitationLink] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => 
    setForm({ ...form, [e.target.name]: e.target.value });
  
  const handleTipoChange = (value: string) => 
    setForm({ ...form, tipo: value });
  
  const handleLoteChange = (value: string) => 
    setForm({ ...form, loteSeleccionado: value });

  const generateInvitation = () => {
    if (!form.nombre || !form.apellido || !form.tipo || !form.fechaCaducidad || !form.loteSeleccionado) {
      toast({ 
        title: "Error", 
        description: "Por favor complete todos los campos incluyendo el lote",
        variant: "destructive"
      });
      return;
    }
    
    const link = `https://login.bahiadelosmoros.com/autorizar/${Date.now()}`;
    setInvitationLink(link);
    
    toast({ 
      title: "Invitación generada", 
      description: `Invitación para ${form.nombre} ${form.apellido} en Lote ${form.loteSeleccionado} creada exitosamente`
    });
  };

  const shareLink = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Autorización Bahía de los Moros',
        text: `Invitación de autorización para ${form.nombre} ${form.apellido}`,
        url: invitationLink,
      });
    } else {
      navigator.clipboard.writeText(invitationLink);
      toast({ title: "Link copiado", description: "El enlace ha sido copiado al portapapeles" });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Nueva Autorización</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="mb-4">
            <label className="text-sm font-medium text-muted-foreground">Para Lote:</label>
            <Select onValueChange={handleLoteChange}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Seleccionar lote para autorizar" />
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input 
              name="nombre" 
              placeholder="Nombre" 
              value={form.nombre} 
              onChange={handleChange} 
            />
            <Input 
              name="apellido" 
              placeholder="Apellido" 
              value={form.apellido} 
              onChange={handleChange} 
            />
            <Select onValueChange={handleTipoChange}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo de autorización" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="familiar">Familiar</SelectItem>
                <SelectItem value="invitadx">Invitadx</SelectItem>
                <SelectItem value="inquilinx">Inquilinx</SelectItem>
                <SelectItem value="caserx">Caserx</SelectItem>
                <SelectItem value="empleadx">Empleadx</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative">
              <Input 
                name="fechaCaducidad" 
                type="date" 
                placeholder="Fecha de caducidad"
                value={form.fechaCaducidad} 
                onChange={handleChange} 
              />
              <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
          
          <Button onClick={generateInvitation} className="w-full">
            <Link className="h-4 w-4 mr-2" />
            Generar Invitación
          </Button>
          
          {invitationLink && (
            <Card className="bg-muted/50">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <p className="text-sm font-medium">Link de invitación generado:</p>
                  <div className="flex items-center gap-2 p-2 bg-background rounded border text-sm">
                    <code className="flex-1 truncate">{invitationLink}</code>
                    <Button size="sm" variant="outline" onClick={shareLink}>
                      <Share className="h-3 w-3 mr-1" />
                      Compartir
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Comparta este enlace con {form.nombre} {form.apellido} para que complete la autorización en Lote L-{form.loteSeleccionado}.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}