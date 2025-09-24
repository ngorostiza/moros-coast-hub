import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Wrench,
  Clock,
  TrendingUp,
  TrendingDown
} from "lucide-react";

const machineryData = [
  { name: "RETRO CAT", hours: 54, arenaTrips: 0, toscaTrips: 0, utilization: 27, revenue: 52700 },
  { name: "PALA XCMG", hours: 131, arenaTrips: 0, toscaTrips: 0, utilization: 66, revenue: 131000 },
  { name: "EXCAVADORA VOLVO", hours: 213, arenaTrips: 0, toscaTrips: 0, utilization: 100, revenue: 213000 },
  { name: "PALA CAT UNA", hours: 62, arenaTrips: 0, toscaTrips: 0, utilization: 31, revenue: 62000 },
  { name: "EXCAVADORA JOHN DEERE", hours: 117, arenaTrips: 0, toscaTrips: 0, utilization: 59, revenue: 117000 },
  { name: "CAMION VOLVO 1 -MWI", hours: 1, arenaTrips: 583, toscaTrips: 175.5, utilization: 80, revenue: 295000 }
];

export default function MachineryHoursWidget() {
  const totalHours = machineryData.reduce((sum, item) => sum + item.hours, 0);
  
  // Top 2 most utilized
  const topMachines = machineryData.sort((a, b) => b.utilization - a.utilization).slice(0, 2);
  
  // Top 2 least utilized
  const leastMachines = machineryData.sort((a, b) => a.utilization - b.utilization).slice(0, 2);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wrench className="h-5 w-5" />
          Horas de Maquinaria
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary Stats - Only Total Hours */}
        <div className="grid grid-cols-1 gap-4">
          <Card className="bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-blue-700">{totalHours}</p>
                  <p className="text-sm text-blue-600">Total Horas</p>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top 2 Most Utilized */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2 text-emerald-700">
              <TrendingUp className="h-4 w-4" />
              Top 2 Más Utilizadas
            </h4>
            <div className="space-y-3">
              {topMachines.map((machine, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{machine.name}</span>
                      <span className="text-sm font-mono">{machine.hours}h</span>
                    </div>
                    <Progress value={machine.utilization} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top 2 Least Utilized */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2 text-red-700">
              <TrendingDown className="h-4 w-4" />
              Top 2 Menos Utilizadas
            </h4>
            <div className="space-y-3">
              {leastMachines.map((machine, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{machine.name}</span>
                      <span className="text-sm font-mono">{machine.hours}h</span>
                    </div>
                    <Progress value={machine.utilization} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Transport Summary */}
        {machineryData.some(m => m.arenaTrips > 0 || m.toscaTrips > 0) && (
          <div className="mt-4 pt-4 border-t">
            <h4 className="text-sm font-medium text-muted-foreground mb-3">Transporte de Materiales</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-amber-50 rounded border">
                <div className="w-8 h-8 mx-auto mb-2 bg-amber-200 rounded-full flex items-center justify-center">
                  🏖️
                </div>
                <p className="text-lg font-bold text-amber-700">{machineryData.reduce((sum, m) => sum + m.arenaTrips, 0)}</p>
                <p className="text-sm text-amber-600">Arena 28m³</p>
                <p className="text-xs text-muted-foreground">
                  {(machineryData.reduce((sum, m) => sum + m.arenaTrips, 0) * 28).toLocaleString()}m³ total
                </p>
              </div>
              <div className="text-center p-3 bg-stone-100 rounded border">
                <div className="w-8 h-8 mx-auto mb-2 bg-stone-300 rounded-full flex items-center justify-center">
                  🪨
                </div>
                <p className="text-lg font-bold text-stone-700">{machineryData.reduce((sum, m) => sum + m.toscaTrips, 0)}</p>
                <p className="text-sm text-stone-600">Tosca 28m³</p>
                <p className="text-xs text-muted-foreground">
                  {(machineryData.reduce((sum, m) => sum + m.toscaTrips, 0) * 28).toLocaleString()}m³ total
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}