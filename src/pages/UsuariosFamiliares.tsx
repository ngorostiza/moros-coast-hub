import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Heart, Plus, Search } from "lucide-react";
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

export default function UsuariosFamiliares() {
  const navigate = useNavigate();
  const [familiares] = useState([
    {
      id: 1,
      nombre: "Carlos Pérez",
      parentesco: "Hijo",
      propietario: "Juan Pérez",
      lote: "L-001",
      telefono: "+54 9 11 1234-5678",
      estado: "Activo",
      fechaAutorizacion: "2024-01-15"
    },
    {
      id: 2,
      nombre: "Ana Pérez",
      parentesco: "Esposa",
      propietario: "Juan Pérez",
      lote: "L-001",
      telefono: "+54 9 11 8765-4321",
      estado: "Activo",
      fechaAutorizacion: "2024-01-10"
    },
    {
      id: 3,
      nombre: "Luis González",
      parentesco: "Hermano",
      propietario: "María González",
      lote: "L-002",
      telefono: "+54 9 11 5555-0000",
      estado: "Suspendido",
      fechaAutorizacion: "2024-02-20"
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
            <h1 className="text-2xl font-bold text-foreground">Familiares</h1>
            <p className="text-muted-foreground">Gestión de familiares autorizados</p>
          </div>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Agregar Familiar
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-pink-100 rounded-lg">
                <Heart className="h-4 w-4 text-pink-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">324</p>
                <p className="text-sm text-muted-foreground">Total Familiares</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">298</p>
              <p className="text-sm text-muted-foreground">Activos</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">18</p>
              <p className="text-sm text-muted-foreground">Suspendidos</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">8</p>
              <p className="text-sm text-muted-foreground">Pendientes</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar familiar..." className="pl-10" />
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Listado de Familiares</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Parentesco</TableHead>
                <TableHead>Propietario</TableHead>
                <TableHead>Lote</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha Autorización</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {familiares.map((familiar) => (
                <TableRow key={familiar.id}>
                  <TableCell className="font-medium">{familiar.nombre}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{familiar.parentesco}</Badge>
                  </TableCell>
                  <TableCell>{familiar.propietario}</TableCell>
                  <TableCell>{familiar.lote}</TableCell>
                  <TableCell>{familiar.telefono}</TableCell>
                  <TableCell>
                    <Badge variant={familiar.estado === "Activo" ? "default" : "destructive"}>
                      {familiar.estado}
                    </Badge>
                  </TableCell>
                  <TableCell>{familiar.fechaAutorizacion}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}