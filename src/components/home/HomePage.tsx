import { BenefitsSection } from "./sections/BenefitsSection";
import { DesktopStickyCta } from "./DesktopStickyCta";
import { EcosystemSection } from "./sections/EcosystemSection";
import { FeatureSpotlightSection } from "./sections/FeatureSpotlightSection";
import { FooterSection } from "./sections/FooterSection";
import { HeroSection } from "./sections/HeroSection";
import { ImpactPipelineSection } from "./sections/ImpactPipelineSection";
import { ImpactSandboxSection } from "./sections/ImpactSandboxSection";
import { MobileStickyCta } from "./MobileStickyCta";
import { PricingSection } from "./sections/PricingSection";
import { ProblemSection } from "./sections/ProblemSection";
import { ProcessSection } from "./sections/ProcessSection";
import { ProductTheatreSection } from "./sections/ProductTheatreSection";
import { SectorsSection } from "./sections/SectorsSection";
import { TestimonialSection } from "./sections/TestimonialSection";
import { TrustSection } from "./sections/TrustSection";
import { TrustStripSection } from "./sections/TrustStripSection";

/** Canonical homepage — single route `/`, product-forward editorial arc. */
export const HomePage = () => (
  <>
    <main className="lr-page lr-v4">
      <HeroSection />
      <TrustStripSection />
      <ProblemSection />
      <BenefitsSection />
      <ProductTheatreSection />
      <FeatureSpotlightSection />
      <ImpactPipelineSection />
      <TrustSection />
      <EcosystemSection />
      <ImpactSandboxSection />
      <SectorsSection />
      <TestimonialSection />
      <ProcessSection />
      <PricingSection />
      <FooterSection />
    </main>
    <DesktopStickyCta />
    <MobileStickyCta />
  </>
);
