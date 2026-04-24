export default function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-32">
        <div className="mb-16">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none">
            AUTO
          </h2>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none text-accent">
            VISION HN
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-12">
          <div>
            <h3 className="font-mono text-xs tracking-[0.2em] text-white/40 mb-4">SOPORTE TECNICO</h3>
            <p className="text-sm text-white/60 leading-relaxed">
              Asesoria en modificaciones e instalacion para cada auto disponible en nuestro inventario.
            </p>
          </div>
          <div>
            <h3 className="font-mono text-xs tracking-[0.2em] text-white/40 mb-4">INVENTARIO</h3>
            <p className="text-sm text-white/60 leading-relaxed">Toyota - Honda - BMW - Ford - Isuzu</p>
          </div>
          <div>
            <h3 className="font-mono text-xs tracking-[0.2em] text-white/40 mb-4">COMUNIDAD</h3>
            <p className="text-sm text-white/60 leading-relaxed">
              Sigue nuestros proyectos, builds y contenido automotriz en todas nuestras plataformas.
            </p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-white/30">
            © {new Date().getFullYear()} AUTO VISION HN. TODOS LOS DERECHOS RESERVADOS.
          </p>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-accent rounded-full" />
            <span className="font-mono text-xs text-white/30">INGENIERIA CON PRECISION</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
