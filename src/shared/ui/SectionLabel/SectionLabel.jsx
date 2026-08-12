export function SectionLabel({ children, className = '' }) {
  return (
    <p className={`inline-flex items-center gap-2 text-xs font-semibold text-accent uppercase tracking-wider mb-3 ${className}`}>
      <span className="w-4 h-px bg-accent" aria-hidden="true" />
      {children}
    </p>
  )
}