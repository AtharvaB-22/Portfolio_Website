import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Zap, Github, Linkedin, Send, Phone, Instagram } from 'lucide-react';
import emailjs from 'emailjs-com';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const formRef = useRef<HTMLFormElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Initialize EmailJS with environment variables (Vite uses VITE_ prefix)
  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_USER_ID!);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const userId = import.meta.env.VITE_EMAILJS_USER_ID;

    if (!serviceId || !templateId || !userId) {
      alert('Email service configuration error. Please try again later.');
      console.error('Missing EmailJS environment variables');
      return;
    }

    if (formRef.current) {
      try {
        await emailjs.sendForm(serviceId, templateId, formRef.current, userId);
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } catch (error) {
        console.error('Failed to send email:', error);
        alert('Failed to send message. Please try again later.');
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="p-8 bg-gray-900 rounded-2xl border border-gray-800 transition-all duration-300 shadow-2xl"
      style={{
        background: isHovered
          ? `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.4), rgba(59, 130, 246, 0.2), transparent 70%)`
          : 'rgb(17, 24, 39)',
      }}
    >
      <h3 className="text-2xl font-bold text-purple-400 mb-8">Send a Message</h3>
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-white font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            autoComplete="name"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-white font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            autoComplete="email"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors"
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-white font-medium mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            rows={5}
            autoComplete="off"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors resize-none"
            placeholder="Tell me about your project..."
          />
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center gap-2"
        >
          <Send className="w-5 h-5" />
          Send Message
        </motion.button>
      </form>
    </div>
  );
};

const ContactSection: React.FC = () => {
  const ContactCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    return (
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative bg-gray-900 rounded-2xl border border-gray-800 transition-all duration-300 shadow-2xl ${className}`}
        style={{
          background: isHovered
            ? `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.4), rgba(59, 130, 246, 0.2), transparent 70%)`
            : 'rgb(17, 24, 39)',
        }}
      >
        {children}
      </div>
    );
  };

  const SocialIcon = ({ icon: Icon, href, label, color }: { icon: any; href: string; label: string; color: string }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
      <div className="relative">
        <motion.a
          href={href}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          whileHover={{
            scale: 1.1,
            filter: 'brightness(0.7) contrast(1.2)',
            boxShadow: '0 4px 15px rgba(147, 51, 234, 0.4)',
          }}
          whileTap={{ scale: 0.95 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 25,
            duration: 0.2,
          }}
          className={`p-3 bg-gray-800 rounded-full text-gray-400 transition-colors ${color} block`}
          style={{ transformStyle: 'preserve-3d', zIndex: 20 }}
          aria-label={label}
        >
          <Icon className="w-5 h-5" />
        </motion.a>

        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm font-medium border border-gray-700 shadow-lg z-30"
          >
            {label}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </motion.div>
        )}
      </div>
    );
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com/AtharvaB-22', label: 'GitHub', color: 'hover:text-gray-300' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/atharvabehani/', label: 'LinkedIn', color: 'hover:text-blue-400' },
    { icon: Instagram, href: 'https://www.instagram.com/atharva_behani/', label: 'Instagram', color: 'hover:text-pink-400' },
  ];

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
    <section id="contact" ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-visible">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>

        {[...Array(55)].map((_, i) => (
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

        {[...Array(38)].map((_, i) => (
          <motion.div
            key={`small-${i}`}
            className="absolute w-1 h-1 bg-pink-400/50 rounded-full shadow-sm"
            initial={{ x: Math.random() * window.innerWidth, y: Math.random() * sectionHeight }}
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * sectionHeight, Math.random() * sectionHeight],
            }}
            transition={{ duration: 20, repeat: Infinity, repeatType: 'loop', ease: 'linear', delay: i * 0.15 }}
          />
        ))}

        <motion.div
          className="absolute w-88 h-88 bg-gradient-to-r from-purple-500/25 to-pink-500/25 rounded-full blur-3xl"
          animate={{ x: [280, 680, 180, 480, 280], y: [220, 160, sectionHeight - 200, 320, 220], scale: [1, 1.6, 0.4, 1.4, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />

        <motion.div
          className="absolute w-76 h-76 bg-gradient-to-r from-pink-500/25 to-cyan-500/25 rounded-full blur-3xl"
          animate={{ x: [980, 780, 1180, 880, 980], y: [380, sectionHeight - 300, 280, 530, 380], scale: [1, 0.5, 1.7, 0.7, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />

        <motion.div
          className="absolute w-68 h-68 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl"
          animate={{ x: [580, 380, 880, 530, 580], y: [480, 280, sectionHeight - 100, 430, 480], scale: [1, 1.5, 0.6, 1.6, 1] }}
          transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
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
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">Get In Touch</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's collaborate and create something amazing together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <ContactCard className="p-8 h-full">
              <h3 className="text-2xl font-bold text-purple-400 mb-8">Contact Information</h3>

              <div className="space-y-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-500/20 rounded-full">
                    <Mail className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white font-medium">behaniatharva@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-500/20 rounded-full">
                    <Phone className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Phone</p>
                    <p className="text-white font-medium">+91 8336951565</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-500/20 rounded-full">
                    <MapPin className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Location</p>
                    <p className="text-white font-medium">Noida, India</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-500/20 rounded-full">
                    <Zap className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Availability</p>
                    <p className="text-white font-medium">Open to full-time and freelance opportunities</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-800 pt-6">
                <p className="text-white font-medium mb-4">Let's build something awesome together!</p>

                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <SocialIcon
                      key={social.label}
                      icon={social.icon}
                      href={social.href}
                      label={social.label}
                      color={social.color}
                    />
                  ))}
                </div>
              </div>
            </ContactCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;