
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  DollarSign,
  Calendar,
  UserCheck,
  BarChart3,
  Settings,
  Waves,
  Building,
  Users,
  Cloud,
  ChevronRight
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState, useEffect } from "react";

const ownerItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { 
    title: "Mi Lote", 
    url: "/lote", 
    icon: Building,
    subItems: [
      { title: "Información General", url: "/lote/info" },
      { title: "Planos y Documentos", url: "/lote/planos" },
      { title: "Historial", url: "/lote/historial" },
    ]
  },
  { 
    title: "Expensas", 
    url: "/expensas", 
    icon: DollarSign,
    subItems: [
      { title: "Estado de Cuenta", url: "/expensas/estado" },
      { title: "Pagos Realizados", url: "/expensas/pagos" },
      { title: "Facturación", url: "/expensas/facturas" },
    ]
  },
  { 
    title: "Reservas", 
    url: "/reservas", 
    icon: Calendar,
    subItems: [
      { title: "Espacios Comunes", url: "/reservas/espacios" },
      { title: "Mis Reservas", url: "/reservas/mis-reservas" },
      { title: "Calendario", url: "/reservas/calendario" },
    ]
  },
  { 
    title: "Autorizaciones", 
    url: "/autorizaciones", 
    icon: UserCheck,
    subItems: [
      { title: "Nueva Autorización", url: "/autorizaciones/nueva" },
      { title: "Mis Autorizaciones", url: "/autorizaciones/lista" },
      { title: "Historial", url: "/autorizaciones/historial" },
    ]
  },
  { 
    title: "Clima & Aviación", 
    url: "/clima", 
    icon: Cloud,
    subItems: [
      { title: "Condiciones Actuales", url: "/clima/actual" },
      { title: "Pronóstico", url: "/clima/pronostico" },
      { title: "Información Aeronáutica", url: "/clima/aviacion" },
    ]
  },
];

const adminItems = [
  { 
    title: "Admin Dashboard", 
    url: "/admin", 
    icon: BarChart3,
    subItems: [
      { title: "Vista General", url: "/admin/dashboard" },
      { title: "Reportes", url: "/admin/reportes" },
      { title: "Monitoreo", url: "/admin/monitoreo" },
    ]
  },
  { 
    title: "Gestión Usuarios", 
    url: "/admin/usuarios", 
    icon: Users,
    subItems: [
      { title: "Propietarios", url: "/admin/usuarios/propietarios" },
      { title: "Personal", url: "/admin/usuarios/personal" },
      { title: "Permisos", url: "/admin/usuarios/permisos" },
    ]
  },
  { 
    title: "Configuración", 
    url: "/admin/config", 
    icon: Settings,
    subItems: [
      { title: "Sistema", url: "/admin/config/sistema" },
      { title: "Seguridad", url: "/admin/config/seguridad" },
      { title: "Notificaciones", url: "/admin/config/notificaciones" },
    ]
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";
  const [openGroups, setOpenGroups] = useState<string[]>([]);

  const isActive = (path: string) => currentPath === path;
  const isParentActive = (item: any) => {
    if (item.subItems) {
      return item.subItems.some((sub: any) => isActive(sub.url)) || isActive(item.url);
    }
    return isActive(item.url);
  };

  const toggleGroup = (itemTitle: string) => {
    setOpenGroups(prev => 
      prev.includes(itemTitle) 
        ? prev.filter(title => title !== itemTitle)
        : [...prev, itemTitle]
    );
  };

  useEffect(() => {
    const groupsToOpen: string[] = [];
    [...ownerItems, ...adminItems].forEach((item: any) => {
      if (item.subItems && isParentActive(item)) {
        groupsToOpen.push(item.title);
      }
    });
    setOpenGroups((prev) => Array.from(new Set([...prev, ...groupsToOpen])));
  }, [currentPath]);

  const getNavCls = (isActive: boolean) =>
    isActive 
      ? "bg-gradient-ocean text-white font-medium shadow-coastal" 
      : "hover:bg-ocean-light/50 text-foreground";

  const renderMenuItem = (item: any, isAdmin = false) => {
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isOpen = openGroups.includes(item.title);
    const parentActive = isParentActive(item);

    if (!hasSubItems) {
      return (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <NavLink 
              to={item.url} 
              className={({ isActive }) => getNavCls(isActive)}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {!collapsed && <span className="truncate">{item.title}</span>}
            </NavLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    }

    return (
      <SidebarMenuItem key={item.title}>
        <Collapsible open={isOpen} onOpenChange={() => toggleGroup(item.title)}>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton className={getNavCls(parentActive)}>
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {!collapsed && (
                <>
                  <span className="truncate">{item.title}</span>
                  <ChevronRight 
                    className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-90' : ''}`}
                  />
                </>
              )}
            </SidebarMenuButton>
          </CollapsibleTrigger>
          {!collapsed && (
            <CollapsibleContent>
              <SidebarMenuSub>
                {item.subItems.map((subItem: any) => (
                  <SidebarMenuSubItem key={subItem.title}>
                    <SidebarMenuSubButton asChild isActive={isActive(subItem.url)}>
                      <NavLink to={subItem.url}>
                        <span>{subItem.title}</span>
                      </NavLink>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          )}
        </Collapsible>
      </SidebarMenuItem>
    );
  };

  return (
    <Sidebar className="w-64" collapsible="icon">
      <SidebarContent className="bg-card border-r border-border">
        {/* Logo/Brand */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-8 h-8 bg-gradient-ocean rounded-lg flex items-center justify-center flex-shrink-0">
              <Waves className="h-5 w-5 text-white" />
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <h2 className="text-sm font-semibold text-foreground truncate">Bahía de los Moros</h2>
                <p className="text-xs text-muted-foreground truncate">Costa Argentina</p>
              </div>
            )}
          </div>
        </div>

        {/* Owner Section */}
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="text-muted-foreground px-4">
              Propietario
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {ownerItems.map((item) => renderMenuItem(item))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Admin Section */}
        <SidebarGroup>
          {!collapsed && (
            <SidebarGroupLabel className="text-muted-foreground px-4">
              Administración
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item) => renderMenuItem(item, true))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
