'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { OWNER, SOCIAL_LINKS } from '@/lib/data'

const socialIcons: Record<string, React.ReactNode> = {
  github: <Github size={18} />,
  linkedin: <Linkedin size={18} />,
  twitter: <Twitter size={18} />,
  mail: <Mail size={18} />,
}

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<FormData>({ name: '', email: '', subject: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (data.success) {
        toast.success("Message sent! I'll get back to you soon. 🚀")
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        toast.error(data.error ?? 'Something went wrong. Please try again.')
      }
    } catch {
      toast.error('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'w-full px-4 py-3 rounded-xl glass border border-white/10 focus:border-violet-500/60 focus:outline-none focus:ring-1 focus:ring-violet-500/40 text-foreground placeholder:text-muted-foreground/60 bg-transparent transition-all text-sm'

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-violet-600/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-violet-400 font-mono text-sm mb-3 tracking-widest uppercase">Let&apos;s connect</p>
          <h2 className="section-heading">Get In Touch</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground max-w-lg mx-auto">
            Have a project idea or just want to say hi? I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="text-xl font-bold text-foreground mb-6">Contact Information</h3>
              <div className="space-y-4">
                {[
                  { icon: <Mail size={18} />, label: 'Email', value: OWNER.email, href: `mailto:${OWNER.email}` },
                  { icon: <Phone size={18} />, label: 'Phone', value: OWNER.phone, href: `tel:${OWNER.phone}` },
                  { icon: <MapPin size={18} />, label: 'Location', value: OWNER.location, href: undefined },
                ].map(({ icon, label, value, href }) => (
                  <div key={label} className="flex items-center gap-4 p-4 glass rounded-xl border border-white/5 group hover:border-violet-500/30 transition-all">
                    <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center text-violet-400 group-hover:bg-violet-500/30 transition-colors flex-shrink-0">
                      {icon}
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{label}</p>
                      {href ? (
                        <a href={href} className="text-sm font-medium text-foreground hover:text-violet-400 transition-colors">
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-foreground">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div>
              <p className="text-sm text-muted-foreground mb-4">Find me on</p>
              <div className="flex flex-wrap gap-3">
                {SOCIAL_LINKS.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="flex items-center gap-2 px-4 py-2 glass rounded-xl border border-white/10 text-sm text-muted-foreground hover:text-violet-400 hover:border-violet-500/40 transition-all"
                  >
                    {socialIcons[link.icon]}
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form
              id="contact-form"
              onSubmit={handleSubmit}
              className="p-8 glass rounded-2xl border border-white/5 hover:border-violet-500/20 transition-all space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs text-muted-foreground mb-2">
                    Name *
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-xs text-muted-foreground mb-2">
                    Email *
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-xs text-muted-foreground mb-2">
                  Subject *
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  required
                  placeholder="What's this about?"
                  value={form.subject}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs text-muted-foreground mb-2">
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about your project or just say hi..."
                  value={form.message}
                  onChange={handleChange}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <motion.button
                id="contact-submit-btn"
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
