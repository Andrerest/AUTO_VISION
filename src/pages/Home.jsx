import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { appClient } from "@/api/appClient";
import { buildModCounts, demoCars, demoModifications } from "@/lib/demo-data";
import HeroSection from "../components/HeroSection";
import SectionHeading from "../components/SectionHeading";
import CarCard from "../components/CarCard";

export default function Home() {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [modCounts, setModCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const cars = await appClient.entities.Car.list("-created_date", 6);
        const mods = await appClient.entities.Modification.list("-created_date", 200);

        setFeaturedCars(cars);
        setModCounts(buildModCounts(mods));
        setUsingFallback(false);
      } catch (error) {
        console.error("Falling back to local car data on Home:", error);
        setFeaturedCars(demoCars.slice(0, 6));
        setModCounts(buildModCounts(demoModifications));
        setUsingFallback(true);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <div>
      <HeroSection />

      <section className="py-20 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <SectionHeading
            tag="VISTA PREVIA"
            title="AUTOS DESTACADOS"
            subtitle="Una seleccion de autos disponibles en nuestro inventario, listos para mejoras visuales, mecanicas y de rendimiento."
          />

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-6 h-6 border-2 border-muted border-t-foreground rounded-full animate-spin" />
            </div>
          ) : featuredCars.length === 0 ? (
            <p className="text-muted-foreground font-mono text-sm text-center py-20">
              No hay autos cargados en el inventario.
            </p>
          ) : (
            <>
              {usingFallback && (
                <p className="text-muted-foreground font-mono text-xs uppercase tracking-[0.2em] text-center py-6">
                  Modo demo activo: mostrando inventario local de respaldo.
                </p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
                {featuredCars.map((car, i) => (
                  <div key={car.id} className="bg-background">
                    <CarCard car={car} modCount={modCounts[car.id] || 0} size={i === 0 ? "large" : "medium"} />
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="mt-12 text-center">
            <Link
              to="/cars"
              className="inline-flex items-center px-8 py-4 border border-foreground font-mono text-xs tracking-[0.2em] uppercase hover:bg-foreground hover:text-background transition-colors"
            >
              VER TODO EL INVENTARIO
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "AUTOS", value: "7" },
              { label: "MODIFICACIONES", value: "10+" },
              { label: "MARCAS", value: "5" },
              { label: "ORIGENES", value: "JPN - GER - USA" },
            ].map((stat) => (
              <div key={stat.label}>
                <span className="text-3xl md:text-4xl font-black tracking-tighter">{stat.value}</span>
                <span className="block mt-1 font-mono text-[10px] tracking-[0.3em] text-muted-foreground">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
