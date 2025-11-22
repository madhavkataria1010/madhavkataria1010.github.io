import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Projects', href: '#projects' },
    { name: 'Research', href: '#research' },
    { name: 'Blogs', href: '#blogs' },
  ];

  return (
    <>
      <nav
        className={`fixed top-6 left-0 right-0 z-50 flex justify-center transition-all duration-500 ${scrolled ? 'px-0' : 'px-6'
          }`}
      >
        <div
          className={`
            relative flex items-center justify-between 
            transition-all duration-500 ease-out
            ${scrolled
              ? 'w-full max-w-6xl mx-4 px-6 py-4 bg-[#161617]/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl'
              : 'w-full max-w-6xl py-4 bg-transparent'
            }
          `}
        >
          <a
            href="#"
            className="text-xl font-semibold tracking-tight text-white hover:text-apple-blue transition-colors duration-300"
          >
            Madhav Kataria
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5"
              >
                {link.name}
              </a>
            ))}
            <div className="w-px h-4 bg-white/10 mx-2" />
            <a
              href="#contact"
              className="px-5 py-2 bg-white text-black text-sm font-medium rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-[1.02]"
            >
              Contact
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/90 backdrop-blur-3xl transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-3xl font-medium text-gray-200 hover:text-apple-blue transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="px-8 py-4 bg-white text-black text-lg font-medium rounded-full mt-8"
            onClick={() => setIsOpen(false)}
          >
            Contact Me
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;