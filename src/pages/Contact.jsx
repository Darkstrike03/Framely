import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Mail, MessageCircle, Loader2, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const OFFICIAL_EMAIL = 'helloframely.in@gmail.com'

const BUSINESS_TYPE_LABELS = {
  cafe: 'Cafe & Restaurant',
  clinic: 'Clinic & Healthcare',
  salon: 'Salon & Beauty',
  retail: 'Retail Store',
  service: 'Service Business',
  other: 'Other',
}

const PACKAGE_LABELS = {
  starter: 'Starter (₹5,999)',
  standard: 'Standard (₹14,999)',
  premium: 'Premium (₹28,999)',
  'not-sure': 'Not Sure',
}

function buildTemplateMessage(templateName) {
  return `I'm interested in the "${templateName}" template.`
}

export default function Contact() {
  const [searchParams] = useSearchParams()
  const templateFromUrl = searchParams.get('template')

  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    phone: '',
    email: '',
    businessType: '',
    lookingFor: '',
    selectedTemplate: '',
    message: '',
  })
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [statusMessage, setStatusMessage] = useState('')

  useEffect(() => {
    if (!templateFromUrl) return

    setFormData((prev) => ({
      ...prev,
      selectedTemplate: templateFromUrl,
      message: buildTemplateMessage(templateFromUrl),
    }))
  }, [templateFromUrl])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('idle')
    setStatusMessage('')

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

    if (!accessKey) {
      setStatus('error')
      setStatusMessage(
        'Form is not configured yet. Please email us directly or use WhatsApp.',
      )
      return
    }

    setStatus('submitting')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Framely inquiry — ${formData.businessName} (${formData.name})${
            formData.selectedTemplate ? ` — ${formData.selectedTemplate} template` : ''
          }`,
          from_name: 'Framely Contact Form',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          business_name: formData.businessName,
          business_type: BUSINESS_TYPE_LABELS[formData.businessType] ?? formData.businessType,
          package_interest: PACKAGE_LABELS[formData.lookingFor] ?? formData.lookingFor,
          selected_template: formData.selectedTemplate || 'Not specified',
          message: formData.message || '(No additional message)',
          botcheck: '',
        }),
      })

      const result = await response.json()

      if (result.success) {
        setStatus('success')
        setStatusMessage('Thank you! Your message was sent. We typically reply within 24 hours.')
        setFormData({
          name: '',
          businessName: '',
          phone: '',
          email: '',
          businessType: '',
          lookingFor: '',
          selectedTemplate: '',
          message: '',
        })
      } else {
        setStatus('error')
        setStatusMessage(result.message || 'Something went wrong. Please try again or use WhatsApp.')
      }
    } catch (error) {
      console.error(error)
      setStatus('error')
      setStatusMessage('Could not send your message. Please try WhatsApp or email us directly.')
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const whatsappNumber = '919876543210' // Replace with actual number
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hi%20Framely!%20I'm%20interested%20in%20getting%20a%20website.`

  return (
    <div className="min-h-screen bg-background text-foreground py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Get in Touch</h1>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
            Ready to get your business online? Fill out the form below or reach out directly. We typically respond within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg p-8 shadow-sm border border-border">
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              {formData.selectedTemplate && (
                <div className="rounded-lg border border-primary/25 bg-primary/5 px-4 py-3 text-sm">
                  <span className="text-foreground/70">Selected template: </span>
                  <strong className="text-primary">{formData.selectedTemplate}</strong>
                </div>
              )}

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring/50 focus:border-transparent outline-none transition bg-background"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="businessName" className="block text-sm font-medium text-foreground mb-2">
                  Business Name *
                </label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  required
                  value={formData.businessName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring/50 focus:border-transparent outline-none transition bg-background"
                  placeholder="Your business name"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring/50 focus:border-transparent outline-none transition bg-background"
                  placeholder="Your phone number"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring/50 focus:border-transparent outline-none transition bg-background"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="businessType" className="block text-sm font-medium text-foreground mb-2">
                  Type of Business *
                </label>
                <select
                  id="businessType"
                  name="businessType"
                  required
                  value={formData.businessType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring/50 focus:border-transparent outline-none transition bg-background"
                >
                  <option value="">Select your business type</option>
                  <option value="cafe">Cafe & Restaurant</option>
                  <option value="clinic">Clinic & Healthcare</option>
                  <option value="salon">Salon & Beauty</option>
                  <option value="retail">Retail Store</option>
                  <option value="service">Service Business</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="lookingFor" className="block text-sm font-medium text-foreground mb-2">
                  What are you looking for? *
                </label>
                <select
                  id="lookingFor"
                  name="lookingFor"
                  required
                  value={formData.lookingFor}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring/50 focus:border-transparent outline-none transition bg-background"
                >
                  <option value="">Select a package</option>
                  <option value="starter">Starter (₹5,999)</option>
                  <option value="standard">Standard (₹14,999)</option>
                  <option value="premium">Premium (₹28,999)</option>
                  <option value="not-sure">Not Sure</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-ring/50 focus:border-transparent outline-none transition resize-none bg-background"
                  placeholder="Tell us about your project or ask any questions..."
                />
              </div>

              {statusMessage && (
                <p
                  role="status"
                  className={`rounded-lg px-4 py-3 text-sm ${
                    status === 'success'
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'bg-destructive/10 text-destructive border border-destructive/20'
                  }`}
                >
                  {status === 'success' && (
                    <CheckCircle2 size={16} className="inline mr-2 -mt-0.5" aria-hidden="true" />
                  )}
                  {statusMessage}
                </p>
              )}

              <Button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-70"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 size={18} className="mr-2 animate-spin" />
                    Sending…
                  </>
                ) : (
                  'Send Message'
                )}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-primary/10 rounded-lg p-8 border border-primary">
              <h2 className="text-2xl font-display font-bold mb-6">Other Ways to Reach Us</h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail size={24} className="text-primary mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-display font-semibold mb-1">Email</h3>
                    <a
                      href={`mailto:${OFFICIAL_EMAIL}`}
                      className="text-foreground/70 hover:text-primary transition break-all"
                    >
                      {OFFICIAL_EMAIL}
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <MessageCircle size={24} className="text-primary mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-display font-semibold mb-1">WhatsApp</h3>
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/70 hover:text-primary transition"
                    >
                      Chat with us on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary/10 border border-primary rounded-lg p-8">
              <h3 className="text-xl font-display font-bold mb-4 text-primary">Prefer WhatsApp?</h3>
              <p className="text-foreground/70 mb-4">
                In India, WhatsApp is often the fastest way to connect. Click the button below to start a chat with us instantly.
              </p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-full">
                  <MessageCircle size={20} className="inline mr-2" />
                  Chat on WhatsApp
                </Button>
              </a>
            </div>

            <div className="bg-muted rounded-lg p-6 border border-border">
              <h3 className="font-display font-semibold mb-2">Response Time</h3>
              <p className="text-foreground/70 text-sm">
                We typically respond within 24 hours. For urgent queries, WhatsApp is usually faster.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
