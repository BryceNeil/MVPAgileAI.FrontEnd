import React from 'react';

const categories = [
  'Consulting',
  'Finance',
  'Software Engineering',
  'Healthcare',
  'Education',
  'Marketing',
  'Sales',
  'Human Resources',
  'Retail',
  'Hospitality',
  'Real Estate',
  'Manufacturing',
  'Transportation',
  'Information Technology',
  'Legal',
  'Construction',
  'Design',
  'Media',
  'Arts',
  'Science & Research',
];

const OfferedJobSectors = () => {
  return (
    <div className="bg-white p-4 rounded-lg flex flex-wrap gap-2 justify-center items-center">
      {categories.map((category, index) => (
        <div
          key={category}
          className={`px-4 py-2 border rounded text-xs ${
            index === 0
              ? 'text-blue-500 border-blue-500 bg-blue-100' // First category styles
              : 'text-gray-400 border-gray-200 bg-gray-50' // Other categories styles
          }`}
          style={{ whiteSpace: 'nowrap' }}
        >
          {category}
        </div>
      ))}
    </div>
  );
};

export default OfferedJobSectors;
