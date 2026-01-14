import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, BookOpen, Sparkles, Calendar, MapPin, ChevronRight } from "lucide-react";

const education = [
  {
    degree: "MS in Information Systems",
    institution: "Northeastern University",
    period: "Aug. 2024 - Dec. 2026",
    location: "Boston, MA",
    gpa: "3.9",
    logo: "/logo/neu.png",
    achievements: [
      "Built a strong foundation in application engineering by designing and developing scalable, user-centric web systems",
      "Applied cloud computing and networking concepts to architect reliable, distributed applications",
      "Strengthened problem-solving and algorithmic thinking through advanced coursework in program structures and algorithms"
    ],
  },
  {
    degree: "B.Tech. in Information Technology",
    institution: "St. Joseph's College Of Engineering",
    period: "Aug. 2019 - Apr. 2023",
    location: "Chennai, TN",
    gpa: "3.64",
    logo: "/logo/sjce.png",
    achievements: [
      "Developed a solid computer science foundation across data structures, algorithms, operating systems, DBMS, and computer networks",
      "Built full-stack applications and strengthened object-oriented design and software engineering best practices"
    ],
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
                <div className="flex flex-col md:flex-row gap-3 mb-4">
                  {/* Logo */}
                  <div className="shrink-0 flex justify-center md:justify-start">
                    {edu.logo ? (
                      <img
                        src={edu.logo}
                        alt={edu.institution}
                        className="w-20 h-20 md:w-14 md:h-14 rounded-lg"
                      />
                    ) : (
                      <div className="w-20 h-20 md:w-14 md:h-14 flex items-center justify-center bg-primary/20 rounded-lg group-hover:glow-blue transition-all duration-300">
                        <BookOpen className="w-8 h-8 md:w-6 md:h-6 text-primary" />
                      </div>
                    )}
                  </div>

                  {/* Title & Metadata */}
                  <div className="flex-1 min-w-0 text-center md:text-left">
                    <h3 className="text-lg md:text-xl font-bold text-foreground leading-tight mb-1">
                      {edu.degree}
                    </h3>

                    <div className="text-primary font-medium mb-2">
                      {edu.institution}
                      <span className="text-muted-foreground"> • </span>
                      <span className="text-muted-foreground font-mono text-sm">
                        GPA: {edu.gpa}
                      </span>
                    </div>

                    {/* Date & Location */}
                    <div className="flex flex-col md:flex-row md:justify-between gap-1 text-xs md:text-sm text-muted-foreground font-mono">
                      <div className="flex items-center justify-center md:justify-start gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{edu.period}</span>
                      </div>
                      <div className="flex items-center justify-center md:justify-start gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{edu.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Achievements */}
                <ul className="space-y-2 mb-4">
                  {edu.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <ChevronRight className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{achievement}</span>
                    </li>
                  ))}
                </ul>
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
                Always learning, always growing. Currently focused on building 
                <span className="text-primary"> resilient, production-grade systems </span> 
                with an emphasis on scalability, reliability, and developer experience.
              </p>
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span className="text-muted-foreground text-sm">
                    Designing fault-tolerant architectures (health checks, retries, graceful failures)
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                  <span className="text-muted-foreground text-sm">
                    Implementing CI/CD pipelines, containerization, and deployment orchestration
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  <span className="text-muted-foreground text-sm">
                    Building platform primitives: logging, monitoring, config management, and rollbacks
                  </span>
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
