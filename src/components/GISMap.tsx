import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Shield, 
  DollarSign, 
  Scale, 
  Navigation,
  Users,
  Camera,
  Zap,
  Eye,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { useState } from "react";

const layers = [
  { 
    id: "security", 
    name: "Seguridad", 
    icon: Shield, 
    active: true, 
    color: "bg-red-500",
    description: "Cámaras, sensores y patrullas en tiempo real"
  },
  { 
    id: "sales", 
    name: "Ventas", 
    icon: DollarSign, 
    active: false, 
    color: "bg-green-500",
    description: "Disponibilidad y estado de lotes para venta"
  },
  { 
    id: "legal", 
    name: "Legales", 
    icon: Scale, 
    active: false, 
    color: "bg-blue-500",
    description: "Estado de documentación por lote"
  },
  { 
    id: "roads", 
    name: "Caminos", 
    icon: Navigation, 
    active: false, 
    color: "bg-yellow-500",
    description: "Estado de vías y servicios comunitarios"
  },
  { 
    id: "occupation", 
    name: "Ocupación", 
    icon: Users, 
    active: false, 
    color: "bg-purple-500",
    description: "Mapa de calor - distribución de personas"
  }
];

const securityPoints = [
  { id: 1, x: 15, y: 20, type: "camera", status: "online", name: "Acceso Principal" },
  { id: 2, x: 45, y: 35, type: "camera", status: "online", name: "Playa Mía" },
  { id: 3, x: 70, y: 60, type: "patrol", status: "moving", name: "Patrulla 1" },
  { id: 4, x: 30, y: 70, type: "sensor", status: "online", name: "Hangar Norte" },
  { id: 5, x: 80, y: 25, type: "camera", status: "offline", name: "Costa Este" },
];

const legalStatus = [
  { sector: "Del Campo", total: 45, complete: 42, pending: 2, missing: 1 },
  { sector: "Costa Norte", total: 28, complete: 25, pending: 3, missing: 0 },
  { sector: "El Club", total: 15, complete: 15, pending: 0, missing: 0 },
  { sector: "Playa Mía", total: 12, complete: 10, pending: 2, missing: 0 }
];

