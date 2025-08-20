import { useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";

export interface DateFilterProps {
  onFilterChange: (filter: string, startDate?: Date, endDate?: Date) => void;
  className?: string;
}

export function DateFilter({ onFilterChange, className }: DateFilterProps) {
  const [selectedFilter, setSelectedFilter] = useState("todos");
  const [customStartDate, setCustomStartDate] = useState<Date>();
  const [customEndDate, setCustomEndDate] = useState<Date>();
  const [showCustomPicker, setShowCustomPicker] = useState(false);

  const presetFilters = [
    { value: "todos", label: "Todos los registros" },
    { value: "hoy", label: "Hoy" },
    { value: "ultimos7", label: "Últimos 7 días" },
    { value: "ultimomes", label: "Último mes" },
    { value: "ultimos3meses", label: "Últimos 3 meses" },
    { value: "ultimo año", label: "Último año" },
    { value: "personalizado", label: "Rango personalizado" }
  ];

  const handleFilterSelect = (value: string) => {
    setSelectedFilter(value);
    
    if (value === "personalizado") {
      setShowCustomPicker(true);
      return;
    }
    
    setShowCustomPicker(false);
    
    let startDate: Date | undefined;
    let endDate: Date | undefined;
    const now = new Date();
    
    switch (value) {
      case "hoy":
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        break;
      case "ultimos7":
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        endDate = now;
        break;
      case "ultimomes":
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        endDate = now;
        break;
      case "ultimos3meses":
        startDate = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
        endDate = now;
        break;
      case "ultimo año":
        startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
        endDate = now;
        break;
    }
    
    onFilterChange(value, startDate, endDate);
  };

  const applyCustomFilter = () => {
    if (customStartDate) {
      onFilterChange("personalizado", customStartDate, customEndDate || customStartDate);
      setShowCustomPicker(false);
    }
  };

  const getFilterLabel = () => {
    const filter = presetFilters.find(f => f.value === selectedFilter);
    if (selectedFilter === "personalizado" && customStartDate) {
      const endLabel = customEndDate ? ` - ${format(customEndDate, "dd/MM/yyyy")}` : "";
      return `${format(customStartDate, "dd/MM/yyyy")}${endLabel}`;
    }
    return filter?.label || "Filtrar por fecha";
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="justify-between min-w-48">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="truncate">{getFilterLabel()}</span>
            </div>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          {presetFilters.map((filter) => (
            <DropdownMenuItem
              key={filter.value}
              onClick={() => handleFilterSelect(filter.value)}
              className={selectedFilter === filter.value ? "bg-accent" : ""}
            >
              {filter.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {showCustomPicker && (
        <Popover open={showCustomPicker} onOpenChange={setShowCustomPicker}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              Seleccionar fechas
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Fecha de inicio</label>
                <CalendarComponent
                  mode="single"
                  selected={customStartDate}
                  onSelect={setCustomStartDate}
                  className="pointer-events-auto"
                  locale={es}
                />
              </div>
              
              {customStartDate && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Fecha de fin (opcional)</label>
                  <CalendarComponent
                    mode="single"
                    selected={customEndDate}
                    onSelect={setCustomEndDate}
                    disabled={(date) => date < customStartDate}
                    className="pointer-events-auto"
                    locale={es}
                  />
                </div>
              )}
              
              <div className="flex gap-2 pt-2">
                <Button onClick={applyCustomFilter} disabled={!customStartDate} size="sm">
                  Aplicar
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowCustomPicker(false)}
                  size="sm"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}