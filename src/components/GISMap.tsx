import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Layers, Info, Maximize2, X, Edit3, Eye, EyeOff } from "lucide-react";
import { useState, useRef, useCallback } from "react";

// Lot data with status and area information
const initialLotData = new Map([
  // West Group (Del Campo & Las Flores bands)
  [1, { area: 742, status: "sold" }], [2, { area: 732, status: "sold" }], [3, { area: 730, status: "sold" }],
  [4, { area: 756, status: "sold" }], [5, { area: 732, status: "sold" }], [6, { area: 764, status: "sold" }],
  [7, { area: 770, status: "sold" }], [8, { area: 751, status: "sold" }], [9, { area: 713, status: "sold" }],
  [10, { area: 762, status: "sold" }], [11, { area: 734, status: "sold" }], [12, { area: 812, status: "sold" }],
  [13, { area: 819, status: "sold" }], [14, { area: 751, status: "sold" }], [15, { area: 862, status: "sold" }],
  [16, { area: 812, status: "sold" }], [17, { area: 803, status: "sold" }], [18, { area: 772, status: "sold" }],
  [19, { area: 780, status: "sold" }], [20, { area: 758, status: "sold" }], [21, { area: 753, status: "sold" }],
  [22, { area: 762, status: "sold" }], [23, { area: 721, status: "sold" }], [24, { area: 766, status: "sold" }],
  [25, { area: 731, status: "sold" }], [26, { area: 718, status: "sold" }], [27, { area: 726, status: "sold" }],
  [28, { area: 716, status: "sold" }], [29, { area: 725, status: "sold" }], [30, { area: 709, status: "sold" }],
  [31, { area: 725, status: "sold" }], [32, { area: 726, status: "sold" }], [33, { area: 732, status: "sold" }],
  [34, { area: 912, status: "sold" }], [35, { area: 752, status: "sold" }], [36, { area: 725, status: "sold" }],
  [37, { area: 735, status: "sold" }], [38, { area: 798, status: "sold" }], [39, { area: 732, status: "sold" }],
  [40, { area: 731, status: "sold" }], [41, { area: 718, status: "sold" }], [78, { area: 716, status: "sold" }],
  [79, { area: 716, status: "sold" }], [80, { area: 716, status: "sold" }],
  
  // Central Group (Las Flores ↔ El Moro bands)
  [42, { area: 736, status: "sold" }], [43, { area: 770, status: "sold" }], [44, { area: 800, status: "sold" }],
  [45, { area: 764, status: "sold" }], [46, { area: 774, status: "sold" }], [47, { area: 789, status: "sold" }],
  [48, { area: 764, status: "sold" }], [49, { area: 772, status: "sold" }], [50, { area: 750, status: "sold" }],
  [51, { area: 756, status: "sold" }], [52, { area: 742, status: "sold" }], [53, { area: 758, status: "sold" }],
  [54, { area: 764, status: "sold" }], [55, { area: 781, status: "sold" }], [56, { area: 782, status: "sold" }],
  [57, { area: 764, status: "sold" }], [58, { area: 731, status: "sold" }], [59, { area: 780, status: "sold" }],
  [60, { area: 815, status: "sold" }], [61, { area: 731, status: "sold" }], [62, { area: 780, status: "sold" }],
  [63, { area: 772, status: "sold" }], [64, { area: 745, status: "sold" }], [65, { area: 781, status: "sold" }],
  [66, { area: 775, status: "sold" }], [67, { area: 764, status: "sold" }], [68, { area: 752, status: "sold" }],
  [69, { area: 799, status: "sold" }], [70, { area: 764, status: "sold" }], [71, { area: 799, status: "sold" }],
  [72, { area: 772, status: "sold" }], [73, { area: 764, status: "sold" }], [74, { area: 770, status: "sold" }],
  [75, { area: 772, status: "sold" }], [76, { area: 764, status: "sold" }], [77, { area: 789, status: "sold" }],
  [82, { area: 781, status: "sold" }], [83, { area: 775, status: "sold" }], [84, { area: 764, status: "sold" }],
  [85, { area: 752, status: "sold" }], [86, { area: 799, status: "sold" }], [87, { area: 764, status: "sold" }],
  [88, { area: 770, status: "sold" }], [89, { area: 772, status: "sold" }], [90, { area: 764, status: "sold" }],
  [91, { area: 1137, status: "sold" }], [92, { area: 799, status: "sold" }], [93, { area: 789, status: "sold" }],
  [94, { area: 764, status: "sold" }], [95, { area: 799, status: "sold" }], [96, { area: 764, status: "sold" }],
  [97, { area: 799, status: "sold" }], [98, { area: 770, status: "sold" }], [99, { area: 772, status: "sold" }],
  [100, { area: 764, status: "sold" }], [101, { area: 799, status: "sold" }], [102, { area: 772, status: "sold" }],
  [103, { area: 1137, status: "sold" }], [104, { area: 1137, status: "sold" }], [105, { area: 770, status: "sold" }],
  [106, { area: 772, status: "sold" }], [107, { area: 764, status: "sold" }], [108, { area: 799, status: "sold" }],
  [109, { area: 764, status: "sold" }], [110, { area: 770, status: "sold" }], [111, { area: 772, status: "sold" }],
  [112, { area: 764, status: "sold" }], [113, { area: 799, status: "sold" }], [114, { area: 772, status: "sold" }],
  [115, { area: 1137, status: "sold" }], [116, { area: 1137, status: "sold" }], [117, { area: 1137, status: "sold" }],
  [118, { area: 772, status: "sold" }], [119, { area: 810, status: "sold" }], [120, { area: 1137, status: "sold" }],
  
  // East Group (Las Dunas ↔ La Ballena bands; some Available)
  [121, { area: 812, status: "available" }], [122, { area: 783, status: "sold" }], [123, { area: 830, status: "sold" }],
  [124, { area: 1133, status: "sold" }], [125, { area: 1133, status: "sold" }], [126, { area: 1137, status: "sold" }],
  [127, { area: 1137, status: "sold" }], [128, { area: 1137, status: "sold" }], [129, { area: 1137, status: "sold" }],
  [130, { area: 1137, status: "sold" }], [131, { area: 1137, status: "sold" }], [132, { area: 872, status: "sold" }],
  [133, { area: 1078, status: "sold" }], [134, { area: 1137, status: "sold" }], [135, { area: 1137, status: "sold" }],
  [136, { area: 1137, status: "sold" }], [137, { area: 1137, status: "sold" }], [138, { area: 1137, status: "sold" }],
  [139, { area: 1137, status: "sold" }], [140, { area: 1137, status: "sold" }], [141, { area: 1137, status: "sold" }],
  [142, { area: 1137, status: "sold" }], [143, { area: 1137, status: "sold" }], [144, { area: 1132, status: "available" }],
  [145, { area: 1137, status: "available" }], [146, { area: 1137, status: "available" }], [147, { area: 1137, status: "available" }],
  [148, { area: 1137, status: "available" }], [149, { area: 1137, status: "available" }], [150, { area: 850, status: "available" }],
  
  // Administración
  [81, { area: 800, status: "admin" }]
]);

