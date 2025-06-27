import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { name: 'Home', href: '#home' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false); // Close menu after clicking a link on mobile
  };

  return (
    <nav
      className="z-50 bg-transparent backdrop-blur-md shadow-lg border-b border-gray-800/50 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Hamburger Menu for Mobile */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-pink-400 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
                />
              </svg>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex justify-center w-full">
            {navigationItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-gray-300 hover:text-pink-400 font-medium transition-colors duration-200 relative group mx-4"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 group-hover:w-full"></span>
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu */}
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: isMenuOpen ? 1 : 0, x: isMenuOpen ? 0 : '-100%' }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 w-full bg-transparent backdrop-blur-md shadow-lg border-b border-gray-800/50 lg:hidden"
          >
            <div className="flex flex-col items-center space-y-4 py-4">
              {navigationItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="text-gray-300 hover:text-pink-400 font-medium transition-colors duration-200 w-full text-center py-2"
                >
                  {item.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;