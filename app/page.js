import Hero from '../Components/HeroSection';
import CategorySection from '../Components/CategorySection';
import OfferBanner from '../Components/OfferBanner';
import Celebratesection from '../Components/Celebratesection';
import WhatsAppButton from '../Components/WhatsAppButton';

export default function Home() {
  return (
    <>
      <Hero />
      <CategorySection />
      <OfferBanner />
      <Celebratesection />
      <WhatsAppButton />
    </>
  );
}
