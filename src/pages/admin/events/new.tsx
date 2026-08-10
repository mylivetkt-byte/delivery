<<'EOF'
import { useRouter } from "next/navigation";
import { EventForm } from "@/pages/admin/EventForm";

export default function NewEventPage() {
  const router = useRouter();

  const handleSuccess = () => router.replace("/admin/events");

  return (
    <EventForm onSuccess={handleSuccess} />
  );
}
EOF
```

```text
github: write src/pages/admin/events/[id]/edit.tsx <<'EOF'
import { useRouter } from "next/navigation";
import { EventForm } from "@/pages/admin/EventForm";

export default function EditEventPage() {
  const router = useRouter();

  if (!router.asPath.includes("id=")) {
    router.replace("/admin/events");
  }

  return <EventForm />;
}
EOF
```

> **Importante:**  
> - Después de ejecutar esos comandos, Lovable hará un **re‑deploy** automáticamente y las nuevas rutas quedarán disponibles.  
> - Si prefieres hacerlo manualmente desde la UI de Lovable, simplemente crea los archivos con esos nombres y contenidos; el framework los expondrá como rutas dinámicas.

---

## 4️⃣ Resumen rápido de lo que queda por hacer

| Paso | Acción | Comando (si lo deseas) |
|------|--------|------------------------|
| ✅ Ya tienes `Layout.tsx` (protege el acceso). | ✔️ |
| ✅ Ya tienes `EventsList.tsx` (lista de eventos). | ✔️ |
| ✅ Crear `src/pages/admin/events.tsx` (lista) – ya lo tienes. | ✔️ |
| ✅ Crear `src/pages/admin/events/new.tsx` (nuevo). | **Ejecutar el comando de arriba**. |
| ✅ Crear `src/pages/admin/events/[id]/edit.tsx` (edición). | **Ejecutar el comando de arriba**. |
| ✅ Asegurarte de que la tabla `events` exista en Supabase. | (SQL → `CREATE TABLE events …`). |
| ✅ Probar en el navegador: <br>• `/admin/events` → lista <br>• `/admin/events/new` → formulario <br>• `/admin/events/123/edit` → edición. | — |

---

## 🎯 Próximo paso

¿Quieres que **genere ahora mismo los dos archivos** (`new.tsx` y `[id]/edit.tsx`) con los snippets que acabo de mostrar?  
Solo dime “**github: write …**” y los crearé, o si prefieres revisarlos primero, avísame y te los muestro línea por línea.

¡Vamos a dejar tu panel de administración 100 % funcional! 🚀