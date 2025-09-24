import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Users, UserCheck, UserPlus, Heart, Building, Briefcase, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UsuariosAutorizados() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  // Datos de ejemplo de usuarios
  const [usuarios] = useState(() => {
    const tipos = ["Propietarios", "Familiares", "Invitados", "Inquilinos", "Caseros", "Empleados"];
    const nombres = [
      "Carlos Rodríguez", "María González", "Juan Pérez", "Ana Martínez", "Luis Silva",
      "Carmen López", "Pablo Castro", "Elena Morales", "Diego Fernández", "Sofía Ruiz",
      "Miguel Torres", "Laura García", "Fernando Díaz", "Valentina Herrera", "Andrés Vega",
      "Patricia Sánchez", "Roberto Méndez", "Gabriela Jiménez", "Ricardo Vargas", "Isabel Cruz",
      "Alejandro Ramos", "Natalia Ortega", "Sebastián Gutiérrez", "Paola Romero", "Mateo Aguilar",
      "Camila Guerrero", "Felipe Navarro", "Andrea Molina", "Nicolás Delgado", "Daniela Peña"
    ];
    
    return Array.from({ length: 60 }, (_, i) => ({
      id: i + 1,
      nombre: nombres[i % nombres.length],
      email: `${nombres[i % nombres.length].toLowerCase().replace(/ /g, '.')}@email.com`,
      tipo: tipos[Math.floor(i / 10)],
      activo: Math.random() > 0.1
    }));
  });

  const filteredUsers = useMemo(() => {
    return usuarios.filter(user => {
      const matchesSearch = user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === "" || user.tipo === filterType;
      return matchesSearch && matchesType;
    });
  }, [usuarios, searchTerm, filterType]);

  const categorias = [
    {
      titulo: "Propietarios",
      icono: Building,
      cantidad: 189,
      color: "blue",
      url: "/admin/usuarios/propietarios",
      descripcion: "Propietarios de lotes"
    },
    {
      titulo: "Familiares",
      icono: Heart,
      cantidad: 324,
      color: "pink",
      url: "/admin/usuarios/familiares",
      descripcion: "Familiares directos"
    },
    {
      titulo: "Invitados",
      icono: UserPlus,
      cantidad: 89,
      color: "green",
      url: "/admin/usuarios/invitados",
      descripcion: "Invitados temporales"
    },
    {
      titulo: "Inquilinos",
      icono: Users,
      cantidad: 45,
      color: "purple",
      url: "/admin/usuarios/inquilinos",
      descripcion: "Inquilinos de propiedades"
    },
    {
      titulo: "Caseros",
      icono: UserCheck,
      cantidad: 12,
      color: "orange",
      url: "/admin/usuarios/caseros",
      descripcion: "Caseros y cuidadores"
    },
    {
      titulo: "Empleados",
      icono: Briefcase,
      cantidad: 28,
      color: "indigo",
      url: "/admin/usuarios/empleados",
      descripción: "Empleados autorizados"
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
              className="hover:shadow-lg transition-all cursor-pointer hover:scale-105"
              onClick={() => navigate(categoria.url)}
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
                <Button variant="ghost" className="w-full mt-4 justify-center">
                  Ver Detalles
                </Button>
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
                placeholder="Buscar por nombre o email..."
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
                <TableHead>Email</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.nombre}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.tipo}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.activo ? "default" : "secondary"}>
                      {user.activo ? "Activo" : "Inactivo"}
                    </Badge>
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