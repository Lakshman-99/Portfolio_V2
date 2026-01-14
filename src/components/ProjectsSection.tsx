import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { ArrowRight, Rocket } from "lucide-react";
import { AnimatedCounter } from "./AnimatedCounter";

interface Project {
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  imgPath: string;
  color: string;
  stats: {
    value: number;
    suffix: string;
    label: string;
    prefix?: string;
    decimals?: number;
  };
  github: string;
  demo: string;
  isFeatured: boolean;
}

const projects: Project[] = [
  {
    title: "NextPath: Graph Algo Visualizer",
    description: "Interactive graph algorithm visualizer for BFS, DFS, Dijkstra, and A*. Features dynamic graph building and step-by-step animations.",
    longDescription: "Improved rendering performance by 70% using Zustand. Built with Next.js and React Flow to demonstrate complex algorithms intuitively.",
    tech: ["Next.js", "React Flow", "Tailwind", "Zustand"],
    imgPath: "/Projects/nextpath.gif",
    color: "primary",
    stats: { value: 70, suffix: "%", label: "Perf Boost" },
    github: "https://github.com/Lakshman-99/nextpath",
    demo: "https://nextpath.lakshman.me",
    isFeatured: true,
  },
  {
    title: "Cloud Native Express App",
    description: "Microservices architecture on AWS & GCP with automated CI/CD and infrastructure as code.",
    longDescription: "Achieved 99.9% uptime with auto-scaling. Reduced deployment time by 25% using Terraform and GitHub Actions.",
    tech: ["AWS", "GCP", "Terraform", "Docker", "Node.js"],
    imgPath: "/Projects/cloud.jpg",
    color: "secondary",
    stats: { value: 99.9, suffix: "%", label: "Uptime" },
    github: "https://github.com/Lakshman-99/CloudNativeApp",
    demo: "",
    isFeatured: true,
  },
  {
    title: "DataFyre",
    description: "Enterprise synthetic data generation platform with role-based access and real-time dashboards.",
    longDescription: "Scalable MERN stack application. Integrated Bull for background task management to streamline data processing.",
    tech: ["React", "Node.js", "Redux", "BullMQ", "MongoDB"],
    imgPath: "/Projects/datafyre.jpg",
    color: "accent",
    stats: { value: 100, suffix: "%", label: "Dynamic" },
    github: "https://github.com/Lakshman-99/DataFyre",
    demo: "",
    isFeatured: false,
  },
  {
    title: "Inkredible",
    description: "Real-time handwritten text recognition system using CRNN and CTC for 79+ characters.",
    longDescription: "Features OCR, text-to-speech, and language translation. High accuracy for multilingual applications and math expressions.",
    tech: ["Python", "PyTorch", "OpenCV", "Deep Learning"],
    imgPath: "/Projects/inkredible.jpg",
    color: "primary",
    stats: { value: 79, suffix: "+", label: "Chars" },
    github: "https://github.com/Lakshman-99/inkredible",
    demo: "",
    isFeatured: true,
  },
  {
    title: "Space Debris Tracking",
    description: "Comprehensive system to track and manage space debris with real-time monitoring and predictive analytics.",
    longDescription: "Role-based dashboards and interactive tracking maps to mitigate collision risks in space. Built with Java Swing and SQLite.",
    tech: ["Java", "Swing", "SQLite", "JXMapViewer"],
    imgPath: "/Projects/space.jpg",
    color: "secondary",
    stats: { value: 100, suffix: "%", label: "Real-time" },
    github: "https://github.com/Wednesday_Group_18_FinalProject",
    demo: "",
    isFeatured: false,
  },
  {
    title: "Skill/Job Recommender",
    description: "Web application simplifying job searches based on user skills using IBM Watson and Cloudant.",
    longDescription: "Utilized IBM Watson STT/Assistant for enhanced user experience and end-to-end encryption for security.",
    tech: ["Flask", "IBM Watson", "Cloudant", "HTML/CSS"],
    imgPath: "/Projects/job.png",
    color: "accent",
    stats: { value: 95, suffix: "%", label: "Match Rate" },
    github: "",
    demo: "",
    isFeatured: false,
  },
  {
    title: "Sudo Wifi Authenticator",
    description: "Linux-based security application using pycrack-ng to prevent MITM attacks on home WiFi networks.",
    longDescription: "Notifies super users of new connections for approval, ensuring complete network access control.",
    tech: ["Python", "Flask", "Linux", "pycrack-ng"],
    imgPath: "/Projects/sudo.png",
    color: "primary",
    stats: { value: 100, suffix: "%", label: "Secure" },
    github: "https://github.com/Lakshman-99/Sudo-Wifi-Auth",
    demo: "",
    isFeatured: false,
  },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity:1, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex-shrink-0 w-[340px] sm:w-[400px] lg:w-[450px] group py-6"
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
        className={`relative p-6 glass rounded-xl overflow-hidden transition-all duration-500 h-full ${
          isHovered
            ? project.color === "primary"
              ? "glow-blue"
              : project.color === "secondary"
              ? "glow-green"
              : "glow-purple"
            : ""
        }`}
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-grid" />
        </div>

        <div className="relative z-10">
          <div className="w-full h-44 mb-5 rounded-lg overflow-hidden relative">
            <div
              className={`absolute inset-0 bg-gradient-to-br ${
                project.color === "primary"
                  ? "from-primary/20 to-transparent"
                  : project.color === "secondary"
                  ? "from-secondary/20 to-transparent"
                  : "from-accent/20 to-transparent"
              }`}
            />
            <img
              src={project.imgPath}
              alt={project.title}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{project.description}</p>

          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: isHovered ? "auto" : 0,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-xs text-muted-foreground mb-3 border-l-2 border-primary pl-3">
              {project.longDescription}
            </p>
          </motion.div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-card rounded-full mb-4">
            <span
              className={`text-base font-bold ${
                project.color === "primary"
                  ? "gradient-text"
                  : project.color === "secondary"
                  ? "gradient-text-green"
                  : "text-accent"
              }`}
            >
              {project.stats.prefix || ""}
              <AnimatedCounter
                value={project.stats.value}
                suffix={project.stats.suffix}
                decimals={project.stats.decimals}
                duration={2}
              />
            </span>
            <span className="text-xs text-muted-foreground">{project.stats.label}</span>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className={`px-2 py-0.5 text-xs font-mono rounded ${
                  project.color === "primary"
                    ? "bg-primary/10 text-primary"
                    : project.color === "secondary"
                    ? "bg-secondary/10 text-secondary"
                    : "bg-accent/10 text-accent"
                }`}
              >
                {tech}
              </span>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              x: isHovered ? 0 : -10,
            }}
            className="flex items-center gap-2 text-sm font-medium text-primary cursor-pointer"
            onClick={() => window.open(project.demo || project.github, "_blank")}
          >
            <Rocket className="w-4 h-4" />
            <span>View Project</span>
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Mobile Project Card
const MobileProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full group"
    >
      <div
        className={`relative p-5 glass rounded-xl overflow-hidden transition-all duration-500 ${
          isHovered
            ? project.color === "primary"
              ? "glow-blue"
              : project.color === "secondary"
              ? "glow-green"
              : "glow-purple"
            : ""
        }`}
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-grid" />
        </div>

        <div className="relative z-10">
          <div className="w-full h-40 mb-4 rounded-lg overflow-hidden relative">
            <div
              className={`absolute inset-0 bg-gradient-to-br ${
                project.color === "primary"
                  ? "from-primary/20 to-transparent"
                  : project.color === "secondary"
                  ? "from-secondary/20 to-transparent"
                  : "from-accent/20 to-transparent"
              }`}
            />
            <img
              src={project.imgPath}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          <h3 className="text-lg font-bold text-foreground mb-2">{project.title}</h3>
          <p className="text-sm text-muted-foreground mb-3">{project.description}</p>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-card rounded-full mb-4">
            <span
              className={`text-base font-bold ${
                project.color === "primary"
                  ? "gradient-text"
                  : project.color === "secondary"
                  ? "gradient-text-green"
                  : "text-accent"
              }`}
            >
              {project.stats.prefix || ""}
              <AnimatedCounter
                value={project.stats.value}
                suffix={project.stats.suffix}
                decimals={project.stats.decimals}
                duration={2}
              />
            </span>
            <span className="text-xs text-muted-foreground">{project.stats.label}</span>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className={`px-2 py-0.5 text-xs font-mono rounded ${
                  project.color === "primary"
                    ? "bg-primary/10 text-primary"
                    : project.color === "secondary"
                    ? "bg-secondary/10 text-secondary"
                    : "bg-accent/10 text-accent"
                }`}
              >
                {tech}
              </span>
            ))}
          </div>

          <div
            className="flex items-center gap-2 text-sm font-medium text-primary cursor-pointer"
            onClick={() => window.open(project.demo || project.github, "_blank")}
          >
            <Rocket className="w-4 h-4" />
            <span>View Project</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const ProjectsSection = () => {
  const ref = useRef(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isMobile, setIsMobile] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [progress, setProgress] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [currentProject, setCurrentProject] = useState(1);
  
  // Smoothing for buttery animations
  const targetX = useRef(0);
  const currentX = useRef(0);
  const animationFrame = useRef<number>();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Calculate max scroll distance
  useEffect(() => {
    if (trackRef.current && cardsContainerRef.current) {
      const trackWidth = trackRef.current.scrollWidth;
      const containerWidth = cardsContainerRef.current.clientWidth;
      // Add some padding so last card is centered
      setMaxScroll(Math.max(0, trackWidth - containerWidth));
    }
  }, [isMobile]);

  // Smooth animation loop
  useEffect(() => {
    const animate = () => {
      const diff = targetX.current - currentX.current;
      // Smooth lerp factor - higher = snappier, lower = smoother
      currentX.current += diff * 0.12;
      
      // Only update state when there's meaningful change
      if (Math.abs(diff) > 0.5) {
        setTranslateX(currentX.current);
      }
      
      animationFrame.current = requestAnimationFrame(animate);
    };
    
    animationFrame.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, []);

  // Handle wheel events
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (isMobile || !sectionRef.current || !cardsContainerRef.current) return;

      const section = sectionRef.current;
      const cardsContainer = cardsContainerRef.current;
      const rect = section.getBoundingClientRect();
      const cardsRect = cardsContainer.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Scroll direction
      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;

      // Check if cards container is properly visible
      // Cards should be fully in view before locking
      const cardsFullyVisible = cardsRect.top >= 50 && cardsRect.top <= viewportHeight * 0.35;
      
      // Check if we're at scroll boundaries
      const atStart = targetX.current <= 0;
      const atEnd = targetX.current >= maxScroll;

      // Determine if we should lock scroll
      const shouldLock = 
        cardsFullyVisible && 
        maxScroll > 0 &&
        ((scrollingDown && !atEnd) || (scrollingUp && !atStart));

      // Also lock if we're already in the middle of horizontal scrolling
      const midScroll = targetX.current > 0 && targetX.current < maxScroll;

      if (shouldLock || midScroll) {
        e.preventDefault();
        e.stopPropagation();
        
        if (!isLocked) {
          setIsLocked(true);
          const lenis = (window as any).lenis;
          if (lenis) lenis.stop();
        }

        // Update target position with momentum
        const sensitivity = 1.2;
        const delta = e.deltaY * sensitivity;
        
        targetX.current = Math.max(0, Math.min(maxScroll, targetX.current + delta));
        
        // Update progress
        const newProgress = maxScroll > 0 ? targetX.current / maxScroll : 0;
        setProgress(newProgress);
        
        // Calculate current project number
        const cardWidth = 450 + 32; // card width + gap
        const projectNum = Math.min(
          projects.length,
          Math.floor(targetX.current / cardWidth) + 1
        );
        setCurrentProject(projectNum);

        // Release lock at boundaries
        if ((atEnd && scrollingDown) || (atStart && scrollingUp)) {
          setIsLocked(false);
          const lenis = (window as any).lenis;
          if (lenis) lenis.start();
        }
      } else {
        // Release lock if we've scrolled past the section
        if (isLocked) {
          setIsLocked(false);
          const lenis = (window as any).lenis;
          if (lenis) lenis.start();
        }
      }
    },
    [isMobile, maxScroll, isLocked]
  );

  // Attach wheel event listener
  useEffect(() => {
    if (isMobile) return;
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [handleWheel, isMobile]);

  // Handle scroll position when entering from different directions
  useEffect(() => {
    if (isMobile) return;

    const handleScroll = () => {
      if (!sectionRef.current || isLocked) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // If section is below viewport, reset to start
      if (rect.top > viewportHeight) {
        targetX.current = 0;
        currentX.current = 0;
        setTranslateX(0);
        setProgress(0);
        setCurrentProject(1);
      }
      
      // If section is above viewport (scrolled past), set to end
      if (rect.bottom < 0) {
        targetX.current = maxScroll;
        currentX.current = maxScroll;
        setTranslateX(maxScroll);
        setProgress(1);
        setCurrentProject(projects.length);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile, maxScroll, isLocked]);

  // Cleanup
  useEffect(() => {
    return () => {
      const lenis = (window as any).lenis;
      if (lenis) lenis.start();
    };
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-32 px-6 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid opacity-10" />

      {/* Parallax decorations */}
      <motion.div
        animate={{ y: isLocked ? -50 : 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="absolute -left-32 top-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: isLocked ? 50 : 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="absolute -right-32 bottom-1/3 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
      />

      <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
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

        {/* Mobile Layout */}
        {isMobile && (
          <div className="flex flex-col gap-6">
            {projects.map((project, index) => (
              <MobileProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        )}

        {/* Desktop Layout - Horizontal Scroll */}
        {!isMobile && (
          <>
            {/* Cards container with padding for glow effects */}
            <div 
              ref={cardsContainerRef}
              className="relative"
            >
              {/* Extra padding wrapper for glow breathing room */}
              <div className="px-8">
                <motion.div
                  ref={trackRef}
                  className="flex gap-8"
                  style={{ 
                    transform: `translateX(${-translateX}px)`,
                  }}
                >
                  {projects.map((project, index) => (
                    <ProjectCard key={project.title} project={project} index={index} />
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="mt-12 max-w-lg mx-auto w-full">
              <div className="h-1.5 bg-muted/20 rounded-full overflow-hidden backdrop-blur-sm">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full"
                  style={{ width: `${progress * 100}%` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              </div>
              <div className="flex justify-between mt-3 text-sm text-muted-foreground font-mono">
                <span className="text-primary">{currentProject.toString().padStart(2, "0")}</span>
                <span className="text-xs opacity-60">/ {projects.length.toString().padStart(2, "0")}</span>
              </div>
            </div>

            {/* Scroll hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isInView ? 1 : 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex justify-center mt-8"
            >
              <motion.div
                animate={{ 
                  y: isLocked ? 0 : [0, 8, 0],
                  x: isLocked ? [0, 8, 0] : 0
                }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="flex items-center gap-3 text-muted-foreground/60"
              >
                <motion.div
                  animate={{ rotate: isLocked ? 90 : 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 5v14M5 12l7 7 7-7" />
                  </svg>
                </motion.div>
                <span className="text-xs font-mono">
                  {isLocked ? "exploring projects..." : "scroll to explore"}
                </span>
              </motion.div>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};