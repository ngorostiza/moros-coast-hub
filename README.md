# Sistema Integral de Gestión - Bahía de los Moros

## Descripción del Proyecto

**Bahía de los Moros** es un sistema integral de gestión desarrollado para la administración de un complejo residencial privado. El sistema consta de dos aplicaciones principales: un **Portal del Propietario** y un **Panel de Administración**, cada uno con funcionalidades específicas para diferentes tipos de usuarios.

## 🏗️ Arquitectura del Sistema

### Stack Tecnológico
- **Frontend**: React 18.3.1 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Routing**: React Router DOM v6
- **Icons**: Lucide React
- **Charts**: Recharts
- **State Management**: TanStack React Query
- **Forms**: React Hook Form + Zod
- **UI Components**: Radix UI (vía shadcn/ui)

### Estructura de Aplicación Dual
El sistema utiliza una arquitectura de aplicación dual que detecta automáticamente el tipo de acceso:

- **Subdomain Detection**: `admin.bahiadelosmoros.com` → Panel de Administración
- **Path Detection**: `/admin/*` → Panel de Administración  
- **Default**: Portal del Propietario

## 📁 Estructura de Archivos

```
src/
├── components/           # Componentes reutilizables
│   ├── ui/              # Componentes shadcn/ui
│   ├── Layout.tsx       # Layout base (legacy)
│   ├── OwnerLayout.tsx  # Layout del propietario
│   ├── AdminLayout.tsx  # Layout del administrador
│   └── [widgets/modals] # Widgets y modales específicos
├── pages/               # Páginas principales
│   ├── Dashboard.tsx    # Dashboard del propietario
│   ├── AdminDashboard.tsx # Dashboard del administrador
│   └── [feature-pages]  # Páginas por funcionalidad
├── routes/              # Configuración de rutas
│   ├── OwnerRoutes.tsx  # Rutas del propietario
│   └── AdminRoutes.tsx  # Rutas del administrador
├── hooks/               # Hooks personalizados
├── lib/                 # Utilidades y configuraciones
└── assets/              # Imágenes y recursos estáticos
```

## 🎯 Portal del Propietario

### Rutas Implementadas

| Ruta | Página | Funcionalidad |
|------|--------|---------------|
| `/` | Dashboard | Dashboard principal con widgets interactivos |
| `/dashboard` | Dashboard | Alias del dashboard principal |
| `/lote/info` | LoteInfo | Información detallada de lotes del propietario |
| `/lote/planos` | LotePlanosDocumentos | Planos y documentación técnica |
| `/lote/historial` | LoteHistorialCompleto | Historial completo de actividades |
| `/pagos/estado` | CanonEstado | Estado de pagos y canon mensual |
| `/reservas/espacios` | ReservasEspacios | Sistema de reservas de espacios comunes |
| `/reservas/mis-reservas` | ReservasMisReservas | Gestión de reservas personales |
| `/autorizaciones/nueva` | AutorizacionesNueva | Crear nuevas autorizaciones de acceso |
| `/autorizaciones/lista` | AutorizacionesLista | Lista y gestión de autorizaciones |

### Funcionalidades Implementadas

#### Dashboard Interactivo
- **Widgets Expandibles**: Cada widget puede expandirse para mostrar más información
- **Datos en Tiempo Real**: Información actualizada de lotes, pagos, reservas
- **Multi-Lote Support**: Soporte para propietarios con múltiples lotes
- **Integración Climática**: Widget de mareas y condiciones meteorológicas

#### Sistema de Autorizaciones
- **Autorizaciones Temporales**: Para visitantes y servicios
- **Autorizaciones Recurrentes**: Para personal doméstico y servicios regulares
- **Gestión Completa**: CRUD completo de autorizaciones con estados

#### Gestión de Reservas
- **Espacios Comunes**: Quincho, SUM, Cancha de Tenis, etc.
- **Calendario Integrado**: Visualización y selección de fechas
- **Estado de Reservas**: Pendientes, confirmadas, canceladas

## 🔧 Panel de Administración

### Rutas Implementadas

| Ruta | Página | Funcionalidad |
|------|--------|---------------|
| `/admin` | AdminDashboard | Dashboard integral de administración |
| `/admin/dashboard` | AdminDashboard | Alias del dashboard |
| `/admin/usuarios/staff` | UsuariosStaff | Gestión de personal BdlM |
| `/admin/usuarios/autorizados` | UsuariosAutorizados | Gestión de usuarios autorizados |
| `/admin/usuarios/permisos` | AdminUsuariosPermisos | Sistema de permisos y roles |
| `/admin/lotes/abm` | LotesABM | ABM completo de lotes |
| `/admin/espacios/abm` | EspaciosComunesABM | ABM de espacios comunes |
| `/admin/monitoreo` | AdminMonitoreo | Monitoreo en tiempo real |
| `/admin/reportes` | AdminReportes | Sistema de reportes y análisis |
| `/admin/eficiencia` | AdminEficiencia | Análisis de eficiencia operativa |
| `/admin/config/apis` | AdminConfigAPIs | Configuración de APIs externas |
| `/admin/config/sistema` | AdminConfigSistema | Configuración del sistema |
| `/admin/fuel` | FuelAnalysis | Análisis detallado de combustible |
| `/admin/machinery` | MachineryAnalysis | Análisis de maquinaria |
| `/admin/common-spaces` | CommonSpacesAnalysis | Análisis de espacios comunes |
| `/admin/activity` | ActivityLog | Log de actividades del sistema |

