export function Tag({ className = '', children }) {
  return (
    <span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-md bg-primary/20 text-text/80 border border-primary/30 ${className}`}>
      {children}
    </span>
  )
}
