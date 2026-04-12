import { useEffect, useState } from "react";
import { appClient } from "@/api/appClient";
import HeroSection from "../components/HeroSection";
import SectionHeading from "../components/SectionHeading";
import CarCard from "../components/CarCard";
import { Link } from "react-router-dom";

export default function Home() {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [modCounts, setModCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const cars = await appClient.entities.Car.list("-created_date", 6);
      setFeaturedCars(cars);

      const mods = await appClient.entities.Modification.list("-created_date", 200);
      const counts = {};
      mods.forEach((m) => {
        counts[m.car_id] = (counts[m.car_id] || 0) + 1;
      });
      setModCounts(counts);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div>
      <HeroSection />

      {/* Featured Cars */}
      <section className="py-20 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <SectionHeading
            tag="INVENTORY PREVIEW"
            title="FEATURED PLATFORMS"
            subtitle="A selection of performance platforms from our curated inventory, each engineered for modification excellence."
          />

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-6 h-6 border-2 border-muted border-t-foreground rounded-full animate-spin" />
            </div>
          ) : featuredCars.length === 0 ? (
            <p className="text-muted-foreground font-mono text-sm text-center py-20">
              No cars in inventory yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
              {featuredCars.map((car, i) => (
                <div key={car.id} className="bg-background">
                  <CarCard
                    car={car}
                    modCount={modCounts[car.id] || 0}
                    size={i === 0 ? "large" : "medium"}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link
              to="/cars"
              className="inline-flex items-center px-8 py-4 border border-foreground font-mono text-xs tracking-[0.2em] uppercase hover:bg-foreground hover:text-background transition-colors"
            >
              VIEW FULL INVENTORY
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "PLATFORMS", value: "10+" },
              { label: "MODIFICATIONS", value: "100+" },
              { label: "BRANDS", value: "6" },
              { label: "ORIGINS", value: "JPN · GER · USA" },
            ].map((stat) => (
              <div key={stat.label}>
                <span className="text-3xl md:text-4xl font-black tracking-tighter">
                  {stat.value}
                </span>
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
