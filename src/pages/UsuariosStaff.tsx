import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Shield, Users, UserCheck, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UsuariosStaff() {
  const navigate = useNavigate();

  const staffCategories = [
    {
      titulo: "Personal",
      icono: Users,
      cantidad: 15,
      color: "blue",
      url: "/admin/usuarios/personal",
      descripcion: "Personal administrativo y operativo",
      detalles: "Empleados permanentes de Bahía de los Moros"
    }
  ];

  const staffStats = [
    { label: "Total Staff", value: 15, color: "blue" },
    { label: "Activos", value: 13, color: "green" },
    { label: "Administrativos", value: 8, color: "purple" },
    { label: "Operativos", value: 7, color: "orange" }
  ];

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
      </div>

      {/* Summary Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Staff Total BdlM</h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">15</p>
              <p className="text-sm text-muted-foreground mt-1">Empleados activos</p>
            </div>
            <div className="p-4 bg-blue-100 rounded-full">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {staffStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="text-center">
                <p className={`text-2xl font-bold text-${stat.color}-600`}>{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Staff Categories */}
      <div className="grid grid-cols-1 gap-4">
        {staffCategories.map((categoria) => {
          const IconComponent = categoria.icono;
          return (
            <Card 
              key={categoria.titulo} 
              className="hover:shadow-lg transition-all cursor-pointer"
              onClick={() => navigate(categoria.url)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 bg-${categoria.color}-100 rounded-lg`}>
                      <IconComponent className={`h-6 w-6 text-${categoria.color}-600`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{categoria.titulo}</h3>
                      <p className="text-sm text-muted-foreground">{categoria.descripcion}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-lg px-4 py-2">
                    {categoria.cantidad}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{categoria.detalles}</p>
                <Button variant="ghost" className="w-full justify-center">
                  Gestionar Personal
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
              <Users className="h-4 w-4 mr-2" />
              Agregar Personal
            </Button>
            <Button variant="outline" className="h-12">
              <Activity className="h-4 w-4 mr-2" />
              Reportes de Staff
            </Button>
            <Button variant="outline" className="h-12">
              <UserCheck className="h-4 w-4 mr-2" />
              Permisos y Roles
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}