import { Hero } from "./sections/Hero";
import { Features } from "./sections/Features";
import { Packages } from "./sections/Packages";
import { Steps } from "./sections/Steps";
import { Coverage } from "./sections/Coverage";
import { Testimonials } from "./sections/Testimonials";
import { Faq } from "./sections/Faq";
import { CtaBand } from "./sections/CtaBand";

export function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Packages />
      <Steps />
      <Coverage />
      <Testimonials />
      <Faq />
      <CtaBand />
    </>
  );
}
