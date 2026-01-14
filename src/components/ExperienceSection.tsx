import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Building2, Calendar, ChevronRight, MapPin } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const experiences = [
  {
    company: "Origin AI",
    role: "Software Engineer Co-op",
    period: "July 2025 - Jan. 2026",
    type: "Deploy",
    location: "Rockville, MD",
    team: "Trushield & AI Engine",
    logo: "/logo/originai.png",
    achievements: [
      "Re-architected export engine using Redis/BullMQ, achieving 99.9% reliability",
      "Optimized 4GB+ dataset processing on 128MB memory using Node.js streams",
      "Reduced API execution time from 20 mins to <5s for research team",
      "Developed automated daily export feature to S3 for AI/ML training data",
    ],
    tech: ["Next.js", "AWS", "Redis", "BullMQ", "Node.js"],
  },
  {
    company: "Zoho Corporation",
    role: "Member Technical Staff",
    period: "Jan. 2023 - Aug. 2024",
    type: "Build",
    location: "Chennai, TN",
    team: "ServiceDesk Plus (ITSM SaaS Product)",
    logo: "/logo/zoho2.png",
    achievements: [
      "Led redesign of Asset module User Defined Fields for 1000+ enterprise clients",
      "Cut manual filtering effort by 60% with custom asset-view feature",
      "Automated EOSL tracking for 8K+ assets, eliminating manual entry",
      "Built CLI tool to populate 500+ form fields, saving 30 mins/day per dev",
    ],
    tech: ["Java", "JavaScript", "Python", "SQL", "AJAX"],
  },
  {
    company: "Zoho Corporation",
    role: "Software Developer Intern",
    period: "April 2022 - May 2022",
    type: "Learn",
    location: "Chennai, TN, India",
    team: "Internship Trainee",
    logo: "/logo/zoho2.png",
    achievements: [
      "Honed expertise in Java programming and Object-Oriented Programming (OOP)",
      "Designed and developed a console-based movie reservation system",
      "Integrated JDBC for efficient data storage and retrieval mechanisms",
    ],
    tech: ["Java", "JDBC", "OOP", "MySQL"],
  },
];

export const ExperienceSection = () => {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="experience" className="py-32 px-6 relative overflow-hidden">
      {/* Pipeline Background */}
      <div className="absolute inset-0 bg-grid opacity-10" />
      
      <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 glass rounded-full">
            <span className="font-mono text-sm text-secondary">02.</span>
            <span className="font-mono text-sm text-muted-foreground">experience()</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">The CI/CD Pipeline</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            My career journey visualized as a continuous integration pipeline — 
            each role building upon the last, deploying new skills.
          </p>
        </motion.div>

        {/* Pipeline Visualization */}
        <div className="relative">
          {/* Pipeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px">
            <motion.div
              initial={{ height: 0 }}
              animate={isInView ? { height: "100%" } : {}}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="w-full bg-gradient-to-b from-primary via-secondary to-accent"
            />
          </div>

          {/* Experience Cards */}
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.3 }}
              className={`relative flex items-center mb-16 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Pipeline Node */}
              <div className="absolute left-0 md:left-1/2 -translate-x-1/2 z-20">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-xs font-mono font-bold cursor-pointer ${
                    activeIndex === index
                      ? "bg-primary text-primary-foreground glow-blue"
                      : "bg-card border-2 border-border text-muted-foreground hover:border-primary"
                  }`}
                  onClick={() => setActiveIndex(index)}
                >
                  {exp.type}
                </motion.div>
              </div>

              {/* Card */}
              <div className={`w-full md:w-[calc(50%-3rem)] ${index % 2 === 0 ? "md:pr-0 pl-16 md:pl-0" : "md:pl-0 pl-16 md:pr-0"}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`p-6 glass rounded-xl border border-white/5 transition-all duration-300 hover:border-white/10 ${
                    activeIndex === index ? "glow-blue shadow-lg shadow-primary/5 ring-1 ring-primary/20" : ""
                  }`}
                  onClick={() => setActiveIndex(index)}
                >
                  
                  {/* --- NEW HEADER SECTION --- */}
                  <div className="flex flex-col md:flex-row gap-3 mb-4">
                    {/* Logo Box */}
                    <div className="shrink-0 flex justify-center md:justify-start">
                      <div className="w-20 h-20 md:w-14 md:h-14 rounded-lg p-2 flex items-center justify-center shadow-sm">
                        {exp.logo ? (
                          <img
                            src={exp.logo}
                            alt={exp.company}
                            className="w-14 h-14 md:w-10 md:h-10 bg-white rounded-lg"
                          />
                        ) : (
                          <Building2 className="w-14 h-14 md:w-10 md:h-10 text-primary" />
                        )}
                      </div>
                    </div>

                    {/* Title & Metadata */}
                    <div className="flex-1 min-w-0 text-center md:text-left">
                      <h3 className="text-lg md:text-xl font-bold text-foreground leading-tight mb-1">
                        {exp.role}
                      </h3>

                      <div className="text-primary font-medium mb-2">
                        {exp.company}
                        <span className="text-muted-foreground"> • </span>
                        <span className="text-muted-foreground font-mono text-xs">
                          {exp.team}
                        </span>
                      </div>

                      {/* Date & Location */}
                      <div className="flex flex-col md:flex-row md:justify-between gap-1 text-xs md:text-sm text-muted-foreground font-mono">
                        <div className="flex items-center justify-center md:justify-start gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center justify-center md:justify-start gap-1.5">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Achievements */}
                  <ul className="space-y-2 mb-4">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <ChevronRight className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{achievement}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs font-mono bg-primary/10 text-primary rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};