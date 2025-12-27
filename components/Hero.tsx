import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
            {/* Background Ambience */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {/* Blooming Blue Aura - The Apple Intelligence Glow */}
                <div className="w-[700px] h-[700px] bg-[#2997ff]/30 rounded-full blur-[120px] animate-bloom mix-blend-screen will-change-transform opacity-0" />
            </div>

            <div className="relative max-w-[1200px] mx-auto px-6 text-center z-10">
                {/* Headline - Apple Style: Massive, tight tracking, subtle gradient */}
                <h1 className="text-8xl md:text-9xl font-semibold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 mb-6 animate-slide-up opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
                    Madhav Kataria
                </h1>

                {/* Subtext */}
                <p className="text-2xl md:text-3xl text-gray-400 font-medium tracking-tight max-w-2xl mx-auto mb-12 animate-slide-up opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }} role="doc-subtitle">
                    AI Researcher & Developer – Specializing in Vision-Language Models & Generative AI
                </p>

                {/* CTA Buttons - Glassmorphism & High Contrast */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-slide-up opacity-0" style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
                    <a href="#work" className="group relative px-8 py-4 bg-white text-black rounded-full font-medium text-lg overflow-hidden transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)]">
                        <span className="relative z-10 flex items-center">
                            View Work <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </a>
                    <a href="#research" className="px-8 py-4 bg-[#1d1d1f]/80 backdrop-blur-md text-white border border-white/10 rounded-full font-medium text-lg hover:bg-white/10 transition-all hover:scale-[1.02]">
                        Research
                    </a>
                </div>
            </div>

            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
                <ChevronDown className="text-white w-6 h-6" />
            </div>
        </section>
    );
};

export default Hero;