import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Waves, 
  MapPin, 
  Users, 
  Building, 
  Plane,
  ArrowRight,
  Shield,
  Calendar,
  DollarSign,
  BarChart3,
  Sunset
} from "lucide-react";
import { Link } from "react-router-dom";
import bahiaLandscape from "@/assets/bahia-landscape.jpg";

export default function Home() {
  const features = [
    {
      icon: Shield,
      title: "Gestión Comunitaria",
      description: "Herramientas para la administración responsable de nuestra comunidad",
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      icon: Calendar,
      title: "Espacios Naturales",
      description: "Reserva y cuidado de nuestros espacios comunes preservados",
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      icon: Users,
      title: "Comunidad Unida",
      description: "Conexión entre vecinos que comparten el amor por este lugar único",
      gradient: "from-violet-500 to-purple-600"
    },
    {
      icon: Waves,
      title: "Conservación Natural",
      description: "Tecnología al servicio de preservar la experiencia original de la bahía",
      gradient: "from-orange-500 to-red-600"
    }
  ];

  const stats = [
    { label: "Hectáreas", value: "600", icon: MapPin },
    { label: "Casas Construidas", value: "60", icon: Building },
    { label: "Km de Costa", value: "4", icon: Waves },
    { label: "Años de Desarrollo", value: "15", icon: Sunset },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-ocean-light/20 to-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bahiaLandscape})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30">
            <Waves className="w-4 h-4 mr-2" />
            Costa Argentina
          </Badge>
          
          {/* Stylized handwritten-like logo */}
          <div className="relative mb-6">
            <div className="inline-block bg-gradient-to-r from-teal-400/90 to-cyan-400/90 backdrop-blur-sm px-8 py-4 rounded-full border border-white/30">
              <h1 className="text-4xl md:text-6xl font-bold text-white" style={{ fontFamily: 'cursive' }}>
                Bahía de los Moros
              </h1>
            </div>
          </div>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
            Un desarrollo único donde preservamos la inmensidad original de nuestros médanos y costa atlántica
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="ocean" size="lg" className="text-lg px-8">
              <Link to="/dashboard">
                Acceso Propietarios
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-white/10 border-white/30 text-white hover:bg-white/20">
              <Link to="/admin">
                Panel Administrativo
                <BarChart3 className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Floating stats */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-white text-center">
                <CardContent className="p-4">
                  <stat.icon className="h-6 w-6 mx-auto mb-2 text-cyan-400" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Nuestros Principios
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Herramientas digitales diseñadas para preservar la experiencia única de Bahía de los Moros
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-ocean-light/30 to-seafoam/30">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <MapPin className="h-6 w-6 text-primary" />
            <Badge variant="outline" className="text-primary">Lobería, Argentina</Badge>
          </div>
          
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Costa Atlántica Argentina
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Un pueblo de mar diseñado artesanalmente, donde cada Lugar fue creado para entregar 
            una experiencia única, preservando la inmensidad original de nuestros médanos y costa.
          </p>
          
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Plane className="h-4 w-4" />
              <span>Hangares privados</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Comunidad exclusiva</span>
            </div>
            <div className="flex items-center gap-2">
              <Waves className="h-4 w-4" />
              <span>Acceso directo al mar</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}