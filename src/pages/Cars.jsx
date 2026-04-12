import { useEffect, useState } from "react";
import { appClient } from "@/api/appClient";
import SectionHeading from "../components/SectionHeading";
import CarCard from "../components/CarCard";
import OriginFilter from "../components/OriginFilter";

export default function Cars() {
  const [cars, setCars] = useState([]);
  const [modCounts, setModCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedOrigin, setSelectedOrigin] = useState("All");

  useEffect(() => {
    async function load() {
      const allCars = await appClient.entities.Car.list("-created_date", 50);
      setCars(allCars);

      const mods = await appClient.entities.Modification.list("-created_date", 500);
      const counts = {};
      mods.forEach((m) => {
        counts[m.car_id] = (counts[m.car_id] || 0) + 1;
      });
      setModCounts(counts);
      setLoading(false);
    }
    load();
  }, []);

  const origins = [...new Set(cars.map((c) => c.origin).filter(Boolean))];
  const filtered =
    selectedOrigin === "All"
      ? cars
      : cars.filter((c) => c.origin === selectedOrigin);

  // Determine featured cars (first 2 for large display)
  const featured = filtered.slice(0, 2);
  const rest = filtered.slice(2);

  return (
    <div className="py-20 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <SectionHeading
            tag="FULL INVENTORY"
            title="ALL PLATFORMS"
            subtitle="Every performance platform in our inventory, ready for transformation."
          />
          <div className="flex-shrink-0">
            <OriginFilter
              selected={selectedOrigin}
              onChange={setSelectedOrigin}
              origins={origins}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-6 h-6 border-2 border-muted border-t-foreground rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-muted-foreground font-mono text-sm text-center py-20">
            No cars found for this filter.
          </p>
        ) : (
          <>
            {/* Featured Row */}
            {featured.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border mb-px">
                {featured.map((car) => (
                  <div key={car.id} className="bg-background">
                    <CarCard
                      car={car}
                      modCount={modCounts[car.id] || 0}
                      size="large"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Rest Grid */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
                {rest.map((car) => (
                  <div key={car.id} className="bg-background">
                    <CarCard
                      car={car}
                      modCount={modCounts[car.id] || 0}
                      size="medium"
                    />
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
