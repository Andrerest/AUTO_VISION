import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { appClient } from "@/api/appClient";
import { demoCars, demoModifications } from "@/lib/demo-data";
import ModificationCard from "../components/ModificationCard";

const CATEGORY_LABELS = {
  All: "Todos",
  Power: "Potencia",
  Aero: "Aero",
  Stance: "Postura",
  Exhaust: "Escape",
  Brakes: "Frenos",
  Interior: "Interior",
  Electronics: "Electronica",
};

export default function CarDetail() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [mods, setMods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    async function load() {
      try {
        const cars = await appClient.entities.Car.filter({ id });
        if (cars.length > 0) {
          setCar(cars[0]);
        } else {
          setCar(demoCars.find((item) => item.id === id) || null);
        }

        const allMods = await appClient.entities.Modification.filter({ car_id: id });
        setMods(allMods.length > 0 ? allMods : demoModifications.filter((item) => item.car_id === id));
      } catch (error) {
        console.error("Falling back to local car data on CarDetail:", error);
        setCar(demoCars.find((item) => item.id === id) || null);
        setMods(demoModifications.filter((item) => item.car_id === id));
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-muted border-t-foreground rounded-full animate-spin" />
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="font-mono text-sm text-muted-foreground">AUTO NO ENCONTRADO</p>
        <Link to="/cars" className="font-mono text-xs text-accent hover:underline">
          VOLVER AL INVENTARIO
        </Link>
      </div>
    );
  }

  const filteredMods =
    selectedCategory === "All" ? mods : mods.filter((m) => m.category === selectedCategory);

  const availableCategories = ["All", ...new Set(mods.map((m) => m.category))];

  return (
    <div>
      <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          {car.image_url ? (
            <img src={car.image_url} alt={`${car.brand} ${car.name}`} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-muted" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute inset-0 opacity-10">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `
                  linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                  linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
                `,
                backgroundSize: "60px 60px",
              }}
            />
          </div>
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 w-full pb-12 pt-32">
          <Link
            to="/cars"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-muted-foreground hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft className="w-3 h-3" />
            VOLVER AL INVENTARIO
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                {car.brand}
              </span>
              {car.origin && (
                <>
                  <span className="text-muted-foreground/40">-</span>
                  <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                    {car.origin}
                  </span>
                </>
              )}
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-none">
              {car.name}
            </h1>

            <div className="mt-6 flex flex-wrap gap-6">
              {car.engine && (
                <div>
                  <span className="font-mono text-[10px] text-muted-foreground block">MOTOR</span>
                  <span className="font-mono text-sm font-medium">{car.engine}</span>
                </div>
              )}
              {car.horsepower && (
                <div>
                  <span className="font-mono text-[10px] text-muted-foreground block">POTENCIA</span>
                  <span className="font-mono text-sm font-medium">{car.horsepower} HP</span>
                </div>
              )}
              {car.torque && (
                <div>
                  <span className="font-mono text-[10px] text-muted-foreground block">TORQUE</span>
                  <span className="font-mono text-sm font-medium">{car.torque}</span>
                </div>
              )}
              {car.drivetrain && (
                <div>
                  <span className="font-mono text-[10px] text-muted-foreground block">TRACCION</span>
                  <span className="font-mono text-sm font-medium">{car.drivetrain}</span>
                </div>
              )}
              {car.year_range && (
                <div>
                  <span className="font-mono text-[10px] text-muted-foreground block">ANOS</span>
                  <span className="font-mono text-sm font-medium">{car.year_range}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-px bg-accent" />
                <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">
                  CAPA DE CONFIGURACION
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">
                MODIFICACIONES DISPONIBLES
              </h2>
            </div>

            <span className="font-mono text-xs text-muted-foreground">
              {filteredMods.length} MOD{filteredMods.length !== 1 ? "S" : ""} DISPONIBLES
            </span>
          </div>

          <div className="flex gap-1 overflow-x-auto pb-4 mb-8 scrollbar-none">
            {availableCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 font-mono text-xs tracking-[0.15em] transition-colors ${
                  selectedCategory === cat
                    ? "bg-foreground text-background"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {(CATEGORY_LABELS[cat] || cat).toUpperCase()}
              </button>
            ))}
          </div>

          {filteredMods.length === 0 ? (
            <p className="text-muted-foreground font-mono text-sm text-center py-16">
              No hay modificaciones disponibles para esta categoria.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredMods.map((mod, i) => (
                <ModificationCard key={mod.id} mod={mod} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
