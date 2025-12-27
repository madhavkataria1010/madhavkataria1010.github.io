import React from 'react';
import { Github, Linkedin, Twitter, ArrowUp, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-black pt-32 pb-12 border-t border-white/10 relative overflow-hidden">
       {/* Background glow */}
       <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-t from-blue-900/10 to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
            <h2 className="text-6xl md:text-8xl font-semibold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 mb-8">
                Let's work together.
            </h2>
            <p className="text-xl text-gray-400 mb-12 font-light max-w-2xl mx-auto">
                I'm always looking for challenging problems in Vision-Language Models and High-Performance Computing.
            </p>
            <a href="mailto:madhavkataria69@gmail.com" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-medium text-lg hover:scale-105 transition-transform shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)]">
                <Mail size={18} />
                Contact Me
            </a>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between py-8 border-t border-white/10 mt-12">
            <div className="flex items-center gap-8 mb-4 md:mb-0">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors transform hover:scale-110">
                    <Github size={22} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors transform hover:scale-110">
                    <Linkedin size={22} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors transform hover:scale-110">
                    <Twitter size={22} />
                </a>
            </div>
            
            <div className="flex items-center text-gray-600 text-sm">
                <span className="mr-4">© {new Date().getFullYear()} Madhav Kataria</span>
                <button onClick={scrollToTop} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white">
                    <ArrowUp size={16} />
                </button>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;