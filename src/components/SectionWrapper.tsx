import React from 'react';
import Navigation from './Navigation';

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ id, children }) => {
  return (
    <div id={id} className="min-h-screen">
      <Navigation />
      {children}
    </div>
  );
};

export default SectionWrapper;