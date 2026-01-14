import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo/Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h3 className="text-xl font-bold gradient-text mb-2">Software Engineer</h3>
            <p className="text-sm text-muted-foreground font-mono">
              Building the future, one commit at a time.
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex gap-4"
          >
            {[
              { icon: Github, href: "https://github.com/Lakshman-99", label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com/in/lakshmansiva", label: "LinkedIn" },
              { icon: Mail, href: "mailto:siva.l@northeastern.edu", label: "Email" },
            ].map((social) => (
              <motion.a
                key={social.label}
                target="_blank"
                href={social.href}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 glass rounded-lg text-muted-foreground hover:text-primary transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center md:text-right"
          >
            <p className="text-sm text-muted-foreground flex items-center gap-1 justify-center md:justify-end">
              Crafted with <Heart className="w-4 h-4 text-destructive" /> in 2026
            </p>
            <p className="text-xs text-muted-foreground font-mono mt-1">
              $ git commit -m "Built with React, Three.js & Tailwind"
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};
