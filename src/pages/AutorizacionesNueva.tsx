import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export default function AutorizacionesNueva() {
  const { toast } = useToast();
  const [form, setForm] = useState({ nombre: "", dni: "", fecha: "", hora: "", vehiculo: "" });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Nueva Autorización</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input name="nombre" placeholder="Nombre y Apellido" value={form.nombre} onChange={handleChange} />
            <Input name="dni" placeholder="DNI" value={form.dni} onChange={handleChange} />
            <Input name="fecha" type="date" value={form.fecha} onChange={handleChange} />
            <Input name="hora" type="time" value={form.hora} onChange={handleChange} />
            <Input name="vehiculo" placeholder="Vehículo (opcional)" value={form.vehiculo} onChange={handleChange} />
          </div>
          <Button onClick={() => toast({ title: "Autorización creada", description: `${form.nombre} - ${form.fecha} ${form.hora}` })}>Guardar</Button>
        </CardContent>
      </Card>
    </div>
  );
}
