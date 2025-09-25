import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { ArrowLeft, Shield, Building, Hammer, Users, Car, Plus, Edit, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StaffDetailModal from "@/components/StaffDetailModal";

export default function UsuariosStaff() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterArea, setFilterArea] = useState<string>("all");
  const [filterEstado, setFilterEstado] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 10;

  const staffCategories = [
    {
      titulo: "Administración",
      icono: Building,
      total: 8,
      enBdlM: 5,
      color: "blue",
      descripcion: "Personal administrativo"
    },
    {
      titulo: "Mantenimiento",
      icono: Hammer,
      total: 12,
      enBdlM: 8,
      color: "orange",
      descripcion: "Mantenimiento y servicios"
    },
    {
      titulo: "El Club",
      icono: Users,
      total: 6,
      enBdlM: 4,
      color: "green",
      descripcion: "Personal del club"
    },
    {
      titulo: "Guardavidas",
      icono: Shield,
      total: 4,
      enBdlM: 2,
      color: "red",
      descripcion: "Seguridad acuática"
    },
    {
      titulo: "Vial",
      icono: Car,
      total: 3,
      enBdlM: 2,
      color: "purple",
      descripcion: "Seguridad vial y accesos"
    }
  ];

  const personalData = [
    // Administración - Algunos con múltiples áreas
    { id: 1, nombre: "Ana García López", dni: "12345678", fechaNac: "15/03/1985", areasPrimaria: "Administración", areasAdicionales: ["El Club"], displayAreas: "Administración + El Club", vencimientoART: "15/12/2025", ultimaEntrada: "25/09/2025 08:30", contacto: "1123456789 / ana@bdlm.com", email: "ana@bdlm.com", telefono: "1123456789", estado: "En BdlM", esTambien: "Propietaria L-023" },
    { id: 2, nombre: "Roberto Silva", dni: "23456789", fechaNac: "08/11/1979", areasPrimaria: "Administración", areasAdicionales: [], displayAreas: "Administración", vencimientoART: "20/01/2026", ultimaEntrada: "24/09/2025 09:15", contacto: "1134567890 / roberto@bdlm.com", email: "roberto@bdlm.com", telefono: "1134567890", estado: "Fuera" },
    { id: 3, nombre: "María Fernández", dni: "34567890", fechaNac: "12/07/1988", areasPrimaria: "Administración", areasAdicionales: [], displayAreas: "Administración", vencimientoART: "10/03/2026", ultimaEntrada: "25/09/2025 07:45", contacto: "1145678901 / maria@bdlm.com", email: "maria@bdlm.com", telefono: "1145678901", estado: "En BdlM" },
    { id: 4, nombre: "Diego Morales", dni: "45678901", fechaNac: "25/04/1982", areasPrimaria: "Administración", areasAdicionales: ["Vial"], displayAreas: "Administración + Vial", vencimientoART: "05/11/2025", ultimaEntrada: "23/09/2025 10:20", contacto: "1156789012 / diego@bdlm.com", email: "diego@bdlm.com", telefono: "1156789012", estado: "En BdlM", esTambien: "Inquilino L-088" },
    { id: 5, nombre: "Carmen Ruiz", dni: "56789012", fechaNac: "18/09/1990", areasPrimaria: "Administración", areasAdicionales: [], displayAreas: "Administración", vencimientoART: "30/04/2026", ultimaEntrada: "25/09/2025 08:00", contacto: "1167890123 / carmen@bdlm.com", email: "carmen@bdlm.com", telefono: "1167890123", estado: "En BdlM" },
    { id: 6, nombre: "Pablo Herrera", dni: "67890123", fechaNac: "03/12/1986", areasPrimaria: "Administración", areasAdicionales: [], displayAreas: "Administración", vencimientoART: "18/07/2026", ultimaEntrada: "22/09/2025 16:30", contacto: "1178901234 / pablo@bdlm.com", email: "pablo@bdlm.com", telefono: "1178901234", estado: "Fuera" },
    { id: 7, nombre: "Laura Jiménez", dni: "78901234", fechaNac: "14/06/1984", areasPrimaria: "Administración", areasAdicionales: [], displayAreas: "Administración", vencimientoART: "12/09/2025", ultimaEntrada: "25/09/2025 09:45", contacto: "1189012345 / laura@bdlm.com", email: "laura@bdlm.com", telefono: "1189012345", estado: "En BdlM" },
    { id: 8, nombre: "Andrés Vega", dni: "89012345", fechaNac: "29/01/1991", areasPrimaria: "Administración", areasAdicionales: [], displayAreas: "Administración", vencimientoART: "25/02/2026", ultimaEntrada: "21/09/2025 14:15", contacto: "1190123456 / andres@bdlm.com", email: "andres@bdlm.com", telefono: "1190123456", estado: "Fuera" },

    // Mantenimiento - Algunos con áreas adicionales
    { id: 9, nombre: "Carlos Pérez", dni: "87654321", fechaNac: "22/08/1978", areasPrimaria: "Mantenimiento", areasAdicionales: [], displayAreas: "Mantenimiento", vencimientoART: "10/01/2026", ultimaEntrada: "25/09/2025 06:00", contacto: "1134567890 / carlos@bdlm.com", email: "carlos@bdlm.com", telefono: "1134567890", estado: "En BdlM" },
    { id: 10, nombre: "Jorge López", dni: "98765432", fechaNac: "05/02/1975", areasPrimaria: "Mantenimiento", areasAdicionales: [], displayAreas: "Mantenimiento", vencimientoART: "15/08/2025", ultimaEntrada: "24/09/2025 06:30", contacto: "1145678901 / jorge@bdlm.com", email: "jorge@bdlm.com", telefono: "1145678901", estado: "En BdlM" },
    { id: 11, nombre: "Miguel Santos", dni: "19876543", fechaNac: "17/10/1983", areasPrimaria: "Mantenimiento", areasAdicionales: [], displayAreas: "Mantenimiento", vencimientoART: "22/06/2026", ultimaEntrada: "25/09/2025 07:00", contacto: "1156789012 / miguel@bdlm.com", email: "miguel@bdlm.com", telefono: "1156789012", estado: "En BdlM" },
    { id: 12, nombre: "Eduardo Ramírez", dni: "21987654", fechaNac: "30/05/1980", areasPrimaria: "Mantenimiento", areasAdicionales: [], displayAreas: "Mantenimiento", vencimientoART: "08/12/2025", ultimaEntrada: "23/09/2025 13:45", contacto: "1167890123 / eduardo@bdlm.com", email: "eduardo@bdlm.com", telefono: "1167890123", estado: "Fuera" },
    { id: 13, nombre: "Luis Torres", dni: "32198765", fechaNac: "11/03/1987", areasPrimaria: "Mantenimiento", areasAdicionales: [], displayAreas: "Mantenimiento", vencimientoART: "16/05/2026", ultimaEntrada: "25/09/2025 06:15", contacto: "1178901234 / luis@bdlm.com", email: "luis@bdlm.com", telefono: "1178901234", estado: "En BdlM" },
    { id: 14, nombre: "Fernando Castro", dni: "43219876", fechaNac: "24/09/1976", areasPrimaria: "Mantenimiento", areasAdicionales: [], displayAreas: "Mantenimiento", vencimientoART: "04/10/2025", ultimaEntrada: "24/09/2025 15:20", contacto: "1189012345 / fernando@bdlm.com", email: "fernando@bdlm.com", telefono: "1189012345", estado: "En BdlM" },
    { id: 15, nombre: "Raúl Mendoza", dni: "54321987", fechaNac: "07/12/1989", areasPrimaria: "Mantenimiento", areasAdicionales: [], displayAreas: "Mantenimiento", vencimientoART: "28/03/2026", ultimaEntrada: "22/09/2025 11:30", contacto: "1190123456 / raul@bdlm.com", email: "raul@bdlm.com", telefono: "1190123456", estado: "Fuera" },
    { id: 16, nombre: "Sergio Vargas", dni: "65432198", fechaNac: "19/07/1985", areasPrimaria: "Mantenimiento", areasAdicionales: [], displayAreas: "Mantenimiento", vencimientoART: "13/01/2026", ultimaEntrada: "25/09/2025 05:45", contacto: "1201234567 / sergio@bdlm.com", email: "sergio@bdlm.com", telefono: "1201234567", estado: "En BdlM" },
    { id: 17, nombre: "Adrián Flores", dni: "76543219", fechaNac: "02/04/1992", areasPrimaria: "Mantenimiento", areasAdicionales: [], displayAreas: "Mantenimiento", vencimientoART: "21/07/2026", ultimaEntrada: "23/09/2025 17:00", contacto: "1212345678 / adrian@bdlm.com", email: "adrian@bdlm.com", telefono: "1212345678", estado: "Fuera" },
    { id: 18, nombre: "Mateo Guerrero", dni: "87654321", fechaNac: "15/08/1981", areasPrimaria: "Mantenimiento", areasAdicionales: [], displayAreas: "Mantenimiento", vencimientoART: "09/11/2025", ultimaEntrada: "25/09/2025 06:45", contacto: "1223456789 / mateo@bdlm.com", email: "mateo@bdlm.com", telefono: "1223456789", estado: "En BdlM" },
    { id: 19, nombre: "Nicolás Romero", dni: "98765432", fechaNac: "28/01/1988", areasPrimaria: "Mantenimiento", areasAdicionales: [], displayAreas: "Mantenimiento", vencimientoART: "17/04/2026", ultimaEntrada: "24/09/2025 12:15", contacto: "1234567890 / nicolas@bdlm.com", email: "nicolas@bdlm.com", telefono: "1234567890", estado: "Fuera" },
    { id: 20, nombre: "Gabriel Ortiz", dni: "19876543", fechaNac: "10/06/1979", areasPrimaria: "Mantenimiento", areasAdicionales: [], displayAreas: "Mantenimiento", vencimientoART: "26/08/2025", ultimaEntrada: "25/09/2025 07:30", contacto: "1245678901 / gabriel@bdlm.com", email: "gabriel@bdlm.com", telefono: "1245678901", estado: "En BdlM" },

    // El Club - Algunos multidepartamentales
    { id: 21, nombre: "Sofía Martinez", dni: "13579246", fechaNac: "08/05/1990", areasPrimaria: "El Club", areasAdicionales: [], displayAreas: "El Club", vencimientoART: "14/12/2025", ultimaEntrada: "25/09/2025 10:00", contacto: "1156789012 / sofia@bdlm.com", email: "sofia@bdlm.com", telefono: "1156789012", estado: "En BdlM" },
    { id: 22, nombre: "Valentina Díaz", dni: "24681357", fechaNac: "21/11/1987", areasPrimaria: "El Club", areasAdicionales: ["Administración"], displayAreas: "El Club + Administración", vencimientoART: "07/06/2026", ultimaEntrada: "24/09/2025 14:30", contacto: "1167890123 / valentina@bdlm.com", email: "valentina@bdlm.com", telefono: "1167890123", estado: "En BdlM" },
    { id: 23, nombre: "Isabella Rojas", dni: "35792468", fechaNac: "16/02/1993", areasPrimaria: "El Club", areasAdicionales: [], displayAreas: "El Club", vencimientoART: "23/09/2026", ultimaEntrada: "23/09/2025 11:45", contacto: "1178901234 / isabella@bdlm.com", email: "isabella@bdlm.com", telefono: "1178901234", estado: "Fuera" },
    { id: 24, nombre: "Camila Herrera", dni: "46813579", fechaNac: "04/08/1985", areasPrimaria: "El Club", areasAdicionales: [], displayAreas: "El Club", vencimientoART: "11/03/2026", ultimaEntrada: "25/09/2025 13:20", contacto: "1189012345 / camila@bdlm.com", email: "camila@bdlm.com", telefono: "1189012345", estado: "En BdlM" },
    { id: 25, nombre: "Luciana Paz", dni: "57924681", fechaNac: "27/12/1991", areasPrimaria: "El Club", areasAdicionales: [], displayAreas: "El Club", vencimientoART: "19/01/2026", ultimaEntrada: "22/09/2025 16:10", contacto: "1190123456 / luciana@bdlm.com", email: "luciana@bdlm.com", telefono: "1190123456", estado: "Fuera" },
    { id: 26, nombre: "Agustina León", dni: "68135792", fechaNac: "13/07/1989", areasPrimaria: "El Club", areasAdicionales: [], displayAreas: "El Club", vencimientoART: "05/05/2026", ultimaEntrada: "25/09/2025 09:30", contacto: "1201234567 / agustina@bdlm.com", email: "agustina@bdlm.com", telefono: "1201234567", estado: "En BdlM" },

    // Guardavidas
    { id: 27, nombre: "Maximiliano Ríos", dni: "97531468", fechaNac: "09/04/1994", areasPrimaria: "Guardavidas", areasAdicionales: [], displayAreas: "Guardavidas", vencimientoART: "12/08/2026", ultimaEntrada: "25/09/2025 11:00", contacto: "1212345678 / maxi@bdlm.com", email: "maxi@bdlm.com", telefono: "1212345678", estado: "En BdlM" },
    { id: 28, nombre: "Sebastián Moreno", dni: "86420357", fechaNac: "22/01/1992", areasPrimaria: "Guardavidas", areasAdicionales: [], displayAreas: "Guardavidas", vencimientoART: "28/02/2026", ultimaEntrada: "24/09/2025 12:30", contacto: "1223456789 / sebastian@bdlm.com", email: "sebastian@bdlm.com", telefono: "1223456789", estado: "En BdlM" },
    { id: 29, nombre: "Tomás Silva", dni: "75319246", fechaNac: "06/10/1990", areasPrimaria: "Guardavidas", areasAdicionales: [], displayAreas: "Guardavidas", vencimientoART: "16/06/2026", ultimaEntrada: "23/09/2025 15:45", contacto: "1234567890 / tomas@bdlm.com", email: "tomas@bdlm.com", telefono: "1234567890", estado: "Fuera" },
    { id: 30, nombre: "Joaquín Cruz", dni: "64208135", fechaNac: "18/03/1995", areasPrimaria: "Guardavidas", areasAdicionales: [], displayAreas: "Guardavidas", vencimientoART: "04/11/2025", ultimaEntrada: "21/09/2025 08:15", contacto: "1245678901 / joaquin@bdlm.com", email: "joaquin@bdlm.com", telefono: "1245678901", estado: "Fuera" },

    // Vial  
    { id: 31, nombre: "Esteban Navarro", dni: "53197024", fechaNac: "01/09/1983", areasPrimaria: "Vial", areasAdicionales: [], displayAreas: "Vial", vencimientoART: "20/12/2025", ultimaEntrada: "25/09/2025 06:00", contacto: "1256789012 / esteban@bdlm.com", email: "esteban@bdlm.com", telefono: "1256789012", estado: "En BdlM" },
    { id: 32, nombre: "Hernán Campos", dni: "42086913", fechaNac: "14/05/1978", areasPrimaria: "Vial", areasAdicionales: [], displayAreas: "Vial", vencimientoART: "08/07/2026", ultimaEntrada: "24/09/2025 22:00", contacto: "1267890123 / hernan@bdlm.com", email: "hernan@bdlm.com", telefono: "1267890123", estado: "En BdlM" },
    { id: 33, nombre: "Facundo Ibáñez", dni: "31975802", fechaNac: "26/11/1986", areasPrimaria: "Vial", areasAdicionales: [], displayAreas: "Vial", vencimientoART: "15/04/2026", ultimaEntrada: "23/09/2025 06:30", contacto: "1278901234 / facundo@bdlm.com", email: "facundo@bdlm.com", telefono: "1278901234", estado: "Fuera" }
  ];

  const filteredPersonal = useMemo(() => {
    return personalData.filter(person => {
      const matchesSearch = person.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          person.dni.includes(searchTerm);
      const matchesArea = filterArea === "all" || person.areasPrimaria === filterArea || person.areasAdicionales?.includes(filterArea);
      const matchesEstado = filterEstado === "all" || person.estado === filterEstado;
      
      return matchesSearch && matchesArea && matchesEstado;
    });
  }, [searchTerm, filterArea, filterEstado]);

  const handleViewDetails = (staff) => {
    setSelectedStaff(staff);
    setIsModalOpen(true);
  };

  const totalPages = Math.ceil(filteredPersonal.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPersonal = filteredPersonal.slice(startIndex, startIndex + itemsPerPage);

  const totalStaff = staffCategories.reduce((sum, cat) => sum + cat.total, 0);
  const totalEnBdlM = staffCategories.reduce((sum, cat) => sum + cat.enBdlM, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/admin/usuarios/autorizados")}>
            <ArrowLeft className="h-4 w-4" />
            Usuarios Autorizados
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Staff BdlM</h1>
            <p className="text-muted-foreground">Personal de Bahía de los Moros</p>
          </div>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Agregar Personal
        </Button>
      </div>

      {/* Summary Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Staff Total BdlM</h3>
              <div className="flex items-center gap-4 mt-2">
                <div>
                  <p className="text-3xl font-bold text-blue-600">{totalStaff}</p>
                  <p className="text-sm text-muted-foreground">Total empleados</p>
                </div>
                <div className="h-8 w-px bg-blue-200"></div>
                <div>
                  <p className="text-2xl font-bold text-green-600">{totalEnBdlM}</p>
                  <p className="text-sm text-muted-foreground">En BdlM ahora</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-blue-100 rounded-full">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Staff Categories - Comparative Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {staffCategories.map((categoria) => {
          const IconComponent = categoria.icono;
          return (
            <Card key={categoria.titulo} className="hover:shadow-md transition-all">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 bg-${categoria.color}-100 rounded-lg`}>
                    <IconComponent className={`h-5 w-5 text-${categoria.color}-600`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{categoria.titulo}</h3>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Total:</span>
                    <span className="font-bold text-xl">{categoria.total}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">En BdlM:</span>
                    <span className={`font-bold text-xl text-${categoria.color}-600`}>{categoria.enBdlM}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">{categoria.descripcion}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Personal ABM Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle>Personal Completo - ABM</CardTitle>
              <p className="text-sm text-muted-foreground mt-3">
                {filteredPersonal.length} de {personalData.length} empleados
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-2">
              <Input
                placeholder="Buscar por nombre o DNI..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-64"
              />
              <Select value={filterArea} onValueChange={setFilterArea}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Área" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las áreas</SelectItem>
                  <SelectItem value="Administración">Administración</SelectItem>
                  <SelectItem value="Mantenimiento">Mantenimiento</SelectItem>
                  <SelectItem value="El Club">El Club</SelectItem>
                  <SelectItem value="Guardavidas">Guardavidas</SelectItem>
                  <SelectItem value="Vial">Vial</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterEstado} onValueChange={setFilterEstado}>
                <SelectTrigger className="w-full md:w-32">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="En BdlM">En BdlM</SelectItem>
                  <SelectItem value="Fuera">Fuera</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre y Apellido</TableHead>
                  <TableHead>Fecha de Nacimiento</TableHead>
                  <TableHead>Área</TableHead>
                  <TableHead>Vencimiento ART</TableHead>
                  <TableHead>Última Entrada a BdlM</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedPersonal.map((person) => (
                  <TableRow key={person.id}>
                    <TableCell className="font-medium">
                      <div>
                        {person.nombre}
                        {person.esTambien && (
                          <Badge variant="outline" className="ml-2 bg-purple-50 text-purple-700 text-xs">
                            {person.esTambien}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{person.fechaNac}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className="text-xs bg-blue-50">
                          {person.areasPrimaria}
                        </Badge>
                        {person.areasAdicionales?.map((area) => (
                          <Badge key={area} variant="outline" className="text-xs bg-green-50">
                            +{area}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{person.vencimientoART}</TableCell>
                    <TableCell className="text-sm">{person.ultimaEntrada}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={person.estado === "En BdlM" ? "default" : "secondary"}
                        className={person.estado === "En BdlM" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                      >
                        {person.estado}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleViewDetails(person)}>
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
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
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
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>

      <StaffDetailModal 
        staff={selectedStaff}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}