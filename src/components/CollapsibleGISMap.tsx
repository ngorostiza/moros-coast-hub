import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import GISMap from "@/components/GISMap";
import { MapPin, Maximize2, Minimize2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function CollapsibleGISMap() {
  const [isExpanded, setIsExpanded] = useState(false);

  if (isExpanded) {
    return (
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Sistema de Información Geográfica (GIS)
            </CardTitle>
            <div className="flex gap-2">
              <Link to="/admin/gis">
                <Button variant="outline" size="sm">
                  Vista Completa
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsExpanded(false)}
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-[600px]">
            <GISMap />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <MapPin className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Sistema GIS</h3>
              <p className="text-sm text-muted-foreground">Mapa interactivo del desarrollo</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link to="/admin/gis">
              <Button variant="outline" size="sm">
                Vista Completa
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(true)}
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Mini preview */}
        <div className="mt-4 h-32 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg flex items-center justify-center border-2 border-dashed border-blue-200">
          <div className="text-center text-blue-600">
            <MapPin className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm font-medium">Mapa Contraído</p>
            <p className="text-xs text-blue-500">Haga clic en expandir para ver el mapa completo</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}