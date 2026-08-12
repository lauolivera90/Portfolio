import { cloneElement, createContext, useContext } from 'react'
import { useDropdown, useDropdownPlacement } from '../../hook/index.js'

const DropdownContext = createContext(null)

export function Dropdown({ className = '', children }) {
  const { open, toggle, close, wrapperRef, menuRef } = useDropdown()
  const coords = useDropdownPlacement({ triggerRef: wrapperRef, menuRef, open })

  return (
    <DropdownContext.Provider value={{ open, toggle, close, menuRef, coords }}>
      <div ref={wrapperRef} className={`relative inline-flex ${className}`}>
        {children}
      </div>
    </DropdownContext.Provider>
  )
}

export function DropdownTrigger({ children }) {
  const { open, toggle } = useContext(DropdownContext)
  return cloneElement(children, { onClick: toggle, 'aria-haspopup': 'menu', 'aria-expanded': open })
}

export function DropdownMenu({ className = '', children }) {
  const { open, menuRef, coords } = useContext(DropdownContext)
  const visible = open && coords

  return (
    <ul
      ref={menuRef}
      role="menu"
      aria-hidden={!open}
      style={coords ?? undefined}
      className={`fixed z-50 min-w-44 p-1 rounded-lg border border-text/10 bg-background shadow-lg transition-opacity ${
        visible ? 'opacity-100' : 'invisible opacity-0 pointer-events-none'
      } ${className}`}
    >
      {children}
    </ul>
  )
}

export function DropdownItem({ href, icon, className = '', children }) {
  const { close } = useContext(DropdownContext)

  return (
    <li role="none">
      <a
        role="menuitem"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={close}
        className={`flex items-center gap-2 px-3 py-2 text-sm text-text/80 hover:bg-text/5 hover:text-text rounded-md transition-colors ${className}`}
      >
        {icon && (
          <span aria-hidden="true" className="[&>svg]:h-4 [&>svg]:w-4">
            {icon}
          </span>
        )}
        <span>{children}</span>
      </a>
    </li>
  )
}

export function DropdownButton({ icon, className = '', children, onClick, ...rest }) {
  const { close } = useContext(DropdownContext)

  return (
    <li role="none">
      <button
        type="button"
        onClick={(event) => {
          onClick?.(event)
          close()
        }}
        className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-text/80 hover:bg-text/5 hover:text-text rounded-md transition-colors text-left ${className}`}
        {...rest}
      >
        {icon && (
          <span aria-hidden="true" className="[&>svg]:h-4 [&>svg]:w-4">
            {icon}
          </span>
        )}
        <span className="flex-1">{children}</span>
      </button>
    </li>
  )
}