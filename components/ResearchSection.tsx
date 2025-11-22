import React from 'react';
import { ResearchPaper } from '../types';
import { ArrowRight } from 'lucide-react';

interface ResearchSectionProps {
    papers: ResearchPaper[];
}

const ResearchSection: React.FC<ResearchSectionProps> = ({ papers }) => {
    return (
        <section id="research" className="py-32 relative overflow-hidden">
            {/* Subtle glow background removed as requested */}

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter mb-16 text-center">Research & Publications</h2>

                <div className="space-y-6">
                    {papers.map((paper) => (
                        <div key={paper.id} className="group relative p-8 rounded-3xl bg-[#161617]/60 backdrop-blur-xl border border-white/10 hover:bg-[#1c1c1e] transition-all duration-300 hover:scale-[1.02] cursor-pointer">
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium border border-blue-500/20">
                                            {paper.conference}
                                        </span>
                                        <span className="text-gray-500 text-sm">{paper.year}</span>
                                    </div>
                                    <h3 className="text-2xl font-semibold text-white mb-3 leading-tight group-hover:text-apple-blue transition-colors">
                                        {paper.title}
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed font-light">
                                        {paper.abstract}
                                    </p>
                                </div>
                                <div className="flex items-center justify-center md:justify-end">
                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white text-white group-hover:text-black transition-all">
                                        <ArrowRight size={20} className="-ml-1 group-hover:ml-0 transition-all" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <a href="#" className="inline-flex items-center text-gray-400 hover:text-white transition-colors text-sm font-medium">
                        View Google Scholar Profile <ArrowRight size={14} className="ml-2" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ResearchSection;