import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Briefcase, Plus, Search, Building } from "lucide-react";
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

export default function UsuariosEmpleados() {
  const navigate = useNavigate();
  const [empleados] = useState([
    {
      id: 1,
      nombre: "Carlos Mendoza",
      empresa: "Construcciones ABC",
      propietario: "Juan Pérez",
      lote: "L-001",
      telefono: "+54 9 11 7777-8888",
      tipoTrabajo: "Construcción",
      fechaInicio: "2024-01-10",
      fechaFinalizacion: "2024-06-30",
      estado: "Activo"
    },
    {
      id: 2,
      nombre: "Ana Ruiz",
      empresa: "Jardinería Verde",
      propietario: "María González",
      lote: "L-002",
      telefono: "+54 9 11 9999-0000",
      tipoTrabajo: "Jardinería",
      fechaInicio: "2024-02-01",
      fechaFinalizacion: "2024-12-31",
      estado: "Activo"
    },
    {
      id: 3,
      nombre: "Pedro Vásquez",
      empresa: "Plomería Experta",
      propietario: "Roberto Silva",
      lote: "L-045",
      telefono: "+54 9 11 1234-9876",
      tipoTrabajo: "Plomería",
      fechaInicio: "2024-03-15",
      fechaFinalizacion: "2024-03-20",
      estado: "Finalizado"
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
            <h1 className="text-2xl font-bold text-foreground">Empleados</h1>
            <p className="text-muted-foreground">Gestión de empleados autorizados</p>
          </div>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Autorizar Empleado
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Briefcase className="h-4 w-4 text-indigo-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">28</p>
                <p className="text-sm text-muted-foreground">Total Empleados</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">18</p>
              <p className="text-sm text-muted-foreground">Activos</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">8</p>
              <p className="text-sm text-muted-foreground">Construcción</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">6</p>
              <p className="text-sm text-muted-foreground">Mantenimiento</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">4</p>
              <p className="text-sm text-muted-foreground">Servicios</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar empleado..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Building className="h-4 w-4 mr-2" />
          Filtrar por Empresa
        </Button>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Listado de Empleados Autorizados</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Empresa</TableHead>
                <TableHead>Propietario</TableHead>
                <TableHead>Lote</TableHead>
                <TableHead>Tipo Trabajo</TableHead>
                <TableHead>Inicio</TableHead>
                <TableHead>Finalización</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {empleados.map((empleado) => (
                <TableRow key={empleado.id}>
                  <TableCell className="font-medium">{empleado.nombre}</TableCell>
                  <TableCell>{empleado.empresa}</TableCell>
                  <TableCell>{empleado.propietario}</TableCell>
                  <TableCell>{empleado.lote}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{empleado.tipoTrabajo}</Badge>
                  </TableCell>
                  <TableCell>{empleado.fechaInicio}</TableCell>
                  <TableCell>{empleado.fechaFinalizacion}</TableCell>
                  <TableCell>
                    <Badge variant={
                      empleado.estado === "Activo" ? "default" : 
                      empleado.estado === "Finalizado" ? "secondary" : "destructive"
                    }>
                      {empleado.estado}
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