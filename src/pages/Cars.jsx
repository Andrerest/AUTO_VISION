import { useEffect, useState } from "react";
import { appClient } from "@/api/appClient";
import { buildModCounts, demoCars, demoModifications } from "@/lib/demo-data";
import SectionHeading from "../components/SectionHeading";
import CarCard from "../components/CarCard";
import OriginFilter from "../components/OriginFilter";

export default function Cars() {
  const [cars, setCars] = useState([]);
  const [modCounts, setModCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedOrigin, setSelectedOrigin] = useState("All");
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const allCars = await appClient.entities.Car.list("-created_date", 50);
        const mods = await appClient.entities.Modification.list("-created_date", 500);

        setCars(allCars);
        setModCounts(buildModCounts(mods));
        setUsingFallback(false);
      } catch (error) {
        console.error("Falling back to local car data on Cars:", error);
        setCars(demoCars);
        setModCounts(buildModCounts(demoModifications));
        setUsingFallback(true);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const origins = [...new Set(cars.map((c) => c.origin).filter(Boolean))];
  const filtered = selectedOrigin === "All" ? cars : cars.filter((c) => c.origin === selectedOrigin);
  const featured = filtered.slice(0, 2);
  const rest = filtered.slice(2);

  return (
    <div className="py-20 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <SectionHeading
            tag="INVENTARIO COMPLETO"
            title="TODOS LOS AUTOS"
            subtitle="Explora todos los modelos disponibles en nuestro inventario y elige la base ideal para tu proyecto."
          />
          <div className="flex-shrink-0">
            <OriginFilter selected={selectedOrigin} onChange={setSelectedOrigin} origins={origins} />
          </div>
        </div>

        {usingFallback && !loading && (
          <p className="text-muted-foreground font-mono text-xs uppercase tracking-[0.2em] mb-8">
            Modo demo activo: inventario local de respaldo.
          </p>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-6 h-6 border-2 border-muted border-t-foreground rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-muted-foreground font-mono text-sm text-center py-20">
            No se encontraron autos para este filtro.
          </p>
        ) : (
          <>
            {featured.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border mb-px">
                {featured.map((car) => (
                  <div key={car.id} className="bg-background">
                    <CarCard car={car} modCount={modCounts[car.id] || 0} size="large" />
                  </div>
                ))}
              </div>
            )}

            {rest.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
                {rest.map((car) => (
                  <div key={car.id} className="bg-background">
                    <CarCard car={car} modCount={modCounts[car.id] || 0} size="medium" />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
