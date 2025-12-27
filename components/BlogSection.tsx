import React, { useState } from 'react';
import { BlogPost } from '../types';
import { X, Calendar, Clock, ArrowRight, Tag } from 'lucide-react';

interface BlogSectionProps {
  posts: BlogPost[];
}

// Custom lightweight Markdown renderer to avoid external dependency crashes
const SimpleMarkdown = ({ content }: { content: string }) => {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeBlockContent: string[] = [];

  lines.forEach((line, index) => {
    // Handle Code Blocks
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        elements.push(
          <pre key={`code-${index}`} className="bg-[#0d0d0d] p-6 rounded-xl text-sm font-mono text-gray-300 overflow-x-auto border border-white/10 my-6">
            <code>{codeBlockContent.join('\n')}</code>
          </pre>
        );
        codeBlockContent = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      return;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      return;
    }

    // Headers
    if (line.startsWith('# ')) {
      elements.push(<h1 key={index} className="text-3xl font-bold text-white mt-12 mb-6">{line.slice(2)}</h1>);
      return;
    }
    if (line.startsWith('## ')) {
      elements.push(<h2 key={index} className="text-2xl font-semibold text-white mt-10 mb-4">{line.slice(3)}</h2>);
      return;
    }
    if (line.startsWith('### ')) {
      elements.push(<h3 key={index} className="text-xl font-semibold text-white mt-8 mb-3">{line.slice(4)}</h3>);
      return;
    }

    // Blockquotes
    if (line.startsWith('> ')) {
      elements.push(
        <blockquote key={index} className="border-l-4 border-apple-blue pl-6 py-2 my-8 text-xl italic text-gray-400 bg-white/5 rounded-r-lg">
          {line.slice(2)}
        </blockquote>
      );
      return;
    }

    // Lists
    if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
      const listText = line.trim().slice(2);
      // Parse bold text in list items
      const parts = listText.split(/(\*\*.*?\*\*)/g);
      const parsedListText = parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="text-white font-bold">{part.slice(2, -2)}</strong>;
        }
        return part;
      });
      elements.push(
        <div key={index} className="flex items-start gap-3 mb-2 ml-4">
          <span className="text-apple-blue mt-1.5 shrink-0 text-[10px]">●</span>
          <span className="text-gray-300 leading-relaxed">{parsedListText}</span>
        </div>
      );
      return;
    }

    // Paragraphs
    if (line.trim().length > 0) {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const parsedLine = parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="text-white font-bold">{part.slice(2, -2)}</strong>;
        }
        const subParts = part.split(/(`.*?`)/g);
        return subParts.map((subPart, j) => {
          if (subPart.startsWith('`') && subPart.endsWith('`')) {
            return <code key={`${i}-${j}`} className="bg-white/10 text-blue-300 rounded px-1.5 py-0.5 text-sm font-mono">{subPart.slice(1, -1)}</code>;
          }
          return subPart;
        });
      });
      elements.push(<p key={index} className="text-gray-300 text-lg leading-relaxed mb-6 font-light">{parsedLine}</p>);
    }
  });

  return <div>{elements}</div>;
};

const BlogSection: React.FC<BlogSectionProps> = ({ posts }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section id="blogs" className="py-32 bg-black relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-20">
          <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter text-white mb-6">Blogs.</h2>
          <p className="text-gray-400 text-xl font-light max-w-2xl">
            Thoughts on AI architecture, VLM optimization, and the future of software.
          </p>
        </div>

        {/* Horizontal Scroll Layout - Apple Style */}
        <div className="flex overflow-x-auto snap-x snap-mandatory pb-12 gap-6 no-scrollbar px-6 md:px-0 -mx-6 md:mx-0">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group cursor-pointer flex-shrink-0 w-[85vw] md:w-[450px] snap-center flex flex-col h-[400px] p-8 rounded-[2rem] bg-[#101010] border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-[1.01]"
              onClick={() => setSelectedPost(post)}
            >
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                <span className="flex items-center gap-1.5"><Calendar size={14} /> {post.date}</span>
                <span className="flex items-center gap-1.5"><Clock size={14} /> {post.readTime}</span>
              </div>

              <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-apple-blue transition-colors line-clamp-2">
                {post.title}
              </h3>

              <p className="text-gray-400 leading-relaxed mb-8 flex-grow font-light line-clamp-3">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between mt-auto">
                <div className="flex gap-2">
                  {post.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded-md bg-white/5 text-gray-300 border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="flex items-center text-apple-blue font-medium text-sm opacity-80 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                  Read Post <ArrowRight size={16} className="ml-2" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Full Screen Reader Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-xl transition-opacity"
            onClick={() => setSelectedPost(null)}
          />

          {/* Content Card */}
          <div className="relative w-full max-w-6xl h-full max-h-[90vh] bg-[#1c1c1e] border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col animate-slide-up">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-10 bg-gradient-to-b from-[#1c1c1e] to-transparent">
              <button
                onClick={() => setSelectedPost(null)}
                className="p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-white hover:text-black transition-colors"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto h-full custom-scrollbar">
              <div className="pt-24 pb-16 px-8 md:px-16 max-w-5xl mx-auto">
                <div className="mb-12 border-b border-white/10 pb-12">
                  <div className="flex gap-4 text-sm text-gray-400 mb-6">
                    <span className="flex items-center gap-2"><Calendar size={16} /> {selectedPost.date}</span>
                    <span className="flex items-center gap-2"><Clock size={16} /> {selectedPost.readTime}</span>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6 leading-tight">
                    {selectedPost.title}
                  </h1>
                  <div className="flex gap-2">
                    {selectedPost.tags.map(tag => (
                      <span key={tag} className="text-sm px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="markdown-content">
                  <SimpleMarkdown content={selectedPost.content} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BlogSection;