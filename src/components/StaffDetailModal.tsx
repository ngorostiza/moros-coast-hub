import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Phone, Mail, FileText, Calendar, MapPin, User, Edit } from "lucide-react";

interface StaffMember {
  id: number;
  nombre: string;
  dni: string;
  fechaNac: string;
  areasPrimaria: string;
  areasAdicionales?: string[];
  displayAreas: string;
  vencimientoART: string;
  ultimaEntrada: string;
  contacto: string;
  email?: string;
  telefono?: string;
  estado: string;
  esTambien?: string;
  foto?: string;
  ultimasEntradas?: Array<{ fecha: string; tipo: string }>;
  documentos?: Array<{ nombre: string; url: string }>;
}

interface StaffDetailModalProps {
  staff: StaffMember | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function StaffDetailModal({ staff, isOpen, onClose }: StaffDetailModalProps) {
  if (!staff) return null;

  const initials = staff.nombre.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={staff.foto} alt={staff.nombre} />
              <AvatarFallback className="bg-blue-100 text-blue-700 text-lg font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <DialogTitle className="text-xl">{staff.nombre}</DialogTitle>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <Badge variant="outline" className="bg-blue-50">
                  {staff.areasPrimaria}
                </Badge>
                {staff.areasAdicionales?.map((area) => (
                  <Badge key={area} variant="outline" className="bg-green-50">
                    + {area}
                  </Badge>
                ))}
                {staff.esTambien && (
                  <Badge className="bg-purple-100 text-purple-800">
                    {staff.esTambien}
                  </Badge>
                )}
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Información Personal */}
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <User className="h-5 w-5" />
              Información Personal
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">DNI</p>
                <p className="font-medium">{staff.dni}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Fecha de Nacimiento</p>
                <p className="font-medium">{staff.fechaNac}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {staff.email || staff.contacto.split(' / ')[1] || 'No registrado'}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Teléfono</p>
                <p className="font-medium flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {staff.telefono || staff.contacto.split(' / ')[0] || 'No registrado'}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Información Laboral */}
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Información Laboral
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Área Principal</p>
                <p className="font-medium">{staff.areasPrimaria}</p>
              </div>
              {staff.areasAdicionales && staff.areasAdicionales.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground">Áreas Adicionales</p>
                  <p className="font-medium">{staff.areasAdicionales.join(', ')}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-muted-foreground">Vencimiento ART</p>
                <p className="font-medium">{staff.vencimientoART}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Estado Actual</p>
                <Badge variant={staff.estado === "En BdlM" ? "default" : "secondary"}>
                  {staff.estado}
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Historial de Entradas */}
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Historial de Acceso
            </h3>
            <div className="space-y-2">
              <div>
                <p className="text-sm text-muted-foreground">Última Entrada</p>
                <p className="font-medium">{staff.ultimaEntrada}</p>
              </div>
              {staff.ultimasEntradas && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Entradas Recientes</p>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {staff.ultimasEntradas.slice(0, 5).map((entrada, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{entrada.fecha}</span>
                        <Badge variant="outline" className="text-xs">
                          {entrada.tipo}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Documentación */}
          {staff.documentos && staff.documentos.length > 0 && (
            <>
              <Separator />
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Documentación
                </h3>
                <div className="space-y-2">
                  {staff.documentos.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">{doc.nombre}</span>
                      <Button variant="ghost" size="sm">
                        Ver
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}