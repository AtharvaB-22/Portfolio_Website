import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import project1Logo from '/src/assets/project_1.png';
import project2Logo from '/src/assets/project_2.jpg';
import project3Logo from '/src/assets/project_3.jpg';
import project4Logo from '/src/assets/project_4.jpg';
import project5Logo from '/src/assets/project_5.jpg';
import project6Logo from '/src/assets/project_6.png';

const ProjectsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [showAll, setShowAll] = useState(false);

  const categories = ['All', 'Full Stack', 'AI', 'Data Analysis'];

  const allProjects = [
    {
      id: 1,
      title: 'Splitr',
      description: 'A robust full-stack expense tracking platform offering real-time monitoring, automated payment reminders, and secure user authentication. It supports efficient group expense management.',
      image: project1Logo,
      tech: ['Next.js', 'Convex', 'Vercel', 'Clerk', 'Inngest', 'Resend', 'Tailwind CSS', 'Node.js'],
      category: 'Full Stack',
      github: 'https://github.com/AtharvaB-22/Splitr',
      live: 'https://ai-splitr.vercel.app/'
    },
    {
      id: 2,
      title: 'Claims Management System',
      description: 'A MERN stack platform streamlining claims resolution with automated workflows, secure RBAC/JWT authentication, and Docker/AWS deployment for 99.8% uptime.',
      image: project2Logo,
      tech: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Docker', 'AWS', 'Vercel'],
      category: 'Full Stack',
      github: 'https://github.com/AtharvaB-22/Claims_Management_System',
      live: 'https://cmsclientbatman.vercel.app/'
    },
    {
      id: 3,
      title: 'GitHub Repo Analyzer',
      description: 'A comprehensive tool for analyzing GitHub repositories. It provides insights into repository metadata, commit patterns, contributor activity, language usage, and pull request stats through an intuitive web interface.',
      image: project3Logo,
      tech: ['Flask', 'React', 'Docker','Python'],
      category: 'Full Stack',
      github: 'https://github.com/AtharvaB-22/Github-Repo-Analyser',
    },
    {
        id: 4,
        title: 'Bank Customer Churn Analysis',
        description: 'Built a dynamic Power BI dashboard to display customer churn rates by age, region, and account type, enabling retention strategies.',
        image: project4Logo,
        tech: ['Power BI', 'MySQL','MsExcel'],
        category: 'Data Analysis',
  },
    {
      id: 5,
      title: 'GenAI Applications Suite',
      description: 'Built 7+ GenAI tools, including an ATS Resume Matcher (85% accuracy), Invoice Extractor (90% precision), and PDF Q&A system with RAG and Pinecone, reducing research time by 70%.',
      image: project5Logo,
      tech: ['LangChain', 'Gemini', 'Streamlit', 'Pinecone', 'Python-dotenv', 'Azure Key Vault'],
      category: 'AI',
      github: 'https://github.com/AtharvaB-22/Gen-AI-Projects',
  },
  {
      id: 6,
      title: 'Blinkit Sales Analysis',
      description: 'Developed interactive Power BI dashboards to visualize Blinkit’s monthly sales, revealing a 25% weekend order spike and top product categories. Used MySQL for data extraction and transformation, enhancing metric accuracy.',
      image: project6Logo,
      tech: ['Power BI', 'MySQL', 'MS Excel'],
      category: 'Data Analysis',
      github: '',
      live: ''
  }
  ];

  const filteredProjects = activeCategory === 'All' 
    ? allProjects 
    : allProjects.filter(project => project.category === activeCategory);

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 3);

  const ProjectCard = ({ project, index }: { project: any; index: number }) => {
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
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: index * 0.1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.08 }}
        className="group relative"
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 transition-all duration-300 shadow-2xl"
          style={{
            background: isHovered
              ? `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.4), rgba(147, 51, 234, 0.2), transparent 70%)`
              : 'rgb(17, 24, 39)',
          }}
        >
          <div className="relative overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-4 right-4 flex gap-2">
                {project.github && (
                  <motion.a
                    href={project.github}
                    whileHover={{ 
                      scale: 1.3, 
                      color: '#3b82f6',
                      boxShadow: "0 4px 15px rgba(59, 130, 246, 0.4)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                  </motion.a>
                )}
                {project.live && (
                  <motion.a
                    href={project.live}
                    whileHover={{ 
                      scale: 1.3, 
                      color: '#10b981',
                      boxShadow: "0 4px 15px rgba(16, 185, 129, 0.4)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </motion.a>
                )}
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
              {project.title}
            </h3>
            
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech: string, techIndex: number) => (
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
      </motion.div>
    );
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
  }, [showAll]);

  return (
    <section id="projects" ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-visible">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
        
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-blue-400/70 rounded-full shadow-sm"
            initial={{ x: Math.random() * window.innerWidth, y: Math.random() * sectionHeight }}
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * sectionHeight, Math.random() * sectionHeight],
            }}
            transition={{ duration: 25, repeat: Infinity, repeatType: 'loop', ease: 'linear', delay: i * 0.1 }}
          />
        ))}

        {[...Array(35)].map((_, i) => (
          <motion.div
            key={`small-${i}`}
            className="absolute w-1 h-1 bg-purple-400/50 rounded-full shadow-sm"
            initial={{ x: Math.random() * window.innerWidth, y: Math.random() * sectionHeight }}
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * sectionHeight, Math.random() * sectionHeight],
            }}
            transition={{ duration: 20, repeat: Infinity, repeatType: 'loop', ease: 'linear', delay: i * 0.15 }}
          />
        ))}

        <motion.div
          className="absolute w-80 h-80 bg-gradient-to-r from-blue-500/25 to-purple-500/25 rounded-full blur-3xl"
          animate={{ x: [200, 600, 100, 400, 200], y: [150, 100, sectionHeight - 200, 250, 150], scale: [1, 1.3, 0.7, 1.1, 1] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        />
        
        <motion.div
          className="absolute w-72 h-72 bg-gradient-to-r from-purple-500/25 to-pink-500/25 rounded-full blur-3xl"
          animate={{ x: [900, 700, 1100, 800, 900], y: [300, sectionHeight - 300, 200, 450, 300], scale: [1, 0.8, 1.4, 0.9, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        />

        <motion.div
          className="absolute w-64 h-64 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"
          animate={{ x: [500, 300, 800, 450, 500], y: [400, 200, sectionHeight - 100, 350, 400], scale: [1, 1.2, 0.8, 1.3, 1] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
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
              Featured Projects
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Here are some of my recent projects that showcase my skills and passion for creating innovative solutions.
          </p>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setShowAll(false);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayedProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View All/Show Less Button */}
        {filteredProjects.length > 3 && (
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
              {showAll ? 'Show Less' : `View All ${filteredProjects.length} Projects`}
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;