import { Project, ResearchPaper, BlogPost } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Jarvis Voice Assistant',
    category: 'Generative Audio',
    description: 'Real-time multimodal voice assistant focused on low-latency interaction, local/served model inference, and retrieval-backed context. Built to make VLM and speech-model orchestration feel responsive enough for practical agent workflows.',
    imageUrl: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=1000&auto=format&fit=crop',
    techStack: ['AudioFlamingo3', 'VLLM', 'Docker', 'Kubernetes', 'RAG'],
    metrics: 'Sub-second latency target • RAG-backed context',
    featured: true,
    githubUrl: 'https://github.com/AISocietyIITJ/Jarvis2.O',
    detailLinks: [
      { label: 'GitHub', href: 'https://github.com/AISocietyIITJ/Jarvis2.O' },
    ]
  },
  {
    id: '2',
    title: 'IntelliBrowser',
    category: 'Autonomous Agents',
    description: 'Autonomous browser agent for web navigation, extraction, and retrieval-heavy workflows. Combines Playwright control with agent coordination so tasks can be decomposed, verified, and retried instead of running as brittle one-shot scripts.',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop',
    techStack: ['Python', 'Playwright', 'CrewAI', 'SQLite'],
    metrics: '35% faster queries • 22% higher retrieval accuracy',
    featured: true,
    githubUrl: 'https://github.com/devlup-labs/Intelligent-Browser',
    detailLinks: [
      { label: 'GitHub', href: 'https://github.com/devlup-labs/Intelligent-Browser' },
    ]
  },
  {
    id: '3',
    title: 'Dynamic Agentic RAG',
    category: 'Retrieval Systems',
    description: 'Streaming RAG pipeline for continuously changing corpora, designed around dynamic indexing, retrieval quality checks, and agentic query planning. The goal is to keep answers grounded even when source data is moving underneath the system.',
    imageUrl: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?q=80&w=1000&auto=format&fit=crop',
    techStack: ['Pathway', 'FastAPI', 'JinaAI', 'Gradio'],
    metrics: '500k+ events/min • 95.27% relevance',
    featured: false,
    githubUrl: 'https://github.com/madhavkataria1010/DynamicAgenticRAG',
    detailLinks: [
      { label: 'GitHub', href: 'https://github.com/madhavkataria1010/DynamicAgenticRAG' },
    ]
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
    githubUrl: 'https://github.com/madhavkataria1010/RealmWeaver',
    detailLinks: [
      { label: 'GitHub', href: 'https://github.com/madhavkataria1010/RealmWeaver' },
    ]
  },
  {
    id: '5',
    title: 'Adobe Challenge',
    category: 'Computer Vision',
    description: 'Computer-vision robustness project for detecting AI-created content using multi-head CNNs, VLM adapters, and adversarial training. Explored how synthetic-image detectors behave under perturbation rather than only clean benchmark splits.',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop',
    techStack: ['VLMs', 'GANs', 'LoRA', 'PyTorch'],
    metrics: '85% accuracy • 500k+ image dataset',
    featured: false,
    githubUrl: 'https://github.com/madhavkataria1010/AI-Image-Explainability',
    detailLinks: [
      { label: 'GitHub', href: 'https://github.com/madhavkataria1010/AI-Image-Explainability' },
    ]
  },
  {
    id: '6',
    title: 'DeepPlay',
    category: 'Autonomous Agents',
    description: 'Leveraged Deep Q-Networks in PyTorch and TensorFlow to train Unity-based football agents from scratch, achieving a 40% boost in strategic decision-making accuracy.',
    imageUrl: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=1000&auto=format&fit=crop',
    techStack: ['PyTorch', 'TensorFlow', 'Unity', 'RL'],
    metrics: '85% success rate • 40% accuracy boost',
    featured: false
  },
  {
    id: '7',
    title: 'AI Agent for QA',
    category: 'AI Agents',
    description: 'Built a high-efficiency AI agent for domain-specific question answering using GPT-4, combining multi-task learning with prompt engineering and CoT reasoning.',
    imageUrl: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=1000&auto=format&fit=crop',
    techStack: ['GPT-4', 'Prompt Engineering', 'CoT'],
    metrics: 'Streamlined workflows • Cost savings',
    featured: false
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
    githubUrl: 'https://github.com/madhavkataria1010/ics_majorproject',
    detailLinks: [
      { label: 'GitHub', href: 'https://github.com/madhavkataria1010/ics_majorproject' },
    ]
  },
];

export const PAPERS: ResearchPaper[] = [
  {
    id: 'p1',
    title: 'Re:Verse — Can Your VLM Read a Manga?',
    conference: 'ICCV AIstory Workshop Best Paper',
    year: '2025',
    abstract: 'Best Paper Award, Oral Presentation, Top 5%, ICCV AIstory 2025 Workshop. Re:Verse evaluates whether vision-language models can understand long-form manga narratives across panel-level grounding, temporal causality, character consistency, and cross-panel story cohesion.',
    link: 'https://arxiv.org/abs/2508.08508',
    authors: ['Madhav Kataria'],
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    slug: 'the-future-of-agentic-workflows',
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
    slug: 'optimizing-vlm-inference-at-scale',
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
    slug: 'exploring-the-nextjs-app-router',
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
    slug: 'why-i-research-vision-language-models',
    title: 'Why I Research Vision-Language Models',
    date: 'July 28, 2024',
    readTime: '3 min read',
    excerpt: 'The question that pulled me into VLM research — and why I think multimodal AI is the most interesting frontier right now.',
    tags: ['Personal', 'Research', 'VLMs'],
    content: `
I get asked a lot: *"Why VLMs specifically?"*

The honest answer is that I find them endlessly humbling. You can build a model that aces language benchmarks, then show it a manga panel and watch it completely fall apart. **Perception and language are more entangled than most models admit.**

## The Problem That Hooked Me

Most AI benchmarks measure what models *can* do in controlled settings. My Re:Verse paper asked a different question: can a state-of-the-art VLM *read* a manga — follow the visual story, understand panel order, and reason about what happens next?

The answer, overwhelmingly, was *not yet*. And that gap is exactly where the interesting work lives.

## What I'm Building Toward

I'm interested in the intersection of:
*   **Multimodal reasoning** — models that see and understand, not just classify.
*   **Autonomous agents** — systems that take actions, not just answer questions.
*   **High-performance inference** — because none of it matters if it can't run in the real world.

This blog is where I'll think out loud about that work — papers, engineering decisions, and the occasional rabbit hole.

If any of this resonates, reach out. I'm always up for a good conversation about where AI is actually going.
    `
  }
];
