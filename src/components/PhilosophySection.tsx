import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Quote, Cpu, GitBranch, Layers } from "lucide-react";

const philosophies = [
  {
    quote: "Code is poetry, infrastructure is the stage, and performance is the applause.",
    icon: Cpu,
  },
  {
    quote: "Automate everything. If you do it twice, script it. If you script it twice, pipeline it.",
    icon: GitBranch,
  },
  {
    quote: "Build systems that are boring in production — excitement should stay in development.",
    icon: Layers,
  },
];

export const PhilosophySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 px-6 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full">
            <Quote className="w-4 h-4 text-primary" />
            <span className="font-mono text-sm text-muted-foreground">engineering_philosophy</span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {philosophies.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative p-6 glass rounded-xl group hover:scale-[1.02] transition-all duration-300"
            >
              <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
                <item.icon className="w-12 h-12 text-primary" />
              </div>
              <Quote className="w-8 h-8 text-secondary mb-4" />
              <p className="text-foreground font-medium italic leading-relaxed">
                "{item.quote}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
