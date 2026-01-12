import { motion } from "framer-motion";
import { User } from "lucide-react";

interface ProfileImageProps {
  imageUrl?: string;
  className?: string;
}

export const ProfileImage = ({ imageUrl, className = "" }: ProfileImageProps) => {
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
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
              <User className="w-1/2 h-1/2 text-primary" />
            </div>
          )}
        </div>
      </div>
      
      {/* Status indicator */}
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-2 right-2 w-4 h-4 bg-secondary rounded-full border-2 border-background shadow-lg shadow-secondary/50"
      />
    </motion.div>
  );
};
