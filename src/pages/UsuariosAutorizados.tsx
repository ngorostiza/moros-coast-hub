import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Users, UserCheck, UserPlus, Heart, Building, Briefcase, Edit, Trash2, Home, KeyRound, Hammer } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UsuariosAutorizados() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  // Sample data with new structure - REF and expiration dates
  const [usuarios] = useState(() => {
    const users = [];
    
    // Propietarios (85) - Asignados a lotes L-001 a L-085, sin vencimiento
    for (let i = 1; i <= 85; i++) {
      users.push({
        id: i,
        nombre: `Propietario ${i}`,
        tipo: "Propietarios",
        ref: `L-${String(i).padStart(3, '0')}`,
        estado: Math.random() > 0.1 ? "Activo" : "Inactivo",
        fechaVencimiento: null
      });
    }
    
    // Inquilinos (45) - Asignados a lotes L-086 a L-130, con vencimiento
    for (let i = 86; i <= 130; i++) {
      const fechaVencimiento = new Date();
      fechaVencimiento.setMonth(fechaVencimiento.getMonth() + Math.floor(Math.random() * 24) + 6);
      users.push({
        id: i,
        nombre: `Inquilino ${i - 85}`,
        tipo: "Inquilinos", 
        ref: `L-${String(i).padStart(3, '0')}`,
        estado: Math.random() > 0.1 ? "Activo" : "Inactivo",
        fechaVencimiento: fechaVencimiento.toLocaleDateString()
      });
    }
    
    // Familiares (120) - Dependen de propietarios/inquilinos, sin vencimiento
    for (let i = 131; i <= 250; i++) {
      const refOwner = users[Math.floor(Math.random() * 130)];
      users.push({
        id: i,
        nombre: `Familiar ${i - 130}`,
        tipo: "Familiares",
        ref: refOwner.nombre,
        estado: Math.random() > 0.05 ? "Activo" : "Inactivo",
        fechaVencimiento: null
      });
    }
    
    // Invitados (60) - Dependen de propietarios/inquilinos, con vencimiento corto
    for (let i = 251; i <= 310; i++) {
      const refOwner = users[Math.floor(Math.random() * 130)];
      const fechaVencimiento = new Date();
      fechaVencimiento.setDate(fechaVencimiento.getDate() + Math.floor(Math.random() * 30) + 1);
      users.push({
        id: i,
        nombre: `Invitado ${i - 250}`,
        tipo: "Invitados",
        ref: refOwner.nombre,
        estado: Math.random() > 0.15 ? "Activo" : "Inactivo",
        fechaVencimiento: fechaVencimiento.toLocaleDateString()
      });
    }
    
    // Caseros (25) - Dependen de propietarios/inquilinos, vencimiento anual
    for (let i = 311; i <= 335; i++) {
      const refOwner = users[Math.floor(Math.random() * 130)];
      const fechaVencimiento = new Date();
      fechaVencimiento.setFullYear(fechaVencimiento.getFullYear() + 1);
      users.push({
        id: i,
        nombre: `Casero ${i - 310}`,
        tipo: "Caseros",
        ref: refOwner.nombre,
        estado: Math.random() > 0.05 ? "Activo" : "Inactivo",
        fechaVencimiento: fechaVencimiento.toLocaleDateString()
      });
    }
    
    // Empleados (35) - Dependen de propietarios/inquilinos, con vencimiento
    for (let i = 336; i <= 370; i++) {
      const refOwner = users[Math.floor(Math.random() * 130)];
      const fechaVencimiento = new Date();
      fechaVencimiento.setMonth(fechaVencimiento.getMonth() + Math.floor(Math.random() * 12) + 3);
      users.push({
        id: i,
        nombre: `Empleado ${i - 335}`,
        tipo: "Empleados",
        ref: refOwner.nombre,
        estado: Math.random() > 0.08 ? "Activo" : "Inactivo",
        fechaVencimiento: fechaVencimiento.toLocaleDateString()
      });
    }
    
    return users;
  });

  const filteredUsers = useMemo(() => {
    return usuarios.filter(user => {
      const matchesSearch = user.nombre.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === "" || user.tipo === filterType;
      return matchesSearch && matchesType;
    });
  }, [usuarios, searchTerm, filterType]);

  const categorias = [
    {
      titulo: "Propietarios",
      icono: Home,
      cantidad: 85,
      color: "blue",
      descripcion: "Dueños de lotes"
    },
    {
      titulo: "Inquilinos",
      icono: KeyRound,
      cantidad: 45,
      color: "purple",
      descripcion: "Arrendatarios de lotes"
    },
    {
      titulo: "Familiares",
      icono: Heart,
      cantidad: 120,
      color: "pink",
      descripcion: "Familiares directos"
    },
    {
      titulo: "Invitados",
      icono: UserPlus,
      cantidad: 60,
      color: "green",
      descripcion: "Invitados temporales"
    },
    {
      titulo: "Caseros",
      icono: Hammer,
      cantidad: 25,
      color: "orange",
      descripcion: "Personal de mantenimiento"
    },
    {
      titulo: "Empleados",
      icono: Briefcase,
      cantidad: 35,
      color: "indigo",
      descripcion: "Personal de servicios"
    }
  ];

  const totalAutorizados = categorias.reduce((sum, cat) => sum + cat.cantidad, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/admin")}>
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Usuarios Autorizados</h1>
            <p className="text-muted-foreground">Gestión de todos los usuarios con acceso autorizado</p>
          </div>
        </div>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Agregar Usuario
        </Button>
      </div>

      {/* Summary Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Total Usuarios Autorizados</h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">{totalAutorizados}</p>
              <p className="text-sm text-muted-foreground mt-1">Activos en el sistema</p>
            </div>
            <div className="p-4 bg-blue-100 rounded-full">
              <UserCheck className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categorias.map((categoria) => {
          const IconComponent = categoria.icono;
          return (
            <Card 
              key={categoria.titulo} 
              className="hover:shadow-lg transition-all"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`p-3 bg-${categoria.color}-100 rounded-lg`}>
                    <IconComponent className={`h-6 w-6 text-${categoria.color}-600`} />
                  </div>
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    {categoria.cantidad}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-semibold mb-2">{categoria.titulo}</h3>
                <p className="text-sm text-muted-foreground">{categoria.descripcion}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tabla ABM Completa */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Todos los Usuarios Autorizados</CardTitle>
            <div className="flex gap-2">
              <Input 
                placeholder="Buscar por nombre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
              <select 
                value={filterType} 
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-input rounded-md bg-background"
              >
                <option value="">Todos los tipos</option>
                <option value="Propietarios">Propietarios</option>
                <option value="Familiares">Familiares</option>
                <option value="Invitados">Invitados</option>
                <option value="Inquilinos">Inquilinos</option>
                <option value="Caseros">Caseros</option>
                <option value="Empleados">Empleados</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>REF</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Vencimiento</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.nombre}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.tipo}</Badge>
                  </TableCell>
                  <TableCell>{user.ref}</TableCell>
                  <TableCell>
                    <Badge variant={user.estado === "Activo" ? "default" : "secondary"}>
                      {user.estado}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {user.fechaVencimiento ? user.fechaVencimiento : "Sin vencimiento"}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
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
          {Math.ceil(filteredUsers.length / itemsPerPage) > 1 && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-muted-foreground">
                Mostrando {currentPage * itemsPerPage + 1} a {Math.min((currentPage + 1) * itemsPerPage, filteredUsers.length)} de {filteredUsers.length} usuarios
              </p>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                  disabled={currentPage === 0}
                >
                  Anterior
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  disabled={(currentPage + 1) * itemsPerPage >= filteredUsers.length}
                >
                  Siguiente
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}