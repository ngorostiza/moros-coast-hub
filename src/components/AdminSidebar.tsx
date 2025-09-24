import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  BarChart3,
  Settings,
  Waves,
  Users,
  ChevronRight,
  Building2,
  MapPin,
  UserCheck,
  Shield,
  Activity
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

const adminItems = [
  { 
    title: "Admin Dashboard", 
    url: "/admin", 
    icon: BarChart3,
    subItems: [
      { title: "Vista General", url: "/admin/dashboard" },
      { title: "Pagos", url: "/admin/reportes" },
      { title: "Monitoreo", url: "/admin/monitoreo" },
      { title: "Movilidad", url: "/admin/fuel" },
      { title: "Horas Máquina", url: "/admin/machinery" },
      { title: "Eficiencia", url: "/admin/eficiencia" },
    ]
  },
  { 
    title: "Espacios Comunes", 
    url: "/admin/espacios-comunes", 
    icon: Building2,
    subItems: [
      { title: "Vista General", url: "/admin/espacios-comunes" },
      { title: "ABM", url: "/admin/espacios-comunes/abm" },
    ]
  },
  { 
    title: "Lotes", 
    url: "/admin/lotes/abm", 
    icon: MapPin
  },
  { 
    title: "Usuarios", 
    url: "/admin/usuarios", 
    icon: Users,
    subItems: [
      { 
        title: "Autorizados", 
        url: "/admin/usuarios/autorizados",
        subItems: [
          { title: "Propietarios", url: "/admin/usuarios/propietarios" },
          { title: "Familiares", url: "/admin/usuarios/familiares" },
          { title: "Invitados", url: "/admin/usuarios/invitados" },
          { title: "Inquilinos", url: "/admin/usuarios/inquilinos" },
          { title: "Caseros", url: "/admin/usuarios/caseros" },
          { title: "Empleados", url: "/admin/usuarios/empleados" },
        ]
      },
      { 
        title: "Staff BdlM", 
        url: "/admin/usuarios/staff",
        subItems: [
          { title: "Personal", url: "/admin/usuarios/personal" },
        ]
      },
    ]
  },
  { 
    title: "Configuración", 
    url: "/admin/config", 
    icon: Settings,
    subItems: [
      { title: "Sistema", url: "/admin/config/sistema" },
      { title: "APIs", url: "/admin/config/apis" },
    ]
  },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
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
    adminItems.forEach((item: any) => {
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

  const renderMenuItem = (item: any) => {
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
            <SidebarMenuButton className={getNavCls(parentActive)} onClick={() => navigate(item.subItems[0].url)}>
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
    <div className="relative">
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
                  <p className="text-xs text-muted-foreground truncate">Panel Admin</p>
                </div>
              )}
            </div>
          </div>

          {/* Admin Section */}
          <SidebarGroup>
            {!collapsed && (
              <SidebarGroupLabel className="text-muted-foreground px-4">
                Administración
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {adminItems.map((item) => renderMenuItem(item))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  );
}