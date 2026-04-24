import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const from = location.state?.from?.pathname || "/mi-cuenta";

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      login(form);
      navigate(from, { replace: true });
    } catch (submitError) {
      setError(submitError.message);
    }
  };

  return (
    <section className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-background to-muted/40 px-6 py-16">
      <div className="max-w-md mx-auto bg-card border border-border p-8 md:p-10 shadow-sm">
        <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase">Acceso</p>
        <h1 className="mt-4 text-3xl md:text-4xl font-black uppercase tracking-tight">Iniciar sesion</h1>
        <p className="mt-4 text-muted-foreground">
          Entra con tu cuenta para ver tu sesion activa y acceder a tu espacio privado.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block font-mono text-[11px] tracking-[0.2em] uppercase mb-2">Correo</label>
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
              className="w-full border border-border bg-background px-4 py-3 outline-none focus:border-accent"
              placeholder="correo@ejemplo.com"
              required
            />
          </div>

          <div>
            <label className="block font-mono text-[11px] tracking-[0.2em] uppercase mb-2">Contrasena</label>
            <input
              type="password"
              value={form.password}
              onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
              className="w-full border border-border bg-background px-4 py-3 outline-none focus:border-accent"
              placeholder="Ingresa tu contrasena"
              required
            />
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <button
            type="submit"
            className="w-full bg-foreground text-background px-4 py-3 font-mono text-xs tracking-[0.2em] uppercase hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            Entrar
          </button>
        </form>

        <p className="mt-6 text-sm text-muted-foreground">
          No tienes cuenta?{" "}
          <Link to="/registro" className="text-foreground hover:text-accent">
            Registrate aqui
          </Link>
        </p>
      </div>
    </section>
  );
}
