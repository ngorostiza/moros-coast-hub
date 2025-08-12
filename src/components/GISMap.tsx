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

const lotData = [
  // Del Campo sector (72-97)
  { id: 72, x: 12, y: 24, status: "sold", price: null, legal: "complete" },
  { id: 73, x: 16, y: 24, status: "sold", price: null, legal: "complete" },
  { id: 74, x: 20, y: 24, status: "available", price: 850000, legal: "complete" },
  { id: 75, x: 24, y: 24, status: "sold", price: null, legal: "pending" },
  { id: 76, x: 12, y: 28, status: "sold", price: null, legal: "complete" },
  { id: 20, x: 16, y: 28, status: "available", price: 750000, legal: "complete" },
  { id: 21, x: 20, y: 28, status: "sold", price: null, legal: "complete" },
  { id: 22, x: 24, y: 28, status: "sold", price: null, legal: "missing" },
  
  // El Club sector (50-58)
  { id: 50, x: 8, y: 50, status: "sold", price: null, legal: "complete" },
  { id: 51, x: 12, y: 50, status: "sold", price: null, legal: "complete" },
  { id: 52, x: 16, y: 50, status: "sold", price: null, legal: "complete" },
  { id: 53, x: 8, y: 54, status: "sold", price: null, legal: "complete" },
  { id: 54, x: 12, y: 54, status: "available", price: 950000, legal: "complete" },
  { id: 55, x: 16, y: 54, status: "sold", price: null, legal: "complete" },
  
  // Playa Mía sector (115-122)
  { id: 115, x: 85, y: 45, status: "sold", price: null, legal: "complete" },
  { id: 116, x: 89, y: 45, status: "sold", price: null, legal: "complete" },
  { id: 117, x: 93, y: 45, status: "available", price: 1200000, legal: "pending" },
  { id: 118, x: 97, y: 45, status: "sold", price: null, legal: "complete" },
  { id: 119, x: 85, y: 49, status: "sold", price: null, legal: "complete" },
  { id: 120, x: 89, y: 49, status: "sold", price: null, legal: "complete" },
  { id: 121, x: 93, y: 49, status: "available", price: 1150000, legal: "complete" },
  { id: 122, x: 97, y: 49, status: "sold", price: null, legal: "complete" },
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
  const [selectedLot, setSelectedLot] = useState<number | null>(null);

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
            
            {/* Del Campo Sector - Individual lots */}
            <div className="absolute top-16 left-8 w-40 h-32 rounded border border-red-300">
              {lotData.filter(lot => lot.id >= 72 && lot.id <= 97).slice(0, 8).map((lot, i) => (
                <div 
                  key={lot.id}
                  className={`absolute w-8 h-6 text-xs flex items-center justify-center cursor-pointer border border-gray-300 rounded-sm transition-all hover:scale-110 ${
                    activeLayers.includes("sales") ? 
                      (lot.status === "available" ? "bg-green-300/80" : "bg-gray-300/80") :
                    activeLayers.includes("legal") ?
                      (lot.legal === "complete" ? "bg-green-300/80" : 
                       lot.legal === "pending" ? "bg-orange-300/80" : "bg-red-300/80") :
                      "bg-pink-300/60"
                  }`}
                  style={{ 
                    left: `${(i % 4) * 10}px`, 
                    top: `${Math.floor(i / 4) * 16}px` 
                  }}
                  onClick={() => setSelectedLot(lot.id)}
                >
                  {lot.id}
                </div>
              ))}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-bold">
                DEL CAMPO
              </div>
            </div>
            
            {/* El Club Sector - Individual lots */}
            <div className="absolute bottom-28 left-4 w-24 h-20 rounded border border-yellow-300">
              {lotData.filter(lot => lot.id >= 50 && lot.id <= 58).map((lot, i) => (
                <div 
                  key={lot.id}
                  className={`absolute w-6 h-6 text-xs flex items-center justify-center cursor-pointer border border-gray-300 rounded-sm transition-all hover:scale-110 ${
                    activeLayers.includes("sales") ? 
                      (lot.status === "available" ? "bg-green-300/80" : "bg-gray-300/80") :
                    activeLayers.includes("legal") ?
                      (lot.legal === "complete" ? "bg-green-300/80" : 
                       lot.legal === "pending" ? "bg-orange-300/80" : "bg-red-300/80") :
                      "bg-yellow-300/60"
                  }`}
                  style={{ 
                    left: `${(i % 3) * 8}px`, 
                    top: `${Math.floor(i / 3) * 10}px` 
                  }}
                  onClick={() => setSelectedLot(lot.id)}
                >
                  {lot.id}
                </div>
              ))}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-bold">
                EL CLUB
              </div>
            </div>
            
            {/* Playa Mía - Individual lots */}
            <div className="absolute bottom-8 right-12 w-28 h-16 rounded border border-orange-300">
              {lotData.filter(lot => lot.id >= 115 && lot.id <= 122).map((lot, i) => (
                <div 
                  key={lot.id}
                  className={`absolute w-6 h-6 text-xs flex items-center justify-center cursor-pointer border border-gray-300 rounded-sm transition-all hover:scale-110 ${
                    activeLayers.includes("sales") ? 
                      (lot.status === "available" ? "bg-green-300/80" : "bg-gray-300/80") :
                    activeLayers.includes("legal") ?
                      (lot.legal === "complete" ? "bg-green-300/80" : 
                       lot.legal === "pending" ? "bg-orange-300/80" : "bg-red-300/80") :
                      "bg-orange-300/60"
                  }`}
                  style={{ 
                    left: `${(i % 4) * 7}px`, 
                    top: `${Math.floor(i / 4) * 8}px` 
                  }}
                  onClick={() => setSelectedLot(lot.id)}
                >
                  {lot.id}
                </div>
              ))}
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

      {/* Selected Lot Details */}
      {selectedLot && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Lote #{selectedLot}</span>
              <Button variant="outline" size="sm" onClick={() => setSelectedLot(null)}>
                Cerrar
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              const lot = lotData.find(l => l.id === selectedLot);
              if (!lot) return <p>Información no disponible</p>;
              
              return (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground">Estado</h4>
                      <Badge variant={lot.status === "available" ? "default" : "secondary"}>
                        {lot.status === "available" ? "Disponible" : "Vendido"}
                      </Badge>
                    </div>
                    {lot.price && (
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground">Precio</h4>
                        <p className="font-semibold">${lot.price.toLocaleString()}</p>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">Estado Legal</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <div className={`w-3 h-3 rounded-full ${
                        lot.legal === "complete" ? "bg-green-500" :
                        lot.legal === "pending" ? "bg-orange-500" : "bg-red-500"
                      }`} />
                      <span className="text-sm">
                        {lot.legal === "complete" ? "Documentación Completa" :
                         lot.legal === "pending" ? "Documentos Pendientes" : "Documentos Faltantes"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })()}
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