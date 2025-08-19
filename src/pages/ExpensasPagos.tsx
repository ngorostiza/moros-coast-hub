import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CreditCard, 
  Download, 
  Eye, 
  CheckCircle, 
  Clock, 
  Calendar,
  DollarSign 
} from "lucide-react";

const paymentHistory = [
  {
    id: "PAG-2024-001",
    date: "2024-01-15",
    amount: 125000,
    concept: "Expensas Enero 2024",
    status: "Pagado",
    method: "Transferencia Bancaria",
    receipt: "REC-001-2024",
    dueDate: "2024-01-10"
  },
  {
    id: "PAG-2024-002", 
    date: "2024-02-10",
    amount: 125000,
    concept: "Expensas Febrero 2024",
    status: "Pagado",
    method: "Débito Automático",
    receipt: "REC-002-2024",
    dueDate: "2024-02-10"
  },
  {
    id: "PAG-2024-003",
    date: "2024-03-05",
    amount: 135000,
    concept: "Expensas Marzo 2024 + Extraordinarias",
    status: "Pagado",
    method: "Transferencia Bancaria",
    receipt: "REC-003-2024",
    dueDate: "2024-03-10"
  },
  {
    id: "PAG-2024-004",
    date: null,
    amount: 125000,
    concept: "Expensas Abril 2024",
    status: "Pendiente",
    method: null,
    receipt: null,
    dueDate: "2024-04-10"
  }
];

export default function ExpensasPagos() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pagado':
        return <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200"><CheckCircle className="h-3 w-3 mr-1" />Pagado</Badge>;
      case 'Pendiente':
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200"><Clock className="h-3 w-3 mr-1" />Pendiente</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const totalPaid = paymentHistory
    .filter(p => p.status === 'Pagado')
    .reduce((sum, payment) => sum + payment.amount, 0);

  const pendingPayments = paymentHistory.filter(p => p.status === 'Pendiente');

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Pagado 2024</p>
                <p className="text-2xl font-bold text-emerald-600">{formatCurrency(totalPaid)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Pagos Realizados</p>
                <p className="text-2xl font-bold text-foreground">{paymentHistory.filter(p => p.status === 'Pagado').length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Pendientes</p>
                <p className="text-2xl font-bold text-orange-600">{pendingPayments.length}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Historial de Pagos
            </CardTitle>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paymentHistory.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="text-center min-w-[80px]">
                    <Calendar className="h-4 w-4 mx-auto mb-1 text-muted-foreground" />
                    <div className="text-sm font-medium">
                      {payment.date ? new Date(payment.date).toLocaleDateString('es-AR') : 'Pendiente'}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Vto: {new Date(payment.dueDate).toLocaleDateString('es-AR')}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{payment.concept}</span>
                      {getStatusBadge(payment.status)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {payment.method && `Método: ${payment.method}`}
                      {payment.receipt && ` • Recibo: ${payment.receipt}`}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold">{formatCurrency(payment.amount)}</div>
                    {payment.status === 'Pagado' && payment.receipt && (
                      <Button variant="ghost" size="sm" className="mt-1">
                        <Eye className="h-3 w-3 mr-1" />
                        Ver Recibo
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pending Payments Alert */}
      {pendingPayments.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-orange-800 mb-2">Pagos Pendientes</h3>
                <p className="text-sm text-orange-700">
                  Tienes {pendingPayments.length} pago(s) pendiente(s) por un total de{' '}
                  {formatCurrency(pendingPayments.reduce((sum, p) => sum + p.amount, 0))}
                </p>
              </div>
              <Button className="bg-orange-600 hover:bg-orange-700">
                Pagar Ahora
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}