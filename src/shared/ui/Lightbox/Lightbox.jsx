import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useModalBehavior } from '../../hook/index.js'
import { IconButton } from '../IconButton/IconButton.jsx'

export function Lightbox({
  open,
  onClose,
  src,
  alt = 'Imagen ampliada',
  onPrev,
  onNext,
  onGoTo,
  total = 1,
  index = 0,
  className = '',
}) {
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
        className="flex flex-col items-center max-w-[85vw]"
      >
        <div className="relative">
          <IconButton
            variant="secondary"
            size="sm"
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute -top-4 -right-4 bg-background"
          >
            <X />
          </IconButton>
          <img
            src={src}
            alt={alt}
            className="max-h-[70vh] max-w-[85vw] rounded-lg border border-text/10 object-contain"
          />
        </div>

        {total > 1 && (
          <div className="flex items-center justify-center gap-3 mt-4">
            <IconButton variant="ghost" size="sm" onClick={onPrev} aria-label="Captura anterior">
              <ChevronLeft />
            </IconButton>
            <div className="flex items-center gap-1.5">
              {Array.from({ length: total }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => onGoTo?.(i)}
                  aria-label={`Ir a la captura ${i + 1}`}
                  aria-current={i === index}
                  className={`w-2 h-2 rounded-full transition-colors ${i === index ? 'bg-primary' : 'bg-text/20 hover:bg-text/40'}`}
                />
              ))}
            </div>
            <IconButton variant="ghost" size="sm" onClick={onNext} aria-label="Captura siguiente">
              <ChevronRight />
            </IconButton>
          </div>
        )}
      </div>
    </div>,
    document.body,
  )
}