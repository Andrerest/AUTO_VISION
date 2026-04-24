import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function CarCard({ car, modCount, size = "medium" }) {
  const isLarge = size === "large";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      <Link
        to={`/cars/${car.id}`}
        className={`group block relative bg-card border border-border overflow-hidden transition-all hover:border-accent/50 ${
          isLarge ? "aspect-[4/3]" : "aspect-square"
        }`}
      >
        <div className="absolute inset-0">
          {car.image_url ? (
            <img
              src={car.image_url}
              alt={`${car.brand} ${car.name}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-muted" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        <div className="absolute top-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute top-0 right-0 w-full h-px bg-accent" />
          <div className="absolute top-0 right-0 w-px h-full bg-accent" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-[10px] tracking-[0.3em] text-white/50 uppercase">
              {car.brand}
            </span>
            {car.origin && (
              <>
                <span className="text-white/20">-</span>
                <span className="font-mono text-[10px] tracking-[0.3em] text-white/50 uppercase">
                  {car.origin}
                </span>
              </>
            )}
          </div>

          <h3
            className={`font-black uppercase tracking-tight text-white leading-none ${
              isLarge ? "text-2xl md:text-3xl" : "text-lg md:text-xl"
            }`}
          >
            {car.name}
          </h3>

          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {car.horsepower && (
                <span className="font-mono text-[10px] text-white/40">{car.horsepower} HP</span>
              )}
              {car.drivetrain && (
                <span className="font-mono text-[10px] text-white/40">{car.drivetrain}</span>
              )}
              {modCount > 0 && (
                <span className="font-mono text-[10px] text-accent">{modCount} MODS</span>
              )}
            </div>

            <div className="w-8 h-8 flex items-center justify-center bg-white/10 group-hover:bg-accent transition-colors">
              <ArrowUpRight className="w-3.5 h-3.5 text-white" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
