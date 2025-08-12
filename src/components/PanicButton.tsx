import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Shield, Phone, MapPin, Clock } from "lucide-react";
import { useState } from "react";

const emergencyContacts = [
  { name: "Seguridad Interna", number: "911-BDLM", response: "2-3 min" },
  { name: "Bomberos Lobería", number: "100", response: "15-20 min" },
  { name: "Policía", number: "101", response: "10-15 min" },
  { name: "Emergencias Médicas", number: "107", response: "20-25 min" }
];

export default function PanicButton() {
  const [isActivated, setIsActivated] = useState(false);
  
  const handleEmergencyActivation = () => {
    setIsActivated(true);
    // Here would be the actual emergency protocol
    setTimeout(() => setIsActivated(false), 5000); // Reset after 5 seconds for demo
  };

  return (
    <Card className={isActivated ? "border-red-500 bg-red-50" : ""}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Sistema de Emergencia
          {isActivated && (
            <Badge variant="destructive" className="ml-2 animate-pulse">
              ACTIVADO
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Emergency Activation */}
        <div className="text-center space-y-4">
          <Button
            onClick={handleEmergencyActivation}
            disabled={isActivated}
            size="lg"
            className={`w-full h-16 text-lg font-bold transition-all ${
              isActivated 
                ? "bg-red-600 hover:bg-red-700 animate-pulse" 
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            <AlertTriangle className="h-6 w-6 mr-2" />
            {isActivated ? "EMERGENCIA ACTIVADA" : "BOTÓN DE PÁNICO"}
          </Button>
          
          {isActivated && (
            <div className="text-center space-y-2 text-red-700">
              <div className="flex items-center justify-center gap-2 font-medium">
                <MapPin className="h-4 w-4" />
                Ubicación enviada: Lote 87, Del Campo
              </div>
              <div className="text-sm">
                Seguridad en camino - Tiempo estimado: 2-3 minutos
              </div>
            </div>
          )}
        </div>

        {/* Emergency Contacts */}
        <div>
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Contactos de Emergencia
          </h4>
          <div className="space-y-2">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                <div>
                  <div className="font-medium text-sm">{contact.name}</div>
                  <div className="text-xs text-muted-foreground">{contact.number}</div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {contact.response}
                  </div>
                  <Button size="sm" variant="outline" className="mt-1">
                    <Phone className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Status */}
        <div className="mt-4 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
          <div className="flex items-center gap-2 text-emerald-700">
            <Shield className="h-4 w-4" />
            <span className="text-sm font-medium">Estado: Seguro</span>
          </div>
          <div className="text-xs text-emerald-600 mt-1">
            Última verificación: 14:23 - Patrulla en sector
          </div>
        </div>
      </CardContent>
    </Card>
  );
}