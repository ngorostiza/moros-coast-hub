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
  Cloud
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
  useSidebar,
} from "@/components/ui/sidebar";

const ownerItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Mi Lote", url: "/lote", icon: Building },
  { title: "Expensas", url: "/expensas", icon: DollarSign },
  { title: "Reservas", url: "/reservas", icon: Calendar },
  { title: "Autorizaciones", url: "/autorizaciones", icon: UserCheck },
  { title: "Clima & Aviación", url: "/clima", icon: Cloud },
];

const adminItems = [
  { title: "Admin Dashboard", url: "/admin", icon: BarChart3 },
  { title: "Gestión Usuarios", url: "/admin/usuarios", icon: Users },
  { title: "Configuración", url: "/admin/config", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const isExpanded = ownerItems.some((i) => isActive(i.url)) || adminItems.some((i) => isActive(i.url));

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-gradient-ocean text-white font-medium shadow-coastal" 
      : "hover:bg-ocean-light/50 text-foreground";

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
              {ownerItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!collapsed && <span className="truncate">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
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
              {adminItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!collapsed && <span className="truncate">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}