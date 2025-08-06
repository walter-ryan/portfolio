'use client';

import HeroSection from './components/HeroSection';
import ContactSection from './components/ContactSection';
import GithubProjectsSection from './components/GithubProjectsSection';
import CareerSection from './components/CareerSection';

export default function FullStackPortfolio() {
	return (
		<main className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white">
			<HeroSection />
			<GithubProjectsSection />
			<CareerSection />
			<ContactSection />
		</main>
	);
}
