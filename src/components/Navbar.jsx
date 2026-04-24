import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const links = [
    { label: "INICIO", path: "/" },
    { label: "AUTOS", path: "/cars" },
  ];

  const authLinks = isAuthenticated
    ? [
        { label: "MI CUENTA", path: "/mi-cuenta" },
      ]
    : [
        { label: "INICIAR SESION", path: "/login" },
        { label: "REGISTRARSE", path: "/registro" },
      ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between h-16 gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-2 h-2 bg-accent rounded-full" />
            <span className="font-mono text-sm font-semibold tracking-widest uppercase text-foreground">
              AUTO VISION HN
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-mono text-xs tracking-[0.2em] transition-colors hover:text-accent ${
                  location.pathname === link.path ? "text-accent" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <span className="font-mono text-[11px] tracking-[0.15em] text-muted-foreground uppercase">
                  Sesion: {user?.name}
                </span>
                {authLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`font-mono text-xs tracking-[0.2em] transition-colors hover:text-accent ${
                      location.pathname === link.path ? "text-accent" : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <button
                  onClick={logout}
                  className="font-mono text-xs tracking-[0.2em] text-muted-foreground hover:text-accent transition-colors"
                >
                  CERRAR SESION
                </button>
              </>
            ) : (
              authLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-mono text-xs tracking-[0.2em] transition-colors hover:text-accent ${
                    location.pathname === link.path ? "text-accent" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))
            )}
          </div>

          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setOpen(!open)}
            aria-label="Abrir menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-6 py-6 flex flex-col gap-4">
            {links.concat(authLinks).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                className={`font-mono text-sm tracking-[0.2em] transition-colors ${
                  location.pathname === link.path ? "text-accent" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {isAuthenticated ? (
              <>
                <span className="font-mono text-xs tracking-[0.15em] uppercase text-muted-foreground">
                  Sesion iniciada: {user?.name}
                </span>
                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="text-left font-mono text-sm tracking-[0.2em] text-muted-foreground hover:text-accent transition-colors"
                >
                  CERRAR SESION
                </button>
              </>
            ) : null}
          </div>
        </div>
      )}
    </nav>
  );
}