export default function GISMap() {
  const [activeLayers, setActiveLayers] = useState(["security"]);
  const [selectedSector, setSelectedSector] = useState<string | null>(null);

  const toggleLayer = (layerId: string) => {
    setActiveLayers(prev => 
      prev.includes(layerId) 
        ? prev.filter(id => id !== layerId)
        : [...prev, layerId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Layer Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Sistema GIS - Etapa 1
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {layers.map((layer) => (
              <Button
                key={layer.id}
                variant={activeLayers.includes(layer.id) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleLayer(layer.id)}
                className="flex items-center gap-2"
              >
                <div className={`w-3 h-3 rounded-full ${layer.color}`} />
                <layer.icon className="h-4 w-4" />
                {layer.name}
              </Button>
            ))}
          </div>
          
          {/* Map Container */}
          <div className="relative bg-gradient-to-br from-emerald-50 to-blue-50 rounded-lg border-2 border-dashed border-border p-8 h-96 overflow-hidden">
            {/* Simulated Map Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-100/50 to-blue-200/30" />
            
            {/* Coast Line */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-blue-300 to-transparent rounded-b-lg" />
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-blue-400/50" />
            
            {/* Access and Administration */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-8 bg-blue-200/60 rounded border border-blue-300 flex items-center justify-center text-xs font-medium">
              ACCESO
            </div>
            
            {/* Airstrip */}
            <div className="absolute top-6 left-1/3 w-32 h-4 bg-gray-300/60 rounded border border-gray-400 flex items-center justify-center text-xs font-medium">
              PISTA DE ATERRIZAJE
            </div>
            
            {/* Del Campo Sector - Northern red area */}
            <div className="absolute top-16 left-8 w-40 h-32 bg-red-200/60 rounded border border-red-300 cursor-pointer hover:bg-red-200/80"
                 onClick={() => setSelectedSector("Del Campo")}>
              <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                {/* Simulate lots 72-97 */}
                {Array.from({length: 16}, (_, i) => (
                  <div key={i} className="bg-red-300/40 rounded-sm text-xs flex items-center justify-center">
                    {72 + i}
                  </div>
                ))}
              </div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-bold">
                DEL CAMPO
              </div>
            </div>
            
            {/* El Club Sector - Yellow area */}
            <div className="absolute bottom-28 left-4 w-24 h-20 bg-yellow-200/60 rounded border border-yellow-300 cursor-pointer hover:bg-yellow-200/80"
                 onClick={() => setSelectedSector("El Club")}>
              <div className="absolute inset-0 grid grid-cols-3 gap-px p-1">
                {Array.from({length: 9}, (_, i) => (
                  <div key={i} className="bg-yellow-300/40 rounded-sm text-xs flex items-center justify-center">
                    {50 + i}
                  </div>
                ))}
              </div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-bold">
                EL CLUB
              </div>
            </div>
            
            {/* Playa Mía - Coastal area */}
            <div className="absolute bottom-8 right-12 w-28 h-16 bg-orange-200/60 rounded border border-orange-300 cursor-pointer hover:bg-orange-200/80"
                 onClick={() => setSelectedSector("Playa Mía")}>
              <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                {Array.from({length: 8}, (_, i) => (
                  <div key={i} className="bg-orange-300/40 rounded-sm text-xs flex items-center justify-center">
                    {115 + i}
                  </div>
                ))}
              </div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-bold">
                PLAYA MÍA
              </div>
            </div>
            
            {/* Green Spaces */}
            <div className="absolute top-20 right-8 w-20 h-16 bg-green-200/60 rounded border border-green-300">
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-bold">
                ESPACIO VERDE
              </div>
            </div>
            
            <div className="absolute bottom-32 center w-24 h-12 bg-green-200/60 rounded border border-green-300">
            </div>
            
            {/* Central lots area */}
            <div className="absolute top-24 left-20 w-48 h-24 bg-pink-200/60 rounded border border-pink-300">
              <div className="absolute inset-0 grid grid-cols-6 gap-px p-1">
                {Array.from({length: 18}, (_, i) => (
                  <div key={i} className="bg-pink-300/40 rounded-sm text-xs flex items-center justify-center">
                    {20 + i}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Security Layer */}
            {activeLayers.includes("security") && securityPoints.map((point) => (
              <div
                key={point.id}
                className={`absolute w-3 h-3 rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:scale-150 ${
                  point.status === "online" ? "bg-green-500 animate-pulse" : 
                  point.status === "moving" ? "bg-blue-500 animate-bounce" : "bg-red-500"
                }`}
                style={{ left: `${point.x}%`, top: `${point.y}%` }}
                title={`${point.name} - ${point.status}`}
              />
            ))}
            
            {/* Occupation Heat Map */}
            {activeLayers.includes("occupation") && (
              <>
                <div className="absolute w-8 h-8 bg-red-400/40 rounded-full top-1/4 left-1/3 animate-pulse" />
                <div className="absolute w-6 h-6 bg-orange-400/40 rounded-full top-1/2 right-1/4 animate-pulse" />
                <div className="absolute w-10 h-10 bg-red-500/40 rounded-full bottom-1/3 left-1/2 animate-pulse" />
              </>
            )}
            
            {/* Roads Layer */}
            {activeLayers.includes("roads") && (
              <>
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-400/60" />
                <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-gray-400/60" />
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Selected Sector Details */}
      {selectedSector && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Detalles: {selectedSector}</span>
              <Button variant="outline" size="sm" onClick={() => setSelectedSector(null)}>
                Cerrar
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Show legal status for selected sector */}
            {legalStatus.find(s => s.sector === selectedSector) && (
              <div className="space-y-3">
                <h4 className="font-medium">Estado Legal de Documentación</h4>
                {(() => {
                  const sectorData = legalStatus.find(s => s.sector === selectedSector)!;
                  return (
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center p-3 bg-emerald-50 rounded">
                        <div className="text-2xl font-bold text-emerald-700">{sectorData.complete}</div>
                        <div className="text-emerald-600">Completa</div>
                      </div>
                      <div className="text-center p-3 bg-orange-50 rounded">
                        <div className="text-2xl font-bold text-orange-700">{sectorData.pending}</div>
                        <div className="text-orange-600">Pendiente</div>
                      </div>
                      <div className="text-center p-3 bg-red-50 rounded">
                        <div className="text-2xl font-bold text-red-700">{sectorData.missing}</div>
                        <div className="text-red-600">Faltante</div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </CardContent>
        </Card>
      )}
      
      {/* Layer Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Capas Activas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {layers.filter(layer => activeLayers.includes(layer.id)).map((layer) => (
              <div key={layer.id} className="flex items-center gap-3 text-sm">
                <div className={`w-3 h-3 rounded-full ${layer.color}`} />
                <span className="font-medium">{layer.name}:</span>
                <span className="text-muted-foreground">{layer.description}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}