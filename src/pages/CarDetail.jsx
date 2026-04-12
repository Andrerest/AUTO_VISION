import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { appClient } from "@/api/appClient";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import ModificationCard from "../components/ModificationCard";

const CATEGORIES = ["All", "Power", "Aero", "Stance", "Exhaust", "Brakes", "Interior", "Electronics"];

export default function CarDetail() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [mods, setMods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    async function load() {
      const cars = await appClient.entities.Car.filter({ id });
      if (cars.length > 0) setCar(cars[0]);

      const allMods = await appClient.entities.Modification.filter({ car_id: id });
      setMods(allMods);
      setLoading(false);
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
        <p className="font-mono text-sm text-muted-foreground">PLATFORM NOT FOUND</p>
        <Link to="/cars" className="font-mono text-xs text-accent hover:underline">
          ← BACK TO INVENTORY
        </Link>
      </div>
    );
  }

  const filteredMods =
    selectedCategory === "All"
      ? mods
      : mods.filter((m) => m.category === selectedCategory);

  const availableCategories = ["All", ...new Set(mods.map((m) => m.category))];

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-end overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          {car.image_url ? (
            <img
              src={car.image_url}
              alt={`${car.brand} ${car.name}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-muted" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          {/* Blueprint Grid Overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full"
              style={{
                backgroundImage: `
                  linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                  linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px'
              }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 w-full pb-12 pt-32">
          <Link
            to="/cars"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-muted-foreground hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft className="w-3 h-3" />
            BACK TO INVENTORY
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
                  <span className="text-muted-foreground/40">·</span>
                  <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                    {car.origin}
                  </span>
                </>
              )}
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-none">
              {car.name}
            </h1>

            {/* Specs Bar */}
            <div className="mt-6 flex flex-wrap gap-6">
              {car.engine && (
                <div>
                  <span className="font-mono text-[10px] text-muted-foreground block">ENGINE</span>
                  <span className="font-mono text-sm font-medium">{car.engine}</span>
                </div>
              )}
              {car.horsepower && (
                <div>
                  <span className="font-mono text-[10px] text-muted-foreground block">POWER</span>
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
                  <span className="font-mono text-[10px] text-muted-foreground block">DRIVE</span>
                  <span className="font-mono text-sm font-medium">{car.drivetrain}</span>
                </div>
              )}
              {car.year_range && (
                <div>
                  <span className="font-mono text-[10px] text-muted-foreground block">YEARS</span>
                  <span className="font-mono text-sm font-medium">{car.year_range}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modifications */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          {/* Category Filter */}
          <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-px bg-accent" />
                <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">
                  CONFIGURATION LAYER
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">
                AVAILABLE MODIFICATIONS
              </h2>
            </div>

            <span className="font-mono text-xs text-muted-foreground">
              {filteredMods.length} MOD{filteredMods.length !== 1 ? "S" : ""} AVAILABLE
            </span>
          </div>

          {/* Category Tabs */}
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
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Mods Grid */}
          {filteredMods.length === 0 ? (
            <p className="text-muted-foreground font-mono text-sm text-center py-16">
              No modifications available for this category.
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
