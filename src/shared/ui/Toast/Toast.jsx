import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { IconButton } from '../IconButton/IconButton.jsx'

export function Toast({ children, icon, duration = 5000, onClose, className = '' }) {
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    if (duration <= 0) return undefined
    const timer = setTimeout(() => onCloseRef.current(), duration)
    return () => clearTimeout(timer)
  }, [duration])

  return createPortal(
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-4 right-4 z-[80] w-[calc(100%-2rem)] max-w-sm overflow-hidden rounded-xl border border-text/10 bg-background shadow-lg ${className}`}
    >
      <div className="flex items-start gap-3 p-4">
        {icon && (
          <span className="mt-0.5 text-text/60 [&>svg]:h-5 [&>svg]:w-5" aria-hidden="true">
            {icon}
          </span>
        )}
        <div className="flex-1 min-w-0">{children}</div>
        <IconButton variant="ghost" size="sm" onClick={onClose} aria-label="Dismiss">
          <X />
        </IconButton>
      </div>
      <div className="h-0.5 bg-text/10" aria-hidden="true">
        <div
          className="h-full bg-primary animate-toast-drain motion-reduce:[animation:none]"
          style={{ animationDuration: `${duration}ms` }}
        />
      </div>
    </div>,
    document.body,
  )
}