import Hero from "../components/Hero";
import Problem from "../components/Problem";
import Solution from "../components/Solution";
import Features from "../components/Features";
import WhyNotERP from "../components/WhyNotERP";
import Pricing from "../components/Pricing";
import HowItWorks from "../components/HowItWorks";
import CTA from "../components/CTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <Problem />
      <Solution />
      <Features />
      <WhyNotERP />
      <Pricing />
      <HowItWorks />
      <CTA />
    </main>
  );
}
