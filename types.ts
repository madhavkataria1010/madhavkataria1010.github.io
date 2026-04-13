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
  detailLinks?: Array<{
    label: string;
    href: string;
  }>;
}

export interface ResearchPaper {
  id: string;
  title: string;
  conference: string;
  year: string;
  abstract: string;
  link?: string;
  authors?: string[];
  codeUrl?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string; // Markdown content
  tags: string[];
}
