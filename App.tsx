import React, { Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { PROJECTS, PAPERS, BLOG_POSTS } from './constants';
import { consumeQueuedSection, scrollToSection } from './utils/sectionNavigation';

const BentoGrid = React.lazy(() => import('./components/BentoGrid'));
const ResearchSection = React.lazy(() => import('./components/ResearchSection'));
const BlogSection = React.lazy(() => import('./components/BlogSection'));
const Footer = React.lazy(() => import('./components/Footer'));

const HomePage: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') {
      return;
    }

    const queuedSection = consumeQueuedSection();
    if (!queuedSection) {
      return;
    }

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        scrollToSection(queuedSection);
      });
    });
  }, [location.pathname]);

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

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/blogs/:slug" element={<HomePage />} />
    </Routes>
  );
};

export default App;
