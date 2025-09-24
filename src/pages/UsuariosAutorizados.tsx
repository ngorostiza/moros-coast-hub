import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, UserCheck, UserPlus, Heart, Building, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UsuariosAutorizados() {
  const navigate = useNavigate();

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

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-12">
              <UserPlus className="h-4 w-4 mr-2" />
              Autorizar Usuario
            </Button>
            <Button variant="outline" className="h-12">
              <Users className="h-4 w-4 mr-2" />
              Gestión Masiva
            </Button>
            <Button variant="outline" className="h-12">
              <UserCheck className="h-4 w-4 mr-2" />
              Reportes de Acceso
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}