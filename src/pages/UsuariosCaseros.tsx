import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, UserCheck, Plus, Search, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function UsuariosCaseros() {
  const navigate = useNavigate();
  const [caseros] = useState([
    {
      id: 1,
      nombre: "Alberto Morales",
      propietario: "Juan Pérez",
      lote: "L-001",
      telefono: "+54 9 11 1111-2222",
      fecheIngreso: "2023-01-15",
      estado: "Activo",
      tipoServicio: "Cuidador",
      horario: "Tiempo Completo"
    },
    {
      id: 2,
      nombre: "Rosa García",
      propietario: "María González",
      lote: "L-002",
      telefono: "+54 9 11 3333-4444",
      fecheIngreso: "2023-08-10",
      estado: "Activo",
      tipoServicio: "Casera",
      horario: "Medio Tiempo"
    },
    {
      id: 3,
      nombre: "Miguel Torres",
      propietario: "Roberto Silva",
      lote: "L-045",
      telefono: "+54 9 11 5555-6666",
      fecheIngreso: "2024-01-20",
      estado: "Inactivo",
      tipoServicio: "Mantenimiento",
      horario: "Por Horas"
    }
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/admin/usuarios/autorizados")}>
            <ArrowLeft className="h-4 w-4" />
            Usuarios Autorizados
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Caseros</h1>
            <p className="text-muted-foreground">Gestión de caseros y cuidadores</p>
          </div>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Registrar Casero
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <UserCheck className="h-4 w-4 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Total Caseros</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">9</p>
              <p className="text-sm text-muted-foreground">Activos</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">5</p>
              <p className="text-sm text-muted-foreground">Tiempo Completo</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">7</p>
              <p className="text-sm text-muted-foreground">Medio Tiempo</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar casero..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Shield className="h-4 w-4 mr-2" />
          Filtrar por Servicio
        </Button>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Listado de Caseros</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Propietario</TableHead>
                <TableHead>Lote</TableHead>
                <TableHead>Tipo Servicio</TableHead>
                <TableHead>Horario</TableHead>
                <TableHead>Fecha Ingreso</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {caseros.map((casero) => (
                <TableRow key={casero.id}>
                  <TableCell className="font-medium">{casero.nombre}</TableCell>
                  <TableCell>{casero.propietario}</TableCell>
                  <TableCell>{casero.lote}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{casero.tipoServicio}</Badge>
                  </TableCell>
                  <TableCell>{casero.horario}</TableCell>
                  <TableCell>{casero.fecheIngreso}</TableCell>
                  <TableCell>{casero.telefono}</TableCell>
                  <TableCell>
                    <Badge variant={casero.estado === "Activo" ? "default" : "secondary"}>
                      {casero.estado}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}