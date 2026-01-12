import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, BookOpen, Sparkles } from "lucide-react";

const education = [
  {
    degree: "Master of Science in Computer Science",
    institution: "University of Technology",
    period: "2019 - 2021",
    description: "Specialized in Distributed Systems and Cloud Computing",
    achievements: ["Thesis: 'Scalable Microservices Architecture'", "GPA: 3.9/4.0"],
  },
  {
    degree: "Bachelor of Engineering in Software",
    institution: "State Technical University",
    period: "2015 - 2019",
    description: "Core focus on Software Engineering and System Design",
    achievements: ["Dean's List - All Semesters", "Best Capstone Project Award"],
  },
];

export const EducationSection = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="education" className="py-32 px-6 relative overflow-hidden" ref={containerRef}>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/10 to-background" />
      
      {/* Parallax elements */}
      <motion.div
        style={{ y }}
        className="absolute right-10 top-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"
      />
      
      <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 glass rounded-full">
            <span className="font-mono text-sm text-secondary">03.</span>
            <span className="font-mono text-sm text-muted-foreground">education()</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text-green">Knowledge Base</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Foundation built on solid academic principles and continuous learning.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education Cards */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <GraduationCap className="w-6 h-6 text-primary" />
              <span className="gradient-text">Academic Background</span>
            </h3>
            
            {education.map((edu, index) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="p-6 glass rounded-xl group hover:scale-[1.02] transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/20 rounded-lg shrink-0 group-hover:glow-blue transition-all duration-300">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-foreground mb-1">{edu.degree}</h4>
                    <p className="text-primary font-medium mb-1">{edu.institution}</p>
                    <p className="text-sm text-muted-foreground font-mono mb-3">{edu.period}</p>
                    <p className="text-muted-foreground mb-3">{edu.description}</p>
                    <ul className="space-y-1">
                      {edu.achievements.map((achievement, i) => (
                        <li key={i} className="text-sm text-secondary flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Continuous Learning */}
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-secondary" />
              <span className="gradient-text-green">Always Learning</span>
            </h3>

            {/* Learning Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="p-6 glass rounded-xl border border-secondary/30"
            >
              <p className="text-sm text-muted-foreground font-mono mb-2">
                <span className="text-secondary">$</span> cat continuous_learning.txt
              </p>
              <p className="text-foreground mb-4">
                Always learning, always growing. Currently exploring: 
                <span className="text-primary"> WebAssembly</span>, 
                <span className="text-secondary"> Rust</span>, and 
                <span className="text-accent"> AI/ML Integration</span>.
              </p>
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span className="text-muted-foreground text-sm">Reading technical papers on distributed systems</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                  <span className="text-muted-foreground text-sm">Contributing to open source projects</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  <span className="text-muted-foreground text-sm">Building side projects with new technologies</span>
                </div>
              </div>
            </motion.div>

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-6 p-6 glass rounded-xl"
            >
              <p className="text-lg text-foreground italic">
                "The only way to do great work is to love what you do."
              </p>
              <p className="text-sm text-muted-foreground mt-2">— Steve Jobs</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
