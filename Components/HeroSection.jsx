import api from "../api/axios"
import HeroSlider from "./HeroSlider"

export default async function Hero() {
  let banners = []
  try {
    const res = await api.get('/home/dashboard')
    banners = res?.data?.homestoresliderBanner || []

  } catch (error) {
    console.error("Failed to fetch hero banners:", error)
  }

  return (
    <section className="hero relative w-full overflow-hidden">
      <HeroSlider banners={banners} />
    </section>
  )
}