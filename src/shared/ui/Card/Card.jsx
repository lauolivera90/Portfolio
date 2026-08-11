import { createContext, useContext } from 'react'

const CardContext = createContext('raised')

const surfaces = {
  raised: { root: 'bg-background', section: 'bg-text/5' },
  surface: { root: 'bg-text/5', section: 'bg-text/10' },
}

export function Card({ variant = 'raised', className = '', children }) {
  return (
    <CardContext.Provider value={variant}>
      <div className={`rounded-xl border border-text/10 overflow-hidden ${surfaces[variant].root} ${className}`}>
        {children}
      </div>
    </CardContext.Provider>
  )
}

export function CardHeader({ className = '', children }) {
  const variant = useContext(CardContext)
  return <div className={`px-5 py-5 border-b border-text/10 ${surfaces[variant].section} ${className}`}>{children}</div>
}

export function CardBody({ className = '', children }) {
  return <div className={`px-5 py-5 ${className}`}>{children}</div>
}

export function CardFooter({ className = '', children }) {
  return <div className={`px-5 py-5 ${className}`}>{children}</div>
}
