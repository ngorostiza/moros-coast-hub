
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
  Car,
  Eye,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  History,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

// Layers
const LAYERS = [
  { id: "security", name: "Seguridad", icon: Shield, color: "bg-red-500", description: "Cámaras, sensores y patrullas" },
  { id: "sales", name: "Ventas", icon: DollarSign, color: "bg-green-500", description: "Disponibilidad por lote" },
  { id: "legal", name: "Legales", icon: Scale, color: "bg-blue-500", description: "Documentación por lote" },
  { id: "roads", name: "Caminos", icon: Navigation, color: "bg-yellow-500", description: "Vías y servicios" },
  { id: "occupation", name: "Ocupación", icon: Users, color: "bg-purple-500", description: "Mapa de calor" },
] as const;

// Security elements data
const securityElements = [
  { id: "cam1", type: "camera", x: 15, y: 22, status: "online", name: "Cámara Entrada Principal" },
  { id: "cam2", type: "camera", x: 45, y: 55, status: "online", name: "Cámara Quincho" },
  { id: "patrol1", type: "patrol", x: 30, y: 40, status: "moving", name: "Patrulla Norte" },
  { id: "gate1", type: "gate", x: 50, y: 10, status: "closed", name: "Acceso Principal" },
];

// Roads data
const roadsElements = [
  { id: "road1", type: "main", x: 50, y: 50, condition: "good", name: "Camino Principal" },
  { id: "ditch1", type: "ditch", x: 25, y: 30, condition: "needs_repair", name: "Cuneta Norte" },
];

// Sample lot data with enhanced information
const lotData = (() => {
  const createLot = (id: number, status: "available" | "sold", sector: string) => ({
    id,
    status,
    sector,
    price: status === "available" ? 780000 + id * 1000 : null,
    legal: Math.random() > 0.3 ? "complete" : "pending" as const,
    currentOwner: status === "sold" ? `Propietario ${id}` : null,
    previousOwner: status === "sold" && Math.random() > 0.5 ? `Anterior ${id}` : null,
    saleHistory: status === "sold" ? [
      { date: "2023-06-15", price: 750000, buyer: `Propietario ${id}` },
      ...(Math.random() > 0.5 ? [{ date: "2020-03-20", price: 650000, buyer: `Anterior ${id}` }] : [])
    ] : [],
    legalDocs: {
      deed: Math.random() > 0.2,
      survey: Math.random() > 0.1,
      permits: Math.random() > 0.3,
    }
  });

  const topRow = [72, 73, 74, 75].map((id) => createLot(id, id === 74 ? "available" : "sold", "Del Campo"));
  const delCampo = Array.from({ length: 18 }, (_, i) => 20 + i).map((id) => createLot(id, id % 3 === 0 ? "available" : "sold", "Del Campo"));
  const elClub = [50, 51, 52, 53, 54, 55, 56, 57].map((id) => createLot(id, id % 4 === 0 ? "available" : "sold", "El Club"));
  const playaMia = [115, 116, 117, 118, 119, 120, 121, 122].map((id) => createLot(id, id === 117 || id === 121 ? "available" : "sold", "Playa Mía"));
  
  return [...topRow, ...delCampo, ...elClub, ...playaMia];
})();

type Lot = (typeof lotData)[number];
type SecurityElement = (typeof securityElements)[number];
type RoadElement = (typeof roadsElements)[number];

