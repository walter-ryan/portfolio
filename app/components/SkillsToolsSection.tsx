import React from 'react';
import { motion } from 'framer-motion';

const skills = [
  'Java',
  'Spring Boot',
  'DBT (Data Build Tool)',
  'SQL',
  'Python',
  'ETL Pipelines',
  'Data Modeling',
  'REST APIs',
  'Docker',
];

const tools = [
  'GitHub',
  'Jira',
  'Linux',
  'Terraform',
  'Google Cloud Platform',
];

export default function SkillsToolsSection() {
  return (
    <section className="py-12 relative overflow-hidden border-b border-gray-800">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500">Skills & Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-900/60 border border-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">Skills</h3>
              <ul className="list-disc list-inside space-y-2">
                {skills.map(skill => (
                  <li key={skill} className="text-gray-300">{skill}</li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-900/60 border border-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-green-400">Tools</h3>
              <ul className="list-disc list-inside space-y-2">
                {tools.map(tool => (
                  <li key={tool} className="text-gray-300">{tool}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
    </section>
  );
}
