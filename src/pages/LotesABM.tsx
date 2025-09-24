import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Edit, Trash2, MapPin, Home, CheckCircle, Building, Hammer } from "lucide-react";
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
  // Generar 150 lotes con datos realistas
  const [lotes] = useState(() => {
    const propietarios = ["FENDA", "Rafael De Las Carreras", "Marcelo Giunti"];
    const calles = ["De Abajo", "El Zorro", "El Encuentro"];
    const estados = ["Construido", "En Construcción", "Vendido", "Disponible"];
    const superficies = ["650 m²", "720 m²", "850 m²", "920 m²", "1050 m²", "1200 m²"];
    
    const lotes = [];
    
    // Distribuir estados: 60 construidos + 6 en construcción + 19 vendidos + 65 disponibles = 150
    for (let i = 1; i <= 150; i++) {
      let estado;
      if (i <= 60) estado = "Construido";
      else if (i <= 66) estado = "En Construcción"; 
      else if (i <= 85) estado = "Vendido";
      else estado = "Disponible";
      
      lotes.push({
        id: i,
        numero: `L-${i.toString().padStart(3, '0')}`,
        propietario: estado === "Disponible" ? "-" : propietarios[i % propietarios.length],
        superficie: superficies[i % superficies.length],
        estado: estado,
        calle: calles[i % calles.length]
      });
    }
    
    return lotes;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/admin/dashboard")}>
            <ArrowLeft className="h-4 w-4" />
            Dashboard
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
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Home className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">150</p>
                <p className="text-sm text-muted-foreground">Total Lotes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">85</p>
                <p className="text-sm text-muted-foreground">Vendidos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">60</p>
                <p className="text-sm text-muted-foreground">Construidos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Hammer className="h-4 w-4 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">6</p>
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
                <p className="text-2xl font-bold">65</p>
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
                <TableHead>Calle de acceso</TableHead>
                <TableHead>Estado</TableHead>
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
                      {lote.calle}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      lote.estado === "Construido" || lote.estado === "Vendido" ? "default" : 
                      lote.estado === "Disponible" ? "secondary" : 
                      "destructive"
                    }>
                      {lote.estado}
                    </Badge>
                  </TableCell>
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