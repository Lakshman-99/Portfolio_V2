import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Building2, Calendar, ChevronRight } from "lucide-react";

const experiences = [
  {
    company: "Origin AI",
    role: "Senior Full Stack Developer",
    period: "2023 - Present",
    type: "Deploy",
    description: "Leading development of AI-powered analytics platform",
    achievements: [
      "Architected microservices handling 1M+ daily requests",
      "Reduced API response time by 60% through Redis caching",
      "Implemented real-time data streaming with WebSocket",
    ],
    tech: ["React", "Node.js", "AWS", "Redis", "PostgreSQL"],
  },
  {
    company: "Zoho Corporation",
    role: "DevOps Engineer",
    period: "2021 - 2023",
    type: "Test",
    description: "Building and maintaining cloud infrastructure",
    achievements: [
      "Designed CI/CD pipelines reducing deployment time by 80%",
      "Managed Kubernetes clusters serving 100K+ users",
      "Automated infrastructure with Terraform and Ansible",
    ],
    tech: ["Kubernetes", "Docker", "Terraform", "Jenkins", "AWS"],
  },
  {
    company: "Tech Startup Co-op",
    role: "Full Stack Developer",
    period: "2019 - 2021",
    type: "Build",
    description: "Developing scalable web applications",
    achievements: [
      "Built e-commerce platform processing $2M+ transactions",
      "Implemented OAuth 2.0 authentication system",
      "Optimized database queries improving performance by 40%",
    ],
    tech: ["React", "Python", "Django", "PostgreSQL", "Docker"],
  },
];

export const ExperienceSection = () => {
  const ref = useRef(null);
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
                  className={`p-6 glass rounded-xl transition-all duration-300 ${
                    activeIndex === index ? "glow-blue" : ""
                  }`}
                  onClick={() => setActiveIndex(index)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                      <div className="flex items-center gap-2 text-primary mt-1">
                        <Building2 className="w-4 h-4" />
                        <span className="font-medium">{exp.company}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground text-sm font-mono">
                      <Calendar className="w-4 h-4" />
                      {exp.period}
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4">{exp.description}</p>

                  {/* Achievements */}
                  <ul className="space-y-2 mb-4">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <ChevronRight className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                        <span>{achievement}</span>
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
