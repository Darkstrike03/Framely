import { Link } from 'react-router-dom'
import { Laptop, Palette, Code, Shield, Clock, DollarSign, Headphones, Star, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
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
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight">
              Professional websites for Indian small businesses, without the corporate price tag
            </h1>
            <p className="text-lg text-foreground/80 max-w-md">
              We help cafes, clinics, salons, and small businesses across India get online fast, affordably, and beautifully.
            </p>
            <div className="flex gap-4 pt-4">
              <Link to="/templates">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  See Our Work
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/5">
                  Get a Free Quote
                </Button>
              </Link>
            </div>
          </div>
          <div className="hidden md:flex justify-center">
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 shadow-2xl">
                <Laptop size={300} className="text-primary/80" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold">
                Starting at ₹5,999
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="flex justify-center py-8 opacity-30">
        <img
          src="/middle-image.webp"
          alt="Divider"
          className="w-full max-w-2xl h-auto"
        />
      </div>

      {/* What We Do Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-16 text-center">What We Do</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-background rounded-lg border border-border hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Palette size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-display font-bold mb-3">Design</h3>
              <p className="text-foreground/70">Beautiful, modern designs that represent your brand perfectly</p>
            </div>
            <div className="text-center p-8 bg-background rounded-lg border border-border hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Code size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-display font-bold mb-3">Build</h3>
              <p className="text-foreground/70">Fast, responsive websites that work on all devices</p>
            </div>
            <div className="text-center p-8 bg-background rounded-lg border border-border hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-display font-bold mb-3">Maintain</h3>
              <p className="text-foreground/70">Ongoing support to keep your site running smoothly</p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="flex justify-center py-8 opacity-30">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663561717216/8X3uCMdtZdep275iiDXgZb/framely-leaf-pattern-EuqQ7kMkVYcBvXND5dk86s.webp"
          alt="Divider"
          className="w-full max-w-2xl h-auto"
        />
      </div>

      {/* Why Framely Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-16 text-center">Why Framely</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <Clock size={40} className="text-primary mx-auto mb-4" />
              <h3 className="font-display font-bold mb-2">Fast Turnaround</h3>
              <p className="text-foreground/70 text-sm">Get your website live in days, not weeks</p>
            </div>
            <div className="text-center p-6">
              <Laptop size={40} className="text-primary mx-auto mb-4" />
              <h3 className="font-display font-bold mb-2">Mobile-First Design</h3>
              <p className="text-foreground/70 text-sm">Optimized for phones and tablets</p>
            </div>
            <div className="text-center p-6">
              <DollarSign size={40} className="text-primary mx-auto mb-4" />
              <h3 className="font-display font-bold mb-2">Transparent Pricing</h3>
              <p className="text-foreground/70 text-sm">No hidden fees or surprises</p>
            </div>
            <div className="text-center p-6">
              <Headphones size={40} className="text-primary mx-auto mb-4" />
              <h3 className="font-display font-bold mb-2">Ongoing Support</h3>
              <p className="text-foreground/70 text-sm">We're here when you need us</p>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Preview Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-center">Our Templates</h2>
          <p className="text-center text-foreground/70 mb-12 max-w-2xl mx-auto">Beautiful designs ready for your business</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-background rounded-lg h-48 flex items-center justify-center border border-border hover:shadow-lg transition-shadow">
                <span className="text-foreground/50">Template {i}</span>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/templates">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                View All Templates
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-16 text-center">What Our Clients Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-8 rounded-lg border border-border hover:shadow-lg transition-shadow">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-foreground/70 mb-4 italic">
                  "Framely made getting our website online so easy. Great communication and beautiful work!"
                </p>
                <p className="font-display font-semibold">— Client Name</p>
                <p className="text-sm text-foreground/50">Business Type</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 md:py-32 bg-primary text-primary-foreground text-center">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Ready to get online? Let's talk.</h2>
          <Link to="/contact">
            <Button
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              Get Started
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
