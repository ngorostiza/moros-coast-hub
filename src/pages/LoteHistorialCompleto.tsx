import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building, 
  Calendar, 
  User,
  FileText,
  DollarSign,
  Wrench,
  CheckCircle,
  Clock,
  AlertTriangle
} from "lucide-react";

export default function LoteHistorialCompleto() {
  const historyEvents = [
    {
      id: 1,
      date: "2024-02-01",
      type: "Pago",
      title: "Pago de Expensa - Enero 2024",
      description: "Pago mensual de servicios y mantenimiento",
      amount: 85200,
      status: "Completado",
      icon: DollarSign,
      color: "emerald"
    },
    {
      id: 2,
      date: "2024-01-15",
      type: "Construcción",
      title: "Inspección de Obra - Fase 2",
      description: "Revisión del avance de construcción por parte del área técnica",
      status: "Aprobado",
      icon: Building,
      color: "blue"
    },
    {
      id: 3,
      date: "2024-01-01",
      type: "Pago",
      title: "Pago de Expensa - Diciembre 2023",
      description: "Pago mensual de servicios y mantenimiento",
      amount: 82100,
      status: "Completado",
      icon: DollarSign,
      color: "emerald"
    },
    {
      id: 4,
      date: "2023-12-20",
      type: "Mantenimiento",
      title: "Limpieza de Accesos",
      description: "Mantenimiento preventivo de caminos y accesos al lote",
      status: "Completado",
      icon: Wrench,
      color: "orange"
    },
    {
      id: 5,
      date: "2023-12-01",
      type: "Pago",
      title: "Pago de Expensa - Noviembre 2023",
      description: "Pago mensual de servicios y mantenimiento",
      amount: 78900,
      status: "Completado",
      icon: DollarSign,
      color: "emerald"
    },
    {
      id: 6,
      date: "2023-11-15",
      type: "Documento",
      title: "Actualización de Planos",
      description: "Carga de nuevos planos de construcción aprobados por municipio",
      status: "Procesado",
      icon: FileText,
      color: "purple"
    },
    {
      id: 7,
      date: "2023-10-30",
      type: "Construcción",
      title: "Inicio de Construcción - Fase 2",
      description: "Comienzo de los trabajos de construcción de la segunda fase",
      status: "En Progreso",
      icon: Building,
      color: "blue"
    },
    {
      id: 8,
      date: "2023-10-01",
      type: "Pago",
      title: "Pago de Expensa - Septiembre 2023",
      description: "Pago mensual de servicios y mantenimiento",
      amount: 76400,
      status: "Completado",
      icon: DollarSign,
      color: "emerald"
    },
    {
      id: 9,
      date: "2023-09-22",
      type: "Documento",
      title: "Certificado de Obra",
      description: "Emisión de certificado de finalización de Fase 1",
      status: "Emitido",
      icon: FileText,
      color: "purple"
    },
    {
      id: 10,
      date: "2023-08-15",
      type: "Construcción",
      title: "Finalización Fase 1",
      description: "Completado cimientos y estructura básica",
      status: "Completado",
      icon: Building,
      color: "blue"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completado":
      case "Aprobado":
      case "Emitido":
      case "Procesado":
        return <CheckCircle className="h-4 w-4 text-emerald-600" />;
      case "En Progreso":
        return <Clock className="h-4 w-4 text-blue-600" />;
      case "Pendiente":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completado":
      case "Aprobado":
      case "Emitido":
      case "Procesado":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "En Progreso":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Pendiente":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Pago":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Construcción":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Mantenimiento":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Documento":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const totalPayments = historyEvents
    .filter(event => event.type === "Pago" && event.amount)
    .reduce((sum, event) => sum + event.amount!, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Historial del Lote</h1>
          <p className="text-muted-foreground">Lote 87 - Sector Del Campo</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Calendar className="w-3 h-3 mr-1" />
            {historyEvents.length} eventos
          </Badge>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Pagado</p>
                <p className="text-xl font-bold text-foreground">${totalPayments.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Eventos Totales</p>
                <p className="text-xl font-bold text-foreground">{historyEvents.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Pagos Realizados</p>
                <p className="text-xl font-bold text-foreground">{historyEvents.filter(e => e.type === "Pago").length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Construcción</p>
                <p className="text-xl font-bold text-foreground">85%</p>
              </div>
              <Building className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Cronología de Eventos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {historyEvents.map((event, index) => (
              <div key={event.id} className="flex gap-4 pb-4 border-b border-border last:border-b-0">
                <div className="flex-shrink-0">
                  <div className={`w-10 h-10 rounded-full bg-${event.color}-100 flex items-center justify-center`}>
                    <event.icon className={`h-5 w-5 text-${event.color}-600`} />
                  </div>
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{event.title}</h3>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                    </div>
                    
                    <div className="flex items-center gap-2 text-right">
                      {event.amount && (
                        <span className="font-semibold text-emerald-600">
                          ${event.amount.toLocaleString()}
                        </span>
                      )}
                      <div className="text-sm text-muted-foreground">
                        {new Date(event.date).toLocaleDateString('es-AR')}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getTypeColor(event.type)}>
                      {event.type}
                    </Badge>
                    <Badge variant="outline" className={getStatusColor(event.status)}>
                      {getStatusIcon(event.status)}
                      <span className="ml-1">{event.status}</span>
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}