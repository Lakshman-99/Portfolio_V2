import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, Layers, Cpu, Database, Cloud, ArrowRight, Rocket } from "lucide-react";
import { AnimatedCounter } from "./AnimatedCounter";

const projects = [
  {
    title: "Distributed Task Engine",
    description: "High-performance data export engine using Redis and BullMQ. Re-architected from serverless to event-driven for 100% reliability.",
    longDescription: "When Lambda memory limits hit a wall with 1GB+ datasets, I re-engineered it. Built a distributed queue system to decouple processing from ingestion. Result? Zero timeout crashes.",
    tech: ["Redis", "BullMQ", "Node.js", "AWS", "TypeScript"],
    icon: Cpu,
    color: "primary",
    stats: { value: 100, suffix: "%", label: "Reliability" },
    github: "#",
    demo: "#",
  },
  {
    title: "Cloud Infrastructure Platform",
    description: "Multi-tenant Kubernetes platform with automated scaling, monitoring, and self-healing capabilities.",
    longDescription: "Designed and implemented a complete platform engineering solution. Includes GitOps workflows, service mesh, and observability stack.",
    tech: ["Kubernetes", "Terraform", "ArgoCD", "Prometheus", "Grafana"],
    icon: Cloud,
    color: "secondary",
    stats: { value: 10, suffix: "x", label: "Faster Deployments" },
    github: "#",
    demo: "#",
  },
  {
    title: "Real-time Analytics Dashboard",
    description: "Live data visualization platform processing millions of events with sub-second latency.",
    longDescription: "Built with React and WebSocket connections to Kafka streams. Features custom charting library optimized for high-frequency updates.",
    tech: ["React", "Kafka", "WebSocket", "D3.js", "PostgreSQL"],
    icon: Database,
    color: "accent",
    stats: { value: 100, suffix: "ms", label: "Latency", prefix: "<" },
    github: "#",
    demo: "#",
  },
  {
    title: "Microservices Orchestrator",
    description: "Service mesh implementation with intelligent routing, circuit breaking, and distributed tracing.",
    longDescription: "Complete observability solution with automatic service discovery, load balancing, and fault tolerance. Reduced debugging time by 70%.",
    tech: ["Istio", "Envoy", "Jaeger", "OpenTelemetry", "Go"],
    icon: Layers,
    color: "primary",
    stats: { value: 99.99, suffix: "%", label: "Uptime", decimals: 2 },
    github: "#",
    demo: "#",
  },
];

export const ProjectsSection = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="projects" className="py-32 px-6 relative overflow-hidden" ref={containerRef}>
      <div className="absolute inset-0 bg-grid opacity-10" />
      
      {/* Parallax decorations */}
      <motion.div
        style={{ y }}
        className="absolute -left-32 top-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
        className="absolute -right-32 bottom-1/3 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
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
            <span className="font-mono text-sm text-secondary">04.</span>
            <span className="font-mono text-sm text-muted-foreground">projects()</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Containerized Artifacts</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Production-grade systems built with scalability, reliability, and performance in mind.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative"
            >
              {/* Card */}
              <motion.div
                animate={{
                  rotateX: hoveredIndex === index ? 5 : 0,
                  rotateY: hoveredIndex === index ? -5 : 0,
                  z: hoveredIndex === index ? 50 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ transformStyle: "preserve-3d" }}
                className={`relative p-8 glass rounded-xl overflow-hidden transition-all duration-500 ${
                  hoveredIndex === index ? 
                    project.color === "primary" ? "glow-blue" : 
                    project.color === "secondary" ? "glow-green" : "glow-purple"
                  : ""
                }`}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-grid" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div 
                      className={`p-4 rounded-xl ${
                        project.color === "primary" ? "bg-primary/20" : 
                        project.color === "secondary" ? "bg-secondary/20" : 
                        "bg-accent/20"
                      }`}
                    >
                      <project.icon 
                        className={`w-8 h-8 ${
                          project.color === "primary" ? "text-primary" : 
                          project.color === "secondary" ? "text-secondary" : 
                          "text-accent"
                        }`} 
                      />
                    </div>
                    <div className="flex gap-3">
                      <motion.a
                        href={project.github}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 glass rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Github className="w-5 h-5" />
                      </motion.a>
                      <motion.a
                        href={project.demo}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 glass rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </motion.a>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-bold text-foreground mb-3">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  
                  {/* Expanded Description on Hover */}
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: hoveredIndex === index ? "auto" : 0,
                      opacity: hoveredIndex === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm text-muted-foreground mb-4 border-l-2 border-primary pl-4">
                      {project.longDescription}
                    </p>
                  </motion.div>

                  {/* Stats Badge with Counter */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-card rounded-full mb-6">
                    <span className={`text-lg font-bold ${
                      project.color === "primary" ? "gradient-text" : 
                      project.color === "secondary" ? "gradient-text-green" : 
                      "text-accent"
                    }`}>
                      {project.stats.prefix || ""}
                      <AnimatedCounter
                        value={project.stats.value}
                        suffix={project.stats.suffix}
                        decimals={project.stats.decimals}
                        duration={2}
                      />
                    </span>
                    <span className="text-sm text-muted-foreground">{project.stats.label}</span>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className={`px-2 py-1 text-xs font-mono rounded ${
                          project.color === "primary" ? "bg-primary/10 text-primary" : 
                          project.color === "secondary" ? "bg-secondary/10 text-secondary" : 
                          "bg-accent/10 text-accent"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* View Project Link */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ 
                      opacity: hoveredIndex === index ? 1 : 0,
                      x: hoveredIndex === index ? 0 : -10
                    }}
                    className="mt-6 flex items-center gap-2 text-sm font-medium text-primary"
                  >
                    <Rocket className="w-4 h-4" />
                    <span>View Project</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
