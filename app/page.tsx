import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { ExperienceGrid } from "@/components/ExperienceGrid";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProjectCatalogue } from "@/components/ProjectCatalogue";
import { ScrollRevealObserver } from "@/components/ScrollRevealObserver";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <>
      <ScrollRevealObserver />
      <Header />
      <main id="main-content">
        <Hero />
        <ExperienceGrid />
        <ProjectCatalogue projects={projects} />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
