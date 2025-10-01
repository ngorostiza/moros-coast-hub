import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, Edit, Trash2, Eye, MapPin, Home, CheckCircle, Building, Hammer, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import LoteDetailModal from "@/components/LoteDetailModal";

export default function LotesABM() {
  const navigate = useNavigate();
  const [selectedLote, setSelectedLote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterEstado, setFilterEstado] = useState<string>("all");
  const [filterCalle, setFilterCalle] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Generar 150 lotes con datos realistas y expandidos
  const [lotes] = useState(() => {
    const propietarios = ["FENDA", "Rafael De Las Carreras", "Marcelo Giunti"];
    const calles = ["De Abajo", "El Zorro", "El Encuentro"];
    const estados = ["Construido", "En Construcción", "Vendido", "Disponible"];
    const superficies = ["650 m²", "720 m²", "850 m²", "920 m²", "1050 m²", "1200 m²"];
    
    const lotes = [];
    
    // Distribuir estados: 60 construidos + 6 en construcción + 19 vendidos + 65 disponibles = 150
    for (let i = 1; i <= 150; i++) {
      let estado;
      if (i <= 60) estado = "Construido";
      else if (i <= 66) estado = "En Construcción"; 
      else if (i <= 85) estado = "Vendido";
      else estado = "Disponible";
      
      lotes.push({
        id: i,
        numero: `L-${i.toString().padStart(3, '0')}`,
        propietario: estado === "Disponible" ? "-" : propietarios[i % propietarios.length],
        superficie: superficies[i % superficies.length],
        estado: estado,
        calle: calles[i % calles.length],
        dimensiones: {
          frente: `${Math.floor(Math.random() * 30) + 70}m`,
          fondo: `${Math.floor(Math.random() * 40) + 100}m`,
          orientacion: ["Norte-Sur", "Este-Oeste", "Noreste-Suroeste"][Math.floor(Math.random() * 3)]
        },
        servicios: ["Agua", "Luz", "Gas", "Internet", "Cloacas"].filter(() => Math.random() > 0.2),
        historial: [
          {
            fecha: "15/03/2020",
            evento: "Venta del lote",
            descripcion: "Primer propietario registrado"
          },
          {
            fecha: "22/11/2021", 
            evento: "Inicio de construcción",
            descripcion: "Permisos aprobados y obras iniciadas"
          }
        ],
        documentos: estado !== "Disponible" ? [
          { nombre: "Escritura", tipo: "Legal", url: "/docs/escritura.pdf" },
          { nombre: "Plano de mensura", tipo: "Técnico", url: "/docs/mensura.pdf" }
        ] : [],
        fotos: estado === "Construido" ? [
          { nombre: "Vista aérea", url: "/photos/aerial.jpg", fecha: "25/09/2025" },
          { nombre: "Frente de la casa", url: "/photos/front.jpg", fecha: "25/09/2025" }
        ] : [],
        proyecto: estado === "Construido" || estado === "En Construcción" ? {
          tipoVivienda: ["Casa familiar", "Chalet", "Casa moderna"][Math.floor(Math.random() * 3)],
          metrosCubiertos: `${Math.floor(Math.random() * 200) + 150} m²`,
          dormitorios: Math.floor(Math.random() * 3) + 2,
          banos: Math.floor(Math.random() * 2) + 2
        } : undefined
      });
    }
    
    return lotes;
  });

  const handleViewDetails = (lote) => {
    setSelectedLote(lote);
    setIsModalOpen(true);
  };

  // Filtrado de lotes
  const filteredLotes = useMemo(() => {
    return lotes.filter((lote) => {
      const matchesSearch =
        searchTerm === "" ||
        lote.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lote.propietario.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lote.calle.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesEstado = filterEstado === "all" || lote.estado === filterEstado;
      const matchesCalle = filterCalle === "all" || lote.calle === filterCalle;

      return matchesSearch && matchesEstado && matchesCalle;
    });
  }, [lotes, searchTerm, filterEstado, filterCalle]);

  // Paginación
  const totalPages = Math.ceil(filteredLotes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLotes = filteredLotes.slice(startIndex, startIndex + itemsPerPage);

  // Stats basados en lotes filtrados
  const stats = {
    total: filteredLotes.length,
    vendidos: filteredLotes.filter((l) => l.estado === "Vendido").length,
    construidos: filteredLotes.filter((l) => l.estado === "Construido").length,
    enConstruccion: filteredLotes.filter((l) => l.estado === "En Construcción").length,
    disponibles: filteredLotes.filter((l) => l.estado === "Disponible").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/admin/dashboard")}>
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">ABM Lotes</h1>
            <p className="text-muted-foreground">Gestión completa de lotes del barrio</p>
          </div>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Lote
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Home className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total Lotes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.vendidos}</p>
                <p className="text-sm text-muted-foreground">Vendidos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.construidos}</p>
                <p className="text-sm text-muted-foreground">Construidos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Hammer className="h-4 w-4 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.enConstruccion}</p>
                <p className="text-sm text-muted-foreground">En Construcción</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Plus className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.disponibles}</p>
                <p className="text-sm text-muted-foreground">Disponibles</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros y búsqueda */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por lote, propietario o calle..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-9"
                />
              </div>
            </div>
            <Select value={filterEstado} onValueChange={(value) => {
              setFilterEstado(value);
              setCurrentPage(1);
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="Construido">Construido</SelectItem>
                <SelectItem value="En Construcción">En Construcción</SelectItem>
                <SelectItem value="Vendido">Vendido</SelectItem>
                <SelectItem value="Disponible">Disponible</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterCalle} onValueChange={(value) => {
              setFilterCalle(value);
              setCurrentPage(1);
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por calle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las calles</SelectItem>
                <SelectItem value="De Abajo">De Abajo</SelectItem>
                <SelectItem value="El Zorro">El Zorro</SelectItem>
                <SelectItem value="El Encuentro">El Encuentro</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            Mostrando {paginatedLotes.length} de {filteredLotes.length} lotes
          </div>
        </CardContent>
      </Card>

      {/* Lotes Table */}
      <Card>
        <CardHeader>
          <CardTitle>Listado de Lotes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lote</TableHead>
                <TableHead>Propietario</TableHead>
                <TableHead>Superficie</TableHead>
                <TableHead>Calle de acceso</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedLotes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No se encontraron lotes con los filtros aplicados
                </TableCell>
              </TableRow>
            ) : (
              paginatedLotes.map((lote) => (
                <TableRow key={lote.id}>
                  <TableCell className="font-medium">{lote.numero}</TableCell>
                  <TableCell>{lote.propietario}</TableCell>
                  <TableCell>{lote.superficie}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {lote.calle}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      lote.estado === "Construido" || lote.estado === "Vendido" ? "default" : 
                      lote.estado === "Disponible" ? "secondary" : 
                      "destructive"
                    }>
                      {lote.estado}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleViewDetails(lote)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                </TableCell>
              </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="mt-4 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => setCurrentPage(page)}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
        </CardContent>
      </Card>

      <LoteDetailModal 
        lote={selectedLote}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}