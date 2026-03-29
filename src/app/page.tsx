import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import HowItWorks from '@/components/HowItWorks';
import StatsBar from '@/components/StatsBar';
import AboutModel from '@/components/AboutModel';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <StatsBar />
      <AboutModel />
      <Footer />
    </main>
  );
}
