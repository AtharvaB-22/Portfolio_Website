import React from 'react';
// import Lenis from '@studio-freight/lenis';
// import { motion } from 'framer-motion';
// import Navigation from './components/Navigation';
import SectionWrapper from './components/SectionWrapper';
import HomeSection from './components/HomeSection';
import ProjectsSection from './components/ProjectsSection';
import ExperienceSection from './components/ExperienceSection';
import SkillsSection from './components/SkillsSection';
import ContactSection from './components/ContactSection';
import './index.css';

const App: React.FC = () => {
  return (
    <div>
      <SectionWrapper id="home">
        <HomeSection />
      </SectionWrapper>
      <SectionWrapper id="projects">
        <ProjectsSection />
      </SectionWrapper>
      <SectionWrapper id="experience">
        <ExperienceSection />
      </SectionWrapper>
      <SectionWrapper id="skills">
        <SkillsSection />
      </SectionWrapper>
      <SectionWrapper id="contact">
        <ContactSection />
      </SectionWrapper>
    </div>
  );
};

export default App;

