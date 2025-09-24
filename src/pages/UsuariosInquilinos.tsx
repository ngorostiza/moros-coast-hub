import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, Plus, Search, Home } from "lucide-react";
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

export default function UsuariosInquilinos() {
  const navigate = useNavigate();
  const [inquilinos] = useState([
    {
      id: 1,
      nombre: "Patricia López",
      propietario: "Juan Pérez",
      lote: "L-001",
      fechaInicioContrato: "2024-01-01",
      fechaFinContrato: "2024-12-31",
      telefono: "+54 9 11 2222-3333",
      estado: "Activo",
      tipoContrato: "Anual"
    },
    {
      id: 2,
      nombre: "Martín Rodríguez",
      propietario: "María González",
      lote: "L-002",
      fechaInicioContrato: "2023-06-15",
      fechaFinContrato: "2024-06-14",
      telefono: "+54 9 11 4444-5555",
      estado: "Por Vencer",
      tipoContrato: "Anual"
    },
    {
      id: 3,
      nombre: "Carmen Silva",
      propietario: "Roberto Silva",
      lote: "L-045",
      fechaInicioContrato: "2024-02-01",
      fechaFinContrato: "2024-08-01",
      telefono: "+54 9 11 6666-7777",
      estado: "Activo",
      tipoContrato: "Temporal"
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
            <h1 className="text-2xl font-bold text-foreground">Inquilinos</h1>
            <p className="text-muted-foreground">Gestión de inquilinos de propiedades</p>
          </div>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Registrar Inquilino
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">45</p>
                <p className="text-sm text-muted-foreground">Total Inquilinos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">38</p>
              <p className="text-sm text-muted-foreground">Contratos Activos</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">5</p>
              <p className="text-sm text-muted-foreground">Por Vencer</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">2</p>
              <p className="text-sm text-muted-foreground">Vencidos</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar inquilino..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Home className="h-4 w-4 mr-2" />
          Filtrar por Lote
        </Button>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Listado de Inquilinos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Propietario</TableHead>
                <TableHead>Lote</TableHead>
                <TableHead>Tipo Contrato</TableHead>
                <TableHead>Inicio</TableHead>
                <TableHead>Fin</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inquilinos.map((inquilino) => (
                <TableRow key={inquilino.id}>
                  <TableCell className="font-medium">{inquilino.nombre}</TableCell>
                  <TableCell>{inquilino.propietario}</TableCell>
                  <TableCell>{inquilino.lote}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{inquilino.tipoContrato}</Badge>
                  </TableCell>
                  <TableCell>{inquilino.fechaInicioContrato}</TableCell>
                  <TableCell>{inquilino.fechaFinContrato}</TableCell>
                  <TableCell>{inquilino.telefono}</TableCell>
                  <TableCell>
                    <Badge variant={
                      inquilino.estado === "Activo" ? "default" : 
                      inquilino.estado === "Por Vencer" ? "secondary" : "destructive"
                    }>
                      {inquilino.estado}
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