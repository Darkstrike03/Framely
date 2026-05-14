import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function Templates() {
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Templates' },
    { id: 'cafe', name: 'Cafe & Restaurant' },
    { id: 'clinic', name: 'Clinic & Healthcare' },
    { id: 'salon', name: 'Salon & Beauty' },
    { id: 'business', name: 'General Business' },
  ]

  const templates = [
    { id: 1, category: 'cafe', name: 'Modern Cafe', tier: 'Starter' },
    { id: 2, category: 'cafe', name: 'Restaurant Pro', tier: 'Standard' },
    { id: 3, category: 'clinic', name: 'Dental Clinic', tier: 'Starter' },
    { id: 4, category: 'clinic', name: 'Healthcare Center', tier: 'Standard' },
    { id: 5, category: 'salon', name: 'Beauty Salon', tier: 'Starter' },
    { id: 6, category: 'salon', name: 'Spa & Wellness', tier: 'Standard' },
    { id: 7, category: 'business', name: 'Corporate Clean', tier: 'Starter' },
    { id: 8, category: 'business', name: 'Business Pro', tier: 'Standard' },
  ]

  const filteredTemplates = activeCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === activeCategory)

  return (
    <div className="min-h-screen bg-background text-foreground py-20">
      <div className="container">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-center mb-4">Our Templates</h1>
        <p className="text-center text-foreground/70 mb-12 max-w-2xl mx-auto text-lg">
          Beautiful, professionally designed templates ready for your business. Choose a starting point and we'll customize it for you.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                activeCategory === category.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {filteredTemplates.map((template) => (
            <div key={template.id} className="group relative">
              <div className="bg-muted rounded-lg h-64 flex items-center justify-center mb-4 overflow-hidden border border-border hover:shadow-lg transition-shadow">
                <span className="text-foreground/50 text-lg">{template.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <h3 className="font-display font-semibold text-lg">{template.name}</h3>
                <span className={`text-sm px-3 py-1 rounded-full ${
                  template.tier === 'Starter' ? 'bg-primary/10 text-primary' : 'bg-secondary text-secondary-foreground'
                }`}>
                  {template.tier}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Custom CTA */}
        <div className="text-center bg-primary/10 border border-primary rounded-lg p-8 max-w-3xl mx-auto">
          <h3 className="text-2xl font-display font-bold mb-4">Don't see what you're looking for?</h3>
          <p className="text-foreground/70 mb-6">We do fully custom websites too. Let's discuss your unique requirements.</p>
          <Link to="/contact">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Get a Custom Quote
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