// Block definitions for lot placement
const blocks = [
  // Block A - between Del Campo (88-91%) and Las Flores (73-76%)
  { id: "A", x: 10, y: 76, w: 85, h: 12, lots: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16, 17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32] },
  
  // Block B - between Las Flores (73-76%) and El Estero (59-62%)
  { id: "B", x: 10, y: 62, w: 85, h: 11, lots: [42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57, 58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73] },
  
  // Block C - between El Estero (59-62%) and El Moro (46-49%) - with green spaces
  { id: "C", x: 10, y: 49, w: 85, h: 10, lots: [74,75,76,77,78,79,80,82,83,84,85,86,87,88,89,90, 91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106] },
  
  // Block D - between El Moro (46-49%) and Las Dunas (33-36%)
  { id: "D", x: 10, y: 36, w: 85, h: 10, lots: [107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122, 123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138] },
  
  // Block E - between Las Dunas (33-36%) and La Ballena (20-23%)
  { id: "E", x: 10, y: 23, w: 85, h: 10, lots: [139,140,141,142,143,144,145,146,147,148,149,150] },
  
  // West tail - around admin/services
  { id: "West", x: 3, y: 82, w: 7, h: 14, lots: [33,34,35,36, 37,38,39,40,41] }
];

export default function GISMap() {
  const [selectedLot, setSelectedLot] = useState<number | null>(null);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [layers, setLayers] = useState({
    lots: true,
    roads: true,
    greenSpaces: true,
    services: true,
    labels: true
  });
  const [lotData, setLotData] = useState(new Map(initialLotData));
  const svgRef = useRef<SVGSVGElement>(null);

  const handleLotClick = useCallback((lotId: number) => {
    if (editMode) {
      // In edit mode, don't open dialog
      return;
    }
    setSelectedLot(lotId);
  }, [editMode]);

  const handleLotStatusChange = useCallback((lotId: number, newStatus: string) => {
    setLotData(prev => {
      const newData = new Map(prev);
      const lot = newData.get(lotId);
      if (lot) {
        newData.set(lotId, { ...lot, status: newStatus });
      }
      return newData;
    });
  }, []);

  const toggleLayer = useCallback((layerName: keyof typeof layers) => {
    setLayers(prev => ({ ...prev, [layerName]: !prev[layerName] }));
  }, []);

  const renderLot = useCallback((lotId: number, x: number, y: number, w: number, h: number) => {
    const lotInfo = lotData.get(lotId);
    if (!lotInfo || !layers.lots) return null;

    const fillColor = lotInfo.status === "sold" ? "#E74C3C" : 
                     lotInfo.status === "available" ? "#ECF0F1" :
                     lotInfo.status === "admin" ? "#2874A6" : "#ECF0F1";

    return (
      <g key={lotId} className={`cursor-pointer group ${editMode ? 'edit-mode' : ''}`} onClick={() => handleLotClick(lotId)}>
        <rect
          x={x}
          y={y}
          width={w}
          height={h}
          fill={fillColor}
          stroke={editMode ? "#3498DB" : "#BDC3C7"}
          strokeWidth={editMode ? "1" : "0.5"}
          className="transition-all duration-200 group-hover:stroke-2 group-hover:stroke-blue-500"
        />
        {layers.labels && (
          <>
            <text
              x={x + w/2}
              y={y + h/2 - 1}
              textAnchor="middle"
              fontSize="3"
              fontWeight="bold"
              fill={lotInfo.status === "available" ? "#2C3E50" : "#FFFFFF"}
            >
              {lotId}
            </text>
            <text
              x={x + w/2}
              y={y + h/2 + 2}
              textAnchor="middle"
              fontSize="2"
              fill={lotInfo.status === "available" ? "#7F8C8D" : "#FFFFFF"}
            >
              {lotInfo.area}m²
            </text>
          </>
        )}
        {editMode && (
          <g className="edit-controls opacity-0 group-hover:opacity-100 transition-opacity">
            <rect x={x + w - 1.5} y={y} width="1.5" height="1.5" fill="#3498DB" rx="0.2" />
            <text x={x + w - 0.75} y={y + 1} textAnchor="middle" fontSize="0.8" fill="#FFFFFF">E</text>
          </g>
        )}
      </g>
    );
  }, [handleLotClick, lotData, layers.lots, layers.labels, editMode]);

  const generateLotsForBlock = useCallback((block: typeof blocks[0]) => {
    const lots = [];
    const lotWidth = 4;
    const lotHeight = 3;
    const gap = 0.3;
    const cols = Math.floor(block.w / (lotWidth + gap));
    
    block.lots.forEach((lotId, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      const x = block.x + col * (lotWidth + gap);
      const y = block.y + row * (lotHeight + gap);
      
      lots.push(renderLot(lotId, x, y, lotWidth, lotHeight));
    });
    
    return lots;
  }, [renderLot]);

  const MapContent = () => (
    <svg
      ref={svgRef}
      viewBox="0 0 100 100"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Ocean background */}
      <rect x="0" y="0" width="100" height="3.5" fill="#3498DB" />
      
      {/* Beach - Playa Mía */}
      <rect x="0" y="0" width="100" height="3.5" fill="#F39C12" />
      <text x="50" y="2" textAnchor="middle" fontSize="2" fontWeight="bold" fill="#FFFFFF">
        PLAYA MÍA
      </text>
      
      {/* Horizontal Roads */}
      {layers.roads && [
        { name: "La Ballena", y: 20 },
        { name: "Las Dunas", y: 33 },
        { name: "El Moro", y: 46 },
        { name: "El Estero", y: 59 },
        { name: "Las Flores", y: 73 },
        { name: "Del Campo", y: 88 }
      ].map(road => (
        <g key={road.name}>
          <rect x="10" y={road.y} width="85" height="3" fill="#FFFFFF" stroke="#BDC3C7" strokeWidth="0.1" />
          {layers.labels && (
            <text x="12" y={road.y + 1.8} fontSize="1.5" fontWeight="bold" fill="#2C3E50">
              {road.name}
            </text>
          )}
        </g>
      ))}
      
      {/* Vertical Access Road */}
      {layers.roads && (
        <g>
          <rect x="3" y="0" width="4" height="100" fill="#FFFFFF" stroke="#BDC3C7" strokeWidth="0.1" />
          {layers.labels && (
            <text x="5" y="50" textAnchor="middle" fontSize="1.5" fontWeight="bold" fill="#2C3E50" transform="rotate(-90, 5, 50)">
              ACCESO
            </text>
          )}
        </g>
      )}
      
      {/* Airstrip */}
      <rect x="12" y="94" width="84" height="6" fill="#95A5A6" stroke="#7F8C8D" strokeWidth="0.2" />
      <text x="54" y="97" textAnchor="middle" fontSize="1.8" fontWeight="bold" fill="#2C3E50">
        PISTA DE ATERRIZAJE 1000m
      </text>
      
      {/* Green Spaces */}
      {layers.greenSpaces && [
        { name: "Espacio Verde Central", x: 44, y: 51, w: 14, h: 15 },
        { name: "Espacio Verde Este", x: 66, y: 49, w: 12, h: 13 },
        { name: "Espacio Verde Sur", x: 45, y: 16, w: 17, h: 6 },
        { name: "Espacio Verde Las Dunas", x: 80, y: 38, w: 16, h: 23 }
      ].map(space => (
        <g key={space.name}>
          <rect 
            x={space.x} 
            y={space.y} 
            width={space.w} 
            height={space.h} 
            fill="#27AE60" 
            stroke="#229954"
            strokeWidth="0.2"
            rx="1"
          />
          {layers.labels && (
            <text 
              x={space.x + space.w/2} 
              y={space.y + space.h/2} 
              textAnchor="middle" 
              fontSize="1.2" 
              fontWeight="bold" 
              fill="#FFFFFF"
            >
              {space.name}
            </text>
          )}
        </g>
      ))}
      
      {/* Service Buildings */}
      {layers.services && (
        <g>
          <rect x="8" y="92" width="4" height="4" fill="#2874A6" stroke="#1B4F72" strokeWidth="0.2" rx="0.2" />
          {layers.labels && <text x="10" y="94.5" textAnchor="middle" fontSize="1" fontWeight="bold" fill="#FFFFFF">ADM</text>}
          
          <rect x="10" y="82" width="4" height="4" fill="#7D3C98" stroke="#6C3483" strokeWidth="0.2" rx="0.2" />
          {layers.labels && <text x="12" y="84.5" textAnchor="middle" fontSize="1" fontWeight="bold" fill="#FFFFFF">SER</text>}
          
          <rect x="16" y="94" width="6" height="3" fill="#7D3C98" stroke="#6C3483" strokeWidth="0.2" rx="0.2" />
          {layers.labels && <text x="19" y="96" textAnchor="middle" fontSize="1" fontWeight="bold" fill="#FFFFFF">TENIS</text>}
          
          <rect x="30" y="3.5" width="10" height="3.5" fill="#7D3C98" stroke="#6C3483" strokeWidth="0.2" rx="0.2" />
          {layers.labels && <text x="35" y="6" textAnchor="middle" fontSize="1.2" fontWeight="bold" fill="#FFFFFF">EL CLUB</text>}
          
          <rect x="84" y="94" width="5" height="3" fill="#7D3C98" stroke="#6C3483" strokeWidth="0.2" rx="0.2" />
          {layers.labels && <text x="86.5" y="96" textAnchor="middle" fontSize="1" fontWeight="bold" fill="#FFFFFF">PADDLE</text>}
          
          <rect x="90" y="96" width="6" height="3" fill="#7D3C98" stroke="#6C3483" strokeWidth="0.2" rx="0.2" />
          {layers.labels && <text x="93" y="98" textAnchor="middle" fontSize="1" fontWeight="bold" fill="#FFFFFF">HANGARS</text>}
        </g>
      )}
      
      {/* Render all lots */}
      {blocks.map(block => generateLotsForBlock(block))}
    </svg>
  );

  const selectedLotData = selectedLot ? lotData.get(selectedLot) : null;

  return (
    <div className="space-y-4">
      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-ocean" />
              Mapa Maestro - Bahía de los Moros (Etapa 1)
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFullscreen(true)}
              className="flex items-center gap-2"
            >
              <Maximize2 className="h-4 w-4" />
              Pantalla Completa
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 mb-4">
            {/* Controls Row */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Edit Mode Toggle */}
              <div className="flex items-center gap-2">
                <Switch
                  id="edit-mode"
                  checked={editMode}
                  onCheckedChange={setEditMode}
                />
                <label htmlFor="edit-mode" className="flex items-center gap-2 text-sm font-medium">
                  <Edit3 className="h-4 w-4" />
                  Modo Edición
                </label>
              </div>

              {/* Layer Controls */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Capas:</span>
                <div className="flex items-center gap-2">
                  <Switch
                    id="lots-layer"
                    checked={layers.lots}
                    onCheckedChange={() => toggleLayer('lots')}
                  />
                  <label htmlFor="lots-layer" className="text-sm">Lotes</label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="roads-layer"
                    checked={layers.roads}
                    onCheckedChange={() => toggleLayer('roads')}
                  />
                  <label htmlFor="roads-layer" className="text-sm">Vías</label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="green-layer"
                    checked={layers.greenSpaces}
                    onCheckedChange={() => toggleLayer('greenSpaces')}
                  />
                  <label htmlFor="green-layer" className="text-sm">Verde</label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="services-layer"
                    checked={layers.services}
                    onCheckedChange={() => toggleLayer('services')}
                  />
                  <label htmlFor="services-layer" className="text-sm">Servicios</label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="labels-layer"
                    checked={layers.labels}
                    onCheckedChange={() => toggleLayer('labels')}
                  />
                  <label htmlFor="labels-layer" className="text-sm">Etiquetas</label>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span>Vendido</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-300 rounded"></div>
                <span>Disponible</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-600 rounded"></div>
                <span>Administración</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-600 rounded"></div>
                <span>Espacio Verde</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-purple-600 rounded"></div>
                <span>Servicios</span>
              </div>
            </div>
          </div>

          {/* Map Container */}
          <div className="relative border border-border rounded-lg bg-gradient-to-b from-sky-50 to-blue-100 h-[600px] overflow-hidden">
            <MapContent />
          </div>
        </CardContent>
      </Card>

      {/* Lot Info Dialog */}
      {selectedLot && selectedLotData && (
        <Dialog open={!!selectedLot} onOpenChange={() => setSelectedLot(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Lote #{selectedLot}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Área</label>
                  <p className="text-lg font-bold">{selectedLotData.area} m²</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Estado</label>
                  <Badge variant={selectedLotData.status === "sold" ? "destructive" : "secondary"}>
                    {selectedLotData.status === "sold" ? "Vendido" : 
                     selectedLotData.status === "available" ? "Disponible" :
                     selectedLotData.status === "admin" ? "Administración" : "Reservado"}
                  </Badge>
                </div>
              </div>

              {/* Edit Controls */}
              {editMode && selectedLotData.status !== "admin" && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Cambiar Estado</label>
                  <Select value={selectedLotData.status} onValueChange={(value) => handleLotStatusChange(selectedLot!, value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sold">Vendido</SelectItem>
                      <SelectItem value="available">Disponible</SelectItem>
                      <SelectItem value="reserved">Reservado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              {selectedLotData.status === "available" && (
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-green-800 font-medium">
                    Este lote está disponible para la venta.
                  </p>
                </div>
              )}
              
              {selectedLotData.status === "sold" && (
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-sm text-red-800 font-medium">
                    Este lote ya ha sido vendido.
                  </p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Fullscreen Dialog */}
      <Dialog open={showFullscreen} onOpenChange={setShowFullscreen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-2">
          <DialogHeader className="flex flex-row items-center justify-between p-4">
            <DialogTitle>Mapa Maestro - Pantalla Completa</DialogTitle>
            <Button variant="ghost" size="sm" onClick={() => setShowFullscreen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
          <div className="relative border border-border rounded-lg bg-gradient-to-b from-sky-50 to-blue-100 h-[85vh] overflow-hidden">
            <MapContent />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}