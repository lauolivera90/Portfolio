import { useState } from 'react'
import { Check, Plus, Send } from 'lucide-react'
import { useLanguage } from '../../../shared/i18n/index.js'
import { Button, Toast } from '../../../shared/ui/index.js'
import { useContactForm } from '../hook/useContactForm.js'

const TOAST_DURATION = 5000

function requiredError(code, message) {
  return code === 'required' ? message : ''
}

function emailError(code, c) {
  if (code === 'required') return c.emailRequired
  if (code === 'invalid') return c.emailInvalid
  return ''
}

function Field({ id, label, placeholder, value, onChange, error, multiline = false }) {
  const controlClass =
    'w-full bg-text/5 border border-text/10 rounded text-text text-sm px-3 py-2.5 focus:outline-none focus:border-primary transition-colors placeholder:text-text/40'
  const shared = {
    id,
    name: id,
    value,
    required: true,
    placeholder,
    onChange: (e) => onChange(e.target.value),
    'aria-invalid': Boolean(error),
    'aria-describedby': error ? `${id}-error` : undefined,
  }

  return (
    <div>
      <label htmlFor={id} className="text-xs font-medium text-text/60 block mb-1.5">
        {label}
      </label>
      {multiline ? (
        <textarea rows={5} className={`${controlClass} resize-none`} {...shared} />
      ) : (
        <input className={controlClass} {...shared} />
      )}
      {error && (
        <p id={`${id}-error`} className="text-xs text-text/60 mt-1">
          {error}
        </p>
      )}
    </div>
  )
}

export function ContactForm() {
  const { sections } = useLanguage()
  const c = sections.contact
  const { fields, errors, status, serverError, updateField, submit, reset } = useContactForm()
  const [toastVisible, setToastVisible] = useState(false)

  const handleSubmit = async (event) => {
    if (await submit(event)) setToastVisible(true)
  }

  const sendAnother = () => {
    reset()
    setToastVisible(false)
  }

  if (status === 'sent') {
    return (
      <>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-primary/10 border border-primary/30 rounded-xl p-8">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-text/80 mb-1">{c.successTitle}</p>
            <p className="text-sm text-text/60">{c.successBody}</p>
          </div>
          <Button
            variant="ghost"
            onClick={sendAnother}
            icon={<Plus />}
            className="self-end sm:self-auto shrink-0"
          >
            {c.sendAnother}
          </Button>
        </div>

        {toastVisible && (
          <Toast duration={TOAST_DURATION} onClose={() => setToastVisible(false)} icon={<Check />}>
            <p className="text-sm font-medium text-text/80">{c.toastTitle}</p>
            <p className="text-sm text-text/60 mt-0.5">{c.toastBody}</p>
          </Toast>
        )}
      </>
    )
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-4">
      {status === 'error' && (
        <div role="alert" className="bg-text/5 border border-text/10 rounded p-3">
          <p className="text-sm font-medium text-text/80 mb-1">{c.errorTitle}</p>
          <p className="text-sm text-text/60">{serverError || c.errorBody}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field
          id="name"
          label={c.nameLabel}
          placeholder={c.namePlaceholder}
          value={fields.name}
          onChange={(v) => updateField('name', v)}
          error={requiredError(errors.name, c.nameRequired)}
        />
        <Field
          id="email"
          label={c.emailLabel}
          placeholder={c.emailPlaceholder}
          value={fields.email}
          onChange={(v) => updateField('email', v)}
          error={emailError(errors.email, c)}
        />
      </div>

      <Field
        id="message"
        label={c.messageLabel}
        placeholder={c.messagePlaceholder}
        value={fields.message}
        onChange={(v) => updateField('message', v)}
        error={requiredError(errors.message, c.messageRequired)}
        multiline
      />

      <div>
        <Button variant="primary" type="submit" disabled={status === 'sending'} icon={<Send />}>
          {status === 'sending' ? c.submitSending : c.submitLabel}
        </Button>
      </div>
    </form>
  )
}