import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import TemplatePeekCard from '@/components/TemplatePeekCard'
import { TEMPLATES, TEMPLATE_CATEGORIES } from '@/data/templates'

export default function Templates() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredTemplates =
    activeCategory === 'all'
      ? TEMPLATES
      : TEMPLATES.filter((t) => t.category === activeCategory)

  return (
    <div className="min-h-screen bg-background text-foreground py-20">
      <div className="container">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-center mb-4">Our Templates</h1>
        <p className="text-center text-foreground/70 mb-12 max-w-2xl mx-auto text-lg">
          Beautiful, professionally designed templates ready for your business. Hover or scroll each preview to explore the full design.
        </p>

        <div className="w-full overflow-x-auto no-scrollbar mb-12">
            <div className="flex sm:flex-wrap justify-start sm:justify-center gap-3 pb-4 sm:pb-0 px-4 sm:px-0 min-w-max sm:min-w-0">
              {TEMPLATE_CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`whitespace-nowrap px-6 py-2.5 rounded-full font-medium text-sm sm:text-base transition-all duration-200 ${
                    activeCategory === category.id
                      ? 'bg-primary text-primary-foreground shadow-sm scale-102'
                      : 'bg-muted text-foreground hover:bg-stone-200/70'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
            </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {filteredTemplates.map((template) => (
            <TemplatePeekCard
              key={template.id}
              name={template.name}
              tier={template.tier}
              image={template.image}
            />
          ))}
        </div>

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
