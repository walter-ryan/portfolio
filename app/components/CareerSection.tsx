
import React, { useRef, useLayoutEffect, useState } from 'react';
import { motion } from 'framer-motion';

type CareerEntryProps = {
    title: string;
    subtitle: string;
    period: string;
    color: string; // e.g. 'green', 'blue'
    details: string[];
    dotPosition: string; // e.g. 'top-8', 'top-44'
};

function CareerEntry({ title, subtitle, period, color, details, dotPosition }: CareerEntryProps) {
    const colorMap: Record<string, string> = {
        green: 'bg-green-400 text-green-400 border-green-400',
        blue: 'bg-blue-400 text-blue-400 border-blue-400',
        purple: 'bg-purple-400 text-purple-400 border-purple-400',
        teal: 'bg-teal-400 text-teal-400 border-teal-400',
        orange: 'bg-orange-400 text-orange-400 border-orange-400',
        red: 'bg-red-400 text-red-400 border-red-400',
        yellow: 'bg-yellow-400 text-yellow-400 border-yellow-400',
        gray: 'bg-gray-400 text-gray-400 border-gray-400',
    };
    return (
        <div className="relative md:pl-0 pl-6">
            {/* Dot for mobile timeline */}
            <span
                className={`md:hidden absolute -left-3 ${dotPosition} w-3 h-3 ${colorMap[color]?.split(' ')[0] || ''} border-2 border-gray-950 rounded-full`}
            />
            <div className="flex flex-col md:flex-row md:items-center md:gap-8 bg-gray-900/60 rounded-lg p-6 border border-gray-800">
                <div className="flex-1">
                    <h3 className={`text-xl font-semibold ${colorMap[color]?.split(' ')[1] || ''}`}>{title}</h3>
                    <p className="text-gray-400 text-sm mb-1">{subtitle}</p>
                    <p className="text-gray-500 text-xs mb-2">{period}</p>
                    <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
                        {details.map((d, i) => (
                            <li key={i}>{d}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}


const careerEntries = [
    {
        title: "Lloyds Banking Group",
        subtitle: "Data Engineer & Software Developer",
        period: "2022 - Present",
        color: "green",
        details: [
            'Building scalable, data-intensive cloud applications on GCP.',
            'Developing ETL pipelines and automating data workflows.',
            'Implementing CI/CD and Infrastructure as Code.',
        ],
    },
    {
        title: "Moore Automotive Ltd",
        subtitle: "Junior Mechanic",
        period: "2021 - 2022",
        color: "blue",
        details: [
            'Worked on various automotive projects at a JLR specialist garage.',
            'Gained hands-on experience in vehicle maintenance and repair.',
            'Demonstrated a strong work ethic in a challenging work environment.',
        ],
    },
    {
        title: "University of Bristol",
        subtitle: "MEng Mechanical Engineering",
        period: "2017 - 2021",
        color: "purple",
        details: [
            'Graduated with a Bachelor of Engineering (BEng) degree.',
            'Developed strong analytical, problem-solving, and teamwork skills.',
            'Completed projects in thermodynamics, computational fluid dynamics, and finite element analysis.',
        ],
    },
];


export default function CareerSection() {
    const entryRefs = useRef<(HTMLDivElement | null)[]>([]);
    const timelineRef = useRef<HTMLDivElement | null>(null);
    const [dotPositions, setDotPositions] = useState<number[]>([]);

    useLayoutEffect(() => {
        if (!timelineRef.current) return;
        const timelineRect = timelineRef.current.getBoundingClientRect();
        const positions = entryRefs.current.map((ref) => {
            if (!ref) return 0;
            const entryRect = ref.getBoundingClientRect();
            // Calculate the center of the entry relative to the timeline
            return entryRect.top - timelineRect.top + entryRect.height / 2;
        });
        setDotPositions(positions);
    }, []);

    return (
        <section className="py-16 md:py-24 bg-gray-950 border-b border-gray-800">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">Career Journey</h2>
                <div className="relative flex">
                    {/* Timeline */}
                    <div className="hidden md:flex flex-col items-center mr-8">
                        <div
                            ref={timelineRef}
                            className="w-1 h-full min-h-[300px] rounded-full relative"
                            style={{ background: 'linear-gradient(to bottom, #4ade80 0%, #60a5fa 50%, #a78bfa 100%)' }}
                        >
                            {/* Responsive Timeline dots for each entry */}
                            {careerEntries.map((entry, i) => (
                                <span
                                    key={i}
                                    style={dotPositions[i] !== undefined ? { top: dotPositions[i] } : {}}
                                    className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 ${entry.color ? `bg-${entry.color}-400` : ''} border-4 border-gray-950 rounded-full shadow-lg`}
                                />
                            ))}
                        </div>
                    </div>
                    {/* Career Entries */}
                    <div className="flex-1 space-y-8">
                        {careerEntries.map((entry, i) => (
                            <div
                                ref={el => {
                                    entryRefs.current[i] = el;
                                }}
                                key={i}
                            >
                                <CareerEntry
                                    title={entry.title}
                                    subtitle={entry.subtitle}
                                    period={entry.period}
                                    color={entry.color}
                                    dotPosition=""
                                    details={entry.details}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
