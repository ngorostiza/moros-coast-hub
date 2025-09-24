import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  CreditCard, 
  DollarSign, 
  Download,
  Eye,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  FileText,
  Search,
  Filter,
  XCircle,
  Clock,
  AlertTriangle
} from "lucide-react";

// Datos actualizados del AdminDashboard
const monthlyStats = {
  canon: {
    current: 5475000,
    previous: 5250000,
    trend: "up",
    change: 4.3
  },
  payments: {
    current: 5067250,
    previous: 4890000, 
    trend: "up",
    change: 3.6
  }
};

// Resumen financiero detallado
const financialSummary = {
  totalFacturado: 5475000,
  cobrado: 5067250,
  pendiente: 407750,
  tasaCobranza: 92.5,
  meta: 95,
  propietariosPendientes: 6
};

// Transacciones de pagos estilo PagoTIC
const paymentTransactions = [
  {
    fecha: "18/09/2025",
    idTransaccion: "9736-18092025143307",
    concepto: "CM",
    descripcion: "CANON 09/2025",
    pagador: "Muller German",
    importe: 375000,
    cbu: "0000003900000000000047",
    estado: "En Progreso"
  },
  {
    fecha: "18/09/2025", 
    idTransaccion: "9737-18092025143415",
    concepto: "CM",
    descripcion: "CANON 09/2025",
    pagador: "De Las Carreras Rafael",
    importe: 365011.83,
    cbu: "0071",
    estado: "Rechazado"
  },
  {
    fecha: "17/09/2025",
    idTransaccion: "9735-17092025091205",
    concepto: "PP",
    descripcion: "PLAN DE PAGOS ARBA",
    pagador: "Rodriguez Maria Elena",
    importe: 285000,
    cbu: "0000003900000000000089",
    estado: "Aprobado"
  },
  {
    fecha: "17/09/2025",
    idTransaccion: "9734-17092025085532",
    concepto: "CM",
    descripcion: "CANON 09/2025",
    pagador: "Gonzalez Carlos Alberto",
    importe: 325000,
    cbu: "0000003900000000000156",
    estado: "Aprobado"
  },
  {
    fecha: "16/09/2025",
    idTransaccion: "9733-16092025143307",
    concepto: "EX",
    descripcion: "SERVICIOS EXTRAORDINARIOS",
    pagador: "Martinez Ana Laura",
    importe: 125000,
    cbu: "0000003900000000000234",
    estado: "Pendiente"
  },
  {
    fecha: "16/09/2025",
    idTransaccion: "9732-16092025120845",
    concepto: "CM",
    descripcion: "CANON 09/2025",
    pagador: "Lopez Juan Carlos",
    importe: 340000,
    cbu: "0000003900000000000178",
    estado: "Aprobado"
  },
  {
    fecha: "15/09/2025",
    idTransaccion: "9731-15092025161234",
    concepto: "PP",
    descripcion: "PLAN DE PAGOS ARBA",
    pagador: "Fernandez Patricia",
    importe: 195000,
    cbu: "0000003900000000000267",
    estado: "Objetado"
  },
  {
    fecha: "15/09/2025",
    idTransaccion: "9730-15092025145612",
    concepto: "CM",
    descripcion: "CANON 09/2025",
    pagador: "Silva Roberto",
    importe: 310000,
    cbu: "0000003900000000000301",
    estado: "Cancelado"
  }
];

const paymentStatus = [
  { status: "Al día", count: 142, percentage: 78.5, color: "text-emerald-600" },
  { status: "Vencido 1-30 días", count: 28, percentage: 15.5, color: "text-orange-600" },
  { status: "Vencido 31-60 días", count: 8, percentage: 4.4, color: "text-red-500" },
  { status: "Vencido +60 días", count: 3, percentage: 1.6, color: "text-red-700" }
];

// Función para obtener el color del badge según el estado
const getStatusBadgeColor = (estado: string) => {
  switch (estado) {
    case "Aprobado":
      return "bg-emerald-500 hover:bg-emerald-600";
    case "En Progreso":
      return "bg-blue-500 hover:bg-blue-600";
    case "Pendiente":
      return "bg-orange-500 hover:bg-orange-600";
    case "Rechazado":
      return "bg-red-500 hover:bg-red-600";
    case "Objetado":
      return "bg-yellow-500 hover:bg-yellow-600";
    case "Cancelado":
      return "bg-gray-500 hover:bg-gray-600";
    default:
      return "bg-gray-500 hover:bg-gray-600";
  }
};

