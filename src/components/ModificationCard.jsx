import { motion } from "framer-motion";
import { Zap, Wind, Gauge, Armchair, Flame, Shield, Cpu } from "lucide-react";

const categoryIcons = {
  Power: Zap,
  Aero: Wind,
  Stance: Gauge,
  Interior: Armchair,
  Exhaust: Flame,
  Brakes: Shield,
  Electronics: Cpu,
};

const difficultyColors = {
  "Bolt-On": "text-green-500",
  "Moderate": "text-yellow-500",
  "Advanced": "text-accent",
  "Expert": "text-red-500",
};

export default function ModificationCard({ mod, index }) {
  const Icon = categoryIcons[mod.category] || Zap;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group bg-card border border-border p-5 hover:border-accent/50 transition-all"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 bg-muted flex items-center justify-center">
          <Icon className="w-4 h-4 text-foreground" />
        </div>
        <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
          {mod.category}
        </span>
      </div>

      {/* Name */}
      <h4 className="text-sm font-bold uppercase tracking-tight mb-2">
        {mod.name}
      </h4>

      {/* Description */}
      {mod.description && (
        <p className="text-xs text-muted-foreground leading-relaxed mb-4">
          {mod.description}
        </p>
      )}

      {/* Specs */}
      <div className="border-t border-border pt-3 flex flex-wrap gap-x-4 gap-y-2">
        {mod.power_gain && (
          <div>
            <span className="font-mono text-[10px] text-muted-foreground block">GAIN</span>
            <span className="font-mono text-xs text-accent font-medium">{mod.power_gain}</span>
          </div>
        )}
        {mod.difficulty && (
          <div>
            <span className="font-mono text-[10px] text-muted-foreground block">INSTALL</span>
            <span className={`font-mono text-xs font-medium ${difficultyColors[mod.difficulty] || "text-foreground"}`}>
              {mod.difficulty}
            </span>
          </div>
        )}
        {mod.price_range && (
          <div>
            <span className="font-mono text-[10px] text-muted-foreground block">PRICE</span>
            <span className="font-mono text-xs font-medium">{mod.price_range}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}