export function Button({ variant = 'primary', icon, className = '', children, href, ...props }) {
  const variants = {
    primary: 'bg-primary hover:brightness-110 text-on-primary',
    secondary: 'border border-text/10 hover:border-primary/50 text-text',
    ghost: 'text-text/60 hover:bg-text/5 hover:text-text',
  }
  const classes = `inline-flex items-center justify-center gap-2 px-5 py-2 rounded transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent focus:ring-offset-background active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none text-sm font-medium ${variants[variant]} ${className}`

  const content = (
    <>
      {icon && (
        <span aria-hidden="true" className="[&>svg]:h-6 [&>svg]:w-6">
          {icon}
        </span>
      )}
      <span>{children}</span>
    </>
  )

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    )
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  )
}