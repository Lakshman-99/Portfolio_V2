import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Terminal, Server, Cloud, Code2 } from "lucide-react";
import { Scene3D } from "./Scene3D";

import { useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export const HeroSection = () => {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const scrollToAbout = () => {
    const lenis = (window as any).lenis;
    const aboutSection = document.getElementById("about");
    if (lenis && aboutSection) {
      lenis.scrollTo(aboutSection);
    } else {
      aboutSection?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Scene Background */}
      <Scene3D />
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

      <motion.div 
        style={{ y, opacity, scale }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >


        {/* Terminal-style intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`inline-flex items-center gap-2 px-4 py-2 mb-8 glass rounded-full ${isMobile && "mt-10"}`}
        >
          <Terminal className="w-4 h-4 text-secondary" />
          <span className="font-mono text-sm text-muted-foreground">
            <span className="text-secondary">$</span> initializing portfolio
            <span className="cursor-blink text-primary">_</span>
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
        >
          <span className="text-foreground">Building</span>
          <br />
          <span className="gradient-text">Scalable Systems</span>
          <br />
          <span className="text-foreground">&</span>{" "}
          <span className="gradient-text-green">Fluid Experiences</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto"
        >
          Software Engineer crafting high-performance 
          distributed systems and seamless user interfaces.
        </motion.p>

        {/* Floating Tech Icons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center gap-8 mb-16"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0 }}
            className="p-4 glass rounded-xl glow-blue"
          >
            <Server className="w-8 h-8 text-primary" />
          </motion.div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            className="p-4 glass rounded-xl glow-green"
          >
            <Terminal className="w-8 h-8 text-secondary" />
          </motion.div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            className="p-4 glass rounded-xl glow-purple"
          >
            <Cloud className="w-8 h-8 text-accent" />
          </motion.div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            className="p-4 glass rounded-xl glow-blue"
          >
            <Code2 className="w-8 h-8 text-primary" />
          </motion.div>
        </motion.div>

        {/* Deploy Button */}
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          onClick={scrollToAbout}
          className="group relative px-8 py-4 font-mono text-lg font-semibold text-primary-foreground bg-primary rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 glow-blue"
        >
          <span className="relative z-10 flex items-center gap-2">
            <span className="text-secondary">&gt;</span> DEPLOY
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
};
