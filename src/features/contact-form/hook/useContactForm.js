import { useState } from 'react'
import { CONTACT_FORM_ENDPOINT } from '../../../shared/data/index.js'
import { validateEmail } from '../lib/validateEmail.js'

const INITIAL_FIELDS = { name: '', email: '', message: '' }

export function useContactForm() {
  const [fields, setFields] = useState(INITIAL_FIELDS)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [serverError, setServerError] = useState('')

  const updateField = (name, value) => setFields((prev) => ({ ...prev, [name]: value }))

  const validate = () => {
    const next = {}
    if (!fields.name.trim()) next.name = 'required'
    if (!fields.email.trim()) {
      next.email = 'required'
    } else if (!validateEmail(fields.email)) {
      next.email = 'invalid'
    }
    if (!fields.message.trim()) next.message = 'required'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const submit = async (event) => {
    event.preventDefault()
    if (!validate()) return false

    setStatus('sending')
    setServerError('')
    try {
      const response = await fetch(CONTACT_FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(event.currentTarget),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        setServerError(data?.errors?.[0]?.message ?? '')
        setStatus('error')
        return false
      }
      setStatus('sent')
      return true
    } catch {
      setStatus('error')
      return false
    }
  }

  const reset = () => {
    setFields(INITIAL_FIELDS)
    setErrors({})
    setServerError('')
    setStatus('idle')
  }

  return { fields, errors, status, serverError, updateField, submit, reset }
}