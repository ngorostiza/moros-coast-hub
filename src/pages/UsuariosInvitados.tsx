import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, UserPlus, Plus, Search, Calendar } from "lucide-react";
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

export default function UsuariosInvitados() {
  const navigate = useNavigate();
  const [invitados] = useState([
    {
      id: 1,
      nombre: "Roberto Martín",
      anfitrion: "Juan Pérez",
      lote: "L-001",
      fechaIngreso: "2024-03-15",
      fechaVencimiento: "2024-03-22",
      vehiculo: "ABC 123",
      estado: "Activo",
      tipo: "Temporal"
    },
    {
      id: 2,
      nombre: "Laura Sánchez",
      anfitrion: "María González",
      lote: "L-002",
      fechaIngreso: "2024-03-10",
      fechaVencimiento: "2024-04-10",
      vehiculo: "XYZ 789",
      estado: "Vencido",
      tipo: "Mensual"
    },
    {
      id: 3,
      nombre: "Diego Fernández",
      anfitrion: "Roberto Silva",
      lote: "L-045",
      fechaIngreso: "2024-03-20",
      fechaVencimiento: "2024-03-20",
      vehiculo: "DEF 456",
      estado: "Activo",
      tipo: "Diario"
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
            <h1 className="text-2xl font-bold text-foreground">Invitados</h1>
            <p className="text-muted-foreground">Gestión de invitados temporales</p>
          </div>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Invitado
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <UserPlus className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">89</p>
                <p className="text-sm text-muted-foreground">Total Invitados</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">45</p>
              <p className="text-sm text-muted-foreground">Activos</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">12</p>
              <p className="text-sm text-muted-foreground">Vencidos</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">28</p>
              <p className="text-sm text-muted-foreground">Diarios</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">4</p>
              <p className="text-sm text-muted-foreground">Mensuales</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar invitado..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Calendar className="h-4 w-4 mr-2" />
          Filtrar por Fecha
        </Button>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Listado de Invitados</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Anfitrión</TableHead>
                <TableHead>Lote</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Fecha Ingreso</TableHead>
                <TableHead>Vencimiento</TableHead>
                <TableHead>Vehículo</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invitados.map((invitado) => (
                <TableRow key={invitado.id}>
                  <TableCell className="font-medium">{invitado.nombre}</TableCell>
                  <TableCell>{invitado.anfitrion}</TableCell>
                  <TableCell>{invitado.lote}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{invitado.tipo}</Badge>
                  </TableCell>
                  <TableCell>{invitado.fechaIngreso}</TableCell>
                  <TableCell>{invitado.fechaVencimiento}</TableCell>
                  <TableCell>{invitado.vehiculo}</TableCell>
                  <TableCell>
                    <Badge variant={invitado.estado === "Activo" ? "default" : "destructive"}>
                      {invitado.estado}
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