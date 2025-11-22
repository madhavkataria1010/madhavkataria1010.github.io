import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import ResearchSection from './components/ResearchSection';
import BlogSection from './components/BlogSection';
import Footer from './components/Footer';
import { PROJECTS, PAPERS, BLOG_POSTS } from './constants';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30 font-sans">
      <Navbar />
      <main>
        <Hero />
        <BentoGrid projects={PROJECTS} />
        <ResearchSection papers={PAPERS} />
        <BlogSection posts={BLOG_POSTS} />
      </main>
      <Footer />
    </div>
  );
};

export default App;