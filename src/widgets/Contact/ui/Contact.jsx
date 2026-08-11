import { useState } from 'react'

const IconMail = () => (
  <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 7l10 7 10-7" />
  </svg>
)

const IconLinkedin = () => (
  <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const IconGithub = () => (
  <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
)

const IconDownload = () => (
  <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
)

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
      <div className="max-w-6xl mx-auto px-6">
        <p className="inline-flex items-center gap-2 text-xs font-semibold text-accent uppercase tracking-wider mb-3">
          <span className="w-4 h-px bg-accent" />
          Contact
        </p>
        <h2 className="text-3xl font-bold text-text mb-3">Get in touch</h2>
        <p className="text-text/60 text-sm mb-12 max-w-md">
          Open to contract work, fullstack or backend-heavy roles, and infrastructure consulting.
          Response within one business day.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 items-start">
          {status === 'sent' ? (
            <div className="bg-primary/10 border border-primary/30 rounded-xl p-8">
              <p className="text-sm font-medium text-text/80 mb-1">Message received</p>
              <p className="text-sm text-text/60">I'll be in touch shortly. Thank you.</p>
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
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex items-center gap-2 bg-primary hover:brightness-110 disabled:opacity-60 text-text text-sm font-medium px-5 py-2.5 rounded transition-all"
                >
                  {status === 'sending' ? 'Sending…' : 'Send message'}
                </button>
              </div>
            </form>
          )}

          <div className="flex flex-col gap-4">
            <div className="bg-text/5 rounded-xl border border-text/10 p-5">
              <p className="text-xs font-semibold text-text/60 uppercase tracking-wider mb-4">Direct contact</p>
              <div className="flex flex-col gap-3">
                <a
                  href="mailto:alex@alexkim.dev"
                  className="flex items-center gap-3 text-text hover:text-text/80 transition-colors group"
                >
                  <span className="text-text/60 group-hover:text-text/80 transition-colors">
                    <IconMail />
                  </span>
                  <span className="text-sm">alex@alexkim.dev</span>
                </a>

                <a
                  href="#"
                  className="flex items-center gap-3 text-text hover:text-text/80 transition-colors group"
                >
                  <span className="text-text/60 group-hover:text-text/80 transition-colors">
                    <IconLinkedin />
                  </span>
                  <span className="text-sm">linkedin.com/in/alexkimdev</span>
                </a>

                <a
                  href="#"
                  className="flex items-center gap-3 text-text hover:text-text/80 transition-colors group"
                >
                  <span className="text-text/60 group-hover:text-text/80 transition-colors">
                    <IconGithub />
                  </span>
                  <span className="text-sm">github.com/alexkim</span>
                </a>
              </div>
            </div>

            <a
              href="#"
              className="flex items-center justify-center gap-2 border border-text/10 hover:border-primary/50 text-text text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
            >
              <IconDownload />
              Download CV
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}