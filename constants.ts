import { Project, ResearchPaper, BlogPost } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Jarvis Voice Assistant',
    category: 'Generative Audio',
    description: 'An advanced real-time AI voice assistant built with VLLM inference, delivering sub-second latency for high-quality conversational AI experiences. Integrates OrcaStation and MCP server for RAG-powered contextual intelligence.',
    imageUrl: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=1000&auto=format&fit=crop',
    techStack: ['AudioFlamingo3', 'VLLM', 'Docker', 'Kubernetes', 'RAG'],
    metrics: 'Sub-second latency • 500+ concurrent users',
    featured: true,
    githubUrl: 'https://github.com/madhavkataria/jarvis-voice-assistant',
    link: '#'
  },
  {
    id: '2',
    title: 'IntelliBrowser',
    category: 'Autonomous Agents',
    description: 'High-performance autonomous web agent leveraging Playwright and CrewAI MCP for intelligent browser automation. Orchestrates multiple AI agents for automated web navigation, data extraction, and retrieval with 35% faster query performance.',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop',
    techStack: ['Python', 'Playwright', 'CrewAI', 'SQLite'],
    metrics: '35% faster queries • 22% higher retrieval accuracy',
    featured: true,
    githubUrl: 'https://github.com/madhavkataria/intelli-browser',
    link: '#'
  },
  {
    id: '3',
    title: 'Dynamic Agentic RAG',
    category: 'Retrieval Systems',
    description: 'Enterprise-grade real-time RAG pipeline using Pathway for continuous data stream synthesis. Achieves 95.27% relevance scores while processing 500k+ events/min for AI-powered critical decision-making systems.',
    imageUrl: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?q=80&w=1000&auto=format&fit=crop',
    techStack: ['Pathway', 'FastAPI', 'JinaAI', 'Gradio'],
    metrics: '500k+ events/min • 95.27% relevance',
    featured: false,
    githubUrl: 'https://github.com/madhavkataria/dynamic-rag',
    link: '#'
  },
  {
    id: '4',
    title: 'Realm Weaver',
    category: 'Procedural Generation',
    description: 'Procedurally created 2D open world engine using Gemini API and recursive tree graphs. Features endless map exploration and adaptive quests via graph algorithms.',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop',
    techStack: ['C++', 'Gemini API', 'Graph Algos', 'CMake'],
    metrics: '+12% engagement • Optimized Minimax',
    featured: false,
    githubUrl: 'https://github.com/madhavkataria/realm-weaver',
    link: '#'
  },
  {
    id: '5',
    title: 'Adobe Challenge',
    category: 'Computer Vision',
    description: 'Multi-head CNN & VLM LoRA adapters formulated to detect AI-created content. Utilizes adversarial training (FGSM, PGD) to boost model robustness.',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop',
    techStack: ['VLMs', 'GANs', 'LoRA', 'PyTorch'],
    metrics: '85% accuracy • 500k+ image dataset',
    featured: false,
    githubUrl: 'https://github.com/madhavkataria/adobe-challenge'
  },
  {
    id: '6',
    title: 'DeepPlay',
    category: 'Autonomous Agents',
    description: 'Leveraged Deep Q-Networks in PyTorch and TensorFlow to train Unity-based football agents from scratch, achieving a 40% boost in strategic decision-making accuracy.',
    imageUrl: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=1000&auto=format&fit=crop',
    techStack: ['PyTorch', 'TensorFlow', 'Unity', 'RL'],
    metrics: '85% success rate • 40% accuracy boost',
    featured: false,
    githubUrl: '#'
  },
  {
    id: '7',
    title: 'AI Agent for QA',
    category: 'AI Agents',
    description: 'Built a high-efficiency AI agent for domain-specific question answering using GPT-4, combining multi-task learning with prompt engineering and CoT reasoning.',
    imageUrl: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=1000&auto=format&fit=crop',
    techStack: ['GPT-4', 'Prompt Engineering', 'CoT'],
    metrics: 'Streamlined workflows • Cost savings',
    featured: false,
    githubUrl: '#'
  },
  {
    id: '8',
    title: 'DeepFusion-C',
    category: 'HPC',
    description: 'Hand-optimized C implementation of a four-layer CNN for MNIST digit recognition, leveraging SIMD intrinsics and OpenMP to deliver sub-millisecond inference.',
    imageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1000&auto=format&fit=crop',
    techStack: ['C', 'SIMD', 'OpenMP', 'CNN'],
    metrics: '>99.2% accuracy • Sub-ms latency',
    featured: false,
    githubUrl: 'https://github.com/madhavkataria1010/ics_majorproject'
  },
];

