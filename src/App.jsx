import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import Seo from './components/Seo'
import Home from './pages/Home'
import Services from './pages/Services'
import Templates from './pages/Templates'
import About from './pages/About'
import Policy from './pages/Policy'
import Contact from './pages/Contact'
import WhatsAppButton from './components/WhatsAppButton'
import Landing from './pages/Landing'
import ScrollLeaves from './components/ScrollLeaves'

function AppRoutes({ hasVisited }) {
  const location = useLocation()

  if (!hasVisited) {
    return (
      <>
        <Seo key={location.pathname} />
        <Routes>
          <Route path="*" element={<Landing />} />
        </Routes>
      </>
    )
  }

  return (
    <>
      <Seo key={location.pathname} />
      <div className="min-h-screen">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/policy" element={<Policy />} />
        </Routes>
        <WhatsAppButton />
        <ScrollLeaves />
      </div>
    </>
  )
}

function App() {
  const [hasVisited, setHasVisited] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const visited = localStorage.getItem('framely_has_visited')
    setHasVisited(visited === 'true')
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return null
  }

  return (
    <BrowserRouter>
      <AppRoutes hasVisited={hasVisited} />
    </BrowserRouter>
  )
}

export default App
