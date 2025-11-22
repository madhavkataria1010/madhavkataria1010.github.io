export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  link?: string;
  githubUrl?: string;
  techStack: string[];
  metrics?: string;
  featured?: boolean;
}

export interface ResearchPaper {
  id: string;
  title: string;
  conference: string;
  year: string;
  abstract: string;
  link?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string; // Markdown content
  tags: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}