import { Link } from 'react-router-dom'
import { Check, Wrench, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Services() {
  return (
    <div className="min-h-screen bg-background text-foreground py-20">
      <div className="container">
        {/* Intro */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Services & Pricing</h1>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
            We offer two types of builds — template-based and custom — along with ongoing maintenance plans to keep your website running smoothly.
          </p>
        </div>

        {/* Website Pricing Tiers */}
        <section className="mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-12 text-center">Website Packages</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter */}
            <div className="bg-white rounded-lg border border-border p-8 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-display font-bold mb-2">Starter</h3>
              <p className="text-sm text-foreground/60 mb-6">Getting online</p>
              <p className="text-4xl font-bold text-primary mb-6">₹5,999</p>
              <ul className="space-y-3 mb-8 text-sm text-foreground/70">
                <li className="flex items-start">
                  <Check size={20} className="text-primary mr-2 flex-shrink-0 mt-1" />
                  <span>Template-based design</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="text-primary mr-2 flex-shrink-0 mt-1" />
                  <span>Up to 5 pages</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="text-primary mr-2 flex-shrink-0 mt-1" />
                  <span>Mobile responsive</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="text-primary mr-2 flex-shrink-0 mt-1" />
                  <span>Contact form integration</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="text-primary mr-2 flex-shrink-0 mt-1" />
                  <span>Basic SEO setup</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="text-primary mr-2 flex-shrink-0 mt-1" />
                  <span>7-day delivery</span>
                </li>
              </ul>
              <Link to="/contact">
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/5">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Standard - Most Popular */}
            <div className="bg-primary text-primary-foreground rounded-lg border-2 border-primary p-8 shadow-lg relative md:scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary-foreground text-primary px-4 py-1 rounded-full text-sm font-bold">
                Most Popular
              </div>
              <h3 className="text-2xl font-display font-bold mb-2">Standard</h3>
              <p className="text-sm text-primary-foreground/80 mb-6">Most popular</p>
              <p className="text-4xl font-bold mb-6">₹14,999</p>
              <ul className="space-y-3 mb-8 text-sm text-primary-foreground/90">
                <li className="flex items-start">
                  <Check size={20} className="mr-2 flex-shrink-0 mt-1" />
                  <span>Custom design elements</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="mr-2 flex-shrink-0 mt-1" />
                  <span>Up to 10 pages</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="mr-2 flex-shrink-0 mt-1" />
                  <span>Mobile responsive</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="mr-2 flex-shrink-0 mt-1" />
                  <span>Advanced form integration</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="mr-2 flex-shrink-0 mt-1" />
                  <span>SEO optimization</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="mr-2 flex-shrink-0 mt-1" />
                  <span>Social media integration</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="mr-2 flex-shrink-0 mt-1" />
                  <span>14-day delivery</span>
                </li>
              </ul>
              <Link to="/contact">
                <Button className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Premium */}
            <div className="bg-white rounded-lg border border-border p-8 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-display font-bold mb-2">Premium</h3>
              <p className="text-sm text-foreground/60 mb-6">For ambitious businesses</p>
              <p className="text-4xl font-bold text-primary mb-6">₹28,999</p>
              <ul className="space-y-3 mb-8 text-sm text-foreground/70">
                <li className="flex items-start">
                  <Check size={20} className="text-primary mr-2 flex-shrink-0 mt-1" />
                  <span>Fully custom design</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="text-primary mr-2 flex-shrink-0 mt-1" />
                  <span>Unlimited pages</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="text-primary mr-2 flex-shrink-0 mt-1" />
                  <span>Mobile responsive</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="text-primary mr-2 flex-shrink-0 mt-1" />
                  <span>Custom functionality</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="text-primary mr-2 flex-shrink-0 mt-1" />
                  <span>Advanced SEO & analytics</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="text-primary mr-2 flex-shrink-0 mt-1" />
                  <span>E-commerce ready</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="text-primary mr-2 flex-shrink-0 mt-1" />
                  <span>21-day delivery</span>
                </li>
              </ul>
              <Link to="/contact">
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/5">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Maintenance Plans */}
        <section className="mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-center">Maintenance Plans</h2>
          <p className="text-center text-foreground/70 mb-12 max-w-2xl mx-auto">Keep your website secure and up-to-date</p>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Basic Maintenance */}
            <div className="bg-background rounded-lg p-8 border border-border hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <Wrench size={32} className="text-primary mr-3" />
                <h3 className="text-xl font-display font-bold">Basic</h3>
              </div>
              <p className="text-3xl font-bold text-primary mb-6">₹799<span className="text-lg text-foreground/60">/month</span></p>
              <ul className="space-y-3 mb-8 text-sm text-foreground/70">
                <li className="flex items-start">
                  <Check size={20} className="text-primary mr-2 flex-shrink-0 mt-1" />
                  <span>Security updates</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="text-primary mr-2 flex-shrink-0 mt-1" />
                  <span>Plugin updates</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="text-primary mr-2 flex-shrink-0 mt-1" />
                  <span>Weekly backups</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="text-primary mr-2 flex-shrink-0 mt-1" />
                  <span>Email support</span>
                </li>
              </ul>
              <Link to="/contact">
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/5">
                  Subscribe
                </Button>
              </Link>
            </div>

            {/* Standard Maintenance */}
            <div className="bg-background rounded-lg p-8 border-2 border-primary hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <Wrench size={32} className="text-primary mr-3" />
                <h3 className="text-xl font-display font-bold">Standard</h3>
              </div>
              <p className="text-3xl font-bold text-primary mb-6">₹1,499<span className="text-lg text-foreground/60">/month</span></p>
              <ul className="space-y-3 mb-8 text-sm text-foreground/70">
                <li className="flex items-start">
                  <Check size={20} className="text-primary mr-2 flex-shrink-0 mt-1" />
                  <span>Everything in Basic</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="text-primary mr-2 flex-shrink-0 mt-1" />
                  <span>Content updates (2/month)</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="text-primary mr-2 flex-shrink-0 mt-1" />
                  <span>Daily backups</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="text-primary mr-2 flex-shrink-0 mt-1" />
                  <span>Performance optimization</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="text-primary mr-2 flex-shrink-0 mt-1" />
                  <span>Priority support</span>
                </li>
              </ul>
              <Link to="/contact">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Subscribe
                </Button>
              </Link>
            </div>

            {/* Premium Maintenance */}
            <div className="bg-background rounded-lg p-8 border border-border hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <Wrench size={32} className="text-primary mr-3" />
                <h3 className="text-xl font-display font-bold">Premium</h3>
              </div>
              <p className="text-3xl font-bold text-primary mb-6">₹2,499<span className="text-lg text-foreground/60">/month</span></p>
              <ul className="space-y-3 mb-8 text-sm text-foreground/70">
                <li className="flex items-start">
                  <Check size={20} className="text-primary mr-2 flex-shrink-0 mt-1" />
                  <span>Everything in Standard</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="text-primary mr-2 flex-shrink-0 mt-1" />
                  <span>Unlimited content updates</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="text-primary mr-2 flex-shrink-0 mt-1" />
                  <span>Security monitoring</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="text-primary mr-2 flex-shrink-0 mt-1" />
                  <span>Monthly reports</span>
                </li>
                <li className="flex items-start">
                  <Check size={20} className="text-primary mr-2 flex-shrink-0 mt-1" />
                  <span>24/7 emergency support</span>
                </li>
              </ul>
              <Link to="/contact">
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/5">
                  Subscribe
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Launch Offer */}
        <div className="bg-primary/10 border border-primary rounded-lg p-6 text-center max-w-3xl mx-auto">
          <p className="text-lg text-foreground">
            <span className="font-display font-bold">Launch Offer:</span> We're currently offering 20% off for our first 10 clients. Spots are limited.
          </p>
        </div>
      </div>
    </div>
  )
}
