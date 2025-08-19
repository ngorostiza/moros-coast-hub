import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Download, 
  Eye, 
  Calendar,
  Building,
  FileImage
} from "lucide-react";

export default function LotePlanosDocumentos() {
  const documents = [
    {
      id: 1,
      name: "Plano de Mensura Original",
      type: "PDF",
      size: "2.4 MB",
      date: "2023-03-15",
      category: "Mensura",
      status: "Vigente"
    },
    {
      id: 2,
      name: "Plano de Subdivision",
      type: "PDF", 
      size: "1.8 MB",
      date: "2023-03-15",
      category: "Subdivisión",
      status: "Vigente"
    },
    {
      id: 3,
      name: "Título de Propiedad",
      type: "PDF",
      size: "3.2 MB", 
      date: "2023-04-20",
      category: "Legal",
      status: "Vigente"
    },
    {
      id: 4,
      name: "Certificado de Dominio",
      type: "PDF",
      size: "1.5 MB",
      date: "2024-01-10",
      category: "Legal", 
      status: "Vigente"
    },
    {
      id: 5,
      name: "Plano de Proyecto Aprobado",
      type: "PDF",
      size: "4.7 MB",
      date: "2023-08-22",
      category: "Construcción",
      status: "Aprobado"
    },
    {
      id: 6,
      name: "Render 3D - Vista Aérea",
      type: "JPG",
      size: "8.3 MB",
      date: "2023-09-05",
      category: "Renders",
      status: "Final"
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Mensura": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Legal": return "bg-green-100 text-green-800 border-green-200";
      case "Construcción": return "bg-orange-100 text-orange-800 border-orange-200";
      case "Renders": return "bg-purple-100 text-purple-800 border-purple-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "PDF": return <FileText className="h-5 w-5 text-red-500" />;
      case "JPG": case "PNG": return <FileImage className="h-5 w-5 text-blue-500" />;
      default: return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Planos y Documentos</h1>
          <p className="text-muted-foreground">Lote 87 - Sector Del Campo</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Building className="w-3 h-3 mr-1" />
            {documents.length} documentos
          </Badge>
        </div>
      </div>

      {/* Property Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Resumen del Lote
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Superficie Total</p>
              <p className="text-xl font-bold">10,101 m²</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Frente</p>
              <p className="text-xl font-bold">85 m</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Fondo</p>
              <p className="text-xl font-bold">118 m</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Orientación</p>
              <p className="text-xl font-bold">Norte-Sur</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 gap-4">
        {documents.map((doc) => (
          <Card key={doc.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {getFileIcon(doc.type)}
                  <div className="space-y-1">
                    <h3 className="font-semibold">{doc.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(doc.date).toLocaleDateString('es-AR')}
                      </span>
                      <span>{doc.size}</span>
                      <span>{doc.type}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className={getCategoryColor(doc.category)}>
                    {doc.category}
                  </Badge>
                  <Badge variant="outline" className="bg-emerald-100 text-emerald-800 border-emerald-200">
                    {doc.status}
                  </Badge>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      Ver
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Descargar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upload Section */}
      <Card className="border-dashed border-2 border-gray-300">
        <CardContent className="p-8 text-center">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">¿Necesitas subir un documento?</h3>
          <p className="text-muted-foreground mb-4">
            Contacta con la administración para cargar nuevos planos o documentos oficiales.
          </p>
          <Button variant="outline">
            Contactar Administración
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}