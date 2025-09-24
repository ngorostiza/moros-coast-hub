import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Edit, Trash2, MapPin, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function LotesABM() {
  const navigate = useNavigate();
  const [lotes] = useState([
    {
      id: 1,
      numero: "L-001",
      propietario: "Juan Pérez",
      superficie: "850 m²",
      estado: "Ocupado",
      sector: "Norte",
      tipo: "Residencial",
      construcciones: 1
    },
    {
      id: 2,
      numero: "L-002",
      propietario: "María González",
      superficie: "720 m²",
      estado: "Disponible",
      sector: "Sur",
      tipo: "Residencial",
      construcciones: 0
    },
    {
      id: 3,
      numero: "L-045",
      propietario: "Roberto Silva",
      superficie: "1200 m²",
      estado: "En Construcción",
      sector: "Este",
      tipo: "Residencial",
      construcciones: 1
    },
    {
      id: 4,
      numero: "L-078",
      propietario: "Ana Martínez",
      superficie: "950 m²",
      estado: "Ocupado",
      sector: "Oeste",
      tipo: "Residencial",
      construcciones: 2
    }
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/admin/lotes")}>
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">ABM Lotes</h1>
            <p className="text-muted-foreground">Gestión completa de lotes del barrio</p>
          </div>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Lote
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Home className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">245</p>
                <p className="text-sm text-muted-foreground">Total Lotes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <MapPin className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">189</p>
                <p className="text-sm text-muted-foreground">Ocupados</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Edit className="h-4 w-4 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">22</p>
                <p className="text-sm text-muted-foreground">En Construcción</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Plus className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">34</p>
                <p className="text-sm text-muted-foreground">Disponibles</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lotes Table */}
      <Card>
        <CardHeader>
          <CardTitle>Listado de Lotes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lote</TableHead>
                <TableHead>Propietario</TableHead>
                <TableHead>Superficie</TableHead>
                <TableHead>Sector</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Construcciones</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lotes.map((lote) => (
                <TableRow key={lote.id}>
                  <TableCell className="font-medium">{lote.numero}</TableCell>
                  <TableCell>{lote.propietario}</TableCell>
                  <TableCell>{lote.superficie}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {lote.sector}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={lote.estado === "Ocupado" ? "default" : lote.estado === "Disponible" ? "secondary" : "destructive"}>
                      {lote.estado}
                    </Badge>
                  </TableCell>
                  <TableCell>{lote.construcciones}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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