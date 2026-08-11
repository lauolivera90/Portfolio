import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useModalBehavior } from '../../hook/index.js'
import { IconButton } from '../IconButton/IconButton.jsx'

export function Lightbox({ open, onClose, src, alt = 'Imagen ampliada', onPrev, onNext, className = '' }) {
  const dialogRef = useRef(null)
  useModalBehavior({ open, onClose, dialogRef })

  if (!open) return null

  return createPortal(
    <div
      className={`fixed inset-0 z-[70] flex items-center justify-center p-6 bg-background/90 backdrop-blur-sm ${className}`}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={alt}
        tabIndex={-1}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight') onNext?.()
          if (event.key === 'ArrowLeft') onPrev?.()
        }}
        className="relative"
      >
        <IconButton
          variant="ghost"
          size="sm"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute -top-4 -right-4 bg-background"
        >
          <X />
        </IconButton>
        <div className="flex items-center gap-3">
          {onPrev && (
            <IconButton variant="ghost" size="sm" onClick={onPrev} aria-label="Captura anterior">
              <ChevronLeft />
            </IconButton>
          )}
          <img
            src={src}
            alt={alt}
            className="max-h-[85vh] max-w-[85vw] rounded-lg border border-text/10 object-contain"
          />
          {onNext && (
            <IconButton variant="ghost" size="sm" onClick={onNext} aria-label="Captura siguiente">
              <ChevronRight />
            </IconButton>
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}