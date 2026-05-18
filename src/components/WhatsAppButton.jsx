import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
  const whatsappNumber = "7439101618" // Replace with actual number
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hi%20Framely!%20I'm%20interested%20in%20getting%20a%20website.`

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-200 z-50"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  )
}
