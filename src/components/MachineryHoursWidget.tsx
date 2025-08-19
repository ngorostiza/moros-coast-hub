import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Truck, 
  Clock,
  TrendingUp,
  DollarSign
} from "lucide-react";

const machineryData = [
  { name: "RETRO CAT", hours: 54, arenaTrips: 0, toscaTrips: 0, utilization: 27, revenue: 52700 },
  { name: "PALA XCMG", hours: 131, arenaTrips: 0, toscaTrips: 0, utilization: 66, revenue: 131000 },
  { name: "EXCAVADORA VOLVO", hours: 213, arenaTrips: 0, toscaTrips: 0, utilization: 100, revenue: 213000 },
  { name: "PALA CAT UNA", hours: 62, arenaTrips: 0, toscaTrips: 0, utilization: 31, revenue: 62000 },
  { name: "EXCAVADORA JOHN DEERE", hours: 117, arenaTrips: 0, toscaTrips: 0, utilization: 59, revenue: 117000 },
  { name: "CAMION VOLVO 1 -MWI", hours: 1, arenaTrips: 583, toscaTrips: 175.5, utilization: 80, revenue: 295000 }
];

const totalHours = machineryData.reduce((sum, machine) => sum + machine.hours, 0);
const totalRevenue = machineryData.reduce((sum, machine) => sum + machine.revenue, 0);
const averageUtilization = machineryData.reduce((sum, machine) => sum + machine.utilization, 0) / machineryData.length;

export default function MachineryHoursWidget() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="h-5 w-5" />
          Horas Máquinas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <Clock className="h-4 w-4 mx-auto mb-1 text-blue-600" />
            <p className="text-xl font-bold text-blue-700">{totalHours}</p>
            <p className="text-xs text-blue-600">Total Horas</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <DollarSign className="h-4 w-4 mx-auto mb-1 text-green-600" />
            <p className="text-xl font-bold text-green-700">${(totalRevenue/1000).toFixed(0)}K</p>
            <p className="text-xs text-green-600">Facturación</p>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <TrendingUp className="h-4 w-4 mx-auto mb-1 text-orange-600" />
            <p className="text-xl font-bold text-orange-700">{averageUtilization.toFixed(0)}%</p>
            <p className="text-xs text-orange-600">Uso Promedio</p>
          </div>
        </div>

        {/* Top Machines */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">Máquinas Más Utilizadas</h4>
          {machineryData
            .sort((a, b) => b.hours - a.hours)
            .slice(0, 4)
            .map((machine, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{machine.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Progress 
                      value={machine.utilization} 
                      className="h-1 flex-1"
                    />
                    <Badge variant="outline" className="text-xs">
                      {machine.hours}h
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Transport Summary */}
        {machineryData.some(m => m.arenaTrips > 0 || m.toscaTrips > 0) && (
          <div className="mt-4 pt-4 border-t">
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Transporte de Materiales</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="text-center p-2 bg-amber-50 rounded">
                <p className="font-medium">Arena 28m³</p>
                <p>{machineryData.reduce((sum, m) => sum + m.arenaTrips, 0)} viajes</p>
              </div>
              <div className="text-center p-2 bg-stone-100 rounded">
                <p className="font-medium">Tosca 28m³</p>
                <p>{machineryData.reduce((sum, m) => sum + m.toscaTrips, 0)} viajes</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}