import { useAuth } from "@/lib/AuthContext";

export default function Account() {
  const { user } = useAuth();

  return (
    <section className="min-h-[calc(100vh-4rem)] px-6 py-16 bg-gradient-to-b from-background to-muted/40">
      <div className="max-w-3xl mx-auto border border-border bg-card p-8 md:p-10">
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-muted-foreground">Mi cuenta</p>
        <h1 className="mt-4 text-3xl md:text-5xl font-black uppercase tracking-tight">Sesion iniciada</h1>
        <p className="mt-4 text-muted-foreground">
          Bienvenido a tu panel privado. Desde aqui podemos agregar despues funciones como favoritos, pedidos o perfil.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="border border-border p-5">
            <span className="block font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground">Nombre</span>
            <span className="block mt-2 text-lg font-semibold">{user?.name || "Usuario"}</span>
          </div>
          <div className="border border-border p-5">
            <span className="block font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground">Correo</span>
            <span className="block mt-2 text-lg font-semibold">{user?.email || "Sin correo"}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
