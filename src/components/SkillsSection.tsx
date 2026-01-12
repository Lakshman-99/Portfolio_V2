import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

interface Skill {
  name: string;
  category: "frontend" | "backend" | "devops" | "tools";
  level: number;
}

const skills: Skill[] = [
  // Frontend
  { name: "React", category: "frontend", level: 95 },
  { name: "TypeScript", category: "frontend", level: 90 },
  { name: "Next.js", category: "frontend", level: 85 },
  { name: "Tailwind CSS", category: "frontend", level: 90 },
  { name: "Framer Motion", category: "frontend", level: 80 },
  
  // Backend
  { name: "Node.js", category: "backend", level: 90 },
  { name: "Python", category: "backend", level: 85 },
  { name: "Go", category: "backend", level: 70 },
  { name: "PostgreSQL", category: "backend", level: 85 },
  { name: "Redis", category: "backend", level: 80 },
  { name: "GraphQL", category: "backend", level: 75 },
  
  // DevOps
  { name: "Kubernetes", category: "devops", level: 85 },
  { name: "Docker", category: "devops", level: 90 },
  { name: "AWS", category: "devops", level: 90 },
  { name: "Terraform", category: "devops", level: 85 },
  { name: "CI/CD", category: "devops", level: 90 },
  
  // Tools
  { name: "Git", category: "tools", level: 95 },
  { name: "Linux", category: "tools", level: 85 },
  { name: "Prometheus", category: "tools", level: 75 },
  { name: "Grafana", category: "tools", level: 80 },
];

const categoryColors = {
  frontend: "primary",
  backend: "secondary",
  devops: "accent",
  tools: "primary",
};

const categoryLabels = {
  frontend: "Frontend",
  backend: "Backend",
  devops: "DevOps",
  tools: "Tools",
};

export const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const categories = ["frontend", "backend", "devops", "tools"] as const;

  return (
    <section id="skills" className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/10 to-background" />
      
      <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 glass rounded-full">
            <span className="font-mono text-sm text-secondary">05.</span>
            <span className="font-mono text-sm text-muted-foreground">skills()</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">The Tech Cluster</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            An interactive constellation of technologies — click and drag to explore.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 font-mono text-sm rounded-lg transition-all duration-300 ${
              activeCategory === null
                ? "bg-primary text-primary-foreground glow-blue"
                : "glass text-muted-foreground hover:text-foreground"
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 font-mono text-sm rounded-lg transition-all duration-300 ${
                activeCategory === category
                  ? category === "frontend" || category === "tools"
                    ? "bg-primary text-primary-foreground glow-blue"
                    : category === "backend"
                    ? "bg-secondary text-secondary-foreground glow-green"
                    : "bg-accent text-accent-foreground glow-purple"
                  : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              {categoryLabels[category]}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {skills
            .filter((skill) => !activeCategory || skill.category === activeCategory)
            .map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.1, zIndex: 10 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setHoveredSkill(skill.name)}
                onHoverEnd={() => setHoveredSkill(null)}
                className={`relative p-4 glass rounded-xl cursor-pointer transition-all duration-300 ${
                  hoveredSkill === skill.name
                    ? skill.category === "frontend" || skill.category === "tools"
                      ? "glow-blue"
                      : skill.category === "backend"
                      ? "glow-green"
                      : "glow-purple"
                    : ""
                }`}
              >
                {/* Skill Level Indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted rounded-b-xl overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1, delay: index * 0.05 + 0.3 }}
                    className={`h-full ${
                      skill.category === "frontend" || skill.category === "tools"
                        ? "bg-primary"
                        : skill.category === "backend"
                        ? "bg-secondary"
                        : "bg-accent"
                    }`}
                  />
                </div>

                {/* Content */}
                <div className="text-center">
                  <span
                    className={`font-mono text-sm font-medium ${
                      skill.category === "frontend" || skill.category === "tools"
                        ? "text-primary"
                        : skill.category === "backend"
                        ? "text-secondary"
                        : "text-accent"
                    }`}
                  >
                    {skill.name}
                  </span>
                  
                  {/* Show level on hover */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: hoveredSkill === skill.name ? 1 : 0,
                      height: hoveredSkill === skill.name ? "auto" : 0,
                    }}
                    className="mt-2 text-xs text-muted-foreground font-mono overflow-hidden"
                  >
                    {skill.level}%
                  </motion.div>
                </div>
              </motion.div>
            ))}
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-12 flex flex-wrap justify-center gap-6 text-sm"
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-muted-foreground">Frontend</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-secondary" />
            <span className="text-muted-foreground">Backend</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent" />
            <span className="text-muted-foreground">DevOps</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
