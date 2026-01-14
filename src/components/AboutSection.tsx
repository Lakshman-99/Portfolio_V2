import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Coffee, GitCommit, Server, Terminal, Workflow, Zap } from "lucide-react";
import { ProfileImage } from "./ProfileImage";
import { AnimatedCounter } from "./AnimatedCounter";

const highlights = [
  {
    icon: Code2,
    title: "Full Stack Development",
    description: "Building end-to-end applications with React, Node.js, and modern frameworks.",
    color: "primary",
  },
  {
    icon: Server,
    title: "DevOps Engineering",
    description: "Infrastructure as Code, CI/CD pipelines, and cloud-native solutions.",
    color: "secondary",
  },
  {
    icon: Workflow,
    title: "System Architecture",
    description: "Designing scalable, distributed systems that handle millions of requests.",
    color: "accent",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Squeezing every millisecond through profiling, caching, and smart design.",
    color: "primary",
  },
];

const stats = [
  { 
    icon: Terminal,
    value: 400, 
    suffix: "+", 
    label: "LeetCode Solved", 
  },
  { 
    icon: GitCommit,
    value: 1650, 
    suffix: "+", 
    label: "GitHub Commits", 
  },
  { 
    icon: Code2,
    value: 2737, 
    suffix: "+", 
    label: "Hours of Coding", 
  },
  { 
    icon: Coffee,
    value: 99.9, 
    suffix: "%", 
    label: "Uptime / Focus", 
    decimals: 1 
  },
];

export const AboutSection = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="about" className="py-32 px-6 relative overflow-hidden" ref={containerRef}>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
      
      {/* Parallax decoration */}
      <motion.div
        style={{ y }}
        className="absolute -right-20 top-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 150]) }}
        className="absolute -left-20 bottom-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"
      />
      
      <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="flex justify-center mb-8">
            <ProfileImage className="w-64 h-64" />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 glass rounded-full">
            <span className="font-mono text-sm text-secondary">01.</span>
            <span className="font-mono text-sm text-muted-foreground">about()</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Who I Am</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            I bridge the gap between complex backend architecture and intuitive user experiences. 
            My focus is on engineering production-grade applications that prioritize maintainability, 
            performance, and long-term scalability without compromising on speed of delivery.
          </p>
        </motion.div>

        {/* Highlight Cards */}
        <div className="grid md:grid-cols-2 gap-6">
        {highlights.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="group relative p-8 glass rounded-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-white/5 hover:border-white/10"
          >
            <div 
              className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${
                item.color === "primary" ? "from-primary to-transparent" : 
                item.color === "secondary" ? "from-secondary to-transparent" : 
                "from-accent to-transparent"
              }`} 
            />
            
            <div className="relative z-10">
              {/* Header Row: Icon + Title */}
              <div className="flex items-center gap-4 mb-4">
                <div 
                  className={`flex items-center justify-center shrink-0 w-14 h-14 rounded-xl transition-transform ${
                    item.color === "primary" ? "text-primary" : 
                    item.color === "secondary" ? "text-secondary" : 
                    "text-accent"
                  }`}
                >
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
              </div>

              {/* Description below */}
              <p className="text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center p-6 glass rounded-xl cursor-pointer">
              <div className={`text-3xl md:text-4xl font-bold mb-2 ${index % 2 === 0 ? "gradient-text" : "gradient-text-green"}`}>
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                  duration={2.5}
                />
              </div>

              <div className="flex align-center justify-center text-sm text-muted-foreground font-mono gap-2">
                <stat.icon className="w-5 h-5" />
                <div>{stat.label}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
