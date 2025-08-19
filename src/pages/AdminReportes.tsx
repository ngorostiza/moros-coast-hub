import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  Users, 
  DollarSign, 
  Calendar, 
  Download,
  Eye,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  FileText,
  PieChart
} from "lucide-react";

const monthlyStats = {
  expenses: {
    current: 5250000,
    previous: 4980000,
    trend: "up",
    change: 5.4
  },
  payments: {
    current: 4890000,
    previous: 5120000, 
    trend: "down",
    change: -4.5
  },
  occupancy: {
    current: 87,
    previous: 92,
    trend: "down", 
    change: -5.4
  },
  reserves: {
    current: 234,
    previous: 198,
    trend: "up",
    change: 18.2
  }
};

const expenseCategories = [
  { name: "Mantenimiento", amount: 1450000, percentage: 27.6, color: "bg-blue-500" },
  { name: "Seguridad", amount: 1250000, percentage: 23.8, color: "bg-green-500" },
  { name: "Servicios", amount: 980000, percentage: 18.7, color: "bg-yellow-500" },
  { name: "Administración", amount: 675000, percentage: 12.9, color: "bg-purple-500" },
  { name: "Limpieza", amount: 545000, percentage: 10.4, color: "bg-teal-500" },
  { name: "Otros", amount: 350000, percentage: 6.6, color: "bg-gray-500" }
];

const paymentStatus = [
  { status: "Al día", count: 142, percentage: 78.5, color: "text-emerald-600" },
  { status: "Vencido 1-30 días", count: 28, percentage: 15.5, color: "text-orange-600" },
  { status: "Vencido 31-60 días", count: 8, percentage: 4.4, color: "text-red-500" },
  { status: "Vencido +60 días", count: 3, percentage: 1.6, color: "text-red-700" }
];

const serviceUsage = [
  { service: "Restaurante", reservations: 156, revenue: 890000, avgTicket: 5705 },
  { service: "Canchas Deportivas", reservations: 89, revenue: 0, avgTicket: 0 },
  { service: "Surf School", reservations: 67, revenue: 402000, avgTicket: 6000 },
  { service: "Alquiler Equipos", reservations: 134, revenue: 268000, avgTicket: 2000 }
];

const reports = [
  {
    id: "RPT-001",
    name: "Estado Financiero Mensual",
    type: "Financiero",
    generated: "2024-02-15",
    status: "Completado",
    size: "2.4 MB"
  },
  {
    id: "RPT-002", 
    name: "Reporte de Cobranzas",
    type: "Cobranzas",
    generated: "2024-02-10",
    status: "Completado", 
    size: "1.8 MB"
  },
  {
    id: "RPT-003",
    name: "Análisis de Ocupación",
    type: "Ocupación",
    generated: "2024-02-05",
    status: "Completado",
    size: "965 KB"
  },
  {
    id: "RPT-004",
    name: "Reporte de Servicios",
    type: "Servicios",
    generated: "En proceso...",
    status: "Generando",
    size: "-"
  }
];

export default function AdminReportes() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(amount);
  };

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />;
  };

  const getTrendColor = (trend: string) => {
    return trend === "up" ? "text-emerald-600" : "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Panel de Reportes
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exportar Datos
              </Button>
              <Button>
                <FileText className="h-4 w-4 mr-2" />
                Generar Reporte
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Expensas Mensuales</p>
                <p className="text-2xl font-bold">{formatCurrency(monthlyStats.expenses.current)}</p>
                <div className={`flex items-center gap-1 text-sm ${getTrendColor(monthlyStats.expenses.trend)}`}>
                  {getTrendIcon(monthlyStats.expenses.trend)}
                  <span>{monthlyStats.expenses.change}%</span>
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Pagos Recibidos</p>
                <p className="text-2xl font-bold">{formatCurrency(monthlyStats.payments.current)}</p>
                <div className={`flex items-center gap-1 text-sm ${getTrendColor(monthlyStats.payments.trend)}`}>
                  {getTrendIcon(monthlyStats.payments.trend)}
                  <span>{Math.abs(monthlyStats.payments.change)}%</span>
                </div>
              </div>
              <CheckCircle className="h-8 w-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Ocupación</p>
                <p className="text-2xl font-bold">{monthlyStats.occupancy.current}%</p>
                <div className={`flex items-center gap-1 text-sm ${getTrendColor(monthlyStats.occupancy.trend)}`}>
                  {getTrendIcon(monthlyStats.occupancy.trend)}
                  <span>{Math.abs(monthlyStats.occupancy.change)}%</span>
                </div>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Reservas</p>
                <p className="text-2xl font-bold">{monthlyStats.reserves.current}</p>
                <div className={`flex items-center gap-1 text-sm ${getTrendColor(monthlyStats.reserves.trend)}`}>
                  {getTrendIcon(monthlyStats.reserves.trend)}
                  <span>{monthlyStats.reserves.change}%</span>
                </div>
              </div>
              <Calendar className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Reports */}
      <Tabs defaultValue="financial">
        <TabsList>
          <TabsTrigger value="financial">Financiero</TabsTrigger>
          <TabsTrigger value="collections">Cobranzas</TabsTrigger>
          <TabsTrigger value="services">Servicios</TabsTrigger>
          <TabsTrigger value="generated">Reportes Generados</TabsTrigger>
        </TabsList>

        <TabsContent value="financial" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Expense Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Distribución de Gastos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {expenseCategories.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{category.name}</span>
                        <span className="text-sm font-bold">{formatCurrency(category.amount)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`${category.color} h-2 rounded-full`}
                            style={{ width: `${category.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-muted-foreground w-12">{category.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Payment Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Estado de Pagos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentStatus.map((status, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          index === 0 ? "bg-emerald-500" : 
                          index === 1 ? "bg-orange-500" : "bg-red-500"
                        }`}></div>
                        <span className="font-medium">{status.status}</span>
                      </div>
                      <div className="text-right">
                        <div className={`font-bold ${status.color}`}>{status.count}</div>
                        <div className="text-xs text-muted-foreground">{status.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="collections" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Análisis de Cobranzas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-emerald-600">93.1%</div>
                  <p className="text-sm text-muted-foreground">Tasa de Cobranza</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">18 días</div>
                  <p className="text-sm text-muted-foreground">Promedio de Cobro</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{formatCurrency(360000)}</div>
                  <p className="text-sm text-muted-foreground">Deuda Vencida</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Uso de Servicios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {serviceUsage.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{service.service}</h4>
                      <p className="text-sm text-muted-foreground">{service.reservations} reservas este mes</p>
                    </div>
                    <div className="text-right">
                      {service.revenue > 0 ? (
                        <>
                          <div className="font-bold">{formatCurrency(service.revenue)}</div>
                          <div className="text-sm text-muted-foreground">
                            Avg: {formatCurrency(service.avgTicket)}
                          </div>
                        </>
                      ) : (
                        <Badge variant="secondary">Gratuito</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="generated" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Reportes Generados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <FileText className="h-8 w-8 text-muted-foreground" />
                      <div>
                        <h4 className="font-semibold">{report.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Tipo: {report.type}</span>
                          <span>•</span>
                          <span>{report.generated}</span>
                          {report.size !== "-" && (
                            <>
                              <span>•</span>
                              <span>{report.size}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={report.status === "Completado" ? "default" : "secondary"}
                        className={report.status === "Completado" ? "bg-emerald-600" : "bg-orange-500"}
                      >
                        {report.status === "Completado" ? (
                          <>
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Completado
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Generando
                          </>
                        )}
                      </Badge>
                      
                      {report.status === "Completado" && (
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            Ver
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Descargar
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}