export default function GISMap() {
  const [activeLayers, setActiveLayers] = useState<string[]>(["security", "sales"]);
  const [selectedLot, setSelectedLot] = useState<number | null>(null);
  const [selectedElement, setSelectedElement] = useState<{ type: string; data: any } | null>(null);

  const selectedLotData: Lot | undefined = useMemo(
    () => lotData.find((l) => l.id === selectedLot),
    [selectedLot]
  );

  const toggleLayer = (id: string) =>
    setActiveLayers((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const lotBgByLayer = (lot: Lot) => {
    if (activeLayers.includes("sales")) return lot.status === "available" ? "bg-green-300/80" : "bg-gray-300/70";
    if (activeLayers.includes("legal")) return lot.legalDocs.deed && lot.legalDocs.survey && lot.legalDocs.permits ? "bg-green-300/80" : "bg-red-300/80";
    return "bg-white/50";
  };

  const handleSecurityElementClick = (element: SecurityElement) => {
    setSelectedElement({ type: "security", data: element });
    setSelectedLot(null);
  };

  const handleRoadElementClick = (element: RoadElement) => {
    setSelectedElement({ type: "road", data: element });
    setSelectedLot(null);
  };

  const handleLotClick = (lotId: number) => {
    setSelectedLot(lotId);
    setSelectedElement(null);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" /> Sistema GIS - Etapa 1
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {LAYERS.map((layer) => (
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

          {/* MAP */}
          <div className="relative rounded-lg border-2 border-dashed border-border overflow-hidden h-[500px] bg-gradient-to-br from-emerald-50 to-blue-50">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-sky-100/40 via-emerald-100/30 to-blue-200/40" />
            
            {/* Coast line */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-blue-300/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-blue-400/70" />

            {/* Access and Airstrip */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-10 bg-gray-200/80 rounded border border-gray-400 flex items-center justify-center text-xs font-medium">
              ACCESO
            </div>
            <div className="absolute top-16 left-1/3 w-48 h-6 bg-gray-300/70 rounded border border-gray-500 flex items-center justify-center text-xs font-medium">
              PISTA DE ATERRIZAJE
            </div>

            {/* DEL CAMPO sector */}
            <div className="absolute top-28 left-12">
              <div className="relative rounded-lg border-2 border-red-300 bg-pink-100/60 p-3">
                {/* Top row 72-75 */}
                <div className="grid grid-cols-4 gap-1 mb-2">
                  {[72, 73, 74, 75].map((id) => {
                    const lot = lotData.find((l) => l.id === id)!;
                    return (
                      <div
                        key={id}
                        className={`w-10 h-8 text-xs flex items-center justify-center border border-gray-400 rounded cursor-pointer transition-all hover:scale-110 hover:shadow-md ${lotBgByLayer(lot)}`}
                        onClick={() => handleLotClick(id)}
                        title={`Lote ${id}`}
                      >
                        {id}
                      </div>
                    );
                  })}
                </div>
                {/* Grid 20-37 */}
                <div className="grid grid-cols-6 gap-1">
                  {Array.from({ length: 18 }, (_, i) => 20 + i).map((id) => {
                    const lot = lotData.find((l) => l.id === id)!;
                    return (
                      <div
                        key={id}
                        className={`w-10 h-8 text-xs flex items-center justify-center border border-gray-400 rounded cursor-pointer transition-all hover:scale-110 hover:shadow-md ${lotBgByLayer(lot)}`}
                        onClick={() => handleLotClick(id)}
                        title={`Lote ${id}`}
                      >
                        {id}
                      </div>
                    );
                  })}
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm font-bold text-gray-700">DEL CAMPO</div>
              </div>
            </div>

            {/* EL CLUB sector */}
            <div className="absolute bottom-36 left-8">
              <div className="relative rounded-lg border-2 border-yellow-400 bg-yellow-100/60 p-3">
                <div className="grid grid-cols-4 gap-1">
                  {[50, 51, 52, 53, 54, 55, 56, 57].map((id) => {
                    const lot = lotData.find((l) => l.id === id)!;
                    return (
                      <div
                        key={id}
                        className={`w-8 h-8 text-xs flex items-center justify-center border border-gray-400 rounded cursor-pointer transition-all hover:scale-110 hover:shadow-md ${lotBgByLayer(lot)}`}
                        onClick={() => handleLotClick(id)}
                        title={`Lote ${id}`}
                      >
                        {id}
                      </div>
                    );
                  })}
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm font-bold text-gray-700">EL CLUB</div>
              </div>
            </div>

            {/* PLAYA MÍA sector */}
            <div className="absolute bottom-14 right-16">
              <div className="relative rounded-lg border-2 border-orange-400 bg-orange-100/60 p-3">
                <div className="grid grid-cols-4 gap-1">
                  {[115, 116, 117, 118, 119, 120, 121, 122].map((id) => {
                    const lot = lotData.find((l) => l.id === id)!;
                    return (
                      <div
                        key={id}
                        className={`w-8 h-8 text-xs flex items-center justify-center border border-gray-400 rounded cursor-pointer transition-all hover:scale-110 hover:shadow-md ${lotBgByLayer(lot)}`}
                        onClick={() => handleLotClick(id)}
                        title={`Lote ${id}`}
                      >
                        {id}
                      </div>
                    );
                  })}
                </div>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm font-bold text-gray-700">PLAYA MÍA</div>
              </div>
            </div>

            {/* GREEN SPACE */}
            <div className="absolute top-32 right-12 w-32 h-24 bg-green-200/70 rounded-lg border-2 border-green-400" />
            <div className="absolute top-[calc(32px+6rem)] right-12 text-sm font-bold text-gray-700">ESPACIO VERDE</div>

            {/* SECURITY ELEMENTS */}
            {activeLayers.includes("security") && securityElements.map((element) => (
              <div
                key={element.id}
                className={`absolute w-4 h-4 rounded-full cursor-pointer transition-transform hover:scale-125 ${
                  element.type === "camera" ? "bg-red-500" :
                  element.type === "patrol" ? "bg-green-500 animate-pulse" :
                  "bg-blue-500"
                }`}
                style={{ left: `${element.x}%`, top: `${element.y}%` }}
                onClick={() => handleSecurityElementClick(element)}
                title={element.name}
              >
                {element.type === "camera" && <Camera className="w-3 h-3 text-white" />}
                {element.type === "patrol" && <Car className="w-3 h-3 text-white" />}
                {element.type === "gate" && <Shield className="w-3 h-3 text-white" />}
              </div>
            ))}

            {/* ROADS */}
            {activeLayers.includes("roads") && (
              <>
                <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-400/60 rounded" />
                <div className="absolute top-0 bottom-0 left-1/2 w-2 bg-gray-400/60 rounded" />
                {roadsElements.map((element) => (
                  <div
                    key={element.id}
                    className={`absolute w-6 h-6 rounded cursor-pointer transition-transform hover:scale-125 ${
                      element.condition === "good" ? "bg-green-500" : "bg-orange-500"
                    }`}
                    style={{ left: `${element.x}%`, top: `${element.y}%` }}
                    onClick={() => handleRoadElementClick(element)}
                    title={element.name}
                  >
                    <Navigation className="w-4 h-4 text-white" />
                  </div>
                ))}
              </>
            )}

            {/* OCCUPATION HEAT */}
            {activeLayers.includes("occupation") && (
              <>
                <div className="absolute w-12 h-12 bg-red-500/30 rounded-full top-1/3 left-1/3 animate-pulse" />
                <div className="absolute w-10 h-10 bg-orange-500/30 rounded-full top-1/2 right-1/4 animate-pulse" />
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Selected Lot Details */}
      {selectedLotData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Lote #{selectedLotData.id} - {selectedLotData.sector}</span>
              <Button variant="outline" size="sm" onClick={() => setSelectedLot(null)}>
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Sales Info */}
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <DollarSign className="h-4 w-4" /> Información de Ventas
                </h4>
                <Badge variant={selectedLotData.status === "available" ? "default" : "secondary"}>
                  {selectedLotData.status === "available" ? "Disponible" : "Vendido"}
                </Badge>
                {selectedLotData.price && (
                  <p className="text-sm">${selectedLotData.price.toLocaleString()}</p>
                )}
                {selectedLotData.currentOwner && (
                  <p className="text-sm"><strong>Propietario:</strong> {selectedLotData.currentOwner}</p>
                )}
                {selectedLotData.previousOwner && (
                  <p className="text-sm"><strong>Propietario Anterior:</strong> {selectedLotData.previousOwner}</p>
                )}
              </div>

              {/* Legal Status */}
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <Scale className="h-4 w-4" /> Estado Legal
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {selectedLotData.legalDocs.deed ? <CheckCircle className="h-4 w-4 text-green-500" /> : <AlertTriangle className="h-4 w-4 text-red-500" />}
                    <span className="text-sm">Escritura</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedLotData.legalDocs.survey ? <CheckCircle className="h-4 w-4 text-green-500" /> : <AlertTriangle className="h-4 w-4 text-red-500" />}
                    <span className="text-sm">Plano de Mensura</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedLotData.legalDocs.permits ? <CheckCircle className="h-4 w-4 text-green-500" /> : <AlertTriangle className="h-4 w-4 text-red-500" />}
                    <span className="text-sm">Permisos</span>
                  </div>
                </div>
              </div>

              {/* Sale History */}
              {selectedLotData.saleHistory.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <History className="h-4 w-4" /> Historial de Ventas
                  </h4>
                  <div className="space-y-2">
                    {selectedLotData.saleHistory.map((sale, index) => (
                      <div key={index} className="text-sm p-2 bg-muted rounded">
                        <p><strong>{sale.date}</strong></p>
                        <p>${sale.price.toLocaleString()}</p>
                        <p>{sale.buyer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Selected Element Details */}
      {selectedElement && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{selectedElement.data.name}</span>
              <Button variant="outline" size="sm" onClick={() => setSelectedElement(null)}>
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedElement.type === "security" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Tipo</p>
                  <Badge variant="outline">
                    {selectedElement.data.type === "camera" ? "Cámara" :
                     selectedElement.data.type === "patrol" ? "Patrulla" : "Puerta"}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Estado</p>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      selectedElement.data.status === "online" ? "bg-green-500" :
                      selectedElement.data.status === "moving" ? "bg-blue-500" : "bg-gray-500"
                    }`} />
                    <span className="text-sm">{selectedElement.data.status}</span>
                  </div>
                </div>
                {selectedElement.data.type === "camera" && (
                  <div className="col-span-2">
                    <p className="text-sm text-muted-foreground mb-2">Feed de Cámara</p>
                    <div className="bg-black/90 rounded p-4 text-white text-center">
                      <Camera className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm">Vista en vivo disponible</p>
                    </div>
                  </div>
                )}
              </div>
            )}
            {selectedElement.type === "road" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Tipo</p>
                  <Badge variant="outline">
                    {selectedElement.data.type === "main" ? "Camino Principal" : "Cuneta"}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Condición</p>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      selectedElement.data.condition === "good" ? "bg-green-500" : "bg-orange-500"
                    }`} />
                    <span className="text-sm">
                      {selectedElement.data.condition === "good" ? "Buen estado" : "Requiere reparación"}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Capas Activas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {LAYERS.filter((l) => activeLayers.includes(l.id)).map((layer) => (
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
