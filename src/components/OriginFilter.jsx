export default function OriginFilter({ selected, onChange, origins }) {
  return (
    <div className="flex items-center gap-1 p-1 bg-card border border-border">
      <button
        onClick={() => onChange("All")}
        className={`px-4 py-2 font-mono text-xs tracking-[0.15em] transition-colors ${
          selected === "All"
            ? "bg-foreground text-background"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        ALL
      </button>
      {origins.map((origin) => (
        <button
          key={origin}
          onClick={() => onChange(origin)}
          className={`px-4 py-2 font-mono text-xs tracking-[0.15em] transition-colors ${
            selected === origin
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {origin.toUpperCase()}
        </button>
      ))}
    </div>
  );
}