import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Download, 
  Eye, 
  Calculator,
  TrendingUp,
  Home,
  Wrench,
  Users,
  Lightbulb
} from "lucide-react";

const invoices = [
  {
    id: "FACT-2024-004",
    period: "Abril 2024",
    issueDate: "2024-03-25",
    dueDate: "2024-04-10",
    amount: 125000,
    status: "Emitida",
    breakdown: {
      ordinarias: 95000,
      extraordinarias: 0,
      servicios: 30000,
      administracion: 15000,
      mantenimiento: 20000,
      seguridad: 25000,
      limpieza: 15000,
      otros: 5000
    }
  },
  {
    id: "FACT-2024-003",
    period: "Marzo 2024", 
    issueDate: "2024-02-25",
    dueDate: "2024-03-10",
    amount: 135000,
    status: "Pagada",
    breakdown: {
      ordinarias: 95000,
      extraordinarias: 10000,
      servicios: 30000,
      administracion: 15000,
      mantenimiento: 25000,
      seguridad: 25000,
      limpieza: 15000,
      otros: 10000
    }
  },
  {
    id: "FACT-2024-002",
    period: "Febrero 2024",
    issueDate: "2024-01-25", 
    dueDate: "2024-02-10",
    amount: 125000,
    status: "Pagada",
    breakdown: {
      ordinarias: 95000,
      extraordinarias: 0,
      servicios: 30000,
      administracion: 15000,
      mantenimiento: 20000,
      seguridad: 25000,
      limpieza: 15000,
      otros: 5000
    }
  }
];

const expenseBreakdown = [
  { category: "Expensas Ordinarias", icon: Home, amount: 95000, color: "text-blue-600" },
  { category: "Servicios", icon: Lightbulb, amount: 30000, color: "text-yellow-600" },
  { category: "Seguridad", icon: Users, amount: 25000, color: "text-red-600" },
  { category: "Mantenimiento", icon: Wrench, amount: 20000, color: "text-green-600" },
  { category: "Administración", icon: Calculator, amount: 15000, color: "text-purple-600" },
  { category: "Limpieza", icon: Home, amount: 15000, color: "text-teal-600" }
];

export default function ExpensasFacturas() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pagada':
        return <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">Pagada</Badge>;
      case 'Emitida':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Emitida</Badge>;
      case 'Vencida':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Vencida</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const currentInvoice = invoices[0];
  const averageAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0) / invoices.length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Factura Actual</p>
                <p className="text-2xl font-bold text-foreground">{formatCurrency(currentInvoice.amount)}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Promedio Mensual</p>
                <p className="text-2xl font-bold text-foreground">{formatCurrency(averageAmount)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Período</p>
                <p className="text-2xl font-bold text-foreground">{currentInvoice.period}</p>
              </div>
              <Calculator className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="current">
        <TabsList>
          <TabsTrigger value="current">Factura Actual</TabsTrigger>
          <TabsTrigger value="history">Historial</TabsTrigger>
          <TabsTrigger value="breakdown">Desglose</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Factura {currentInvoice.period}
                </CardTitle>
                <div className="flex items-center gap-2">
                  {getStatusBadge(currentInvoice.status)}
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Descargar PDF
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Información General</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Número:</span>
                        <span className="font-medium">{currentInvoice.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Fecha Emisión:</span>
                        <span className="font-medium">{new Date(currentInvoice.issueDate).toLocaleDateString('es-AR')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Fecha Vencimiento:</span>
                        <span className="font-medium">{new Date(currentInvoice.dueDate).toLocaleDateString('es-AR')}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t">
                        <span className="font-semibold">Total:</span>
                        <span className="text-xl font-bold text-foreground">{formatCurrency(currentInvoice.amount)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Desglose de Conceptos</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Expensas Ordinarias:</span>
                        <span className="font-medium">{formatCurrency(currentInvoice.breakdown.ordinarias)}</span>
                      </div>
                      {currentInvoice.breakdown.extraordinarias > 0 && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Expensas Extraordinarias:</span>
                          <span className="font-medium">{formatCurrency(currentInvoice.breakdown.extraordinarias)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Servicios:</span>
                        <span className="font-medium">{formatCurrency(currentInvoice.breakdown.servicios)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Administración:</span>
                        <span className="font-medium">{formatCurrency(currentInvoice.breakdown.administracion)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Mantenimiento:</span>
                        <span className="font-medium">{formatCurrency(currentInvoice.breakdown.mantenimiento)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Seguridad:</span>
                        <span className="font-medium">{formatCurrency(currentInvoice.breakdown.seguridad)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Limpieza:</span>
                        <span className="font-medium">{formatCurrency(currentInvoice.breakdown.limpieza)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Historial de Facturas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <FileText className="h-8 w-8 text-muted-foreground" />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{invoice.period}</span>
                          {getStatusBadge(invoice.status)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Emitida: {new Date(invoice.issueDate).toLocaleDateString('es-AR')} • 
                          Vencimiento: {new Date(invoice.dueDate).toLocaleDateString('es-AR')}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-lg font-bold">{formatCurrency(invoice.amount)}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Ver
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          PDF
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="breakdown" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Análisis de Gastos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {expenseBreakdown.map((expense) => (
                  <Card key={expense.category} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <expense.icon className={`h-5 w-5 ${expense.color}`} />
                        <span className="text-lg font-bold">{formatCurrency(expense.amount)}</span>
                      </div>
                      <h4 className="font-medium text-sm">{expense.category}</h4>
                      <div className="mt-2 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${(expense.amount / currentInvoice.amount) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {((expense.amount / currentInvoice.amount) * 100).toFixed(1)}% del total
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}