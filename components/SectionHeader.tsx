import React from 'react';

interface SectionHeaderProps {
  title: string;
  highlight: string;
  description?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, highlight, description }) => {
  const titleParts = title.split(highlight);

  return (
    <div className="text-center max-w-4xl mx-auto">
      <h2 className="text-5xl md:text-6xl font-black text-white leading-tight">
        {titleParts[0]}
        <span className="ama-text-gradient">{highlight}</span>
        {titleParts[1]}
      </h2>
      {description && (
        <p className="mt-4 text-lg text-gray-300">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
