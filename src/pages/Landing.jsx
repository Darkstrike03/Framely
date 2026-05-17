import { ArrowRight, Sparkles, Globe, Palette, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ChainDivider from '@/components/ChainDivider'

/**
 * Framely Landing Page - Revamped UI
 * Design: Modern Minimalism with Nature Integration
 * Colors: Forest Green (#2D5016), Cream (#F5F1E8), Sage Green (#9CAF88)
 */

export default function Landing() {
  const handleGetStarted = () => {
    localStorage.setItem('framely_has_visited', 'true')
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container flex items-center justify-between py-4">
          <div className="text-2xl font-display font-bold text-primary">Framely</div>
          <Button onClick={handleGetStarted} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center py-20 overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 z-0 opacity-40"
          style={{
            backgroundImage: 'url(/hero-image.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <div className="container relative z-10 grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <Sparkles size={20} />
                <span className="text-sm font-medium">Professional Websites for Indian Small Businesses</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight">
                Beautiful websites.<br />
                <span className="text-primary">Without the corporate price tag.</span>
              </h1>

              <p className="text-lg text-foreground/80 max-w-md">
                We help cafes, clinics, salons, and small businesses across India get online fast, affordably, and beautifully.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                onClick={handleGetStarted}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Get Started
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div>
                <div className="text-2xl font-bold text-primary">₹5,999</div>
                <div className="text-sm text-foreground/60">Starting Price</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">7 Days</div>
                <div className="text-sm text-foreground/60">Fast Delivery</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">100%</div>
                <div className="text-sm text-foreground/60">Mobile First</div>
              </div>
            </div>
          </div>

          {/* Right - Visual */}
          <div className="hidden md:flex justify-center">
            <img
              src="/frame.webp"
              alt="Framely"
              className="w-full max-w-md h-auto drop-shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Divider */}
      <ChainDivider />

      {/* Services Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-16">What We Build</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="p-8 bg-background rounded-lg border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Globe className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-display font-bold mb-3">Custom Websites</h3>
              <p className="text-foreground/70">Tailored designs that reflect your brand and attract your ideal customers.</p>
            </div>

            {/* Service 2 */}
            <div className="p-8 bg-background rounded-lg border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Palette className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-display font-bold mb-3">Brand Identity</h3>
              <p className="text-foreground/70">Cohesive visual design that tells your story and resonates with your audience.</p>
            </div>

            {/* Service 3 */}
            <div className="p-8 bg-background rounded-lg border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Zap className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-display font-bold mb-3">Lightning Fast</h3>
              <p className="text-foreground/70">Optimized for speed and performance. Your site loads instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <ChainDivider />

      {/* Pricing Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Simple Pricing</h2>
          <p className="text-lg text-foreground/70 mb-16 max-w-2xl">No surprises. No hidden fees. Just honest pricing.</p>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xlsnap-center">
            {/* Starter */}
            <div className="p-8 bg-white rounded-lg border border-border hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-display font-bold mb-2">Starter</h3>
              <p className="text-sm text-foreground/60 mb-6">Getting online</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-primary">₹5,999</span>
              </div>
              <ul className="space-y-2 text-sm text-foreground/70 mb-8">
                <li>✓ 5 Pages</li>
                <li>✓ Mobile Responsive</li>
                <li>✓ Basic SEO</li>
                <li>✓ Contact Form</li>
              </ul>
              <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/5">
                Choose
              </Button>
            </div>

            {/* Professional */}
            <div className="p-8 bg-primary text-primary-foreground rounded-lg border-2 border-primary hover:shadow-lg transition-shadow md:scale-105">
              <div className="text-xs font-bold mb-4 bg-primary-foreground text-primary px-3 py-1 rounded-full w-fit">
                POPULAR
              </div>
              <h3 className="text-xl font-display font-bold mb-2">Professional</h3>
              <p className="text-sm text-primary-foreground/80 mb-6">Most popular</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">₹9,999</span>
              </div>
              <ul className="space-y-2 text-sm text-primary-foreground/90 mb-8">
                <li>✓ 10 Pages</li>
                <li>✓ Mobile Responsive</li>
                <li>✓ Advanced SEO</li>
                <li>✓ Contact Forms</li>
                <li>✓ Analytics Setup</li>
              </ul>
              <Button className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                Choose
              </Button>
            </div>

            {/* Enterprise */}
            <div className="p-8 bg-white rounded-lg border border-border hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-display font-bold mb-2">Enterprise</h3>
              <p className="text-sm text-foreground/60 mb-6">For ambitious businesses</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-primary">₹19,999</span>
              </div>
              <ul className="space-y-2 text-sm text-foreground/70 mb-8">
                <li>✓ Unlimited Pages</li>
                <li>✓ E-commerce Ready</li>
                <li>✓ Premium Support</li>
                <li>✓ Custom Features</li>
              </ul>
              <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/5">
                Choose
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-primary text-primary-foreground text-center">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Ready to Go Online?</h2>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto mb-8">
            Join hundreds of Indian small businesses already thriving online with Framely.
          </p>
          <Button
            onClick={handleGetStarted}
            size="lg"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          >
            Start Your Website Today
            <ArrowRight size={18} className="ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="container text-center text-sm text-foreground/60">
          <p>&copy; 2024 Framely. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
