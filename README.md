# Framely Website

Professional website for Framely - a web development agency serving Indian small businesses.

## Features

- **Home Page**: Hero section, What We Do, Why Framely, Templates preview, Testimonials, CTA
- **Services & Pricing**: Website packages (Starter ₹5,999, Standard ₹14,999, Premium ₹28,999) and maintenance plans
- **Templates**: Filterable gallery of website templates by category
- **About**: Company story, team section, and process overview
- **Contact**: Professional contact form with WhatsApp integration
- **Sticky WhatsApp Button**: Floating chat button on all pages for easy communication

## Tech Stack

- React 18
- Vite
- React Router (for navigation)
- TailwindCSS (for styling)
- Lucide React (for icons)

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to the URL shown in the terminal (usually http://localhost:5173)

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Customization Needed

Before deploying, update these values:

1. **WhatsApp Number**: Update in `src/components/WhatsAppButton.jsx` and `src/pages/Contact.jsx`
   - Replace `919876543210` with your actual WhatsApp number

2. **Email Address**: Update in `src/pages/Contact.jsx`
   - Replace `hello@framely.in` with your actual email

3. **Form Integration**: The contact form currently shows an alert. Integrate with:
   - Formspree (https://formspree.io)
   - Web3Forms (https://web3forms.com)
   - Or any other form service

4. **Template Images**: Replace placeholder divs in `src/pages/Home.jsx` and `src/pages/Templates.jsx` with actual template mockup images

5. **Team Photo**: Replace the placeholder in `src/pages/About.jsx` with your actual team photo

6. **Testimonials**: Replace placeholder testimonials in `src/pages/Home.jsx` with real client reviews when available

## Pages

- `/` - Home page
- `/services` - Services & Pricing
- `/templates` - Templates gallery
- `/about` - About us
- `/contact` - Contact form
