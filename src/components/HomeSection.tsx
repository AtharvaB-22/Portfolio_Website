import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Github, Linkedin, Instagram, Code } from 'lucide-react';

const HomeSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['17.5deg', '-17.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-17.5deg', '17.5deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const SocialIcon = ({ icon: Icon, href, label }: { icon: any; href: string; label: string }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
      <div className="relative">
        <motion.a
          href={href}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          whileHover={{ 
            scale: 1.3,
            rotateY: 15,
            rotateX: 10,
            boxShadow: "0 8px 25px rgba(147, 51, 234, 0.6)",
            background: "linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(59, 130, 246, 0.2))"
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ 
            type: 'spring', 
            stiffness: 400, 
            damping: 25,
            duration: 0.2
          }}
          className="p-4 bg-gray-800/50 backdrop-blur-sm rounded-full shadow-lg border border-gray-700/50 block"
          style={{ transformStyle: 'preserve-3d' }}
          aria-label={label}
        >
          <Icon className="w-6 h-6 text-gray-300" />
        </motion.a>
        
        {/* Tooltip */}
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm font-medium border border-gray-700 shadow-lg z-10"
          >
            {label}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </motion.div>
        )}
      </div>
    );
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com/AtharvaB-22', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/atharvabehani/', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://www.instagram.com/atharva_behani/', label: 'Instagram' },
    { icon: Code, href: 'https://leetcode.com/u/behaniatharva/', label: 'LeetCode' },
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden pt-16">
      {/* Optimized Background Animations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-pink-900/30"></div>
        
        {/* Reduced Floating Particles for Performance */}
        {[...Array(60)].map((_, i) => (
          <motion.div
            key={`home-particle-${i}`}
            className="absolute w-1.5 h-1.5 bg-blue-400/70 rounded-full shadow-sm"
            initial={{
              x: Math.random() * 1400,
              y: Math.random() * 1000,
            }}
            animate={{
              x: [
                Math.random() * 1400,
                Math.random() * 1400,
                Math.random() * 1400,
                Math.random() * 1400
              ],
              y: [
                Math.random() * 1000,
                Math.random() * 1000,
                Math.random() * 1000,
                Math.random() * 1000
              ],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'linear',
              delay: i * 0.1,
            }}
          />
        ))}

        {/* Smaller Particles */}
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={`home-small-particle-${i}`}
            className="absolute w-1 h-1 bg-purple-400/50 rounded-full shadow-sm"
            initial={{
              x: Math.random() * 1400,
              y: Math.random() * 1000,
            }}
            animate={{
              x: [
                Math.random() * 1400,
                Math.random() * 1400,
                Math.random() * 1400
              ],
              y: [
                Math.random() * 1000,
                Math.random() * 1000,
                Math.random() * 1000
              ],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'linear',
              delay: i * 0.15,
            }}
          />
        ))}

        {/* Gradient Orbs */}
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-3xl"
          animate={{
            x: [100, 400, 50, 300, 100],
            y: [100, 50, 400, 150, 100],
            scale: [1, 1.2, 0.8, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        <motion.div
          className="absolute w-80 h-80 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl"
          animate={{
            x: [800, 600, 1000, 700, 800],
            y: [200, 500, 100, 350, 200],
            scale: [1, 0.8, 1.3, 0.9, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        <motion.div
          className="absolute w-64 h-64 bg-gradient-to-r from-pink-500/20 to-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: [400, 200, 700, 350, 400],
            y: [300, 100, 600, 250, 300],
            scale: [1, 1.1, 0.9, 1.2, 1],
          }}
          transition={{
            duration: 23,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-8"
          >
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-lg text-gray-400 mb-2"
              >
                Hi, I am
              </motion.p>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              >
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Atharva Behani
                </span>
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-xl md:text-2xl mb-2"
              >
                <span className="text-gray-400">I am a </span>
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">
                  Software Engineer
                </span>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-lg text-gray-400 leading-relaxed max-w-lg"
            >
              I'm a motivated and versatile person, always ready for new challenges with a passion for learning and delivering quality results.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 25px rgba(147, 51, 234, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-lg rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
                onClick={() => window.open('https://drive.google.com/file/d/1os9o03bBKF9ggT8P5NAuJbI3Mwot9U6j/view?usp=sharing', '_blank')}
              >
                Check Resume
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex space-x-6"
            >
              {socialLinks.map((social, index) => (
                <SocialIcon
                  key={social.label}
                  icon={social.icon}
                  href={social.href}
                  label={social.label}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <motion.div
              ref={ref}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative w-80 h-80 lg:w-96 lg:h-96 cursor-pointer"
            >
              <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-1">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-8xl font-bold text-gray-200 overflow-hidden">
                  <img
                    src="/src/assets/Portfolio photo.png"
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-600/20"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;

