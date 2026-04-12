export default function SectionHeading({ tag, title, subtitle }) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-px bg-accent" />
        <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
          {tag}
        </span>
      </div>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-none">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-muted-foreground max-w-xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}