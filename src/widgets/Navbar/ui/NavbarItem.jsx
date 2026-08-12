export function NavbarItem({ label, href, active, className = '', ...props }) {
  return (
    <a
      href={href}
      aria-current={active ? 'true' : undefined}
      className={`text-sm font-medium transition-colors ${
        active ? 'text-text' : 'text-text/60 hover:text-text'
      } ${className}`}
      {...props}
    >
      <span
        className={`px-4 py-2 border-b-2 transition-colors ${
          active ? 'border-primary' : 'border-transparent'
        }`}
      >
        {label}
      </span>
    </a>
  )
}