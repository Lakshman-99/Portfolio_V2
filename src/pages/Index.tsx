import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { EducationSection } from "@/components/EducationSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { SkillsSection } from "@/components/SkillsSection";
import { PhilosophySection } from "@/components/PhilosophySection";
import { TerminalSection } from "@/components/TerminalSection";
import { Footer } from "@/components/Footer";
import { useLenis } from "@/hooks/useLenis";

const Index = () => {
  // Initialize smooth scrolling
  useLenis();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <EducationSection />
        <ProjectsSection />
        <SkillsSection />
        <PhilosophySection />
        <TerminalSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
