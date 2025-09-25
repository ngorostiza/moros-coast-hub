import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Home, FileText, Calendar, Wrench, Edit, Eye, Trash2 } from "lucide-react";

interface LoteData {
  id: number;
  numero: string;
  propietario: string;
  superficie: string;
  estado: string;
  calle: string;
  dimensiones?: {
    frente: string;
    fondo: string;
    orientacion: string;
  };
  servicios?: string[];
  historial?: Array<{
    fecha: string;
    evento: string;
    descripcion: string;
  }>;
  documentos?: Array<{
    nombre: string;
    tipo: string;
    url: string;
  }>;
  fotos?: Array<{
    nombre: string;
    url: string;
    fecha: string;
  }>;
  proyecto?: {
    tipoVivienda: string;
    metrosCubiertos: string;
    dormitorios: number;
    banos: number;
  };
}

interface LoteDetailModalProps {
  lote: LoteData | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function LoteDetailModal({ lote, isOpen, onClose }: LoteDetailModalProps) {
  if (!lote) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl flex items-center gap-2">
                <Home className="h-5 w-5" />
                Lote {lote.numero}
              </DialogTitle>
              <p className="text-muted-foreground mt-1">
                {lote.propietario !== '-' ? `Propietario: ${lote.propietario}` : 'Lote disponible'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={
                lote.estado === "Construido" || lote.estado === "Vendido" ? "default" : 
                lote.estado === "Disponible" ? "secondary" : 
                "destructive"
              }>
                {lote.estado}
              </Badge>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Eliminar
                </Button>
              </div>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="resumen" className="mt-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="resumen">Resumen</TabsTrigger>
            <TabsTrigger value="documentos">Documentos</TabsTrigger>
            <TabsTrigger value="proyecto">Proyecto</TabsTrigger>
            <TabsTrigger value="historial">Historial</TabsTrigger>
          </TabsList>

          <TabsContent value="resumen" className="space-y-6">
            {/* Información General */}
            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Información del Lote
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Número de Lote</p>
                  <p className="font-medium">{lote.numero}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Superficie Total</p>
                  <p className="font-medium">{lote.superficie}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Calle de Acceso</p>
                  <p className="font-medium">{lote.calle}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Estado</p>
                  <Badge variant={
                    lote.estado === "Construido" || lote.estado === "Vendido" ? "default" : 
                    lote.estado === "Disponible" ? "secondary" : 
                    "destructive"
                  }>
                    {lote.estado}
                  </Badge>
                </div>
              </div>
            </div>

            <Separator />

            {/* Dimensiones */}
            {lote.dimensiones && (
              <div>
                <h3 className="font-semibold text-lg mb-3">Dimensiones</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Frente</p>
                    <p className="font-medium">{lote.dimensiones.frente}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Fondo</p>
                    <p className="font-medium">{lote.dimensiones.fondo}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Orientación</p>
                    <p className="font-medium">{lote.dimensiones.orientacion}</p>
                  </div>
                </div>
              </div>
            )}

            {lote.dimensiones && <Separator />}

            {/* Servicios */}
            {lote.servicios && (
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Wrench className="h-5 w-5" />
                  Servicios Disponibles
                </h3>
                <div className="flex flex-wrap gap-2">
                  {lote.servicios.map((servicio) => (
                    <Badge key={servicio} variant="outline">
                      {servicio}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="documentos" className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Documentación Legal
              </h3>
              {lote.documentos ? (
                <div className="space-y-2">
                  {lote.documentos.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="font-medium">{doc.nombre}</p>
                        <p className="text-sm text-muted-foreground">{doc.tipo}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Ver
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No hay documentos cargados</p>
              )}
            </div>

            {/* Fotos */}
            {lote.fotos && (
              <div>
                <h3 className="font-semibold text-lg mb-3">Fotografías</h3>
                <div className="grid grid-cols-2 gap-4">
                  {lote.fotos.map((foto, index) => (
                    <div key={index} className="border rounded p-2">
                      <div className="bg-muted h-32 rounded mb-2 flex items-center justify-center">
                        <p className="text-sm text-muted-foreground">{foto.nombre}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">{foto.fecha}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="proyecto" className="space-y-4">
            {lote.proyecto ? (
              <div>
                <h3 className="font-semibold text-lg mb-3">Información del Proyecto</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Tipo de Vivienda</p>
                    <p className="font-medium">{lote.proyecto.tipoVivienda}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Metros Cubiertos</p>
                    <p className="font-medium">{lote.proyecto.metrosCubiertos}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Dormitorios</p>
                    <p className="font-medium">{lote.proyecto.dormitorios}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Baños</p>
                    <p className="font-medium">{lote.proyecto.banos}</p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">No hay información de proyecto disponible</p>
            )}
          </TabsContent>

          <TabsContent value="historial" className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Historial del Lote
              </h3>
              {lote.historial ? (
                <div className="space-y-3">
                  {lote.historial.map((evento, index) => (
                    <div key={index} className="border-l-2 border-blue-200 pl-4 pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{evento.evento}</p>
                          <p className="text-sm text-muted-foreground">{evento.descripcion}</p>
                        </div>
                        <p className="text-xs text-muted-foreground">{evento.fecha}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No hay historial registrado</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}