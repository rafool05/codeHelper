import Navbar from './Navbar.tsx';
import HeroSection from './HeroSection.tsx';
import DirectionSection from './DirectionSection.tsx';
import FeaturesSection from './FeatureSection.tsx';
import TechStackSection from './TechStackSection.tsx';
import AboutMeSection from './AboutMeSection.tsx';
import Footer from './Footer.tsx';

export default function Landing() {
  return (
    <div className="bg-primary-900 min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <DirectionSection />
        <FeaturesSection />
        <TechStackSection />
        <AboutMeSection />
      </main>
      <Footer />
    </div>
  );
}
