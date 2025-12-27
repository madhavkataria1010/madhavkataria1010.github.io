import React from 'react';
import { Project } from '../types';
import { ArrowUpRight, Cpu, Activity, Github } from 'lucide-react';

interface BentoGridProps {
    projects: Project[];
}

const BentoGrid: React.FC<BentoGridProps> = ({ projects }) => {
    const [visibleCount, setVisibleCount] = React.useState(4);
    const isExpanded = visibleCount >= projects.length;

    const toggleView = () => {
        if (isExpanded) {
            setVisibleCount(4);
            // Optional: Scroll back to top of projects section
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        } else {
            setVisibleCount(projects.length);
        }
    };

    return (
        <section id="projects" className="py-32 relative bg-black">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-24 md:mb-32">
                    <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter text-white mb-6">Selected Projects.</h2>
                    <p className="text-gray-400 text-xl md:text-2xl max-w-2xl font-light">
                        From autonomous agents to procedural worlds. <br />
                        Systems engineered for scale and performance.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-6 gap-6 md:gap-8 auto-rows-[500px] mb-12">
                    {projects.slice(0, visibleCount).map((project, index) => {
                        // Layout Logic:
                        // Item 0 (Jarvis): col-span-4
                        // Item 1 (IntelliBrowser): col-span-2
                        // Item 2 (Dynamic RAG): col-span-3
                        // Item 3 (Realm Weaver): col-span-3
                        // Item 4 (Adobe): col-span-6 (Full Width)
                        // Dynamic logic for extra items: default to col-span-3 or col-span-6 based on index parity?
                        // Let's keep it simple: Items > 4 get col-span-3 to fit 2 per row, or col-span-6 for full width.
                        // For a clean look, let's alternate or just use col-span-3 for all extra items.

                        let colSpanClass = 'md:col-span-3';
                        if (index === 0) colSpanClass = 'md:col-span-4';
                        if (index === 1) colSpanClass = 'md:col-span-2';
                        if (index === 2) colSpanClass = 'md:col-span-3';
                        if (index === 3) colSpanClass = 'md:col-span-3';
                        if (index === 4) colSpanClass = 'md:col-span-6';
                        // For index > 4, default is already md:col-span-3

                        return (
                            <div
                                key={project.id}
                                className={`group relative rounded-[2.5rem] overflow-hidden bg-[#101010] border border-white/10 transition-all duration-500 ${colSpanClass}`}
                            >
                                {/* Image Background */}
                                <div className="absolute inset-0 z-0 overflow-hidden">
                                    <img
                                        src={project.imageUrl}
                                        alt={project.title}
                                        loading="lazy"
                                        className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:blur-md group-hover:opacity-40 opacity-60"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />
                                </div>

                                {/* Normal State Content (Visible initially, fades out on hover) */}
                                <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between z-10 transition-opacity duration-300 group-hover:opacity-0">
                                    <div className="flex justify-between items-start">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-xs font-medium text-white/80 uppercase tracking-wider">
                                            {project.category}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="text-4xl font-bold text-white mb-2 tracking-tight">{project.title}</h3>
                                    </div>
                                </div>

                                {/* "Mini Page" Overlay (Slides up on hover) */}
                                <div className="absolute inset-0 p-6 md:p-8 z-30 flex flex-col justify-end translate-y-[20%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out bg-gradient-to-t from-black/95 via-black/90 to-transparent overflow-hidden">

                                    <div className="mb-auto pt-10">
                                        <span className="text-apple-blue text-sm font-bold tracking-wide uppercase mb-2 block">{project.category}</span>
                                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">{project.title}</h3>
                                    </div>

                                    <div className="space-y-6">
                                        {/* Metrics */}
                                        {project.metrics && (
                                            <div className="flex items-center gap-3 text-emerald-400">
                                                <Activity size={18} />
                                                <span className="text-sm font-mono font-medium tracking-tight">{project.metrics}</span>
                                            </div>
                                        )}

                                        {/* Description */}
                                        <p className="text-gray-200 text-base md:text-lg leading-relaxed font-light">
                                            {project.description}
                                        </p>

                                        {/* Tech Stack Pills */}
                                        <div className="flex flex-wrap gap-2">
                                            {project.techStack.map((tech) => (
                                                <span key={tech} className="px-3 py-1.5 rounded-md bg-white/10 border border-white/10 text-xs md:text-sm text-gray-300 font-medium backdrop-blur-sm">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Links */}
                                        <div className="flex gap-4 pt-4">
                                            {project.githubUrl && (
                                                <a
                                                    href={project.githubUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-all hover:scale-110"
                                                    title="View Code"
                                                >
                                                    <Github size={20} />
                                                </a>
                                            )}
                                            {project.link && (
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white text-black hover:scale-110 transition-transform"
                                                    title="View Live"
                                                >
                                                    <ArrowUpRight size={20} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Show More / Show Less Button */}
                {projects.length > 4 && (
                    <div className="flex justify-center mt-12">
                        <button
                            onClick={toggleView}
                            className="px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-md"
                        >
                            {isExpanded ? 'Show Less' : 'Show More Projects'}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default BentoGrid;