import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building, MapPin, Calendar, Users, History, FileText } from "lucide-react";
import LoteDetailModal from "@/components/LoteDetailModal";

export default function LoteInfo() {
  const [selectedLote, setSelectedLote] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("resumen");

  const lotesDelPropietario = [
    { 
      id: 1, 
      numero: "087", 
      propietario: "Juan Pérez",
      sector: "Del Campo", 
      superficie: "1,250 m²", 
      estado: "Escriturado",
      calle: "Camino Principal Norte",
      coordenadas: "-38.1234, -57.5678",
      dimensiones: {
        frente: "25m",
        fondo: "50m",
        orientacion: "Norte-Sur"
      },
      servicios: ["Agua", "Luz", "Cloacas"],
      historial: [
        { fecha: "2024-01-15", evento: "Escritura registrada", descripcion: "Documentación legal completada" },
        { fecha: "2023-06-10", evento: "Pago inicial realizado", descripcion: "Primera cuota abonada" }
      ],
      documentos: [
        { nombre: "Escritura", tipo: "Legal", url: "/docs/escritura.pdf" },
        { nombre: "Plano aprobado", tipo: "Técnico", url: "/docs/plano.pdf" }
      ],
      fotos: [
        { nombre: "Vista del lote", url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c", fecha: "15/01/2024" }
      ],
      proyecto: undefined
    },
    { 
      id: 2, 
      numero: "124", 
      propietario: "Juan Pérez",
      sector: "Costa Norte", 
      superficie: "980 m²", 
      estado: "En Construcción",
      calle: "Av. Costanera",
      coordenadas: "-38.1156, -57.5432",
      dimensiones: {
        frente: "20m",
        fondo: "49m",
        orientacion: "Este-Oeste"
      },
      servicios: ["Agua", "Luz"],
      historial: [
        { fecha: "2024-03-01", evento: "Avance 60% de obra", descripcion: "Construcción en proceso" },
        { fecha: "2023-09-15", evento: "Inicio de construcción", descripcion: "Permisos aprobados y obras iniciadas" },
        { fecha: "2023-03-10", evento: "Compra del lote", descripcion: "Primera venta registrada" }
      ],
      documentos: [
        { nombre: "Escritura", tipo: "Legal", url: "/docs/escritura.pdf" },
        { nombre: "Permiso de construcción", tipo: "Legal", url: "/docs/permiso.pdf" }
      ],
      fotos: [
        { nombre: "Vista de la construcción", url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea", fecha: "01/03/2024" }
      ],
      proyecto: {
        tipoVivienda: "Casa moderna",
        metrosCubiertos: "180 m²",
        dormitorios: 3,
        banos: 2
      }
    },
    { 
      id: 3, 
      numero: "156", 
      propietario: "Juan Pérez",
      sector: "Reserva", 
      superficie: "2,100 m²", 
      estado: "Proyecto Aprobado",
      calle: "Sendero del Bosque",
      coordenadas: "-38.1289, -57.5789",
      dimensiones: {
        frente: "30m",
        fondo: "70m",
        orientacion: "Noreste-Suroeste"
      },
      servicios: ["Agua", "Luz", "Cloacas"],
      historial: [
        { fecha: "2023-12-05", evento: "Proyecto aprobado", descripcion: "Permisos de construcción otorgados" },
        { fecha: "2023-08-10", evento: "Compra del lote", descripcion: "Adquisición registrada" }
      ],
      documentos: [
        { nombre: "Escritura", tipo: "Legal", url: "/docs/escritura.pdf" },
        { nombre: "Proyecto aprobado", tipo: "Técnico", url: "/docs/proyecto.pdf" }
      ],
      fotos: [],
      proyecto: {
        tipoVivienda: "Casa de campo",
        metrosCubiertos: "250 m²",
        dormitorios: 4,
        banos: 3
      }
    }
  ];

  const handleVerHistorial = (lote: any) => {
    setSelectedLote(lote);
    setActiveTab("historial");
    setIsModalOpen(true);
  };

  const handleVerDocumentos = (lote: any) => {
    setSelectedLote(lote);
    setActiveTab("documentos");
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Mi Lote - Información General</h1>
        <p className="text-muted-foreground">Detalles completos de sus propiedades en Bahía de los Moros</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lotesDelPropietario.map((lote) => (
          <Card key={lote.id} className="hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Lote {lote.numero}
              </CardTitle>
              <Badge variant="outline">{lote.sector}</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Superficie</p>
                  <p className="text-lg font-semibold">{lote.superficie}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Coordenadas</p>
                  <p className="text-sm">{lote.coordenadas}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Calle de Acceso</p>
                  <p className="text-sm">{lote.calle}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Estado</p>
                  <Badge variant={
                    lote.estado === "Escriturado" ? "default" : 
                    lote.estado === "En Construcción" ? "secondary" : 
                    "outline"
                  }>
                    {lote.estado}
                  </Badge>
                </div>
              </div>
              
              <div className="flex flex-col gap-2 pt-4 border-t">
                <Button variant="outline" className="w-full" onClick={() => handleVerHistorial(lote)}>
                  <History className="h-4 w-4 mr-2" />
                  Ver Historial
                </Button>
                <Button variant="outline" className="w-full" onClick={() => handleVerDocumentos(lote)}>
                  <FileText className="h-4 w-4 mr-2" />
                  Ver Documentación
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <LoteDetailModal
        lote={selectedLote}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}