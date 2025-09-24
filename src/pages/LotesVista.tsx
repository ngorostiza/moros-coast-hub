import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, Filter, MapPin, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";

export default function LotesVista() {
  const navigate = useNavigate();
  const [lotes] = useState([
    {
      id: 1,
      numero: "L-001",
      propietario: "Juan Pérez",
      superficie: "850 m²",
      estado: "Ocupado",
      sector: "Norte",
      tipo: "Residencial"
    },
    {
      id: 2,
      numero: "L-002",
      propietario: "María González",
      superficie: "720 m²",
      estado: "Disponible",
      sector: "Sur",
      tipo: "Residencial"
    },
    {
      id: 3,
      numero: "L-045",
      propietario: "Roberto Silva",
      superficie: "1200 m²",
      estado: "En Construcción",
      sector: "Este",
      tipo: "Residencial"
    }
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/admin")}>
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Vista General - Lotes</h1>
            <p className="text-muted-foreground">Resumen de todos los lotes del barrio</p>
          </div>
        </div>
        <Button onClick={() => navigate("/admin/lotes/abm")}>
          <Users className="h-4 w-4 mr-2" />
          Gestionar Lotes
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">245</p>
              <p className="text-sm text-muted-foreground">Total Lotes</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">189</p>
              <p className="text-sm text-muted-foreground">Ocupados</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">34</p>
              <p className="text-sm text-muted-foreground">Disponibles</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">22</p>
              <p className="text-sm text-muted-foreground">En Construcción</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar lote o propietario..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filtros
        </Button>
      </div>

      {/* Lotes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lotes.map((lote) => (
          <Card key={lote.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{lote.numero}</CardTitle>
                <Badge variant={lote.estado === "Ocupado" ? "default" : lote.estado === "Disponible" ? "secondary" : "destructive"}>
                  {lote.estado}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Propietario:</span>
                <span className="text-sm font-medium">{lote.propietario}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Superficie:</span>
                <span className="text-sm">{lote.superficie}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Sector:</span>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span className="text-sm">{lote.sector}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Tipo:</span>
                <Badge variant="outline">{lote.tipo}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}