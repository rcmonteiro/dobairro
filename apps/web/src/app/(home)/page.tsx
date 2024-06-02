import Footer from '@/components/footer'
import Header from '@/components/header'
import Features from '@/components/home/features'
import Hero from '@/components/home/hero'
import StartToday from '@/components/home/start-today'
import Testimonials from '@/components/home/testimonials'

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Features />
      <StartToday />
      <Testimonials />
      <Footer />
    </>
  )
}
