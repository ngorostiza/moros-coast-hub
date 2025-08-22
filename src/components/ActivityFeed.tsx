import React, { useState, useEffect } from 'react';
import { Activity, Filter, Clock, User, Car, Home, AlertTriangle, CheckCircle, XCircle, Calendar, Waves } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface ActivityItem {
  id: string;
  type: 'access' | 'reservation' | 'maintenance' | 'alert' | 'payment' | 'weather';
  title: string;
  description: string;
  timestamp: Date;
  status: 'success' | 'warning' | 'error' | 'info';
  user?: string;
  location?: string;
}

interface ActivityFeedProps {
  className?: string;
}

export function ActivityFeed({ className }: ActivityFeedProps) {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Generate mock real-time activities
  useEffect(() => {
    const generateActivity = (): ActivityItem => {
      const types = ['access', 'reservation', 'maintenance', 'alert', 'payment', 'weather'] as const;
      const statuses = ['success', 'warning', 'error', 'info'] as const;
      const users = ['Juan Pérez', 'María García', 'Carlos López', 'Ana Martín', 'Sistema'];
      const locations = ['Entrada Principal', 'Playa Norte', 'Restaurante', 'Marina', 'Spa', 'Lobby'];
      
      const type = types[Math.floor(Math.random() * types.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const user = users[Math.floor(Math.random() * users.length)];
      const location = locations[Math.floor(Math.random() * locations.length)];

      const activities = {
        access: [
          'Acceso autorizado al complejo',
          'Salida registrada del complejo',
          'Acceso denegado - Falta autorización',
          'Vehículo registrado en entrada'
        ],
        reservation: [
          'Nueva reserva confirmada',
          'Reserva cancelada',
          'Check-in completado',
          'Check-out procesado'
        ],
        maintenance: [
          'Mantenimiento programado completado',
          'Reporte de mantenimiento pendiente',
          'Equipo reparado exitosamente',
          'Inspección de seguridad realizada'
        ],
        alert: [
          'Alerta de seguridad activada',
          'Sistema de emergencia probado',
          'Cámara de seguridad desconectada',
          'Acceso no autorizado detectado'
        ],
        payment: [
          'Pago de canon procesado',
          'Factura generada automáticamente',
          'Recordatorio de pago enviado',
          'Pago pendiente vencido'
        ],
        weather: [
          'Alerta meteorológica activa',
          'Condiciones climáticas favorables',
          'Cambio de marea registrado',
          'Actualización del pronóstico'
        ]
      };

      const descriptions = activities[type];
      const title = descriptions[Math.floor(Math.random() * descriptions.length)];

      return {
        id: Math.random().toString(36).substr(2, 9),
        type,
        title,
        description: `${title} - ${location}`,
        timestamp: new Date(Date.now() - Math.random() * 3600000), // Random time in last hour
        status,
        user: type !== 'weather' ? user : undefined,
        location
      };
    };

    // Initial activities
    const initialActivities = Array.from({ length: 20 }, generateActivity)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    
    setActivities(initialActivities);

    // Simulate real-time updates
    const interval = setInterval(() => {
      const newActivity = generateActivity();
      setActivities(prev => [newActivity, ...prev.slice(0, 49)]); // Keep last 50 activities
      setLastUpdated(new Date());
    }, 5000 + Math.random() * 10000); // Random interval between 5-15 seconds

    return () => clearInterval(interval);
  }, []);

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'access': return Car;
      case 'reservation': return Calendar;
      case 'maintenance': return Home;
      case 'alert': return AlertTriangle;
      case 'payment': return CheckCircle;
      case 'weather': return Waves;
      default: return Activity;
    }
  };

  const getStatusColor = (status: ActivityItem['status']) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-bahia-gold/20 text-bahia-gold border-bahia-gold/30';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      case 'info': return 'bg-bahia-blue-sky/20 text-bahia-blue-dark border-bahia-blue-light/30';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getTypeColor = (type: ActivityItem['type']) => {
    switch (type) {
      case 'access': return 'bg-bahia-blue-light/20 text-bahia-blue-dark';
      case 'reservation': return 'bg-bahia-blue-medium/20 text-bahia-blue-dark';
      case 'maintenance': return 'bg-bahia-sand/40 text-bahia-blue-dark';
      case 'alert': return 'bg-red-100 text-red-800';
      case 'payment': return 'bg-green-100 text-green-800';
      case 'weather': return 'bg-bahia-blue-sky/20 text-bahia-blue-dark';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const filteredActivities = activities.filter(activity => 
    filter === 'all' || activity.type === filter
  );

  const getFilterCount = (type: string) => {
    if (type === 'all') return activities.length;
    return activities.filter(activity => activity.type === type).length;
  };

  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="h-5 w-5 text-bahia-blue-dark" />
            Actividad en Tiempo Real
          </CardTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {lastUpdated.toLocaleTimeString('es-ES')}
          </div>
        </div>
        
        <div className="flex gap-2 mt-3">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filtrar actividad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                Todas ({getFilterCount('all')})
              </SelectItem>
              <SelectItem value="access">
                Accesos ({getFilterCount('access')})
              </SelectItem>
              <SelectItem value="reservation">
                Reservas ({getFilterCount('reservation')})
              </SelectItem>
              <SelectItem value="maintenance">
                Mantenimiento ({getFilterCount('maintenance')})
              </SelectItem>
              <SelectItem value="alert">
                Alertas ({getFilterCount('alert')})
              </SelectItem>
              <SelectItem value="payment">
                Pagos ({getFilterCount('payment')})
              </SelectItem>
              <SelectItem value="weather">
                Clima ({getFilterCount('weather')})
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <ScrollArea className="h-[400px] px-6">
          <div className="space-y-3 pb-4">
            {filteredActivities.map((activity) => {
              const IconComponent = getActivityIcon(activity.type);
              return (
                <div
                  key={activity.id}
                  className="flex gap-3 p-3 rounded-lg bg-card border border-border/50 hover:bg-muted/50 transition-colors"
                >
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                    getTypeColor(activity.type)
                  )}>
                    <IconComponent className="h-4 w-4" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="font-medium text-sm text-foreground">
                          {activity.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {activity.description}
                        </p>
                        {activity.user && (
                          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {activity.user}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex flex-col items-end gap-1">
                        <Badge 
                          variant="outline" 
                          className={cn("text-xs", getStatusColor(activity.status))}
                        >
                          {activity.status === 'success' && 'Exitoso'}
                          {activity.status === 'warning' && 'Advertencia'}
                          {activity.status === 'error' && 'Error'}
                          {activity.status === 'info' && 'Info'}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {activity.timestamp.toLocaleTimeString('es-ES', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}