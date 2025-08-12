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

// Data (Stage 1)
const lotData = (() => {
  const topRow = [72, 73, 74, 75].map((id) => ({ id, status: id === 74 ? "available" : "sold", price: id === 74 ? 850000 : null, legal: id === 75 ? "pending" : "complete" as const }));
  const delCampo = Array.from({ length: 18 }, (_, i) => 20 + i).map((id) => ({
    id,
    status: id % 3 === 0 ? "available" : "sold",
    price: id % 3 === 0 ? 780000 + id * 1000 : null,
    legal: id % 5 === 0 ? "pending" : "complete" as const,
  }));
  const elClub = [50, 51, 52, 53, 54, 55, 56, 57].map((id) => ({ id, status: id % 4 === 0 ? "available" : "sold", price: id % 4 === 0 ? 950000 : null, legal: "complete" as const }));
  const playaMia = [115, 116, 117, 118, 119, 120, 121, 122].map((id) => ({ id, status: id === 117 || id === 121 ? "available" : "sold", price: id === 117 || id === 121 ? 1200000 : null, legal: id === 117 ? "pending" : "complete" as const }));
  return [...topRow, ...delCampo, ...elClub, ...playaMia];
})();

type Lot = (typeof lotData)[number];

export default function GISMap() {
  const [activeLayers, setActiveLayers] = useState<string[]>(["security", "sales"]);
  const [selectedLot, setSelectedLot] = useState<number | null>(null);

  const selectedLotData: Lot | undefined = useMemo(
    () => lotData.find((l) => l.id === selectedLot),
    [selectedLot]
  );

  const toggleLayer = (id: string) =>
    setActiveLayers((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const lotBgByLayer = (lot: Lot) => {
    if (activeLayers.includes("sales")) return lot.status === "available" ? "bg-green-300/80" : "bg-gray-300/70";
    if (activeLayers.includes("legal")) return lot.legal === "complete" ? "bg-green-300/80" : lot.legal === "pending" ? "bg-orange-300/80" : "bg-red-300/80";
    return "bg-white/50";
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
          <div className="relative rounded-lg border-2 border-dashed border-border overflow-hidden h-[440px] bg-gradient-to-br from-emerald-50 to-blue-50">
            {/* Sky to water gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-100/40 to-blue-200/30" />
            {/* Coast line */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-blue-300 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-blue-400/50" />

            {/* Access and Airstrip */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-8 bg-blue-200/60 rounded border border-blue-300 flex items-center justify-center text-[10px] font-medium">
              ACCESO
            </div>
            <div className="absolute top-8 left-1/3 w-40 h-4 bg-gray-300/60 rounded border border-gray-400 flex items-center justify-center text-[10px] font-medium">
              PISTA DE ATERRIZAJE
            </div>

            {/* DEL CAMPO (top row 72-75 + grid 20-37) */}
            <div className="absolute top-20 left-10">
              <div className="relative rounded border border-red-300 bg-pink-200/50 p-2">
                {/* 72-75 */}
                <div className="grid grid-cols-4 gap-1">
                  {[72, 73, 74, 75].map((id) => {
                    const lot = lotData.find((l) => l.id === id)!;
                    return (
                      <div
                        key={id}
                        className={`w-8 h-6 text-[10px] flex items-center justify-center border border-gray-300 rounded-sm cursor-pointer transition-transform hover:scale-110 ${lotBgByLayer(lot)}`}
                        onClick={() => setSelectedLot(id)}
                        title={`Lote ${id}`}
                      >
                        {id}
                      </div>
                    );
                  })}
                </div>
                {/* 20-37 (6x3) */}
                <div className="mt-2 grid grid-cols-6 gap-1">
                  {Array.from({ length: 18 }, (_, i) => 20 + i).map((id) => {
                    const lot = lotData.find((l) => l.id === id)!;
                    return (
                      <div
                        key={id}
                        className={`w-8 h-6 text-[10px] flex items-center justify-center border border-gray-300 rounded-sm cursor-pointer transition-transform hover:scale-110 ${lotBgByLayer(lot)}`}
                        onClick={() => setSelectedLot(id)}
                        title={`Lote ${id}`}
                      >
                        {id}
                      </div>
                    );
                  })}
                </div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold">DEL CAMPO</div>
              </div>
            </div>

            {/* EL CLUB (50-57, 3x3 minus one) */}
            <div className="absolute bottom-28 left-6">
              <div className="relative rounded border border-yellow-300 bg-yellow-200/50 p-2">
                <div className="grid grid-cols-3 gap-1">
                  {[50, 51, 52, 53, 54, 55, 56, 57].map((id) => {
                    const lot = lotData.find((l) => l.id === id)!;
                    return (
                      <div
                        key={id}
                        className={`w-6 h-6 text-[10px] flex items-center justify-center border border-gray-300 rounded-sm cursor-pointer transition-transform hover:scale-110 ${lotBgByLayer(lot)}`}
                        onClick={() => setSelectedLot(id)}
                        title={`Lote ${id}`}
                      >
                        {id}
                      </div>
                    );
                  })}
                </div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold">EL CLUB</div>
              </div>
            </div>

            {/* PLAYA MÍA (115-122, 4x2) */}
            <div className="absolute bottom-10 right-12">
              <div className="relative rounded border border-orange-300 bg-orange-200/50 p-2">
                <div className="grid grid-cols-4 gap-1">
                  {[115, 116, 117, 118, 119, 120, 121, 122].map((id) => {
                    const lot = lotData.find((l) => l.id === id)!;
                    return (
                      <div
                        key={id}
                        className={`w-6 h-6 text-[10px] flex items-center justify-center border border-gray-300 rounded-sm cursor-pointer transition-transform hover:scale-110 ${lotBgByLayer(lot)}`}
                        onClick={() => setSelectedLot(id)}
                        title={`Lote ${id}`}
                      >
                        {id}
                      </div>
                    );
                  })}
                </div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold">PLAYA MÍA</div>
              </div>
            </div>

            {/* ESPACIO VERDE */}
            <div className="absolute top-24 right-8 w-24 h-20 bg-green-200/60 rounded border border-green-300" />
            <div className="absolute top-[calc(24px+5rem)] right-8 text-xs font-bold">ESPACIO VERDE</div>

            {/* SECURITY POINTS (simple mock) */}
            {activeLayers.includes("security") && (
              <>
                <div className="absolute left-[15%] top-[22%] w-3 h-3 rounded-full bg-red-500" title="Punto de Seguridad" />
                <div className="absolute left-[45%] top-[55%] w-3 h-3 rounded-full bg-green-500 animate-pulse" title="Patrulla" />
                <div className="absolute right-[20%] top-[40%] w-3 h-3 rounded-full bg-blue-500 animate-bounce" title="Sensor" />
              </>
            )}

            {/* Roads */}
            {activeLayers.includes("roads") && (
              <>
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-400/60" />
                <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-gray-400/60" />
              </>
            )}

            {/* Occupation heat */}
            {activeLayers.includes("occupation") && (
              <>
                <div className="absolute w-10 h-10 bg-red-500/30 rounded-full top-1/3 left-1/3" />
                <div className="absolute w-8 h-8 bg-orange-500/30 rounded-full top-1/2 right-1/4" />
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
              <span>Lote #{selectedLotData.id}</span>
              <Button variant="outline" size="sm" onClick={() => setSelectedLot(null)}>
                Cerrar
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Ventas</p>
                <Badge variant={selectedLotData.status === "available" ? "default" : "secondary"}>
                  {selectedLotData.status === "available" ? "Disponible" : "Vendido"}
                </Badge>
                {selectedLotData.price && (
                  <p className="mt-1 text-sm">${selectedLotData.price.toLocaleString()}</p>
                )}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Estado Legal</p>
                <div className="flex items-center gap-2 mt-1">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      selectedLotData.legal === "complete"
                        ? "bg-green-500"
                        : selectedLotData.legal === "pending"
                        ? "bg-orange-500"
                        : "bg-red-500"
                    }`}
                  />
                  <span className="text-sm">
                    {selectedLotData.legal === "complete"
                      ? "Documentación Completa"
                      : selectedLotData.legal === "pending"
                      ? "Pendiente"
                      : "Faltante"}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Capas Activas</p>
                <div className="flex gap-2 mt-1 flex-wrap">
                  {LAYERS.filter((l) => activeLayers.includes(l.id)).map((l) => (
                    <Badge key={l.id} variant="outline" className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${l.color}`} /> {l.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
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
