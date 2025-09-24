import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Activity, CheckCircle, AlertCircle, XCircle, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminConfigAPIs() {
  const navigate = useNavigate();
  const [apis] = useState([
    {
      id: 1,
      nombre: "Sistema de Pagos",
      url: "https://api.pagos.bdlm.com",
      estado: "Activo",
      ultimaVerificacion: "2024-03-20 14:30",
      tiempoRespuesta: "150ms",
      version: "v2.1",
      tipo: "Critica"
    },
    {
      id: 2,
      nombre: "Gestión de Usuarios",
      url: "https://api.usuarios.bdlm.com",
      estado: "Activo",
      ultimaVerificacion: "2024-03-20 14:32",
      tiempoRespuesta: "89ms",
      version: "v1.8",
      tipo: "Critica"
    },
    {
      id: 3,
      nombre: "Notificaciones Push",
      url: "https://api.notifications.bdlm.com",
      estado: "Advertencia",
      ultimaVerificacion: "2024-03-20 14:25",
      tiempoRespuesta: "890ms",
      version: "v1.3",
      tipo: "Secundaria"
    },
    {
      id: 4,
      nombre: "Monitoreo Sensores",
      url: "https://api.iot.bdlm.com",
      estado: "Inactivo",
      ultimaVerificacion: "2024-03-20 13:45",
      tiempoRespuesta: "Timeout",
      version: "v2.0",
      tipo: "Opcional"
    },
    {
      id: 5,
      nombre: "Gestión Documental",
      url: "https://api.docs.bdlm.com",
      estado: "Activo",
      ultimaVerificacion: "2024-03-20 14:33",
      tiempoRespuesta: "230ms",
      version: "v1.5",
      tipo: "Secundaria"
    }
  ]);

  const getStatusIcon = (estado: string) => {
    switch (estado) {
      case "Activo":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "Advertencia":
        return <AlertCircle className="h-4 w-4 text-orange-600" />;
      case "Inactivo":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (estado: string) => {
    switch (estado) {
      case "Activo":
        return <Badge className="bg-green-100 text-green-800 border-green-200">{estado}</Badge>;
      case "Advertencia":
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200">{estado}</Badge>;
      case "Inactivo":
        return <Badge className="bg-red-100 text-red-800 border-red-200">{estado}</Badge>;
      default:
        return <Badge variant="secondary">{estado}</Badge>;
    }
  };

  const getTipoBadge = (tipo: string) => {
    switch (tipo) {
      case "Critica":
        return <Badge variant="destructive">{tipo}</Badge>;
      case "Secundaria":
        return <Badge variant="secondary">{tipo}</Badge>;
      case "Opcional":
        return <Badge variant="outline">{tipo}</Badge>;
      default:
        return <Badge variant="secondary">{tipo}</Badge>;
    }
  };

  const statsAPIs = {
    total: apis.length,
    activas: apis.filter(api => api.estado === "Activo").length,
    advertencia: apis.filter(api => api.estado === "Advertencia").length,
    inactivas: apis.filter(api => api.estado === "Inactivo").length
  };

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
            <h1 className="text-2xl font-bold text-foreground">Estado de APIs</h1>
            <p className="text-muted-foreground">Monitoreo en tiempo real de todas las APIs del sistema</p>
          </div>
        </div>
        <Button>
          <RefreshCw className="h-4 w-4 mr-2" />
          Verificar Todo
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Activity className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{statsAPIs.total}</p>
                <p className="text-sm text-muted-foreground">APIs Registradas</p>
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
                <p className="text-2xl font-bold text-green-600">{statsAPIs.activas}</p>
                <p className="text-sm text-muted-foreground">Activas</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <AlertCircle className="h-4 w-4 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-600">{statsAPIs.advertencia}</p>
                <p className="text-sm text-muted-foreground">Con Advertencias</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="h-4 w-4 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">{statsAPIs.inactivas}</p>
                <p className="text-sm text-muted-foreground">Inactivas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* APIs List */}
      <div className="grid grid-cols-1 gap-4">
        {apis.map((api) => (
          <Card key={api.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {getStatusIcon(api.estado)}
                  <div>
                    <h3 className="text-lg font-semibold">{api.nombre}</h3>
                    <p className="text-sm text-muted-foreground">{api.url}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">Última verificación</p>
                    <p className="text-sm text-muted-foreground">{api.ultimaVerificacion}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Tiempo de respuesta</p>
                    <p className="text-sm text-muted-foreground">{api.tiempoRespuesta}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    {getStatusBadge(api.estado)}
                    {getTipoBadge(api.tipo)}
                  </div>
                  <Button variant="ghost" size="sm">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex justify-between items-center">
                  <Badge variant="outline">Versión {api.version}</Badge>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      Ver Logs
                    </Button>
                    <Button variant="ghost" size="sm">
                      Configurar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}