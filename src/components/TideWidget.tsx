import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Waves, ArrowUp, ArrowDown } from "lucide-react";

export default function TideWidget() {
  const tideData = {
    current: {
      height: 1.2,
      type: "Subiendo",
      nextChange: "14:30"
    },
    today: [
      { time: "06:15", type: "Baja", height: 0.3 },
      { time: "12:45", type: "Alta", height: 2.1 },
      { time: "18:20", type: "Baja", height: 0.4 },
      { time: "24:50", type: "Alta", height: 1.9 }
    ]
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Waves className="h-5 w-5" />
          Marea Local
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <p className="text-2xl font-bold">{tideData.current.height} m</p>
          <div className="flex items-center justify-center gap-1">
            {tideData.current.type === "Subiendo" ? (
              <ArrowUp className="h-4 w-4 text-emerald-600" />
            ) : (
              <ArrowDown className="h-4 w-4 text-coral" />
            )}
            <span className="text-muted-foreground text-sm">{tideData.current.type}</span>
          </div>
          <p className="text-xs text-muted-foreground">Próximo cambio: {tideData.current.nextChange}</p>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium">Mareas de Hoy</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {tideData.today.map((tide, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                <span>{tide.time}</span>
                <div className="flex items-center gap-1">
                  {tide.type === "Alta" ? (
                    <ArrowUp className="h-3 w-3 text-blue-600" />
                  ) : (
                    <ArrowDown className="h-3 w-3 text-orange-600" />
                  )}
                  <span>{tide.height}m</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}