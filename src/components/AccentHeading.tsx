export default function AccentHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="relative inline-block">
      <span
        aria-hidden="true"
        className="absolute -left-4 top-1/2 -z-10 h-[55%] w-[calc(100%+2rem)] -translate-y-1/2 skew-x-[-12deg] bg-brand-red/10"
      />
      <h2 className={`relative font-serif font-semibold text-charcoal ${className}`}>{children}</h2>
    </div>
  );
}
