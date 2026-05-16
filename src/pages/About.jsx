import { Users, CheckCircle } from 'lucide-react'

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground py-20">
      <div className="container">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">About Framely</h1>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
            Two young people who saw that small businesses in India were getting left behind digitally and decided to actually do something about it.
          </p>
        </div>

        {/* Story Section */}
        <section className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Our Story</h2>
            <p className="text-foreground/70 mb-4 leading-relaxed">
              We started Framely because we noticed something frustrating — small businesses across India were struggling to get online. Either the prices were too high, the process was too complicated, or both.
            </p>
            <p className="text-foreground/70 mb-4 leading-relaxed">
              Local cafes, clinics, salons, and service businesses deserved better. They deserved websites that looked professional, worked perfectly on mobile, and didn't cost a fortune.
            </p>
            <p className="text-foreground/70 leading-relaxed">
              So we built Framely. A simple, honest way for Indian small businesses to get online without the corporate price tag or the corporate headache.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="bg-muted rounded-lg p-8 shadow-lg border border-border">
              <img size={300} src="/About-Us.webp" className="w-full max-w-2xl h-auto rounded-2xl" />
            </div>
          </div>
        </section>

        {/* Why India Section */}
        <section className="bg-primary/10 border border-primary rounded-2xl p-8 lg:p-12 mb-20">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-center">Why We Focus on India</h2>
          <p className="text-foreground/70 max-w-3xl mx-auto text-center leading-relaxed">
            We're based in India, serving Indian businesses, and we understand the market. This matters because a lot of business owners are slightly nervous about dealing with agencies that don't understand local context — payment preferences, communication styles, what works and what doesn't. We get it because we're from here.
          </p>
        </section>

        {/* Our Process */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">Our Process</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
              <h3 className="font-display font-semibold mb-2">Understand</h3>
              <p className="text-foreground/70 text-sm">We learn about your business, goals, and audience</p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
              <h3 className="font-display font-semibold mb-2">Design</h3>
              <p className="text-foreground/70 text-sm">We create a design that fits your brand perfectly</p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
              <h3 className="font-display font-semibold mb-2">Build</h3>
              <p className="text-foreground/70 text-sm">We develop your website with clean, fast code</p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
              <h3 className="font-display font-semibold mb-2">Handover</h3>
              <p className="text-foreground/70 text-sm">We deliver with a walkthrough and ongoing support</p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg p-6 border border-border hover:shadow-lg transition-shadow">
            <CheckCircle size={32} className="text-primary mb-4" />
            <h3 className="font-display font-semibold mb-2">Simple Pricing</h3>
            <p className="text-foreground/70 text-sm">No hidden fees, no surprises. What you see is what you pay.</p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-border hover:shadow-lg transition-shadow">
            <CheckCircle size={32} className="text-primary mb-4" />
            <h3 className="font-display font-semibold mb-2">Fast Delivery</h3>
            <p className="text-foreground/70 text-sm">We respect your time. Most websites are delivered in 7-21 days.</p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-border hover:shadow-lg transition-shadow">
            <CheckCircle size={32} className="text-primary mb-4" />
            <h3 className="font-display font-semibold mb-2">Real Support</h3>
            <p className="text-foreground/70 text-sm">Actual humans who respond. No bots, no ticket systems.</p>
          </div>
        </section>
      </div>
    </div>
  )
}
