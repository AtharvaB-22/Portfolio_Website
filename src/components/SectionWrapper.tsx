import React from 'react';

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ id, children }) => {
  return (
    <div id={id} className="min-h-screen relative">
      {children}
    </div>
  );
};

export default SectionWrapper;