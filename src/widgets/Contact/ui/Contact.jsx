import { useState } from 'react'
import { Download, Send } from 'lucide-react'
import { cv, sections, socials } from '../../../shared/data/index.js'
import { Button, Container } from '../../../shared/ui/index.js'

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')

  const submit = (e) => {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => setStatus('sent'), 1000)
  }

  return (
    <section id="contact" className="py-24 border-t border-text/10">
      <Container>
        <p className="inline-flex items-center gap-2 text-xs font-semibold text-accent uppercase tracking-wider mb-3">
          <span className="w-4 h-px bg-accent" />
          {sections.contact.eyebrow}
        </p>
        <h2 className="text-3xl font-bold text-text mb-3">{sections.contact.title}</h2>
        <p className="text-text/60 text-sm mb-12 max-w-md">
          {sections.contact.subtitle}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 items-start">
          {status === 'sent' ? (
            <div className="bg-primary/10 border border-primary/30 rounded-xl p-8">
              <p className="text-sm font-medium text-text/80 mb-1">{sections.contact.successTitle}</p>
              <p className="text-sm text-text/60">{sections.contact.successBody}</p>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="text-xs font-medium text-text/60 block mb-1.5">Name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full bg-text/5 border border-text/10 rounded text-text text-sm px-3 py-2.5 focus:outline-none focus:border-primary transition-colors placeholder:text-text/40"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-xs font-medium text-text/60 block mb-1.5">Email</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full bg-text/5 border border-text/10 rounded text-text text-sm px-3 py-2.5 focus:outline-none focus:border-primary transition-colors placeholder:text-text/40"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="text-xs font-medium text-text/60 block mb-1.5">Message</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about the project or role..."
                  className="w-full bg-text/5 border border-text/10 rounded text-text text-sm px-3 py-2.5 focus:outline-none focus:border-primary transition-colors placeholder:text-text/40 resize-none"
                />
              </div>
              <div>
                <Button variant="primary" type="submit" disabled={status === 'sending'} icon={<Send />}>
                  {status === 'sending' ? sections.contact.submitSending : sections.contact.submitLabel}
                </Button>
              </div>
            </form>
          )}

          <div className="flex flex-col gap-4">
            <div className="bg-text/5 rounded-xl border border-text/10 p-5">
              <p className="text-xs font-semibold text-text/60 uppercase tracking-wider mb-4">{sections.contact.directLabel}</p>
              <div className="flex flex-col gap-3">
                {socials.map(({ id, icon: Icon, url, handle }) => (
                  <a
                    key={id}
                    href={url}
                    className="flex items-center gap-3 text-text hover:text-text/80 transition-colors group"
                  >
                    <span className="text-text/60 group-hover:text-text/80 transition-colors">
                      <Icon color="currentColor" />
                    </span>
                    <span className="text-sm">{handle}</span>
                  </a>
                ))}
              </div>
            </div>

            <Button variant="secondary" href={cv.url} icon={<Download />}>
              {cv.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}