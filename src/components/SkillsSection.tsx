import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SkillsSection: React.FC = () => {
  const skillCategories = [
    {
      title: 'Programming Languages',
      skills: ['JavaScript/TypeScript', 'Python', 'Java', 'C++']
    },
    {
      title: 'Front-end',
      skills: ['React.js', 'Next.js', 'Vue.js', 'Tailwind CSS', 'SASS', 'Material-UI']
    },
    {
      title: 'Back-end',
      skills: ['Node.js', 'Express.js', 'Django', 'Spring Boot', 'FastAPI', 'GraphQL']
    },
    {
      title: 'Mobile Development',
      skills: ['React Native', 'Flutter', 'Swift UI', 'Kotlin', 'Ionic', 'Xamarin']
    },
    {
      title: 'Databases',
      skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Firebase', 'Supabase']
    },
    {
      title: 'DevOps & Cloud',
      skills: ['AWS (EC2)', 'Docker', 'Kubernetes', 'CI/CD', 'Nginx', 'Linux']
    }
  ];

  const SkillCard = ({ category, index }: { category: any; index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setMousePosition({ x, y });
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="group relative"
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative bg-gray-900 p-6 rounded-2xl border border-gray-800 h-full transition-all duration-300 shadow-2xl"
          style={{
            background: isHovered
              ? `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.4), rgba(147, 51, 234, 0.2), transparent 70%)`
              : 'rgb(17, 24, 39)',
          }}
        >
          <h3 className="text-xl font-bold text-blue-400 mb-6 group-hover:text-purple-400 transition-colors">
            {category.title}
          </h3>
          
          <div className="flex flex-wrap gap-3">
            {category.skills.map((skill: string, skillIndex: number) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.1 + skillIndex * 0.05 
                }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredSkill(skill)}
                onMouseLeave={() => setHoveredSkill(null)}
                whileHover={{ 
                  scale: 1.15,
                  backgroundColor: 'rgba(59, 130, 246, 0.2)',
                  color: '#60a5fa',
                  boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
                }}
                transition={{ duration: 0.2 }}
                className={`px-4 py-2 bg-gray-800 text-gray-300 rounded-full text-sm font-medium cursor-default transition-all duration-200 ${
                  hoveredSkill === skill ? 'shadow-lg' : ''
                }`}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const [sectionHeight, setSectionHeight] = useState(1000);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateHeight = () => {
      if (sectionRef.current) {
        setSectionHeight(sectionRef.current.scrollHeight);
      }
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-visible">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
        
        {[...Array(48)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-purple-400/70 rounded-full shadow-sm"
            initial={{ x: Math.random() * window.innerWidth, y: Math.random() * sectionHeight }}
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * sectionHeight, Math.random() * sectionHeight],
            }}
            transition={{ duration: 25, repeat: Infinity, repeatType: 'loop', ease: 'linear', delay: i * 0.1 }}
          />
        ))}

        {[...Array(32)].map((_, i) => (
          <motion.div
            key={`small-${i}`}
            className="absolute w-1 h-1 bg-indigo-400/50 rounded-full shadow-sm"
            initial={{ x: Math.random() * window.innerWidth, y: Math.random() * sectionHeight }}
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * sectionHeight, Math.random() * sectionHeight],
            }}
            transition={{ duration: 20, repeat: Infinity, repeatType: 'loop', ease: 'linear', delay: i * 0.15 }}
          />
        ))}

        <motion.div
          className="absolute w-84 h-84 bg-gradient-to-r from-purple-500/25 to-indigo-500/25 rounded-full blur-3xl"
          animate={{ x: [250, 650, 150, 450, 250], y: [180, 120, sectionHeight - 200, 280, 180], scale: [1, 1.5, 0.5, 1.3, 1] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
        />
        
        <motion.div
          className="absolute w-72 h-72 bg-gradient-to-r from-indigo-500/25 to-cyan-500/25 rounded-full blur-3xl"
          animate={{ x: [950, 750, 1150, 850, 950], y: [350, sectionHeight - 300, 250, 500, 350], scale: [1, 0.6, 1.6, 0.8, 1] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        />

        <motion.div
          className="absolute w-64 h-64 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl"
          animate={{ x: [550, 350, 850, 500, 550], y: [450, 250, sectionHeight - 100, 400, 450], scale: [1, 1.4, 0.7, 1.5, 1] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Skills & Technologies
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A comprehensive overview of the technologies and tools I work with to bring ideas to life.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillCategories.map((category, categoryIndex) => (
            <SkillCard key={category.title} category={category} index={categoryIndex} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;