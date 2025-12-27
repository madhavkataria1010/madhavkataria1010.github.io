import React, { Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { PROJECTS, PAPERS, BLOG_POSTS } from './constants';

const BentoGrid = React.lazy(() => import('./components/BentoGrid'));
const ResearchSection = React.lazy(() => import('./components/ResearchSection'));
const BlogSection = React.lazy(() => import('./components/BlogSection'));
const Footer = React.lazy(() => import('./components/Footer'));

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30 font-sans">
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<div className="h-screen bg-black" />}>
          <BentoGrid projects={PROJECTS} />
          <ResearchSection papers={PAPERS} />
          <BlogSection posts={BLOG_POSTS} />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default App;