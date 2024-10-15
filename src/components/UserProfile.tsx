import React from 'react';
import { User } from 'lucide-react';

export const UserProfile: React.FC = () => {
  return (
    <div className="glassmorphism p-6 rounded-lg shadow-lg mb-4">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
          <User size={32} className="text-white" />
        </div>
        <div>
          <h2 className="text-xl font-semibold holographic-text">John Doe</h2>
          <p className="text-gray-300">Professional Developer</p>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {['React', 'TypeScript', 'Node.js', 'GraphQL'].map((skill) => (
            <span key={skill} className="px-2 py-1 bg-blue-500 bg-opacity-50 rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Bio</h3>
        <p className="text-sm text-gray-300">
          Passionate developer with 5+ years of experience in building scalable web applications.
          Always eager to learn new technologies and solve complex problems.
        </p>
      </div>
    </div>
  );
};