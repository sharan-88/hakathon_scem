import HeroSection from '@/components/common/HeroSection';
import HowItWorks from '@/components/common/HowItWorks';
import BenefitsSection from '@/components/common/BenefitsSection';
import Footer from '@/components/common/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <HeroSection />
        <HowItWorks />
        <BenefitsSection />
      </main>
      <Footer />
    </div>
  );
}
