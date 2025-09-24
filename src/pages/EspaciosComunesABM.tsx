import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Edit, Trash2, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EspaciosComunesABM() {
  const navigate = useNavigate();
  const [espacios] = useState([
    {
      id: 1,
      nombre: "Tennis Vivero (x1)",
      tipo: "Cancha",
      capacidad: 4,
      estado: "Disponible",
      ubicacion: "Sector Vivero"
    },
    {
      id: 2,
      nombre: "Tennis Bosque (x4)",
      tipo: "Cancha",
      capacidad: 16,
      estado: "Disponible",
      ubicacion: "Sector Bosque"
    },
    {
      id: 3,
      nombre: "Paddle Campo (x2)",
      tipo: "Cancha",
      capacidad: 8,
      estado: "Disponible",
      ubicacion: "Sector Central"
    },
    {
      id: 4,
      nombre: "Peludo (tipo SUM)",
      tipo: "SUM",
      capacidad: 40,
      estado: "Disponible",
      ubicacion: "Sector Recreativo"
    }
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/admin/espacios-comunes")}>
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">ABM Espacios Comunes</h1>
            <p className="text-muted-foreground">Gestión de espacios comunes del barrio</p>
          </div>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Espacio
        </Button>
      </div>

      {/* Espacios Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {espacios.map((espacio) => (
          <Card key={espacio.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{espacio.nombre}</CardTitle>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Tipo:</span>
                <Badge variant="secondary">{espacio.tipo}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Capacidad:</span>
                <span className="text-sm font-medium">{espacio.capacidad} personas</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Estado:</span>
                <Badge variant={espacio.estado === "Disponible" ? "default" : "destructive"}>
                  {espacio.estado}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Ubicación:</span>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span className="text-sm">{espacio.ubicacion}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}