// Función para obtener el icono según el estado
const getStatusIcon = (estado: string) => {
  switch (estado) {
    case "Aprobado":
      return <CheckCircle className="h-3 w-3" />;
    case "En Progreso":
      return <Clock className="h-3 w-3" />;
    case "Pendiente":
      return <AlertTriangle className="h-3 w-3" />;
    case "Rechazado":
      return <XCircle className="h-3 w-3" />;
    case "Objetado":
      return <AlertTriangle className="h-3 w-3" />;
    case "Cancelado":
      return <XCircle className="h-3 w-3" />;
    default:
      return <Clock className="h-3 w-3" />;
  }
};


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
              <CreditCard className="h-5 w-5" />
              Pagos
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

      {/* Key Metrics - Solo Canon y Pagos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Canon Mensual</p>
                <p className="text-2xl font-bold">{formatCurrency(monthlyStats.canon.current)}</p>
                <div className={`flex items-center gap-1 text-sm ${getTrendColor(monthlyStats.canon.trend)}`}>
                  {getTrendIcon(monthlyStats.canon.trend)}
                  <span>{monthlyStats.canon.change}%</span>
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
                  <span>{monthlyStats.payments.change}%</span>
                </div>
              </div>
              <CheckCircle className="h-8 w-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resumen Financiero */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Resumen Financiero - Septiembre 2025
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-foreground">{formatCurrency(financialSummary.totalFacturado)}</div>
              <p className="text-sm text-muted-foreground">Total Facturado</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-emerald-600">{formatCurrency(financialSummary.cobrado)}</div>
              <p className="text-sm text-muted-foreground">Cobrado</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{formatCurrency(financialSummary.pendiente)}</div>
              <p className="text-sm text-muted-foreground">Pendiente</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-emerald-600">{financialSummary.tasaCobranza}%</div>
              <p className="text-sm text-muted-foreground">Tasa de Cobranza</p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">
              {financialSummary.propietariosPendientes} propietarios con pagos pendientes
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Estado de Pagos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Estado de Pagos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {paymentStatus.map((status, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    index === 0 ? "bg-emerald-500" : 
                    index === 1 ? "bg-orange-500" : "bg-red-500"
                  }`}></div>
                  <span className="font-medium text-sm">{status.status}</span>
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

      {/* Tabla de Transacciones - Estilo PagoTIC */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Transacciones de Pago
          </CardTitle>
          
          {/* Filtros */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="flex gap-2">
              <Select defaultValue="todos">
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="objetados">Objetados</SelectItem>
                  <SelectItem value="en-proceso">En proceso</SelectItem>
                  <SelectItem value="aprobados">Aprobados</SelectItem>
                  <SelectItem value="rechazados">Rechazados</SelectItem>
                  <SelectItem value="pendiente">Pendiente</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue="septiembre">
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="septiembre">Septiembre 2025</SelectItem>
                  <SelectItem value="agosto">Agosto 2025</SelectItem>
                  <SelectItem value="julio">Julio 2025</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por pagador, concepto..."
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>ID Transacción</TableHead>
                  <TableHead>Concepto</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Nombre Pagador</TableHead>
                  <TableHead>Importe</TableHead>
                  <TableHead>CBU/Nro Tarjeta</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentTransactions.map((transaction, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{transaction.fecha}</TableCell>
                    <TableCell className="font-mono text-sm">{transaction.idTransaccion}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono">
                        {transaction.concepto}
                      </Badge>
                    </TableCell>
                    <TableCell>{transaction.descripcion}</TableCell>
                    <TableCell>{transaction.pagador}</TableCell>
                    <TableCell className="font-semibold">
                      {formatCurrency(transaction.importe)}
                    </TableCell>
                    <TableCell className="font-mono text-sm">{transaction.cbu}</TableCell>
                    <TableCell>
                      <Badge 
                        className={`${getStatusBadgeColor(transaction.estado)} text-white`}
                      >
                        {getStatusIcon(transaction.estado)}
                        <span className="ml-1">{transaction.estado}</span>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}