import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { Card, CardBody, CardFooter, CardHeader } from '../Card/Card.jsx'
import { useModalBehavior } from '../../hook/index.js'
import { IconButton } from '../IconButton/IconButton.jsx'

const sizes = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
}

export function Modal({ open, onClose, size = 'md', ariaLabel = 'Modal', className = '', children }) {
  const dialogRef = useRef(null)
  useModalBehavior({ open, onClose, dialogRef })

  if (!open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-background/70 backdrop-blur-sm"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        tabIndex={-1}
        className={`flex w-full max-h-[90vh] ${sizes[size]} ${className}`}
      >
        <Card variant="raised" className="w-full flex flex-col min-h-0">
          {children}
        </Card>
      </div>
    </div>,
    document.body,
  )
}

export function ModalHeader({ onClose, className = '', children }) {
  return (
    <CardHeader className={`flex-shrink-0 ${className}`}>
      <div className="flex items-start justify-between gap-3">
        <div>{children}</div>
        {onClose && (
          <IconButton variant="ghost" size="sm" onClick={onClose} aria-label="Cerrar">
            <X />
          </IconButton>
        )}
      </div>
    </CardHeader>
  )
}

export function ModalBody({ className = '', children }) {
  return <CardBody className={`flex flex-col gap-5 flex-1 overflow-y-auto min-h-0 ${className}`}>{children}</CardBody>
}

export function ModalFooter({ className = '', children }) {
  return (
    <CardFooter className={`flex-shrink-0 ${className}`}>
      <div className="flex flex-col gap-3">{children}</div>
    </CardFooter>
  )
}