### Funcionalidades Implementadas

#### Dashboard Integral
- **Estadísticas Live**: Lotes vendidos, ocupados, staff activo, reservas
- **Gráficos Analíticos**: Recharts para visualización de datos
- **Widgets Especializados**: Tanques de combustible, cámaras de seguridad
- **Monitoreo en Tiempo Real**: Estado de sistemas y alertas

#### Gestión de Usuarios
- **Staff BdlM**: 21 empleados activos con perfiles detallados
- **Usuarios Autorizados**: Sistema completo de usuarios del complejo
- **Sistema de Permisos**: Roles y permisos granulares

#### ABM Completo
- **Lotes**: Gestión completa de parcelas y propiedades
- **Espacios Comunes**: Administración de amenities y espacios compartidos
- **Configuraciones**: APIs externas y configuraciones del sistema

## 🧩 Componentes Principales

### Widgets Interactivos
- `TideWidget`: Información de mareas y clima
- `MachineryHoursWidget`: Horas de uso de maquinaria
- `SecurityCameras`: Monitoreo de cámaras de seguridad
- `ActivityFeed`: Feed de actividades en tiempo real
- `ExpandableWidget`: Contenedor expandible genérico

### Modales de Detalle
- `LoteDetailModal`: Detalles completos de lotes
- `UserDetailModal`: Información detallada de usuarios
- `StaffDetailModal`: Perfiles detallados de staff
- `RestaurantReservation`: Sistema de reservas gastronómicas

### Navegación
- `OwnerSidebar`: Sidebar del portal del propietario
- `AdminSidebar`: Sidebar del panel de administración
- `AppSidebar`: Sidebar genérico (legacy)

## 🎨 Assets y Recursos

### Imágenes
- `bahia-hero.jpg`: Imagen principal/hero del complejo
- `bahia-landscape.jpg`: Paisaje del complejo para backgrounds

### Paleta de Colores
El sistema utiliza un esquema de colores consistente definido en `index.css` y `tailwind.config.ts`, optimizado para el branding de Bahía de los Moros.

## ⚙️ Configuraciones Técnicas

### Scripts de Build
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}
```

### Dependencias Críticas
- **@tanstack/react-query**: Gestión de estado y cache
- **react-router-dom**: Sistema de rutas
- **lucide-react**: Sistema de iconografía
- **recharts**: Gráficos y visualizaciones
- **@radix-ui/***: Componentes UI base
- **react-hook-form + zod**: Validación de formularios

## 🚨 Problemas Identificados

### ✅ RESUELTO: Rutas Corregidas
Las rutas `/lote/planos` y `/lote/historial` ahora apuntan correctamente a:
- `LotePlanosDocumentos` (funcionalidad completa)
- `LoteHistorialCompleto` (funcionalidad completa)

### ⚠️ Datos Mock
**CRÍTICO**: Todo el sistema utiliza datos mock. Para producción se requiere:
- Integración con Supabase (recomendado)
- APIs reales para datos de lotes, usuarios, pagos
- Sistema de autenticación real
- Base de datos relacional

## 🚀 Próximos Pasos Técnicos

### Prioridad Alta
1. **Integración Backend**: Supabase para autenticación y datos
2. **Sistema de Autenticación**: Login/logout real
3. **Base de Datos**: Migrar de mock data a datos reales

### Funcionalidades Futuras
1. **GIS Real**: Integración con mapas interactivos
2. **Sistema de Notificaciones**: Push notifications y emails
3. **File System**: Upload y gestión de documentos
4. **Integración de Pagos**: Stripe o similar
5. **Reportes PDF**: Generación automática de reportes
6. **App Mobile**: PWA o aplicación nativa

## 📱 Responsive Design

Todo el sistema está optimizado para:
- **Desktop**: Experiencia completa con sidebars
- **Tablet**: Layout adaptativo con menús colapsables  
- **Mobile**: Interfaz touch-friendly con navegación móvil

## 🔒 Consideraciones de Seguridad

- **Autenticación Dual**: Separación clara entre roles Owner/Admin
- **Rutas Protegidas**: Sistema de routing basado en permisos
- **Validación Frontend**: Zod para validación de formularios
- **Preparado para RLS**: Compatible con Row Level Security de Supabase

## 📞 Soporte y Mantenimiento

Este sistema está diseñado para ser mantenible y escalable. La arquitectura modular permite:
- **Desarrollo Incremental**: Nuevas funcionalidades sin afectar existentes
- **Testing**: Componentes aislados fáciles de testear  
- **Deployment**: Build optimizado para producción con Vite

---

**Desarrollado con ❤️ para Bahía de los Moros**  
*Sistema Integral de Gestión v1.0*