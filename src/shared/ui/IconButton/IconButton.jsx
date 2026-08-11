export function IconButton({ variant = 'secondary', size = 'md', className = '', children, href, ...props }) {
  const variants = {
    primary: 'bg-primary hover:brightness-110 text-text',
    secondary: 'border border-text/10 text-text/60 hover:text-text hover:border-primary/50',
    ghost: 'text-text/60 hover:bg-text/5 hover:text-text',
  }
  const sizes = {
    md: { button: 'w-9 h-9', icon: '[&>svg]:h-6 [&>svg]:w-6' },
    sm: { button: 'w-8 h-8', icon: '[&>svg]:h-5 [&>svg]:w-5' },
  }
  const classes = `inline-flex items-center justify-center rounded transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent focus:ring-offset-background active:scale-[0.98] ${sizes[size].button} ${variants[variant]} ${className}`

  const content = (
    <span aria-hidden="true" className={sizes[size].icon}>
      {children}
    </span>
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