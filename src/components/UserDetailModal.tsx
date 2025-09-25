import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Phone, Mail, FileText, Calendar, User, Edit, Home, Trash2 } from "lucide-react";

interface UserData {
  id: number;
  nombre: string;
  tipo: string;
  ref: string;
  estado: string;
  fechaVencimiento: string | null;
  ultimaEntrada: string;
  dni?: string;
  fechaNacimiento?: string;
  email?: string;
  telefono?: string;
  foto?: string;
  ultimasEntradas?: Array<{ fecha: string; hora: string; tipo: string }>;
  documentos?: Array<{ nombre: string; url: string }>;
  notas?: string;
}

interface UserDetailModalProps {
  user: UserData | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function UserDetailModal({ user, isOpen, onClose }: UserDetailModalProps) {
  if (!user) return null;

  const initials = user.nombre.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.foto} alt={user.nombre} />
              <AvatarFallback className="bg-blue-100 text-blue-700 text-lg font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <DialogTitle className="text-xl">{user.nombre}</DialogTitle>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline">{user.tipo}</Badge>
                <Badge variant={user.estado === "Activo" ? "default" : "secondary"}>
                  {user.estado}
                </Badge>
              </div>
            </div>
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
                <p className="font-medium">{user.dni || 'No registrado'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Fecha de Nacimiento</p>
                <p className="font-medium">{user.fechaNacimiento || 'No registrada'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {user.email || 'No registrado'}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Teléfono</p>
                <p className="font-medium flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {user.telefono || 'No registrado'}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Información de Autorización */}
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <Home className="h-5 w-5" />
              Autorización
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Tipo de Usuario</p>
                <p className="font-medium">{user.tipo}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Referencia</p>
                <p className="font-medium">{user.ref}</p>
                {user.ref.includes(',') && (
                  <div className="mt-2">
                    <p className="text-sm text-muted-foreground">Lotes Asociados:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {user.ref.split(',').map((lote, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {lote.trim()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Estado</p>
                <Badge variant={user.estado === "Activo" ? "default" : "secondary"}>
                  {user.estado}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Vencimiento</p>
                <p className="font-medium">
                  {user.fechaVencimiento || "Sin vencimiento"}
                </p>
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
                <p className="font-medium">{user.ultimaEntrada}</p>
              </div>
              {user.ultimasEntradas && (
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Entradas Recientes</p>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {user.ultimasEntradas.slice(0, 10).map((entrada, index) => (
                      <div key={index} className="flex justify-between text-sm p-2 bg-muted rounded">
                        <span>{entrada.fecha} {entrada.hora}</span>
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
          {user.documentos && user.documentos.length > 0 && (
            <>
              <Separator />
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Documentación
                </h3>
                <div className="space-y-2">
                  {user.documentos.map((doc, index) => (
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

          {/* Notas */}
          {user.notas && (
            <>
              <Separator />
              <div>
                <h3 className="font-semibold text-lg mb-3">Observaciones</h3>
                <p className="text-sm bg-muted p-3 rounded">{user.notas}</p>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}