import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Camera, Play, Maximize2, Volume2, Settings } from "lucide-react";

const cameras = [
  {
    id: 1,
    name: "Playa Principal",
    location: "Acceso a Playa Mía",
    status: "online",
    preview: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop&crop=center"
  },
  {
    id: 2,
    name: "Hangar Norte", 
    location: "Pista de Aterrizaje",
    status: "online",
    preview: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=400&h=300&fit=crop&crop=center"
  },
  {
    id: 3,
    name: "Entrada Lote 87",
    location: "Del Campo - Acceso",
    status: "online", 
    preview: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop&crop=center"
  }
];

export default function SecurityCameras() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5" />
          Cámaras de Seguridad
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cameras.map((camera) => (
            <div key={camera.id} className="space-y-3">
              <div className="relative group">
                <img 
                  src={camera.preview} 
                  alt={camera.name}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button size="sm" variant="secondary">
                    <Play className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="secondary">
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="secondary">
                    <Volume2 className="h-4 w-4" />
                  </Button>
                </div>
                <Badge 
                  variant={camera.status === "online" ? "default" : "destructive"}
                  className="absolute top-2 left-2 bg-emerald-600"
                >
                  <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse" />
                  EN VIVO
                </Badge>
              </div>
              
              <div>
                <h4 className="font-medium text-foreground">{camera.name}</h4>
                <p className="text-sm text-muted-foreground">{camera.location}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 flex justify-center">
          <Button variant="outline" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Configurar Cámaras
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}