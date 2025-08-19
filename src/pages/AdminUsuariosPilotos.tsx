import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plane, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Calendar,
  Phone,
  Mail
} from "lucide-react";

export default function AdminUsuariosPilotos() {
  const pilots = [
    {
      id: 1,
      name: "Carlos Mendez",
      email: "carlos.mendez@email.com",
      phone: "+54 11 1234-5678",
      license: "PPL-A 123456",
      aircraft: "Cessna 172",
      registration: "LV-ABC",
      lastVisit: "2024-02-10",
      visits: 15,
      status: "Activo",
      permissions: ["Aterrizaje", "Despegue", "Hangar"]
    },
    {
      id: 2,
      name: "Ana Rodriguez",
      email: "ana.rodriguez@email.com", 
      phone: "+54 11 2345-6789",
      license: "CPL 234567",
      aircraft: "Piper Cherokee",
      registration: "LV-DEF",
      lastVisit: "2024-02-08",
      visits: 8,
      status: "Activo",
      permissions: ["Aterrizaje", "Despegue"]
    },
    {
      id: 3,
      name: "Miguel Santos",
      email: "miguel.santos@email.com",
      phone: "+54 11 3456-7890", 
      license: "PPL-A 345678",
      aircraft: "Cessna 150",
      registration: "LV-GHI",
      lastVisit: "2024-01-25",
      visits: 23,
      status: "Suspendido",
      permissions: []
    },
    {
      id: 4,
      name: "Laura Martinez",
      email: "laura.martinez@email.com",
      phone: "+54 11 4567-8901",
      license: "ATPL 456789",
      aircraft: "Beechcraft Bonanza",
      registration: "LV-JKL",
      lastVisit: "2024-02-12",
      visits: 4,
      status: "Activo",
      permissions: ["Aterrizaje", "Despegue", "Hangar", "Combustible"]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Activo":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Suspendido":
        return "bg-red-100 text-red-800 border-red-200";
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestión de Pilotos</h1>
          <p className="text-muted-foreground">Administración de usuarios piloto con acceso al campo</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Plane className="w-3 h-3 mr-1" />
            {pilots.length} pilotos registrados
          </Badge>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nuevo Piloto
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Pilotos Activos</p>
                <p className="text-2xl font-bold text-foreground">{pilots.filter(p => p.status === "Activo").length}</p>
              </div>
              <Plane className="h-8 w-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Visitas</p>
                <p className="text-2xl font-bold text-foreground">{pilots.reduce((sum, p) => sum + p.visits, 0)}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Aeronaves</p>
                <p className="text-2xl font-bold text-foreground">{new Set(pilots.map(p => p.registration)).size}</p>
              </div>
              <Plane className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Suspendidos</p>
                <p className="text-2xl font-bold text-foreground">{pilots.filter(p => p.status === "Suspendido").length}</p>
              </div>
              <Plane className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar por nombre, licencia o matrícula..."
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              Filtrar por Estado
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Pilots Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plane className="h-5 w-5" />
            Lista de Pilotos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pilots.map((pilot) => (
              <div key={pilot.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-4">
                      <h3 className="font-semibold text-lg">{pilot.name}</h3>
                      <Badge variant="outline" className={getStatusColor(pilot.status)}>
                        {pilot.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Contacto</p>
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          <span>{pilot.email}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          <span>{pilot.phone}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Licencia</p>
                        <p className="font-medium">{pilot.license}</p>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Aeronave</p>
                        <p className="font-medium">{pilot.aircraft}</p>
                        <p className="text-xs text-muted-foreground">{pilot.registration}</p>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-muted-foreground">Actividad</p>
                        <p className="font-medium">{pilot.visits} visitas</p>
                        <p className="text-xs text-muted-foreground">
                          Último: {new Date(pilot.lastVisit).toLocaleDateString('es-AR')}
                        </p>
                      </div>
                    </div>
                    
                    {pilot.permissions.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {pilot.permissions.map((permission, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}