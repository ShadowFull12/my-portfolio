import { Background } from "@/components/layout/Background";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Stats } from "@/components/sections/Stats";
import { Skills } from "@/components/sections/Skills";
import { Achievements } from "@/components/sections/Achievements";
import { Projects } from "@/components/sections/Projects";
import { FeatureSpotlight } from "@/components/sections/FeatureSpotlight";
import { Experience } from "@/components/sections/Experience";
import { Socials } from "@/components/sections/Socials";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Background />
      <main className="w-full flex-col flex items-center justify-center">
        <Hero />
        <About />
        <Stats />
        <Skills />
        <Achievements />
        <Projects />
        <FeatureSpotlight />
        <Experience />
        <Socials />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