export const PAPERS: ResearchPaper[] = [
  {
    id: 'p1',
    title: 'Re:Verse — Can Your VLM Read a Manga?',
    conference: 'ICCV',
    year: '2025',
    abstract: 'Oral Presentation (Top 5%) · Best Paper. A novel framework for retrieval-based video generation and vision-language alignment, focusing on complex narrative structures.',
    link: 'https://arxiv.org/abs/2508.08508'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'The Future of Agentic Workflows',
    date: 'October 14, 2024',
    readTime: '5 min read',
    excerpt: 'Moving beyond brittle LLM chains to autonomous systems that plan, reason, and correct themselves.',
    tags: ['Agents', 'LLMs', 'Architecture'],
    content: `
Traditional LLM chains are often brittle. They execute a linear sequence of steps and fail if one step goes wrong. The future of AI application development belongs to **autonomous agents** that can plan, reason, and correct themselves.

## From Chains to Graphs

In my work with \`IntelliBrowser\`, I shifted from a linear chain-of-thought to a graph-based execution model using **LangGraph** and **CrewAI**. This allows agents to loop back, refine their search queries, and verify their own outputs before presenting them to the user.

### Key Benefits:
*   **Self-Correction:** If an agent fails to find data, it tries a new strategy.
*   **Parallelism:** Multiple agents can scrape different sources simultaneously.
*   **State Management:** Maintaining context across long-running tasks.

\`\`\`python
# Pseudo-code for a simple agent loop
while not task.is_complete():
    observation = env.observe()
    action = agent.decide(observation)
    result = env.step(action)
    agent.update_memory(result)
\`\`\`

## The Role of MCP (Model Context Protocol)

Standardizing how models interface with external tools is critical. By using **MCP**, we decouple the model from the tool implementation, allowing us to swap backend LLMs (Gemini, GPT-4, Claude) without rewriting the integration logic.
    `
  },
  {
    id: 'b2',
    title: 'Optimizing VLM Inference at Scale',
    date: 'September 28, 2024',
    readTime: '8 min read',
    excerpt: 'Techniques for serving Vision-Language Models with sub-second latency using VLLM and quantization.',
    tags: ['VLM', 'Performance', 'CUDA'],
    content: `
Serving Vision-Language Models (VLMs) like **Llava** or **Gemini-Pro-Vision** in real-time is computationally expensive. High latency kills user experience, especially in voice-to-voice applications like my **Jarvis** project.

## KV Caching & PagedAttention

The bottleneck in autoregressive generation is often memory bandwidth, not compute. **PagedAttention** (introduced by vLLM) allows us to manage Key-Value (KV) cache memory in non-contiguous blocks, similar to virtual memory in OS.

> "Memory is the new bottleneck."

By optimizing memory allocation, we increased throughput by **3x** without upgrading the hardware.

## Quantization Strategies

We experimented with **AWQ (Activation-aware Weight Quantization)**. Unlike standard RTN (Round-to-nearest), AWQ protects the salient weights that are critical for accuracy.

1.  **4-bit Quantization:** Reduces VRAM usage by ~60%.
2.  **LoRA Adapters:** Fine-tune on specific domains (e.g., medical imaging) without loading full model weights.

The result? A fully local VLM pipeline running on consumer hardware with <500ms time-to-first-token.
    `
  },
  {
    id: 'b3',
    title: 'Exploring the Next.js App Router',
    date: 'July 29, 2024',
    readTime: '6 min read',
    excerpt: 'A dive into the features and benefits of the Next.js App Router, and how it changes web development.',
    tags: ['Next.js', 'React', 'Web Dev'],
    content: `
The introduction of the **App Router** in Next.js 13 marked a paradigm shift in how we build React applications. It represents a move from the traditional \`pages\` directory to a new \`app\` directory structure that fully embraces **React Server Components (RSC)**.

## Key Features

### 1. Server Components by Default
In the App Router, all components are Server Components by default. This means less JavaScript sent to the client, faster initial page loads, and improved SEO. You explicitly opt-in to client-side interactivity with the \`"use client"\` directive.

### 2. Nested Layouts
The \`layout.js\` file allows you to define UI that is shared across multiple pages. State is preserved, and the layout remains interactive while the page content changes.

### 3. Route Groups
You can organize routes without affecting the URL structure by wrapping folders in parentheses, e.g., \`(marketing)\`.

### 4. Loading and Error UI
Special files like \`loading.js\` and \`error.js\` allow you to create meaningful loading states and error boundaries with zero configuration.

## Why it Matters
The App Router isn't just a directory change; it's a mental model shift. It aligns Next.js closer to the web platform and the future of React.
    `
  },
  {
    id: 'b4',
    title: 'My First Blog Post',
    date: 'July 28, 2024',
    readTime: '2 min read',
    excerpt: 'Welcome to my blog! Here I will share my journey in software engineering and AI.',
    tags: ['Personal', 'Intro'],
    content: `
Hello world! I'm **Madhav Kataria**, and this is my first blog post.

I created this space to share my experiences, learnings, and experiments in the world of **Artificial Intelligence** and **Software Engineering**.

## What to Expect
I plan to write about:
*   **Generative AI:** LLMs, VLMs, and Agentic workflows.
*   **Web Development:** Modern frameworks like Next.js, React, and performance optimization.
*   **Research:** Breakdowns of interesting papers and my own research projects.
*   **Personal Growth:** Lessons learned during my journey as a developer and researcher.

Stay tuned for more!
    `
  }
];
