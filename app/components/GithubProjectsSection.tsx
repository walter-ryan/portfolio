'use client';


import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';


type GithubProjectCardProps = {
    repo: string;
    title?: string;
    description?: string;
};

function GithubProjectCard({ repo, title, description }: GithubProjectCardProps) {
    const [data, setData] = useState<{ name: string; description: string; html_url: string; language?: string; homepage?: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetch(`https://api.github.com/repos/${repo}`)
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch');
                return res.json();
            })
            .then((json) => {
                setData(json);
                setLoading(false);
            })
            .catch((e) => {
                setError('Could not load project info');
                setLoading(false);
            });
    }, [repo]);

    return (
        <div className="bg-gray-900/50 rounded-xl overflow-hidden border border-gray-800 p-8 flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
                {loading ? (
                    <div className="text-gray-500">Loading...</div>
                ) : error ? (
                    <div className="text-red-500">{error}</div>
                ) : data ? (
                    <>
                        <h3 className="text-2xl font-bold mb-2">{title || data.name}</h3>
                        <p className="text-gray-400 mb-2">{description || data.description}</p>
                        {data.language && (
                            <div className="text-sm text-gray-500 mb-4">Main language: <span className="font-semibold text-white">{data.language}</span></div>
                        )}
                        <div className="flex flex-col gap-2">
                            {data.homepage && data.homepage.trim() !== '' && (
                                <a href={data.homepage} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline font-medium">Visit Website</a>
                            )}
                            <a href={data.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline font-medium">View on GitHub</a>
                        </div>
                    </>
                ) : null}
            </div>
            <div className="flex-shrink-0 w-32 h-32 bg-gray-800 rounded-lg flex items-center justify-center">
                <svg className="w-16 h-16 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.565 21.8 24 17.303 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
            </div>
        </div>
    );
}

export default function GithubProjectsSection() {
    return (
        <section className="py-20 px-4 border-b border-gray-800">
            <div className="max-w-6xl mx-auto">
                <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl font-bold text-center">
                    Public Projects on GitHub
                </motion.h2>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-lg text-gray-400 mb-16 text-center max-w-2xl mx-auto">
                    While the projects I work on for my job are private, I have several projects that I maintain publicly on GitHub.
                </motion.p>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                    <GithubProjectCard repo="walter-ryan/pitch-tester"
                        title="Pitch Tester"
                        description='A web app for practicing and improving your pitch recognition skills.' />
                    <GithubProjectCard repo="walter-ryan/portfolio" title="Portfolio Website"
                        description='You are currently looking at my portfolio website, built with Next.js and Tailwind CSS.' />
                    <GithubProjectCard repo="walter-ryan/pitch-tester" title="Pitch Tester" />
                </motion.div>
            </div>
        </section>
    );
}
