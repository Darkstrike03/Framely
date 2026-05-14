import { useState } from 'react'
import { Mail, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    phone: '',
    email: '',
    businessType: '',
    lookingFor: '',
    message: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    // In Vite, environment variables are prefixed with VITE_
    // You can set this in your .env file or Vercel / GitHub Secrets dashboard
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      alert('Form integration is pending. Please configure your API key in the environment variables.');
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          ...formData,
        }),
      });

      const result = await response.json();
      if (result.success) {
        alert('Thank you for your message! We will get back to you soon.')
        setFormData({
          name: '',
          businessName: '',
          phone: '',
          email: '',
          businessType: '',
          lookingFor: '',
          message: '',
        })
      } else {
        alert('Something went wrong. Please try again or reach out on WhatsApp.');
      }
    } catch (error) {
      console.error(error);
      alert('Error submitting form. Please reach out via WhatsApp instead.');
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const whatsappNumber = "919876543210" // Replace with actual number
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hi%20Framely!%20I'm%20interested%20in%20getting%20a%20website.`
  const email = "hello@framely.in" // Replace with actual email

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

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Send Message
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
                    <a href={`mailto:${email}`} className="text-foreground/70 hover:text-primary transition">
                      {email}
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
