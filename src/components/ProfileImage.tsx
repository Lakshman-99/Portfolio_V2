import { motion } from "framer-motion";
import { User } from "lucide-react";

interface ProfileImageProps {
  imageUrl?: string;
  className?: string;
}

export const ProfileImage = ({ imageUrl, className = "" }: ProfileImageProps) => {
  const imageSrc = imageUrl || "/profile.jpg";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className={`relative ${className}`}
    >
      {/* Outer glow ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-secondary to-accent blur-xl opacity-50 animate-pulse" />
      
      {/* Spinning border */}
      <div className="absolute inset-0 rounded-full p-[3px] bg-gradient-to-r from-primary via-secondary to-accent animate-spin-slow" style={{ animationDuration: '8s' }}>
        <div className="w-full h-full rounded-full bg-background" />
      </div>
      
      {/* Image container */}
      <div className="relative rounded-full overflow-hidden glass p-1">
        <div className="w-full h-full rounded-full overflow-hidden bg-card">
          <img
            src={imageSrc}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      <div className="absolute w-3 h-3 bg-secondary rounded-full shadow-lg shadow-secondary/50 animate-pulse z-10" style={{ bottom: '1rem', right: '1rem' }} />
    </motion.div>
  );
};
