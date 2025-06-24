import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Building } from 'lucide-react';

const ExperienceSection: React.FC = () => {
  const [showAll, setShowAll] = useState(false);

  const allExperiences = [
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      company: 'TechCorp Solutions',
      location: 'San Francisco, CA',
      period: '2022 - Present',
      achievements: [
        'Improved application performance by 40%',
        'Led team of 5 developers',
        'Implemented CI/CD pipeline reducing deployment time by 60%'
      ],
      technologies: ['React', 'Node.js', 'MongoDB', 'AWS', 'Docker', 'TypeScript'],
      logo: '🏢'
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      company: 'Digital Innovation Lab',
      location: 'New York, NY',
      period: '2020 - 2022',
      achievements: [
        'Delivered 15+ successful projects',
        'Reduced bug reports by 50%',
        'Implemented responsive designs for mobile-first approach'
      ],
      technologies: ['React', 'Express.js', 'PostgreSQL', 'Redux', 'Tailwind CSS'],
      logo: '⚡'
    },
    {
      id: 3,
      title: 'Frontend Developer',
      company: 'StartupXYZ',
      location: 'Austin, TX',
      period: '2019 - 2020',
      achievements: [
        'Increased user engagement by 35%',
        'Optimized website loading speed by 45%',
        'Implemented accessibility standards (WCAG 2.1)'
      ],
      technologies: ['Vue.js', 'JavaScript', 'SASS', 'Webpack', 'Jest'],
      logo: '🚀'
    },
    {
      id: 4,
      title: 'Junior Web Developer',
      company: 'WebFlow Agency',
      location: 'Remote',
      period: '2018 - 2019',
      achievements: [
        'Completed 20+ client websites',
        'Learned React, Node.js, and modern web stack',
        'Maintained 99% client satisfaction rate'
      ],
      technologies: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'Bootstrap'],
      logo: '💻'
    },
    {
      id: 5,
      title: 'Software Engineering Intern',
      company: 'InnovateTech',
      location: 'Seattle, WA',
      period: '2018 - 2018',
      achievements: [
        'Developed automated testing scripts reducing QA time by 30%',
        'Contributed to open-source projects',
        'Collaborated with cross-functional teams on product features'
      ],
      technologies: ['Python', 'Selenium', 'Git', 'Agile', 'REST APIs'],
      logo: '🔬'
    },
    {
      id: 6,
      title: 'Web Development Freelancer',
      company: 'Self-Employed',
      location: 'Remote',
      period: '2017 - 2018',
      achievements: [
        'Built 10+ websites for small businesses',
        'Managed client relationships and project timelines',
        'Learned fundamentals of web development and design'
      ],
      technologies: ['WordPress', 'PHP', 'MySQL', 'Photoshop', 'SEO'],
      logo: '🎨'
    }
  ];

  const displayedExperiences = showAll ? allExperiences : allExperiences.slice(0, 4);

  const ExperienceCard = ({ experience, index }: { experience: any; index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const [hoveredTech, setHoveredTech] = useState<string | null>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setMousePosition({ x, y });
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
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
              ? `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.4), rgba(59, 130, 246, 0.2), transparent 70%)`
              : 'rgb(17, 24, 39)',
          }}
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="text-3xl">{experience.logo}</div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">
                {experience.title}
              </h3>
              
              <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2">
                <Building className="w-4 h-4" />
                <span>{experience.company}</span>
              </div>

              <div className="flex items-center text-sm text-gray-400 gap-4 mb-3">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{experience.period}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{experience.location}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-white text-sm mb-2">Key Achievements:</h4>
              <ul className="space-y-1">
                {experience.achievements.map((achievement: string, achievementIndex: number) => (
                  <li
                    key={achievementIndex}
                    className="text-sm text-gray-400 flex items-start gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white text-sm mb-3">Technologies Used:</h4>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech: string, techIndex: number) => (
                  <motion.span
                    key={techIndex}
                    onMouseEnter={() => setHoveredTech(tech)}
                    onMouseLeave={() => setHoveredTech(null)}
                    whileHover={{ 
                      scale: 1.1,
                      backgroundColor: 'rgba(59, 130, 246, 0.2)',
                      color: '#60a5fa'
                    }}
                    transition={{ duration: 0.2 }}
                    className={`px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-medium cursor-default transition-all duration-200 ${
                      hoveredTech === tech ? 'shadow-lg' : ''
                    }`}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
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
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section id="experience" className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Optimized Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
        
        {/* Reduced Floating Particles */}
        {[...Array(45)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-pink-400/70 rounded-full shadow-sm"
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
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`small-${i}`}
            className="absolute w-1 h-1 bg-cyan-400/50 rounded-full shadow-sm"
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
          className="absolute w-76 h-76 bg-gradient-to-r from-pink-500/25 to-purple-500/25 rounded-full blur-3xl"
          animate={{
            x: [300, 700, 200, 500, 300],
            y: [200, 150, 600, 350, 200],
            scale: [1, 1.4, 0.6, 1.2, 1],
          }}
          transition={{
            duration: 27,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        <motion.div
          className="absolute w-68 h-68 bg-gradient-to-r from-cyan-500/25 to-blue-500/25 rounded-full blur-3xl"
          animate={{
            x: [1000, 800, 1200, 900, 1000],
            y: [400, 700, 300, 550, 400],
            scale: [1, 0.7, 1.5, 0.9, 1],
          }}
          transition={{
            duration: 23,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        <motion.div
          className="absolute w-60 h-60 bg-gradient-to-r from-indigo-500/20 to-pink-500/20 rounded-full blur-3xl"
          animate={{
            x: [600, 400, 900, 550, 600],
            y: [500, 300, 800, 450, 500],
            scale: [1, 1.3, 0.8, 1.4, 1],
          }}
          transition={{
            duration: 29,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              My Work Experience
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            My journey through different roles and companies, building expertise in modern web development.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
        >
          {displayedExperiences.map((experience, index) => (
            <ExperienceCard key={experience.id} experience={experience} index={index} />
          ))}
        </motion.div>

        {/* Show All/Show Less Button */}
        {allExperiences.length > 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.button
              onClick={() => setShowAll(!showAll)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {showAll ? 'Show Less' : `View All ${allExperiences.length} Experiences`}
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ExperienceSection;