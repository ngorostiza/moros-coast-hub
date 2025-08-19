import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Waves, 
  Clock, 
  Users, 
  Star,
  Calendar,
  CheckCircle,
  User,
  Trophy,
  Target
} from "lucide-react";

const surfLevels = [
  {
    id: "beginner",
    name: "Principiante",
    icon: Target,
    description: "Primera experiencia en el surf",
    duration: "2 horas",
    groupSize: "Max 6 personas",
    price: 8000,
    includes: ["Tabla softboard", "Traje de neopreno", "Instructor certificado", "Seguro"],
    objectives: [
      "Seguridad en el agua",
      "Posición en la tabla",
      "Primeras olas en espuma",
      "Equilibrio básico"
    ],
    nextAvailable: "Mañana 10:00"
  },
  {
    id: "intermediate", 
    name: "Intermedio",
    icon: Waves,
    description: "Para quienes ya pueden pararse en la tabla",
    duration: "2.5 horas",
    groupSize: "Max 4 personas",
    price: 10000,
    includes: ["Tabla intermedia", "Traje de neopreno", "Instructor especializado", "Video análisis"],
    objectives: [
      "Técnica de remada",
      "Take-off en olas verdes",
      "Bottom turn básico",
      "Selección de olas"
    ],
    nextAvailable: "Hoy 16:00"
  },
  {
    id: "advanced",
    name: "Avanzado",
    icon: Trophy,
    description: "Perfeccionamiento de maniobras",
    duration: "3 horas",
    groupSize: "Max 2 personas",
    price: 15000,
    includes: ["Tabla performance", "Traje premium", "Coach personal", "Video análisis HD"],
    objectives: [
      "Maniobras avanzadas",
      "Tubo básico",
      "Floaters y cutbacks",
      "Competición básica"
    ],
    nextAvailable: "Pasado mañana 08:00"
  }
];

const instructors = [
  {
    name: "Carlos Mendez",
    level: "ISA Nivel 2",
    experience: "8 años",
    specialties: ["Principiantes", "Kids"],
    rating: 4.9,
    avatar: "👨‍🏫"
  },
  {
    name: "Sofia Rodriguez", 
    level: "ISA Nivel 3",
    experience: "12 años",
    specialties: ["Performance", "Competición"],
    rating: 5.0,
    avatar: "👩‍🏫"
  },
  {
    name: "Diego Torres",
    level: "ISA Nivel 1",
    experience: "5 años", 
    specialties: ["Longboard", "SUP"],
    rating: 4.8,
    avatar: "👨‍🎓"
  }
];

const upcomingClasses = [
  {
    id: "CLASS-001",
    level: "Principiante",
    date: "2024-02-20",
    time: "10:00",
    instructor: "Carlos Mendez",
    students: 4,
    maxStudents: 6,
    status: "confirmed"
  },
  {
    id: "CLASS-002",
    level: "Intermedio", 
    date: "2024-02-20",
    time: "16:00",
    instructor: "Sofia Rodriguez",
    students: 2,
    maxStudents: 4,
    status: "available"
  },
  {
    id: "CLASS-003",
    level: "Avanzado",
    date: "2024-02-22",
    time: "08:00",
    instructor: "Sofia Rodriguez", 
    students: 1,
    maxStudents: 2,
    status: "available"
  }
];

export default function SurfClasses() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(amount);
  };

  const getStatusBadge = (status: string, current: number, max: number) => {
    if (status === "confirmed") {
      return <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">Confirmada</Badge>;
    }
    if (current >= max) {
      return <Badge className="bg-red-100 text-red-800 border-red-200">Completa</Badge>;
    }
    return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Disponible</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Waves className="h-5 w-5" />
            Escuela de Surf - Bahía de los Moros
          </CardTitle>
        </CardHeader>
      </Card>

      <Tabs defaultValue="levels">
        <TabsList>
          <TabsTrigger value="levels">Niveles</TabsTrigger>
          <TabsTrigger value="schedule">Horarios</TabsTrigger>
          <TabsTrigger value="instructors">Instructores</TabsTrigger>
        </TabsList>

        <TabsContent value="levels" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {surfLevels.map((level) => {
              const LevelIcon = level.icon;
              return (
                <Card key={level.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-teal-100 rounded-lg">
                        <LevelIcon className="h-6 w-6 text-teal-600" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{level.name}</CardTitle>
                        <p className="text-muted-foreground text-sm">{level.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Price and basics */}
                    <div className="text-center p-4 bg-teal-50 rounded-lg">
                      <div className="text-3xl font-bold text-teal-600">{formatCurrency(level.price)}</div>
                      <div className="text-sm text-muted-foreground mt-1">por persona</div>
                    </div>

                    {/* Details */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{level.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{level.groupSize}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Próxima: {level.nextAvailable}</span>
                      </div>
                    </div>

                    {/* Includes */}
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Incluye:</h4>
                      <ul className="space-y-1">
                        {level.includes.map((item, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-3 w-3 text-emerald-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Objectives */}
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Objetivos:</h4>
                      <ul className="space-y-1">
                        {level.objectives.slice(0, 2).map((objective, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <Target className="h-3 w-3 text-blue-500" />
                            <span>{objective}</span>
                          </li>
                        ))}
                        {level.objectives.length > 2 && (
                          <li className="text-xs text-muted-foreground ml-5">
                            +{level.objectives.length - 2} objetivos más
                          </li>
                        )}
                      </ul>
                    </div>

                    <Button className="w-full bg-teal-600 hover:bg-teal-700">
                      Reservar Clase
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Próximas Clases Disponibles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingClasses.map((classItem) => (
                  <div key={classItem.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="text-center min-w-[80px]">
                        <div className="font-semibold">
                          {new Date(classItem.date).toLocaleDateString('es-AR', { 
                            month: 'short', 
                            day: 'numeric'
                          })}
                        </div>
                        <div className="text-sm text-muted-foreground">{classItem.time}</div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{classItem.level}</span>
                          {getStatusBadge(classItem.status, classItem.students, classItem.maxStudents)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Instructor: {classItem.instructor}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Disponibilidad: {classItem.students}/{classItem.maxStudents} estudiantes
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      {classItem.students < classItem.maxStudents && (
                        <Button size="sm">
                          Reservar
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        Ver Detalles
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="instructors" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {instructors.map((instructor, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <div className="text-6xl">{instructor.avatar}</div>
                    
                    <div>
                      <h3 className="font-semibold text-lg">{instructor.name}</h3>
                      <Badge variant="outline" className="mt-1">{instructor.level}</Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-semibold">{instructor.rating}</span>
                        <span className="text-muted-foreground text-sm">/ 5.0</span>
                      </div>
                      
                      <div className="text-sm text-muted-foreground">
                        {instructor.experience} de experiencia
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Especialidades:</p>
                        <div className="flex flex-wrap gap-1 justify-center">
                          {instructor.specialties.map((specialty, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      <User className="h-4 w-4 mr-2" />
                      Ver Perfil
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}