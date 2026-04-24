import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const HERO_IMAGE = "https://media.base44.com/images/public/69d9a04bb2e8d78b83d72b85/e5217741b_generated_b741b1c2.png";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Auto deportivo de alto rendimiento en una bodega industrial"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="absolute top-0 left-[20%] w-px h-full bg-border/30" />
      <div className="absolute top-0 left-[80%] w-px h-full bg-border/30" />
      <div className="absolute top-[60%] left-0 w-full h-px bg-border/30" />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 w-full py-40">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-accent" />
            <span className="font-mono text-xs tracking-[0.3em] text-muted-foreground">
              LA PLATAFORMA DEFINITIVA DE MODIFICACIONES
            </span>
          </div>

          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[100px] xl:text-[120px] font-black uppercase leading-[0.9] tracking-tighter max-w-5xl"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="block">DESCUBRE</span>
            <span className="block">EL VERDADERO</span>
            <span className="block text-accent">POTENCIAL</span>
            <span className="block">DE TU AUTO</span>
          </motion.h1>

          <motion.p
            className="mt-8 text-lg text-muted-foreground max-w-md leading-relaxed"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Explora nuestro inventario de autos y modificaciones pensadas para llevar cada proyecto a otro nivel.
          </motion.p>

          <motion.div
            className="mt-12 flex flex-col sm:flex-row gap-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Link
              to="/cars"
              className="inline-flex items-center justify-center px-8 py-4 bg-accent text-accent-foreground font-mono text-xs tracking-[0.2em] uppercase hover:bg-accent/90 transition-colors"
            >
              EXPLORAR INVENTARIO
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-12 left-6 md:left-10 flex items-center gap-3"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown className="w-4 h-4 text-muted-foreground" />
          <span className="font-mono text-xs text-muted-foreground tracking-widest">DESLIZA</span>
        </motion.div>
      </div>
    </section>
  );
}
